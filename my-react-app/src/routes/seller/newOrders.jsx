import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import IconButton from '@mui/material/IconButton';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


import { useDispatch } from "react-redux";

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { setArticle } from '../../store/article/actions';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import LayersIcon from '@mui/icons-material/Layers';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import useHttp from '../../requests-service/useHttp';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { Button, Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
export const HorizIcon = styled(EditIcon)({
  fill: "#EB274E"
});


export const MyProductIcon = styled(LayersIcon)({
    fill: "#EB274E"
  });
export const DeleteIcon = styled(DeleteOutlineIcon)({
  fill: "#EB274E"
});




function preventDefault(event) {
  event.preventDefault();
}


const Transition = React.forwardRef(function Transition(
    props,
    ref,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  


export default function DisplayNewOrdersForSeller() {
    const myUser = useSelector(state => state.user.user);
    const [selectedRow, setSelectedRow] = useState(null);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const { sendRequest, isLoading } = useHttp()
  
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);
    const dateFrom = new Date("");
    const dateTo = new Date("");
    const [filterParams, setFilterParams] = useState({ Search: "" });
    const [buttonClicked, setButtonClicked] = useState(false);
    const [countEffect, setCountEffect] = useState(false);
    const [pageInfo, setPageInfo] = useState({ PageSize: 1, Page: 1 });
    const [dataa, setData] = useState([]);
    const [shows, setShows] = useState([{ id: '0', name: "" }]);
    const [searchInput, setSearchInput] = useState('');
    const [id, setid] = useState({ id: -1 });
    const navigate = useNavigate();
    const myUser1 = useSelector(state => state.articles);
  console.log(myUser1)

   React.useEffect(() => {
 
    setPageInfo({
      PageSize: rowsPerPage,
      Page: page + 1
      
    })

    setFilterParams({
      Search: searchInput,
     
      
    })
   setCountEffect(true)
   
  

  }, [page, rowsPerPage, searchInput])
  React.useEffect(() => {
    allPr()
  
   
 
   }, [open])

  async function allPr(){

    const Id = myUser.id;
    console.log(myUser.id)
    try {
        const baseURL = process.env.REACT_APP_URL;
        const endpoint = `/orders/allForSeller/${Id}`;
       
       /*
        setProductName(data.get('name'))
        setQuantity(data.get('lastName'))
        setDescription( data.get('adresa'))
        setPrice(data.get('email'))
  */
       
        
        const requestConfigForExternalUser1 = {
          url: `${baseURL}${endpoint}`,
          method: 'GET',
        
          body:null,
         headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
  
       
    
       const dataExternalUser = await sendRequest(requestConfigForExternalUser1)
       console.log(dataExternalUser)
        if(dataExternalUser !== null){
         //tu mi je vracen ceo objekat korisnika koji je 
         setData(dataExternalUser)
          
        }
      } catch (error) {
        console.log('failed', error)
      }
  
       
    
  }
 
  
  if(countEffect === true){ 
    setCountEffect(false)
    allPr()
    }
    
 
   
    

    async function deletePr(id) {
      
       
        try {
            const baseURL = process.env.REACT_APP_URL;
            const endpoint = `/orders/delete/${id}`;
           
           /*
            setProductName(data.get('name'))
            setQuantity(data.get('lastName'))
            setDescription( data.get('adresa'))
            setPrice(data.get('email'))
      */
           
            
            const requestConfigForExternalUser1 = {
              url: `${baseURL}${endpoint}`,
              method: 'DELETE',
            
              body:null,
             headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + localStorage.getItem("token")
              }
            }
      
           
        
           const dataExternalUser = await sendRequest(requestConfigForExternalUser1)
           console.log(dataExternalUser)
          
            if(dataExternalUser !== null){
             //tu mi je vracen ceo objekat korisnika koji je 
             setData(dataExternalUser)
              
            }
          } catch (error) {
            console.log('failed', error)
          }
      
           
    }

   
    const handleEdit = async (id) => {
       setButtonClicked(true)
      setSelectedRow(id.id === selectedRow ? null : id.id);
      console.log(id)
      dispatch(setArticle(id))
      navigate("/edit-article")
        
     
  
    };
    const handleDisplayProducts = async (id) => {
      setButtonClicked(true)
          
       
    
      };
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleDelete = async (id) => {
      setButtonClicked(true)
      setid(id)
      setOpen(true);
  
    };
    const handleDeleteProduct = async () => {
      deletePr(id.id)
      setOpen(false)
      
      
      
  
    };
function formatDateAndTime(date) {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    hour12: false, // 24-hour format
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
}

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [remainingTime, setRemainingTime] = React.useState({});
  const [intervals, setIntervals] = React.useState({});
   
  const calculateRemainingTime = (deliveryDate, orderTime) => {
    const now = new Date();
    if (new Date(deliveryDate) < now) {
      return 'Delivered';
    }
  
    const timeSinceOrder = now - new Date(orderTime);
    if (timeSinceOrder < 3600000) {
      return "Not an hour has passed since ordering";
    }
  
    const remainingMilliseconds = new Date(deliveryDate) - now + timeSinceOrder;
  
    const hours = Math.floor(remainingMilliseconds / 3600000);
    const minutes = Math.floor((remainingMilliseconds % 3600000) / 60000);
  
    return `${hours}h ${minutes}min`;
  };
  React.useEffect(() => {
    const intervalIds = {};
  
    dataa.forEach((row) => {
      if (row.deliveryDate && row.orderDate) {
        const intervalId = setInterval(() => {
          setRemainingTime((prevRemainingTime) => ({
            ...prevRemainingTime,
            [row.id]: calculateRemainingTime(row.deliveryDate, row.orderDate),
          }));
        }, 60000);
  
        intervalIds[row.id] = intervalId;
      }
    });
  
    setIntervals(intervalIds);
  
    return () => {
      Object.values(intervalIds).forEach((id) => clearInterval(id));
    };
  }, [dataa]);
  
  
  
  
  
  
  console.log(dataa)
  return (

    <React.Fragment>
      
    <TableContainer sx={{ maxHeight: 900 }}>
      <h1>All articles</h1>
      <Paper
      component="form"
      sx={{  display: 'flex', width: 500, marginLeft : '900px', marginBottom: '20px' }}
    >
      
     
    </Paper>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">ADDRESS</TableCell>
            <TableCell align="center">DELIVERY DATE</TableCell>
            <TableCell align="center">PRICE</TableCell>
           
           
            <TableCell align="left">PRODUCT NAME</TableCell>
            <TableCell align="left"> QUANTITY</TableCell>
            <TableCell align="left"> USER ID</TableCell>
            <TableCell align="left"> COMMENT</TableCell>
            <TableCell align="left"> TIME TO ORDER</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {(Array.isArray(dataa)) && dataa?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.id} onClick={() => handleEdit(row)} style={selectedRow === row.id ? { backgroundColor: "#f2f2f2" } : {}}>
              <TableCell align="center">{row.address}</TableCell>
              <TableCell align="center">{formatDateAndTime(new Date(row.deliveryDate))}h</TableCell>
              <TableCell align="center">{row.price}</TableCell>
              <TableCell align="right">
            {row?.orderItems.map((item) => (
               
               <TableRow align="right"> &nbsp;&nbsp;&nbsp;&nbsp; {item.productName}</TableRow>
             
              ))}
</TableCell>
<TableCell align="center">
            {row?.orderItems.map((item) => (
               
               <TableRow align="center" > &nbsp;&nbsp;&nbsp;&nbsp;{item.quantity}</TableRow>
             
              ))}
</TableCell>
<TableCell align="center">
            
               
               <TableRow align="center" > &nbsp;&nbsp;&nbsp;&nbsp;{row.userId}</TableRow>
             
            
</TableCell>
             
<TableCell align="center">
            
               
            <TableRow align="center" > &nbsp;&nbsp;&nbsp;&nbsp;{row.comment}</TableRow>
          
         
</TableCell>
          
<TableCell align="center">
              {remainingTime[row.id] || ''}
            
</TableCell>
               
          
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      <TablePagination 
        
        rowsPerPageOptions={[2, 5, 20]}
        component="div"
        count={dataa?.length || 1}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Notification"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          Are you certain you wish to cancel the order?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDeleteProduct}>Yes</Button>
        </DialogActions>
      </Dialog>
      
    </React.Fragment>
  );
}
