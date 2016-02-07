import React from 'react'
// import { Link } from 'react-router'
import request from 'superagent'
const Geosuggest = require('react-geosuggest')
const StripeCheckout = require('react-stripe-checkout');

export class PatronView extends React.Component {
  state = {
    locationSearch: '',
  };

  _createPatron () {
    const authToken = document.querySelector('meta[name=csrf-token]').content
    request
       .post('/patrons')
        .send({
          authenticity_token: authToken,
          patron: {
            fullname: this.state.fullname,
            token: this.state.token,
            email: this.state.email,
            count: 1,
            address: this.state.address,
            address2: this.state.address2,
            city: this.state.city,
            state: this.state.state,
            location_lat: this.state.locationLat,
            location_lng: this.state.locationLng
          }
        })
        .then((response) => {
          window.location.pathname = '/patrons/' + response.body.patron.id + '/thanks'
        })
    return false
  }
 _componentWith (blob, key) {
   const components = blob.gmaps.address_components
   const component = components.find((comp) => {
     return comp.types[0] === key
   })
   return (component && component.short_name) || ''
 }

 _handleSuggest (suggest) {
   const streetNumber = this._componentWith(suggest, 'street_number')
   const route = this._componentWith(suggest, 'route')
   const city = this._componentWith(suggest, 'locality')
   const state = this._componentWith(suggest, 'administrative_area_level_1')
   const locationLng = suggest.location.lng
   const locationLat = suggest.location.lat
   this.setState({
     address: `${streetNumber} ${route}`,
     city,
     state,
     locationLng,
     locationLat
   })
 }

_onStateChange (property) {
  return function (e) {
    const val = e.target.value
    const obj = {}
    obj[property] = val
    this.setState(obj)
  }
}
_onChecked (prop, reversed = false) {
  return function (e) {
    let obj = {}
    obj[prop] = reversed ? !e.target.checked : e.target.checked
    this.setState(obj)
  }
}

_stripeKey() {
  return document.querySelector('meta[name=stripe-key]').content
}

_amountFromCount() {
  return this.state.count * 1000; //10 dollars
}

_handleSubmit (e) {
  e.preventDefault();
  return false;
}
_handleToken (stripeData) {
  this.setState({
    token: stripeData.id,
    email: stripeData.email
  });
  this._createPatron()
}
  render () {
    return (
      <div className='container text-center'>
        <form onSubmit={this._handleSubmit}>
          <label>Your name</label>
            <input name='patron[fullname]'
            value={this.state.fullname} onChange={this._onStateChange('fullname').bind(this)}/>
          <label>Your address</label>
            <Geosuggest onSuggestSelect={this._handleSuggest.bind(this)}/>
          <label>How many people</label>
            <input name='patron[count]'
              value={this.state.count} onChange={this._onStateChange('count').bind(this)}/>
          <br/>
          <StripeCheckout token={this._handleToken.bind(this)} stripeKey={this._stripeKey()} amount={this._amountFromCount()}/>
        </form>
      </div>
    )
  }
}

export default PatronView
