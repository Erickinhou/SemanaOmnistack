import React from 'react'
import {BrowserRouter, Route, Switch } from 'react-router-dom'
/* o BrowserRouter precisa ficar entre  tds os componetes para o sistema de roteamento funcionar*/
/* o Switch serve para garantir que uma rota seja chamada por momento*/
import Logon from './pages/Logon'
import Register from './pages/Register'
import Profile from './pages/Profile'
import NewIncident from './pages/NewIncident'

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
            <Route path = "/" exact component = {Logon} /> {/* como valor dafault, o path oberva só se a url comecou com o indicado, por isso o exact */}
            <Route path = "/register" component = {Register} />

            <Route path= "/profile" component = {Profile} />
            <Route path= "/incidents/new" component = {NewIncident} />
            </Switch>
        </BrowserRouter> 
    )
}