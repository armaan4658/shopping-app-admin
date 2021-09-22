import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import  Grid  from '@mui/material/Grid';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function EditProduct({open,handleClose,id,getData}) {
  const [loading,setLoading] = React.useState(false);
  const validationSchema = Yup.object().shape({
      name : Yup.string().optional(),
      thumbnail: Yup.string().optional(),
      price: Yup.string().optional()
  })

  const {
      register,
      handleSubmit,
      formState: {errors}
  } = useForm({resolver:yupResolver(validationSchema)})

  const onSubmit = (data) => {
        setLoading(true);
        const {name,thumbnail,price} = data;
        const body = {
            name,
            thumbnail,
            price : price.length > 0 ? parseInt(price) : price
        }
        axios.patch(`https://0q54sk5m7j.execute-api.us-east-2.amazonaws.com/dev/admin/product/update/${id}`,body,{withCredentials:true})
        .then(res=>{
            if(res.data.message==="green"){
                getData();
                setLoading(false);
                handleClose();
            }
        })
  }
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Grid style={{
            display:'grid',
            placeItems:'center'
        }}>
            <form onSubmit={handleSubmit(onSubmit)} style={{
                display:'grid',
                width:'70%',
                marginTop:'20vh'
            }}>
                {loading ? <LinearProgress/> : ''}
                <TextField
                label="Update product name"
                variant="filled"
                color="primary"
                {...register("name")}
                />
                {errors.name && (<p> {errors.name.message} </p>)}
                <TextField
                label="Update thumbnail"
                variant="filled"
                color="primary"
                {...register("thumbnail")}
                />
                {errors.thumbnail && (<p> {errors.thumbnail.message} </p>)}
                <TextField
                label="Update product price"
                variant="filled"
                color="primary"
                type="number"
                {...register("price")}
                />
                {errors.price && (<p> {errors.price.message} </p>)}
                <Button
                type="submit"
                variant="outlined"
                color="primary"
                >
                    Update
                </Button>
            </form>
        </Grid>
      </Dialog>
    </div>
  );
}
