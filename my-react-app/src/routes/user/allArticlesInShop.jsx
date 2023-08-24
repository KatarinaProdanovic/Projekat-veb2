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
import TextField from '@mui/material/TextField';
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
import { purple } from '@mui/material/colors';
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
  


export default function DisplayAllArticleInShop() {
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');
const [comment, setComment] = useState('');
    const myUser = useSelector(state => state.user.user);
    const [selectedRow, setSelectedRow] = useState(null);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const { sendRequest, isLoading } = useHttp()
    const [addressError, setAddressError] = React.useState('');
    const [page, setPage] = useState(0);
    const [orderItem, setOrderItem] = useState([]);

    const [sumPrice, setSumPrice] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
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

  const [selectedRows, setSelectedRows] = useState([]);
  const [vr, setVr] = useState([]);
  const [quantityMap, setQuantityMap] = useState({});
  
  const handleCheckboxChange = (e, id) => {

    const isChecked = e.target.checked;
    console.log(id)
    console.log(isChecked)
    if (isChecked) {
        setVr(prevSelectedValues => [...prevSelectedValues, id]);
      setSelectedRows([...selectedRows, id.id]);
    
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id.id));
      setVr(prevSelectedValues => prevSelectedValues.filter(rowId => rowId !== id));
    }
  };
  
  const handleQuantityChange = (e, id) => {
     if (vr.some(row => row.id === id)) {
    const newQuantityMap = { ...quantityMap };
    newQuantityMap[id] = parseInt(e.target.value);
    setQuantityMap(newQuantityMap);
    const totalPrice = vr.reduce((total, row) => {
      if (newQuantityMap[row.id] !== undefined) {
        return total + newQuantityMap[row.id] * row.price;
      }
      return total;
    }, 0);
    setSumPrice(totalPrice)

  }
  };
  
  const handleOrder = async () => {
    console.log(vr)
    console.log(quantityMap)
    const newOrderItems = vr.map(row => {
        
      setSumPrice()
       
          return {
            ProductId: row.id,
            SellerId: row.sellerId,
            Quantity: quantityMap[row.id],
            ProductName: row.productName,
            Price: row.price,
          };
        
       // Handle cases where no matching item is found
      }).filter(item => item !== null);
     
    try {
        const baseURL = process.env.REACT_APP_URL;
        const endpoint = '/orders/saveOrder';
       
     
        const requestConfigForExternalUser1 = {
          url: `${baseURL}${endpoint}`,
          method: 'POST',
        
          body: JSON.stringify({
            
            Comment: comment,
            Address: address,
            UserId: myUser.id,
            OrderItem : newOrderItems
          
          }),
         headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
  
       
        console.log(requestConfigForExternalUser1);
        
        if (address.length < 5) {
          setAddressError('Incorrect address');
        } else {
          setAddressError('');
        }
        if(address.length !== 0){
          const dataExternalUser = await sendRequest(requestConfigForExternalUser1)
       console.log(dataExternalUser)
        if(dataExternalUser !== null){
         //tu mi je vracen ceo objekat korisnika koji je 
         
          if(dataExternalUser.message === "NEMA DOVOLJNO"){
            setMessage("There are no items as selected")
            setOpen(true);
          }
          else{
            setMessage( "You have successfully ordered your products");
            setOpen(true);
            setComment("")
            setAddress("")
            dispatch(setArticle(dataExternalUser))
            setVr([])
            setQuantityMap({})
            setSelectedRows([])
            setSumPrice(0)
          }
         
          
        
          
        }
      }
  
      } catch (error) {
        console.log('failed', error)
      }
  
    
  };
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
        const endpoint = `/products/all`;
       
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
            const endpoint = `/products/delete/${id}`;
           
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  
  return (

    <React.Fragment>
      
    <TableContainer sx={{ maxHeight: 700 }}>
      <h1>All articles</h1>
      <Paper
      component="form"
      sx={{  display: 'flex', width: 200, marginLeft : '900px', marginBottom: '20px' }}
    >
      
     
    </Paper>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Id</TableCell>
            <TableCell align="center">Product name</TableCell>
            <TableCell align="center">Proce</TableCell>
           
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Photo</TableCell>
            <TableCell align="center" sx={{height: '5px'}}>Total for ordering</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(Array.isArray(dataa)) && dataa?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.id} >
              <TableCell align="center">{row.id}</TableCell>
              <TableCell align="center">{row.productName}</TableCell>
              <TableCell align="center">{row.price}</TableCell>
              <TableCell align="center">{row.quantity}</TableCell>
              
              
             
           
          
              <TableCell  align="center">
              <Box>
                <img
                 src={row.photo}
                  alt={`Image 1`}
                  style={{ width: '20px', height: '20px' }}
                />
              </Box>
                
                </TableCell>
             
              
              <TableCell align="left">
            <input
    type="checkbox"
    onChange={(e) => handleCheckboxChange(e, row)}
    checked={selectedRows.includes(row.id)}
    style={{borderColor: "black", marginLeft: "50px"}}
   
  />
       <input
    type="number"
    min="1"
    value={quantityMap[row.id] || ''}
    onChange={(e) => handleQuantityChange(e, row.id)}
    style={{marginLeft : "100px", borderColor : "black"}}
  />
    
        
          </TableCell>
          

            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      <TablePagination 
        
        rowsPerPageOptions={[5,10, 20]}
        component="div"
        count={dataa.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <TextField
  label="Address"
  variant="outlined"
  value={address}
  onChange={(e) => setAddress(e.target.value)}
  fullWidth
  margin="normal"
  error={!!addressError}
  helperText={addressError}

/>
<TextField
  label="Comment"
  variant="outlined"
  value={comment}
  onChange={(e) => setComment(e.target.value)}
  fullWidth
  margin="normal"
/>
<label>The price of your order without postage is: {sumPrice} (postage is calculated after ordering...)</label>
      <Button variant="contained" style={{background: "purple"}} onClick={handleOrder}>
  Order
</Button>
         <Dialog 
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Add new order"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
           {message}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Ok</Button>
              
            </DialogActions>
          </Dialog>
      
    </React.Fragment>
  );
}
