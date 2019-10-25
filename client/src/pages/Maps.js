import React, { Component } from 'react';
import './Maps.css';
import { Container } from 'react-bootstrap';
import L from 'leaflet';




class Maps extends Component {

    state = {

    }

    componentDidMount() {
        this.getMapView();
    }

    getMapView = (l1, l2) => {
        let mymap = L.map('mapid').setView([33.6694649, -117.8231107], 12);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoiYWFydml6dTI5IiwiYSI6ImNrMXZtbWdhbjBpdG4zYnA1NGZ2eXpmZ2oifQ.nD8_Rft10MhlpJqZjnNYDw'
        }).addTo(mymap);

        let circle = L.circle([33.6694649, -117.8231107], {
            color: '#00BFFF',
            fillColor: '	#00BFFF',
            fillOpacity: 0.5,
            radius: 5000
        }).addTo(mymap);

        var marker1 = L.marker([33.6694649, -117.8231107]).addTo(mymap);
        marker1.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup()

        var marker2 = L.marker([33.6461322, -117.8428335]).addTo(mymap);
        marker2.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup()
    }

    render() {
        return (
            <>
                <Container id="mapid">

                </Container>
            </>
        )
    }
}

export default Maps;