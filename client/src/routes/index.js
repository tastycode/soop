import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import HomeView from 'views/HomeView/HomeView'
import ClientView from 'views/ClientView/ClientView'
import PatronView from 'views/PatronView/PatronView'
import NotFoundView from 'views/NotFoundView/NotFoundView'

    // <Redirect from='*' to='/404' />
export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path='/clients/new' component={ClientView}/>
    <Route path='/patrons/new' component={PatronView}/>
    <Route path='/404' component={NotFoundView} />
  </Route>
)
