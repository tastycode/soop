import React from 'react'
// import { Link } from 'react-router'
import request from 'superagent'
const Geosuggest = require('react-geosuggest')

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
            location_lat: this.state.locationLat,
            location_lng: this.state.locationLng
          }
        })
        .then((response) => {
          window.location.pathname = '/clients/' + response.body.client.id + '/preview'
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
_onOptionChecked (prop, subprop) {
  return function (e) {
    let obj = {}
    obj[prop] = {}
    obj[prop][subprop] = e.target.checked
    this.setState(obj)
  }
}
  render () {
    return (
      <div className='outer-container text-center'>
        <div className='pageTitle'>
        Apply for food
        </div>
        <hr />
        <form onSubmit={this._handleSubmit.bind(this)}>
          <div className="field">
            <label>Your name</label>
              <input name='client[fullname]'
              value={this.state.fullname} onChange={this._onStateChange('fullname').bind(this)}/>
          </div>
          <div className="field">
            <label>Your address</label>
              <Geosuggest onSuggestSelect={this._handleSuggest.bind(this)}/>
          </div>
          <div className="field">
            <label>Address line 2</label>
              <input name='client[address2]'
                value={this.state.address2} onChange={this._onStateChange('address2').bind(this)}/>
          </div>
          <div className="field">
            <label>Email</label>
              <input name='client[email]'
                value={this.state.email} onChange={this._onStateChange('email').bind(this)}/>
          </div>
          <div className="field">
            <label>How many people</label>
              <input name='client[count]'
                value={this.state.count} onChange={this._onStateChange('count').bind(this)}/>
          </div>
          <div className="field">
            <label>Do you have any allergies or other restrictions?</label>
            <label>Yes
              <input type='radio' name='restrictions'
                value='1' onChange={this._onChecked('hasRestrictions').bind(this)}/>
            </label>
            <label>No
              <input type='radio' name='restrictions'
                value='0' onChange={this._onChecked('hasRestrictions', true).bind(this)} defaultChecked={true}/>
            </label>
            {this.restrictionsOptions()}
          </div>
          <br/>
          <button>Done</button>
        </form>
      </div>
    )
  }

  restrictionsOptions() {
    if (!this.state.hasRestrictions) {
      return
    }
    return (
      <div>
        <label>Gluten Free</label>
        <input type='checkbox' name='gluten'
          checked={this.state.restrictions.gluten}
          onChange={this._onOptionChecked('restrictions', 'gluten').bind(this)}/>

        <label>Vegetarian</label>
        <input type='checkbox' name='vegetarian'
          checked={this.state.restrictions.vegetarian}
          onChange={this._onOptionChecked('restrictions', 'vegetarian').bind(this)}/>
      </div>

    )

  }
}

export default ClientView
