import {HomeNav} from './homeNav.js';
import {ProductNav} from './productNav.js';
import {OrderNav} from './orderNav.js';
import {Switch,Route, useRouteMatch, Redirect} from 'react-router-dom';
import {Login} from '../App.js';
import { useContext } from 'react';
export const Home = () => {
    let {path} = useRouteMatch();
    const login = useContext(Login);
    return(
        <>
            <Switch>
                <Route exact path={path}>
                    {login ? <HomeNav /> : <Redirect to='/'/>}
                </Route>
                <Route exact path={`${path}/products`}>
                    {login ?  <ProductNav/> : <Redirect to='/'/>}
                </Route>
                <Route exact path={`${path}/orders`}>
                    {login ?  <OrderNav/> : <Redirect to='/'/>}
                </Route>
            </Switch>
        </>
    )
}