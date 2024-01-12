import React from 'react';
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
import { removingUnderscoore } from '../../costoumHoks/removingUnderscoore';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row({ row ,tHead,index,DataItems,removeEl,cb}){
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  let updatedTHead
  if(removeEl){
    updatedTHead=tHead?.filter((_,i)=>i!=removeEl)
  }else{
    updatedTHead=tHead
  }

  return (
    <>
      <TableRow onClick={()=>{cb && cb(row?._id)}} className={classes.root}>
        <TableCell  style={{padding:'8px 0'}}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell >
        {
          tHead?.map((property)=>{
            if(property=='No'){
             return <TableCell style={{padding:'8px 0'}} align="left" >{index+1}</TableCell>
            }else if(updatedTHead?.some(e=>e==property )||updatedTHead?.some(e=> e.name==property )){
             return <TableCell style={{padding:'8px 0'}} align="left" >{row[property]}</TableCell>
            }
          })
        }
      </TableRow>
      <TableRow>
        <TableCell style={{ padding:'0'}}  colSpan={20}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
              </Typography>
                  <div>
                   <DataItems id={row?._id}/>
                  </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function DataTable({tHead,dataField,DataItemsCmp,removeOneEle,cb}){

  let updatedTHead
  if(removeOneEle){
    updatedTHead=tHead?.filter((el,i)=> i!=removeOneEle )
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
            {dataField?.map((dataField,i) => (
               <Row key={dataField?._id} row={dataField} tHead={tHead} index={i} DataItems={DataItemsCmp} removeEl={removeOneEle} cb={cb} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}