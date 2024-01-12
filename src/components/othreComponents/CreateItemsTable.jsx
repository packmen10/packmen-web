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
import useUpperFirstLetter from '../../costoumHoks/useUpperFirstLetter';
import { Button, TextField } from '@material-ui/core';
import { removingUnderscoore } from '../../costoumHoks/removingUnderscoore';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row({ row ,tHead,index,updateItem,deleteItem}) {
  const tableH=tHead?.slice(0,5)
  const [open, setOpen] = React.useState(false)
  const classes = useRowStyles()

  const[item,setItem]=useState({...row})
  const handleChange=(key,val)=>{
      setItem(pre=>({...pre,[key]:val}))
  }
  
  const handleUpdate=()=>{
    updateItem({id:row?._id,...item})
  }

  const btnStyle={
    textTransform:'none',
    width:"100px",
  }

  return (
    <>
      <TableRow className={classes.root} >
        <TableCell style={{padding:'8px 0'}}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {
          (()=>{
            let tableBody=[]
            for(let key in row){
                if(key=='_id'){
                    tableBody.push(<TableCell style={{padding:'8px 0'}} align="left" >{index+1}</TableCell>)
                }else if(tableH?.some(e=>e==key )||tableH?.some(e=> e.name==key )){
                    tableBody.push(<TableCell style={{padding:'8px 0'}} align="left" >{row[key]}</TableCell>)
                }
            }
            return tableBody
          })()
        }
      </TableRow>
      <TableRow>
        <TableCell style={{ padding:'0'}} colSpan={6} >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
              </Typography>
                    <div className="create-section flex column align-st"
                          style={{
                              width:"100%",
                              gap:"6px",
                              padding:'6px',
                              borderRadius:"5px",}}>
                        <div className="input-fields input-fields-Create-items-Table flex justify-sb" style={{gap:"10px",width:"100%",flexWrap:'wrap'}} >
                            {
                                tHead?.map((el)=>{
                                    if(el=='No') return
                                    return <TextField
                                    value={item[el]}
                                    className={`dfg ${el}`}
                                    id="outlined-basic"
                                    onChange={(e)=>handleChange(el,e.target.value)}
                                    label={removingUnderscoore(useUpperFirstLetter(el))}
                                    InputLabelProps={{ shrink: true, required: true }}
                                    inputProps={{
                                      style: {
                                        height: "20px",
                                        padding: '15px 14px',
                                        width:"225px"
                                      }}} variant="standard" />
                                })
                            }
                        </div>
                        <div className="btn-section normel_cmp flex justify-cen" style={{gap:"5px",width:'100%'}}>
                              <Button onClick={()=>{
                                deleteItem(row?._id)
                              }}  style={btnStyle}>Delete</Button>
                              <Button onClick={()=>{
                                handleUpdate()
                              }}  style={btnStyle}>Update</Button>
                        </div>
                    </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function CreateItemsTable({tHead,dataField,updateItem,deleteItem}) {
  const tableH=tHead?.slice(0, 5)
  
  return (
      <TableContainer component={Paper} style={{padding:'0 5px'}} >
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              {
                tableH?.map(header=>{
                    return <TableCell style={{padding:'10px 0'}} ><h3>{useUpperFirstLetter(header)}</h3></TableCell>
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {dataField?.map((dataField,i) => (
               <Row key={dataField?._id} row={dataField} tHead={tHead} index={i} updateItem={updateItem} deleteItem={deleteItem} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}