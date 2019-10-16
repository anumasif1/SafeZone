import React from 'react';
import logo from './logo.svg';
import './App.css';
import AddressForm from './AddressForm';

function App() {
  return (
    <div className="App">
       <nav className="navbar navbar-light bg-danger fixed-top">
        <span className="navbar-brand mb-0 h1">SafeZone</span>
      </nav>

    <div className="container main-app">
      <div className="row">
      <AddressForm />
     
      </div>
    </div>
     
    </div>
  );
}

export default App;
