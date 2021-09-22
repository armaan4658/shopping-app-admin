import { useContext, useEffect } from 'react';
import {DeliveredOrder} from './deliveredOrder.js';
import {PendingOrder} from './pendingOrder.js';
import {OutForDelivery} from './outForDelivery.js';
import {ProcessedOrder} from './processedOrder.js';
import {Login,CheckLogin} from '../App.js';
import axios from 'axios';
import { useState } from 'react';
import { Redirect } from 'react-router';
export const OrderNav = () => {
    const login = useContext(Login);
    const checkLogin = useContext(CheckLogin);
    const [loading,setLoading] = useState(false);
    const [data,setData] = useState([]);
    const [renderc,setRenderc] = useState("delivered")
    const getData = () => {
        setLoading(true);
        axios.get(`https://0q54sk5m7j.execute-api.us-east-2.amazonaws.com/dev/admin/order/get?status=delivered`,{withCredentials:true})
        .then(res=>{
            if(res.status===200){
                setData(res.data);
                setLoading(false);
            }
        })
    }
    const useE = () => {
        checkLogin();
        getData();
    }
    try{
        useEffect(useE,[]);
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
                onClick={()=>setRenderc("delivered")}
                >
                    Delivered order
                </li>
                <li
                onClick={()=>setRenderc("pending")}
                >
                    Pending order
                </li>
                <li
                onClick={()=>setRenderc("processed")}
                >
                    Processed order
                </li>
                <li
                onClick={()=>setRenderc("ofd")}
                >
                    Out for delivery
                </li>
            </ul>
        </nav>
        {login ?
            renderc==="delivered" ? <DeliveredOrder loading={loading} data={data}/>:''
        : <Redirect to='/' />}
        {login ?
            renderc==="pending" ? <PendingOrder/> :''
        : <Redirect to='/' />}
        {login ?
            renderc==="processed" ? <ProcessedOrder/>:''
        : <Redirect to='/' />}
        {login ?
            renderc==="ofd" ? <OutForDelivery getDelivereryData={getData}/>: ''
        : <Redirect to='/' />}

        </>
    )
}