import { useState ,useEffect, useContext} from "react"
import { Redirect } from "react-router";
import {Products} from './products.js';
import {Login,CheckLogin} from '../App.js';
import axios from "axios";
export const ProductNav = () => {
    const login = useContext(Login);
    const checkLogin = useContext(CheckLogin);
    const [loading,setLoading] = useState(false);
    const [data,setData] = useState([]);
    const [renderc,setRenderc] = useState("products");
    const getData = () => {
        setLoading(true);
        axios.get('https://0q54sk5m7j.execute-api.us-east-2.amazonaws.com/dev/admin/product/get',{withCredentials:true})
        .then(res=>{
            if(res.status===200){
                setData(res.data);
                setLoading(false);
                console.log(res.data);
            }
        })
    }
    const efe = () => {
        checkLogin();
        getData();
    }
    try{
        useEffect(efe,[]);
    }catch(e){
        console.log(e);
    }
    return(
        <>
            <nav style={{
            display:'grid',
            justifyContent:'center',
            backgroundColor:'grey'
            }}>
                <ul style={{listStyleType:'none'}} className="order-nav">
                    <li
                    onClick={()=>setRenderc("products")}
                    >Products</li>
                </ul>
            </nav>
            {login ? 
                renderc==="products" ? <Products getData={getData} data={data} loading={loading}/> : ''
            : <Redirect to='/'/>}
        </>
    )
}