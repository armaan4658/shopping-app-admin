import  Grid  from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import {ViewProduct} from './viewProduct.js';
import {EditProduct} from './editProduct.js';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
export const Products = ({data,loading,getData}) => {  
    const [response,setResponse] = useState(false);
    const [viewopen, setViewOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [d,setD] = useState([]);
    const [id,setId] = useState([]);
    const getD = (id) => {
        setResponse(false)
        axios.get(`https://0q54sk5m7j.execute-api.us-east-2.amazonaws.com/dev/admin/product/get?id=${id}`,{withCredentials:true})
        .then(res=>{
            if(res.status===200){
                setD(res.data);
                setResponse(true);
            }
        })
    }
    const handleClickViewOpen = (data) => {
        getD(data);
        setViewOpen(true);
    };
    const handleViewClose = () => {
        setViewOpen(false);
    };
    const handleEditOpen = (data) => {
        setId(data);
        setEditOpen(true);
    };
    const handleEditClose = () => {
        setEditOpen(false);
    };

    return(
        <>
            {loading ? <LinearProgress/> : ''}
            <h1 style={{paddingLeft:'20px'}}>Products</h1>
            <Grid style={{
                display:'flex',
                flexWrap:'wrap',
                gap:"50px",
                justifyContent:'center'
            }}>
                {data.map(d=>(
                    <Grid item xs={11} sm={6} md={4} lg={3} xl={4}>
                        <Paper
                        className="products"
                        elevation={5}
                        >
                            <div>
                                <img alt="" width="300" height="350" src={d.thumbnail}/>
                            </div>
                            <h4>{d.name}</h4>
                            <h4>Rs:{d.price}</h4>
                            <div>
                                <IconButton onClick={()=>handleClickViewOpen(d._id)}>
                                    <RemoveRedEyeOutlinedIcon/>
                                </IconButton>
                                <IconButton onClick={()=>handleEditOpen(d._id)}>
                                    <ModeEditOutlineOutlinedIcon/>
                                </IconButton>
                            </div>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            <ViewProduct open={viewopen} handleClose={handleViewClose} d={d} response={response}/>
            <EditProduct open={editOpen} handleClose={handleEditClose} id={id} getData={getData}/>
        </>
    )
}