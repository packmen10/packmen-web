import React,{useState} from 'react'
import {useGetStoreItemsForInvoiceQuery } from '../../store/apiSlice'
import {removingUnderscoore} from '../../costoumHoks/removingUnderscoore'
import useUpperFirstLetter from '../../costoumHoks/useUpperFirstLetter'
import { AiFillDelete } from "react-icons/ai";

import { manageStatus } from '../../store/invoiceTable_Item';
import { useDispatch, useSelector } from 'react-redux';
import { addNeItem } from '../../store/invoiceSlice';
import { BiChevronLeft } from 'react-icons/bi';

const AddItemsInToInvoice = () => {

    const [inputField,setField]=useState('')
    
    const{data:storeItemsAll}=useGetStoreItemsForInvoiceQuery()
    const{data:storeNames}=useGetStoreItemsForInvoiceQuery()
    const SelectedItems=useSelector(state=>state.invoiceSliceReducer.invoiceItem.items)
    const dispatch=useDispatch()
    const[items,addItems]=useState([])
    
    const handleAddNewItem=(id)=>{
        setField('')
        addItems(pre=>{
            if(pre.every((el)=>el.itemsid!=id)&&SelectedItems.every((el)=>el.itemsid!=id))
            return[...pre,{itemsid:id,quantity:1,rate:0}]
            return pre
        })
    }

    const addAnotherField=(id,key,vl)=>{
        return addItems(pre=>{
            return pre.map(el=>{
                if(el?.itemsid==id&&vl>=1){
                   return {...el,[key]: +vl}
                }else{
                    if(key=='rate'&&el?.itemsid==id&&vl<1||key=='quantity'&&el?.itemsid==id&&vl<1){
                        return {...el,[key]:''}
                    }else{
                       return el
                    }
                }
            })
        })
    }

    const removeItems=(id)=> addItems(pre=>pre.filter(item=>item.itemsid!=id))

    const handleSave=()=>{
        items.length>0 && items.every(el=>el.rate>0) &&(
            dispatch(addNeItem(items)),
            dispatch(manageStatus(false))
        )
    }

    const handleBack=()=>{
        addItems([])
        dispatch(manageStatus(false))
    }

  return (
    <div className="add-items-in-invoice">
        <button onClick={()=>handleBack()} className='go-back'><BiChevronLeft/></button>
        <div className="addItems">
            <input  value={inputField} onChange={(e)=>setField(e.target.value)}  type="search" placeholder='Search' />
            <ul id='slecting-items' >
                {
                    resultItems?.data?.map((item,i)=>{
                        return(
                            <li onClick={()=> handleAddNewItem(item._id) } >{removingUnderscoore(useUpperFirstLetter(item?.name))}</li>
                        )
                    })
                }
            </ul>
            <div className="selectedItems">
                <ul>
                    {
                    items?.map((ite,i,arr)=>{
                        const name= storeItemsAll?.data?.find(el=>el?._id==ite?.itemsid)?.name
                        return(
                            <li key={i*453} style={{display:"flex",flexDirection:"row",gap:"14px",alignItems:"center"}}>
                                <div className="selected-list">
                                  <div className="items-field">
                                    <label htmlFor="">Name</label>
                                    <input type="text" value={removingUnderscoore(useUpperFirstLetter(name))} />
                                  </div>
                                  <div className="items-field">
                                    <label htmlFor="">Quantity</label>
                                    <input onChange={(e)=>addAnotherField(ite?.itemsid,'quantity',e.target.value)} type="number" value={ite?.quantity} />
                                  </div>
                                  <div className="items-field">
                                    <label htmlFor="">Rate</label>
                                    <input onChange={(e)=>addAnotherField(ite?.itemsid,'rate',e.target.value)} type="number" value={ite?.rate} />
                                  </div>
                                </div>
                                <button onClick={()=>removeItems(ite.itemsid)} style={{backgroundColor:'#347dac', marginTop:'15px',fontSize:'16px'}}><AiFillDelete/></button>
                            </li>
                        )
                    })
                    }
                </ul>
            </div>
        </div>
       {items.length>0&&(<button   onClick={handleSave} className='save-Item'>Save</button>)} 
    </div>
  )
}

export default AddItemsInToInvoice