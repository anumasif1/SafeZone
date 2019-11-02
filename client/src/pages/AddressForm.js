import React, { Component } from 'react';
import AddressSuggest from './AddressSuggest';
import AddressInput from './AddressInput';
import axios from 'axios';
import './AddressForm.css';
import Jumbotron from 'react-bootstrap/Jumbotron'
import { Container, Button } from 'react-bootstrap'
import L from 'leaflet';
import './Maps.css';



console.log(process.env)

console.log(process.env.REACT_APP_ADDRESS_CODE)



// const APP_ID_HERE = 'BsV54tyJtu3XyQzqHSbS';
// const APP_CODE_HERE = 'LiwrHP8o9CfzfePJDFRWlA';

class AddressForm extends Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();

    // User has entered something in the address bar
    this.onQuery = this.onQuery.bind(this);
    // User has entered something in an address field
    this.onAddressChange = this.onAddressChange.bind(this);
    // User has clicked the check button
    this.onCheck = this.onCheck.bind(this);
    // User has clicked the clear button
    this.onClear = this.onClear.bind(this);
  }

  state = {
    spSecondaryStyle: "none",
    addressFormStyle: "",
    mapStyle: "",
    mapShowAddress: "",
    mapShowTitle: "",
    mapShowLevel: "",
    mapShowDetail: ""
  }

  componentDidMount() {
    this.setState({
      spSecondaryStyle: "none",
      mapStyle: "none"
    })
  }

  onQuery(evt) {
    const query = evt.target.value;

    if (!query.length > 0) {
      this.setState(this.getInitialState());
      return;
    }

    const self = this;
    axios.get('https://autocomplete.geocoder.api.here.com/6.2/suggest.json',
      {
        'params': {
          'app_id': process.env.REACT_APP_ADDRESS_ID,
          'app_code': process.env.REACT_APP_ADDRESS_CODE,
          'query': query,
          'maxresults': 1,
        }
      }).then(function (response) {
        if (response.data.suggestions.length > 0) {
          const id = response.data.suggestions[0].locationId;
          const address = response.data.suggestions[0].address;
          self.setState({
            'address': address,
            'query': query,
            'locationId': id
          })
        } else {
          const state = self.getInitialState();
          self.setState(state);
        }
      });
  }

  getInitialState() {
    return {
      'address': {
        'street': '',
        'city': '',
        'state': '',
        'postalCode': '',
        'country': ''
      },
      'query': '',
      'locationId': '',
      'isChecked': false,
      'coords': {}
    }
  }

  onClear(evt) {
    const state = this.getInitialState();
    this.setState(state);
  }

  onAddressChange(evt) {
    const id = evt.target.id
    const val = evt.target.value

    let state = this.state
    state.address[id] = val;
    this.setState(state);
  }

  handleOnClickSp(event) {
    event.preventDefault();
    window.location.reload();
  }

  onCheck(evt) {

    axios
      .get("/api/getpost/")
      .then(resp => {
        for (let i = 0; i < resp.data.length; i++) {
          let sp1 = this.state.address.street;
          let sp2 = resp.data[i].address;

          for (let i = 0; i < sp1.length - 1; i++) {
            if (sp1[i] === "" ) {
              sp1[i] = sp1[i++];
            }
          }

          for (let i = 0; i < sp2.length; i++) {
            if (sp2[i] === "" ) {
              sp2[i] = sp2[i++];
            }
          }


          if (sp1 === sp2) {
            this.setState({
              mapShowAddress: "<a style='font-weight: bolder'>Address:</a> " + this.state.address.street + "<br>",
              mapShowTitle: "<a style='font-weight: bold'>Title:</a> " + resp.data[i].title + "<br>",
              mapShowLevel: "<a style='font-weight: bold; color: red;'>EM Level: " + resp.data[i].level + "</a><br>",
              mapShowDetail: "<a style='font-weight: bold'>Detail:</a> " + resp.data[i].post
            });
            break;
          } else {
            this.setState({
              mapShowAddress: "Address: " + this.state.address.street + "<br>",
              mapShowTitle: "Alert: ",
              mapShowLevel: "",
              mapShowDetail: "There is no post found at this address!"
            })
          }
        }


        this.setState({
          // mapShowAddress
        })

        this.setState({
          spSecondaryStyle: "",
          addressFormStyle: "none",
          mapStyle: ""
        })
        let params = {
          'app_id': process.env.REACT_APP_ADDRESS_ID,
          'app_code': process.env.REACT_APP_ADDRESS_CODE
        }

        if (this.state.locationId.length > 0) {
          params['locationId'] = this.state.locationId;
        } else {
          params['searchtext'] = this.state.address.street
            + this.state.address.city
            + this.state.address.state
            + this.state.address.postalCode
            + this.state.address.country;
        }

        const self = this;
        axios.get('https://geocoder.api.here.com/6.2/geocode.json',
          { 'params': params }
        ).then(function (response) {
          const view = response.data.Response.View
          if (view.length > 0 && view[0].Result.length > 0) {
            const location = view[0].Result[0].Location;

            self.setState({
              'isChecked': 'true',
              'locationId': '',
              'query': location.Address.Label,
              'address': {
                'street': location.Address.HouseNumber + ' ' + location.Address.Street,
                'city': location.Address.City,
                'state': location.Address.State,
                'postalCode': location.Address.PostalCode,
                'country': location.Address.Country
              },
              'coords': {
                'lat': location.DisplayPosition.Latitude,
                'lon': location.DisplayPosition.Longitude
              }
            });
          } else {
            self.setState({
              isChecked: true,
              coords: null,
            })
          }

        })
          .catch(function (error) {
            self.setState({
              isChecked: true,
              coords: null
            });
          });


      })
      .catch(err => {
        console.log(err);
      });


  }

  getMapView = (l1, l2) => {
    let mymap = L.map('mapid').setView([this.state.coords.lat, this.state.coords.lon], 18);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20,
      id: process.env.REACT_APP_LEAFMAP_ID,
      accessToken: process.env.REACT_APP_LEAFMAP_TOKEN
    }).addTo(mymap);

    let circle = L.circle([this.state.coords.lat, this.state.coords.lon], {
      color: '#00BFFF',
      fillColor: '	#00BFFF',
      fillOpacity: 0.5,
      radius: 50
    }).addTo(mymap);

    circle.bindPopup(this.state.mapShowAddress + this.state.mapShowLevel + this.state.mapShowTitle + this.state.mapShowDetail);

  }

  alert() {
    if (!this.state.isChecked) {
      return;
    }

    if (this.state.coords === null) {
      return (
        <div className="alert alert-warning" role="alert">
          <b>Invalid.</b> The address is not recognized.
        </div>
      );
    } else {
      this.getMapView();
      return (
        <div className="alert alert-success" role="alert">
          <b>Valid Address.</b>  Location is {this.state.coords.lat}, {this.state.coords.lon}.
        </div>
      );
    }
  }



  render() {
    let result = this.alert();
    const spSecondaryStyle = {
      display: this.state.spSecondaryStyle,
      // margin: "auto",
      width: "100%"
    }
    const addressFormStyle = {
      display: this.state.addressFormStyle,
      marginTop: "70px"
    }
    const mapStyle = {
      display: this.state.mapStyle,
      marginTop: "150px",
      margin: "auto",
      width: "90%"
    }
    return (
      <div className="container-main">
        {/* <div>
          <h1>Sign Up, Check the Address and Stay Safe!</h1>
        </div> */}
        <Jumbotron fluid style={addressFormStyle}>
          <div className="card">
            <AddressSuggest
              query={this.state.query}
              onChange={this.onQuery}
            />
            <AddressInput
              street={this.state.address.street}
              city={this.state.address.city}
              state={this.state.address.state}
              postalCode={this.state.address.postalCode}
              country={this.state.address.country}
              onChange={this.onAddressChange}
            />

            {result}

            <div className="form-button" style={{ padding: "10px" }}>
              <button type="submit" className="btn btn-light ml-10" onClick={this.onClear}>Clear</button>
              <button type="submit" className="btn btn-light" onClick={this.onCheck}>Check</button>

            </div>

          </div>
        </Jumbotron>

        <div style={mapStyle}>
          <div id="mapid" className=""></div>
          <div style={{ width: "100%", textAlign: "center" }} className="">
            <Button size="lg" variant="primary" onClick={this.handleOnClickSp} style={spSecondaryStyle}>Click to check another address</Button>
          </div>
        </div>
      </div>

    );
  }
}

export default AddressForm;