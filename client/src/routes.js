import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LinksPage } from './pages/LinksPage'
import { CreatePage } from './pages/CreatePage'
import { DetailPage } from './pages/DetailPage'
import { AuthPage } from './pages/AuthPage'

//if token is present in localstorage (isAuthenticated = true) - show this route with components
export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/links" exact>
          <LinksPage />
        </Route>
        <Route path="/create" exact>
          <CreatePage />
        </Route>
        <Route path="/detail/:id">
          <DetailPage />
        </Route>

        <Redirect to="/create" />
      </Switch>
    )
  }
  //if isAthenticated = false - show this route
  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/create" />
    </Switch>
  )
}