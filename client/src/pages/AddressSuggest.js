import React, { Component } from 'react';
import AddressItem from './AddressItem';


class AddressSuggest extends Component {
  render() {
    return (
      <div style={{ padding: "15px" }}>
        <AddressItem
          label="Address"
          value={this.props.query}
          onChange={this.props.onChange}
          placeholder="Type address here..." />
      </div>
    );
  }
}

export default AddressSuggest;