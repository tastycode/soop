import React from 'react'
import { Link } from 'react-router'
import request from 'superagent'
var Geosuggest = require('react-geosuggest');

export class ClientView extends React.Component {
  state = {
    locationSearch: '',
    hasRestrictions: false,
    tastes: {

    },
    restrictions: {
      vegan: false,
      vegetarian: false,
      soy: false,
      gluten: false,
      dairy: false,
      nuts: false
    }
  };

  _handleSubmit (e) {
    e.preventDefault()
    const authToken = document.querySelector('meta[name=csrf-token]').content
    request
       .post('/clients')
        .send({
          authenticity_token: authToken,
          client: {
            fullname: this.state.fullname,
            email: this.state.email,
            count: 1,
            tastes: this.state.tastes,
            restrictions: this.state.restrictions,
            address: this.state.address,
            address2: this.state.address2,
            city: this.state.city,
            state: this.state.state,
            location_lat: this.state.location_lat,
            location_lng: this.state.location_lng
          }
        })
        .end()
        .then((response) => {
          window.location.pathname = '/clients/' + response.body.client.id + '/preview'
        })
    return false
  }
 _componentWith(blob, key) {
   let components = blob.gmaps.address_components;
   let component = components.find((component) => {
     return component.types[0] == key;
   });
   return (component && component.short_name) || '';
 }

 _handleSuggest(suggest) {
   let streetNumber = this._componentWith(suggest, 'street_number');
   let route = this._componentWith(suggest, 'route');
   let city = this._componentWith(suggest, 'locality');
   let state = this._componentWith(suggest, 'administrative_area_level_1');
   let location_lng = suggest.location.lng;
   let location_lat = suggest.location.lat;
   this.setState({
     address: `${streetNumber} ${route}`,
     city,
     state,
     state,
     location_lng,
     location_lat
   })

 }

_onStateChange(property) {
  return function(e) {
    let val = e.target.value;
    let obj = {};
    obj[property] = val;
    this.setState(obj);
  }
}
_onChecked(prop, reversed = false) {
  return function(e) {
    var obj = {}
    obj[prop] = reversed ? !e.target.checked : e.target.checked
    this.setState(obj)
  }
}
_onOptionChecked(prop, subprop) {
  return function(e) {
    var obj = {};
    obj[prop] = {};
    obj[prop][subprop] = e.target.checked;
    this.setState(obj);
  }

}
  render () {
    const {locationSearch} = this.state;
    return (
      <div className='container text-center'>
        <h1>This is a client page</h1>
        <hr />
        <form onSubmit={this._handleSubmit.bind(this)}>
          <label>Your name</label>
            <input name='client[fullname]' value={this.state.fullname} onChange={this._onStateChange('fullname').bind(this)}/>
          <label>Your address</label>
            <Geosuggest  onSuggestSelect={this._handleSuggest.bind(this)}/>
          <label>Address line 2</label>
            <input name='client[address2]' value={this.state.address2} onChange={this._onStateChange('address2').bind(this)}/>
          <label>Email</label>
            <input name='client[email]' value={this.state.email} onChange={this._onStateChange('email').bind(this)}/>
          <label>How many people</label>
            <input name='client[count]' value={this.state.count} onChange={this._onStateChange('state').bind(this)}/>
            <input name='client[tastes]'/>
          <label>Do you have any allergies or other restrictions?</label>
          <input type="radio" name="restrictions" value="1" onChange={this._onChecked('hasRestrictions').bind(this)}/>
          <input type="radio" name="restrictions" value="0" onChange={this._onChecked('hasRestrictions', true).bind(this)} defaultChecked={true}/>
          {this.restrictionsOptions()}
          <br/>
          <button>Done</button>
        </form>
      </div>
    )
  }

  restrictionsOptions() {
    if (!this.state.hasRestrictions) {
      return;
    }
    return (
      <div>
        <label>Gluten Free</label>
        <input type="checkbox" name="gluten"
          checked={this.state.restrictions.gluten}
          onChange={this._onOptionChecked('restrictions', 'gluten').bind(this)}/>

        <label>Vegetarian</label>
        <input type="checkbox" name="vegetarian"
          checked={this.state.restrictions.vegetarian}
          onChange={this._onOptionChecked('restrictions', 'vegetarian').bind(this)}/>
      </div>

    )

  }
}

export default ClientView
