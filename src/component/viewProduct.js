import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import  Grid  from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function ViewProduct({open,handleClose,d,response}) {


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
        <Grid className="data">
            <Paper elevation={5} style={{
              display:'grid',
              alignItems:'center',
              marginTop:'5vh',
              backgroundColor:'grey',
              padding:'15% 0'
            }}>
                <img alt="" style={{objectFit:'contain'}}  width="355px" height="213px" src={d.thumbnail}/>
            </Paper>
            <Divider/>
            <h2>{d.name}</h2>
            <h2>price : {d.price}</h2>
            <Divider/>
            <div>
              {response ?
              (<ul>
                  {d.description.map(ele=>(
                      <>
                        <li> <h5>color: {ele.color}</h5> </li>
                        <li> <h5>size 40</h5> </li>
                        <li> <h5>size 41</h5> </li>
                        <li> <h5>size 42</h5> </li>
                        <li> <h5>size 43</h5> </li>
                        <li> <h5>size 44</h5> </li>
                        <Divider/>
                      </>
                  ))}
              </ul>):''}
            </div>
            
        </Grid>
      </Dialog>
    </div>
  );
}
