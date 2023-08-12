import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react';
import useHttp from '../../requests-service/useHttp';
import { useSelector, useDispatch } from 'react-redux'
import { setSeller } from '../../store/sellers/actions';
import { Clear, Title } from '@mui/icons-material';
import TablePagination from '@mui/material/TablePagination';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { setSelleer } from '../../store/sellers/actions';

import { setVerif } from '../../store/sellers/actions';
// Generate Order Data
function createData(id, email, name, surname, adress, isVerified) {
  return {id, email, name, surname, adress, isVerified };
}



// console.log(currentQuestion[0]?.Description); 

function preventDefault(event) {
  event.preventDefault();
}

 function Sellers() {




  const navigate = useNavigate();
    const [showAlert, setShowAlert] = React.useState(false);
    const sellers = useSelector(state => state.sellers);
    const dispatch = useDispatch();
    const sel = sellers.sellers;
   
    
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { sendRequest } = useHttp()

    


    const rows1 =sel?.filter(item => item.isVerified === "InProcessing").map((item, index) => {
    
        return createData(item?.id, item?.email,item?.name, item?.surname, item?.adress, item?.isVerified ); // Pozivamo funkciju createData s objektom
      });

      const odobreni =sel?.filter(item => item.isVerified === "Approved").map((item, index) => {
    
        return createData(item?.id, item?.email,item?.name, item?.surname, item?.adress, item?.isVerified ); // Pozivamo funkciju createData s objektom
      });
      


      async function setSel1(){
   

        try {
            const baseURL = process.env.REACT_APP_URL;
            const endpoint = '/selers/allSeller';
          
            const requestConfigForExternalUser = {
              url: `${baseURL}${endpoint}`,
              method: 'GET',
              body: null,
              headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + localStorage.getItem("token")
              }
            }
            const token = await sendRequest(requestConfigForExternalUser)
            
            if(token !== null){
             console.log(token)
             dispatch(setSelleer(token))
                
            
                
            
              
              
              
              
              
            
            
            } } catch (error) {
                console.log('failed', error)
              }
     
       
      };

    useEffect(() => {
        
       
           
            
         
          
             
        /*
           fetch('/api/Artikli')
           .then((response) => response.json())
           .then((actualData) => {dispatch(updateItems(actualData)); dispatch(updateItems1(actualData))});
     
           setChe(true) */
        
       }, [])

       const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

      async function approveSeller(id) {
       
        try {
          const baseURL = process.env.REACT_APP_URL;
          const endpoint = '/selers/update';
          console.log(id.id)
          const requestConfigForExternalUser = {
            url: `${baseURL}${endpoint}`,
            method: 'PUT',
            body: JSON.stringify({
          
                Id: id.id,
                Email : id.email,
                Name : id.name,
                Surname : id.surname,
                Adress : id.adress,
                IsVerified : "Approved"


             
              
                
              }),
            headers: {
              'Content-Type': 'application/json',
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          }
          const token = await sendRequest(requestConfigForExternalUser)
      
          if (token !== null) {
            console.log(token);
            setSel1()
          }
        } catch (error) {
          console.log('failed', error);
        }
       
       
        setShowAlert(true);
      };



      async function reffuseSeller (id) {
        
        try {
            const baseURL = process.env.REACT_APP_URL;
            const endpoint = '/selers/update';
        
            const requestConfigForExternalUser = {
              url: `${baseURL}${endpoint}`,
              method: 'PUT',
              body: JSON.stringify({
            
                  Id: id.id,
                  Email : id.email,
                  Name : id.name,
                  Surname : id.surname,
                  Adress : id.adress,
                  IsVerified : "Rejected"
  
 
                }),
              headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + localStorage.getItem("token")
              }
            }
            const token = await sendRequest(requestConfigForExternalUser)
        
            if (token !== null) {

              console.log(token);
              setSel1()

            }
          } catch (error) {
            console.log('failed', error);
          }
          dispatch(setVerif(false))
        setShowAlert(true);
        console.log(id)
        
      };
      
  const handleAlertClose = () => {
    //window.location.reload();
    setShowAlert(false);
   
  };
  console.log(rows1)
  if(rows1 !== undefined &&  rows1 !== null ){
  return (
    <>
     <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
     <React.Fragment>
          <div>
      {showAlert && (
        <Alert severity="success" onClose={handleAlertClose}>
          <AlertTitle>Success</AlertTitle>
         Succes changed seller status
         
        </Alert>
      )}
    </div>
    <h2>Sellers on hold</h2>
    <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Email</TableCell>
           
            <TableCell>Name</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Status </TableCell>
            <TableCell> </TableCell>
           
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows1.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.id}>
            <TableCell>{row.id}</TableCell>
              <TableCell>{row.email}</TableCell>
             
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.surname}</TableCell>
              <TableCell>{row.adress}</TableCell>
              <TableCell>{row.isVerified}</TableCell>
              <TableCell>
              <IconButton onClick={() => approveSeller(row)}>
              <CheckCircleOutlineIcon />
            </IconButton>
            <IconButton onClick={() => reffuseSeller(row)}>
              <ClearIcon />
            </IconButton>
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows1?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
     
    </React.Fragment>
                    </Paper>
 <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', marginTop: '40px' }}>
     <React.Fragment>
    
<h2>Approved sellers</h2>
<Table size="small">
   <TableHead>
     <TableRow>
       <TableCell>Id</TableCell>
       <TableCell>Email</TableCell>
      
       <TableCell>Name</TableCell>
       <TableCell>Surname</TableCell>
       <TableCell>Address</TableCell>
       <TableCell>Status </TableCell>
      
      
       
     </TableRow>
   </TableHead>
   <TableBody>
     {odobreni.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
       <TableRow key={row.id}>
       <TableCell>{row.id}</TableCell>
         <TableCell>{row.email}</TableCell>
        
         <TableCell>{row.name}</TableCell>
         <TableCell>{row.surname}</TableCell>
         <TableCell>{row.adress}</TableCell>
         <TableCell>{row.isVerified}</TableCell>
         <TableCell>
       
       
         </TableCell>
         
       </TableRow>
     ))}
   </TableBody>
 </Table>
 <TablePagination
   rowsPerPageOptions={[10, 25, 100]}
   component="div"
   count={rows1?.length}
   rowsPerPage={rowsPerPage}
   page={page}
   onPageChange={handleChangePage}
   onRowsPerPageChange={handleChangeRowsPerPage}
 />

</React.Fragment>
</Paper>
</>
  );
}}
export default Sellers;