import React, { Component } from 'react';
import AddressItem from './AddressItem';
import AddressSuggest from './AddressSuggest';

class AddressInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.props.onChange(evt);
  }

  render() {
    return (

      <div className="card-body" style={{ padding: "15px" }}>
      <AddressItem label="Street" id="street" value={this.props.street} onChange={this.handleChange} placeholder="" />
      <AddressItem label="City" id="city" value={this.props.city} onChange={this.handleChange} placeholder="" />
      <AddressItem label="State" id="state" value={this.props.state} onChange={this.handleChange} placeholder="" />
      <AddressItem label="Postal Code" id="postalCode" value={this.props.postalCode} onChange={this.handleChange} placeholder="" />
      <AddressItem label="Country" id="country" value={this.props.country} onChange={this.handleChange} placeholder="" />
      </div>
    );
  }
}

export default AddressInput;