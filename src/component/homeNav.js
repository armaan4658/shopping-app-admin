import axios from 'axios';
import { useContext } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import {SetLogin} from '../App.js';
export const HomeNav = () => {
    const history = useHistory();
    const {url} = useRouteMatch();
    const setLogin = useContext(SetLogin);
    const logOut = () => {
        axios.get(`https://0q54sk5m7j.execute-api.us-east-2.amazonaws.com/dev/admin/logout`,{withCredentials:true})
        .then(res=>{
            if(res.status===200){
                setLogin(false);
                history.push('/');
            }
        })
    }
    const divStyle={
        backgroundColor:'grey',
        width:'200px',
        height:'50px',
        borderRadius:'5%',
        border:'2px solid black',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        margin:'10px 0',
        cursor:'pointer'

    }
    return(
        <div style={{
            display:'grid',
            justifyContent:'center',
            paddingTop:'30vh'
        }}>
            <ul 
            style={{
                listStyleType:'none'
            }}
            >
                <li>
                    <div 
                    style={divStyle}
                    onClick={()=>history.push(`${url}/orders`)}
                    > <h1>Orders</h1> </div>
                </li>
                <li>
                    <div 
                    style={divStyle}
                    onClick={()=>history.push(`${url}/products`)}
                    > <h1>Products</h1> </div>
                </li>
                <li>
                    <div 
                    style={divStyle}
                    onClick={logOut}
                    > <h1>Logout</h1> </div>
                </li>
            </ul>
        </div>
    )
}