import React, { useState } from 'react'
import {   useGetAllPoQuery, useGetInvoiceQuery,  useGetInvoiceSideTextQuery,  useGetSellersQuery, useGetStoreItemsQuery, useGetStoretemBySearchQuery, useUpdateInvoiceMutation, useUpdateStoreItemStockMutation } from '../../store/apiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { removingUnderscoore } from '../../costoumHoks/removingUnderscoore';
import useUpperFirstLetter from '../../costoumHoks/useUpperFirstLetter';

import { addNewItem, changeSearchString, } from '../../store/addItemsIntoAnInvoice';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';


export const InvoiceDetailes = ({id}) => {
    const{data:itemsData}= useGetStoreItemsQuery()

    function removeDuplicateObjectStrings(array){
        /* console.log(array) */
        let newArray = [];
        let uniqueObject = {};
        for (let i in array){
          let objTitle = array[i]?.item
          uniqueObject[objTitle] = array[i];
        }
        for (let i in uniqueObject) {
          newArray.push(uniqueObject[i]);
        }
        return newArray
    }

    const convertStringInToItemName=(itemId)=>{
      return itemsData?.data?.find(item=>item?._id==itemId)?.name
    }

    const [po,setPo]=useState({po_no:'',po_date:''})
    const [updatedItems,setUpdatedItems]=useState([])
    const itemsInvoice=useSelector(state=>state.itemsInvoice)
    const {data:poData}=useGetAllPoQuery()

    /* storeStates.invoiceDetailes */
    /*const{data:searchedItems}=useGetStoretemBySearchQuery(itemsInvoice?.searchString) */
    const{data:invoice}=useGetInvoiceQuery(id)
    const {data:invoiceTextData}=useGetInvoiceSideTextQuery()

    const[updateInvoice]=useUpdateInvoiceMutation()
    const[updateStock]=useUpdateStoreItemStockMutation()
    const{data:sellerData}=useGetSellersQuery(invoice?.data?.sellers)
    const{data:storeItems}=useGetStoreItemsQuery()
    const dispatch=useDispatch()

    const getItems=()=>{
        return storeItems?.data?.map((el)=>{
            if(invoice?.data?.items?.some((itEl)=>itEl.item==el._id)){
                return {...el,...invoice?.data?.items?.find((iEl)=>iEl.item==el._id)} 
            }
        })?.filter((ite)=>ite)
    }

    const botomTable=[
        {name:'No',type:''},
        {name:'name',type:'text'},
        {name:'hsn_code',type:'number'},
        {name:'description',type:'text'},
        {name:'quantity',type:'number'},
        {name:'rate',type:'number'},
        {name:'total',type:'number'}
    ]

    const handlePassData=(data)=>{
        const item=JSON.parse(data)
       if(invoice?.data?.items?.every(el=>el.item!=item?.item)){
       dispatch(addNewItem({item:item?.item,quantity:1,rate:0}))
        updateInvoice({id,items:[...invoice?.data?.items,{...item,rate:0}]})
       }
       dispatch(changeSearchString(''))
    }

    const handleChangeItems=(updatedValue,selectedItem,key)=>{
        if(updatedItems?.every(el=>el.item!=selectedItem.item)){
            const {item,quantity,rate}=selectedItem
            setUpdatedItems(pre=>( [...pre,{item,quantity,rate,[key.name]: +updatedValue ? +updatedValue:' '}]))
        }else{
            const updatedVal={item:selectedItem.item,[key.name]:updatedValue ? +updatedValue:' '}
            setUpdatedItems(pre=>{
                return pre?.map(updatedItems=>{
                    if(updatedItems?.item==updatedVal.item){
                        return {...updatedItems,...updatedVal}
                    }else{
                        return updatedItems
                    }
                })
            })
        }
    }
/* console.log(removeDuplicateObjectStrings(poData?.data?.find(po=> po?.po_no==poNo)?.items)) */
    const handleUpdate=()=>{
        const updatedItemss= invoice?.data?.items?.map(el=>{
            if(updatedItems?.some(e=>e.item==el.item)){
                return updatedItems?.find(e=>e.item==el.item)
            }else{
                return el
            }
        })
        if(updatedItemss.length>0){
         updateInvoice({id,items:updatedItemss,...po})   
         updateStock({updatedInvoice:invoice?.data?._id})
        }
    }
/*     console.log(poData?.data?.find(po=> po?.po_no==po?.po_no)) */

   return(
    <div className="invoiceDetailes">
        <div className="description flex ">

            {invoiceTextData?.data?.map(fieldName=>{
                    if(/^(invoice_date|dispathced_through|destination|invoice_no)$/.test(fieldName?.name)){
                       return <TextField value={invoice?.data[fieldName?.name]} InputLabelProps={{shrink:'true',require:'true'}} label={removingUnderscoore(useUpperFirstLetter(fieldName?.name))} />
                    } 
            })}
            {invoice?.data?.isCreated&&(
                <>
                    <TextField value={invoice?.data?.po_number} InputLabelProps={{shrink:'true',require:'true'}} label={'Po no'} />
                    <TextField value={invoice?.data?.po_date} InputLabelProps={{shrink:'true',require:'true'}} label={'Po date'} />
                </>

            )}
            {!invoice?.data?.isCreated&&(
                <>
                    <FormControl style={{width:'20%'}} variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Po no</InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={po?.po_number}
                          onChange={(e)=>{
                            const selectedPo=JSON.parse(e.target.value)
                            setPo({po_number:selectedPo?.po_no,po_date:selectedPo?.date})
                          }}
                          label="Age"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {
                            poData?.data?.map(po=>{
                                return <MenuItem value={JSON.stringify(po)}>{po?.po_no}</MenuItem>
                            })
                          }
                        </Select>
                    </FormControl>

                    <FormControl style={{width:'20%'}} variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Item</InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={''}
                          onChange={(e)=>handlePassData(e.target.value)}
                          label="Age"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                        {
                            removeDuplicateObjectStrings(poData?.data?.find(pos=> pos?.po_no==po?.po_number)?.items)?.map(item=>{
                             return  <MenuItem value={JSON.stringify(item)}>{convertStringInToItemName(item?.item)}</MenuItem>
                            })
                        } 

                        </Select>
                    </FormControl>
                </>
            )}


        </div>
        <div className="bottomside">
            <h3 style={{textAlign:'start'}}>Items</h3>
             <div className="add-new-items">

        {/* {!invoice?.data?.isCreated&&(<input placeholder='Search' type="search" value={itemsInvoice?.searchString} onChange={(e)=>dispatch(changeSearchString(e.target.value))} />)} 
                <ul style={{zIndex:"1",maxHeight:'150px',overflow:'auto'}}>
                    {
                        searchedItems?.data?.map((el)=>{
                            return <li key={el._id} onClick={()=>handlePassData(el)} >{el?.name}</li>
                        })
                    }
            </ul>*/}

            </div>
            <div className="items">
                    <div className="custom-table">
                        {
                            botomTable?.map((el,i)=>{
                                return <div key={i*75} className="head-el"><p>{removingUnderscoore(useUpperFirstLetter(el?.name))}</p></div>
                            })
                        }
                        {
                            getItems()?.map((el,i)=>{
                                return botomTable?.map((e)=>{
                                    const selectedItems=updatedItems?.find(ell=>ell?.item==el?.item) || {}
                                    if(e.name=='No'){
                                        return <div key={i*123} className="body-el"><p>{i+1}</p></div>
                                    }
                                    if(/* e.name=='quantity'|| */e.name=='rate'){
                                        return <div key={i*12} className="body-el"><input key={i} disabled={invoice?.data?.isCreated} onChange={(eVal)=>handleChangeItems(eVal.target.value,el,e)}  type={e.type} value={selectedItems[e.name] || el[e.name]} /></div>
                                    }
                                    if(e.name=='total'){
                                        return <div key={i*32} className="body-el"><p>{selectedItems?.quantity*selectedItems?.rate || el?.quantity*el?.rate}</p></div>
                                    }
                                    return <div key={i*2} className="body-el"><p>{el[e.name]}</p></div>
                                })
                            })
                        }
                    </div>
                    <div className="finish-btn">
                        <Button style={{height:""}} variant="contained" disabled={invoice?.data?.isCreated} onClick={handleUpdate}>Finish</Button>
                    </div>
            </div> 
        </div>
    </div> 
  )
}
