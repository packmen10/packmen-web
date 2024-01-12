import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import useUpperFirstLetter from '../../../../../costoumHoks/useUpperFirstLetter';
import {removingUnderscoore } from '../../../../../costoumHoks/removingUnderscoore';
import {CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useGetPercentFromBomQuery } from '../../../../../store/apiSlice';

const useRowStyles=makeStyles({
  root:{
    '& > *':{
      borderBottom:'unset',
    },
  },
});


function Row({row,tHead,index,DataItems,removeEl,cb,keys}){
  
  const{data:percentData}=useGetPercentFromBomQuery(keys)
console.log(percentData?.data)

  
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  let updatedTHead
  if(removeEl){
    updatedTHead = tHead?.filter((_,i)=>i!=removeEl)
  }else{
    updatedTHead = tHead
  }

  return (
    <>
      <TableRow  onClick={()=>{cb && cb(row?._id)}} className={classes.root}>
        <TableCell style={{padding:'8px 0'}}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            { open? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon /> }
          </IconButton>
        </TableCell>
        {
          tHead?.map((property)=>{
            if(property=='Status'){
              return  <TableCell  style={{padding:'8px 0'}} >
            <div style={{width:'40px',height:'40px'}}>
            <CircularProgressbar styles={buildStyles({textSize:'33px',pathColor:'#347dac',textColor:"#347dac"})} value={percentData?.data*16} text={`${percentData?.data*16}%`} />
            </div>
        </TableCell>
            }
            if(property=='No'){
             return <TableCell  style={{padding:'8px 0'}} align="left" >{index+1}</TableCell>
            }else if(updatedTHead?.some(e=>e==property )||updatedTHead?.some(e=> e.name==property )){
             return <TableCell  style={{padding:'8px 0'}} align="left" >{row[property]}</TableCell>
            }
          })
        }

    </TableRow>
      <TableRow>
        <TableCell style={{paddingBottom:0,paddingTop:0}} colSpan={20}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
              </Typography>
                <div>
                 <DataItems id={row?._id} />
                </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function BomMainTable({tHead,dataField,DataItemsCmp,removeOneEle,cb}){

  console.log(dataField)
  let updatedTHead
  if(removeOneEle){
    updatedTHead=tHead?.filter((el,i)=>i!=removeOneEle)
  }else{
    updatedTHead=tHead
  }

  return (
      <TableContainer  component={Paper} style={{padding:'0 5px',overflowX:'visible'}} >
        <Table  aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              {
                updatedTHead?.map(header=>{
                    return <TableCell style={{padding:'10px 0'}} ><h3>{removingUnderscoore(useUpperFirstLetter(header ))}</h3></TableCell>
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {dataField?.map((dataField,i) =>{
 
              return <Row  row={dataField} tHead={tHead} index={i} DataItems={DataItemsCmp} removeEl={removeOneEle} cb={cb} keys={dataField?._id}/>
            })}
          </TableBody>
        </Table>
      </TableContainer>
  );
}