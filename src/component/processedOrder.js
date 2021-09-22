import axios from 'axios';
import { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
export const ProcessedOrder = () => {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const getData = () => {
        setLoading(true);
        axios.get(`https://0q54sk5m7j.execute-api.us-east-2.amazonaws.com/dev/admin/order/get?status=processed`,{withCredentials:true})
        .then(res=>{
            if(res.status===200){
                setData(res.data);
                setLoading(false);
            }
        })
    }
    try{
        useEffect(getData,[]);
    }catch(e){
        console.log(e);
    }
    const columns = [
        { id: 'orderId', label: 'Order\u00a0Id', minWidth: 170 },
        {
          id: 'status',
          label: 'Status',
          minWidth: 170,
          align: 'right',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'address',
          label: 'Address',
          minWidth: 170,
          align: 'right',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'total',
          label: 'Total',
          minWidth: 170,
          align: 'right',
          format: (value) => value.toFixed(2),
        },
        { id: 'changeStatus', label: 'Change\u00a0Status', minWidth: 170 }
    ];
    function createData(orderId, status, address, total,changeStatus) {
        return { orderId, status, address, total ,changeStatus};
    }
    const rows = data.map(d=>createData(d._id,d.status,d.address,d.total,"changeStatus"));

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const updateStatus = (id) => {
        setLoading(true);
        const update = {
            status:"delivery"
        }
        axios.patch(`https://0q54sk5m7j.execute-api.us-east-2.amazonaws.com/dev/admin/order/update/${id}`,update,{withCredentials:true})
        .then(res=>{
            if(res.data.message==="green"){
                setLoading(false);
                getData();
            }
        })
    }
    return(
        <>
            {loading ? <LinearProgress/> : ''}
            <h1>Processed orders</h1>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                            {columns.map((column) => {
                              const value = row[column.id];
                            
                              return (
                                    value !=="changeStatus" ? (
                                          <TableCell key={column.id} align={column.align}>
                                              {column.format && typeof value === 'number' 
                                                ? column.format(value)
                                                : value}
                                            </TableCell>
                                    ) : (
                                        <TableCell key={column.id} align={column.align}>
                                            <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={()=>updateStatus(row.orderId)}
                                            >Out for delivery</Button>
                                        </TableCell>
                                    )
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
        </>
    )
}