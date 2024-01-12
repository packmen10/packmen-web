import React, {useRef,useState} from 'react'
import {useAddNewInvoiceMutation, useGetInvoiceSideTextQuery, useGetAllSellersQuery, useGetStoreItemsForInvoiceQuery } from '../../store/apiSlice'
import InvoiceTable from './InvoiceTable'
import useUpperFirstLetter from '../../costoumHoks/useUpperFirstLetter'
import {useDispatch,useSelector} from 'react-redux'
import {removingUnderscoore} from '../../costoumHoks/removingUnderscoore'
import {addFields,invoiceItem,cancelUdatedState} from '../../store/invoiceSlice'
import {Button,FormControl,InputLabel,MenuItem,Select,TextField} from '@material-ui/core'

const InvoiceController = () => {
  const [seller, setseller] = useState('');
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const{data}=useGetInvoiceSideTextQuery()
  const invoiceFields=useSelector(state=>state.invoiceSliceReducer.invoiceItem)
/*const isAddItems= useSelector(state=>state.invoice_table_item.table_or_addItems)*/

  const{data:sellers}=useGetAllSellersQuery()
  const dispatch=useDispatch()
  const[inputEl,setInputEl]=useState('')
  const inptEl=useRef(null)
  
  const[addNewInvoice,{error}]=useAddNewInvoiceMutation()

  const handleCreateInvoice=()=>{
      addNewInvoice(invoiceFields)
      dispatch(cancelUdatedState(invoiceItem))
      if(inptEl.current) inptEl.current.value=' '
      setInputEl(' ')
  }

  const handleCancel=()=> dispatch(cancelUdatedState(invoiceItem))
  return (
    <div className="right-side-invoice-controller" >
          <div className="left-side">
            <InvoiceTable invoiceItems={data?.data}/>
          </div>
          <div className="creating-invoice-section">
          <div className="right-side">
          <h3>Create New Invoice</h3>
          <div className="all-input-fields">
          <div className="input-field seller">
                <FormControl  style={{width:"100%",marginTop:"3px",marginBottom:'3px'}}>
                   <InputLabel style={{fontSize:"14px"}} id="demo-controlled-open-select-label">Supplier</InputLabel>
                   <Select
                     labelId="demo-controlled-open-select-label"
                     id="demo-controlled-open-select"
                     open={open}
                     onClose={handleClose}
                     onOpen={handleOpen}
                     value={seller}
                     onChange={(event)=>{
                       setseller(event.target.value);
                       dispatch(addFields({
                         field:'sellers',
                         val:event.target.value
                       }))
                     }}
                     placeholder='Select one'>
                     {
                        sellers?.data.map((seller,i)=>{
                          return <MenuItem key={i*34} value={seller._id}>{removingUnderscoore(seller.name) }</MenuItem>
                        })
                     }
                   </Select>
                </FormControl>
          </div>
            {
              data?.data.filter(item=>item.name!="seller"&&item.name!="items"&&item.name!="total_price").map((item,i)=>{
                return(
                  <div  style={{marginTop:"3px",marginBottom:'3px'}} className={`input-field ${item.name}`} key={i}>
                    <TextField
                    style={{width:"100%"}}
                    name="someDate"
                    label={removingUnderscoore(useUpperFirstLetter(item.name))}
                    InputLabelProps={{ shrink: true, required: true }}
                    type={item.type}
                    value={invoiceFields[item.name]}
                    onChange={(e)=>{
                      dispatch(addFields({
                        field:item.name,
                        val:e.target.value
                      }))
                    }}
                    />
                  </div>
                )
              })
            }
          </div>
          <div className="invoice-btns">
                <Button onClick={handleCreateInvoice} variant="text">Create</Button>
                <Button onClick={handleCancel} variant="text">Cancel</Button>
          </div>
          </div>
          </div>

    </div>
  )
}
export default InvoiceController
