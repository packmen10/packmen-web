import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDeleteIssueNotMutation, useGetAllBomQuery, useGetAllMirQuery, useGetCustomerQQuery, useGetEmployeeByIdMutation, useGetIssueNotByIdQuery, useGetStoreItemsQuery, useGetStoretemBySearchQuery, useGetWorckOrdernoByIdMutation, useUpdateIssueNotItemsMutation, useUpdateIssueNotMutation, useUpdateStockItemDecreesMutation, useUpdatingStoreItemsbyIssueNotMutation } from '../../store/apiSlice'
import useUpperFirstLetter from '../../costoumHoks/useUpperFirstLetter'
import { removingUnderscoore } from '../../costoumHoks/removingUnderscoore'

import { setIssueNotStatus } from '../../store/issueNotNavigation'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'



export const DataItems = ({id}) => {

  const removeDuplicateObjectStrings=(array,property)=>{
    let newArray = [];
    let uniqueObject = {};
    for (let i in array){
      let objTitle = array[i][property]
      uniqueObject[objTitle] = array[i];
    }
    for (let i in uniqueObject){
      newArray.push(uniqueObject[i]);
    }
    return newArray
  }

  const{data:storeData}=useGetStoreItemsQuery()

  const{data:issueNotNavData,isFetching}=useGetIssueNotByIdQuery(id)

  let issueNotNav

  if(!isFetching){
    issueNotNav=issueNotNavData?.data;
  }

  const dispatch=useDispatch()
  const defualtSelectionValue={section:'',item:''}
  const [issueNotSelectionItems,setIssueNotSelection]=useState(defualtSelectionValue)
  console.log(issueNotSelectionItems)
  const[searchString,setSearchString]=useState('')
  const[selectedItems,selectItems]=useState([])
  const{data:searchData}=useGetStoretemBySearchQuery(searchString)
  const[setEmployee,{data:employee}]=useGetEmployeeByIdMutation()
  const[setWorkOrder,{data:workOrder}]=useGetWorckOrdernoByIdMutation()
  const[deleteIssueNot]=useDeleteIssueNotMutation()
  const[updateStoreItemAndChangeIssueNot]=useUpdatingStoreItemsbyIssueNotMutation()
  const[updateIssueNot]=useUpdateIssueNotItemsMutation()
  const {data:customerData}=useGetCustomerQQuery(workOrder?.data?.customer)
  const {data:bomData}=useGetAllBomQuery()

  useEffect(()=>{
      setEmployee(issueNotNav?.issued_to)
      setWorkOrder(issueNotNav?.workOrderNo)
  },[issueNotNav])

  const handleBack=()=>{
    dispatch(setIssueNotStatus(null))
  }

  const handleDelete=()=>{
    deleteIssueNot(id)
    handleBack()
  }

  const handleclick=(data)=>{
    updateIssueNot({
      storeItemId:data?.item,
      issueNotId:id,
      quantity:data?.quantity,
      bomId:data?.bomId
    })
    setSearchString('')
  }

  const tableHeader=['no','name','stock','quantity','status']
  
  const getIssueNotData=()=>{
    return issueNotNav?.items?.map(el=>{
      const selectedItem=storeData?.data?.find(e=>e._id==el.item)
      if(selectedItem){
          const{name,stock,_id}=selectedItem
          return {index:0,name,stock,quantity:el.quantity, _id ,selectedItemsId:el._id, issued:el.issued,status:issueNotNav.finish}
      }
    })
  }

  const handleChange=(val,key,data)=>{
   selectItems(pre=>{
      if(pre?.every(el=>el.item!=data?._id)){
        return [...pre,{item:data?._id,quantity: val ? +val: ' ',_id:data?.selectedItemsId,issued:data?.issued}]
      }else{
        return pre?.map(el=>{
          if(el?.item==data?._id){
            return {...el,quantity: val ? val:' '}
          }else{
            return el
          }
        })
      }
    })
  }

  const handleUpdateItemsInTheIssueNot=()=>{
    const myCode=()=>{
      updateStoreItemAndChangeIssueNot({
        IssueNotId:id,
        updatedItems:selectedItems
      })
    }
    const interval = setInterval(myCode, 60); 
    setTimeout(()=>{
      clearInterval(interval);
    }, 120);
  }

  const getAllSection=(workOrderNo)=>{
   const selectedBomData= removeDuplicateObjectStrings(bomData?.data?.filter(bom=> bom?.work_order_no==workOrderNo),'section')
   return selectedBomData
  }

  const getAllStoreItemsFromBom=()=>{
    const selectedBom= bomData?.data?.filter(bom=>bom?.section==issueNotSelectionItems?.section)
    const selectedItems= selectedBom?.reduce((acc,cur)=>{
      return [...acc,...cur?.material_specification?.map(item=> ({...item,bomId:cur?._id}))]
    },[])
    return removeDuplicateObjectStrings(selectedItems,"item")
  }

  const getStoreItems=(storeId)=>{
    return storeData?.data?.find(store=> store?._id==storeId)?.name
  }
  
  return (
    <div className="bottom-section">
    <h3>Items</h3>
    {!issueNotNav?.finish&&(
    <>  
     <div className="selection-section flex" style={{width:'600px',gap:"5px",padding:'10px 5px',border:'5px solid balck'}}>
        <FormControl fullWidth>
          <InputLabel   id="demo-simple-select-label">Section</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={issueNotSelectionItems?.section}
            onChange={(e)=>setIssueNotSelection((pre)=> ({...pre,section:e.target.value}) )}
          >
            {
              getAllSection(issueNotNavData?.data?.workOrderNo)?.map(item=>{
                return <MenuItem value={item?.section}>{item?.section}</MenuItem>
              })
            }
          </Select>
        </FormControl>
        <FormControl disabled={issueNotSelectionItems?.section==''} fullWidth>
          <InputLabel  id="demo-simple-select-label">Item</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={issueNotSelectionItems?.item}
            onChange={(e)=>{
              const selectedData=JSON.parse(e.target.value)
              setIssueNotSelection((pre)=> ({...pre,item:selectedData?.item}))
              handleclick(selectedData)
            }}
          >
            {
              getAllStoreItemsFromBom()?.map(item=>{
                return <MenuItem value={ JSON?.stringify(item)}>{getStoreItems(item?.item) }</MenuItem>
              })
            }
          </Select>
        </FormControl>
      </div> 
      </> 
    )}
    <div className="table-section">
      {
        tableHeader?.map(el=>{
          return <div className="issue-not-table-header"><p>{useUpperFirstLetter(removingUnderscoore(el))}</p></div>
        })
      }
      {
        getIssueNotData()?.map((el,i)=>{
          const itemsDetailes=[]
          for(let key in el){
            if(key!='status'&&key!='selectedItemsId'){
              if(key=='index'){
                itemsDetailes.push(
                  <div className="issue-not-table-body">
                    <p>{i+1}</p>
                  </div>
                )
              }else if(key=='quantity'){
                const item= selectedItems?.find(e=>e?.item==el._id)||{}
                itemsDetailes.push(
                  <div className="issue-not-table-body">
                      <input disabled={el.issued} onChange={(e)=>handleChange(e.target.value,key,el)} type="number" value={item[key] || el[key]} />
                  </div>
                )
              }else if(key!='_id'&&key!='issued'){
                  itemsDetailes.push(
                    <div className="issue-not-table-body">
                      <p>{el[key]}</p>
                    </div>
                  )
              }else if(key=='issued'){
                if(el.status){
                    itemsDetailes.push(
                      <div className="issue-not-table-status-body">
                        <p>{el.issued ? 'Success':'Stock Out' }</p>
                      </div>
                    )
                }else{
                  itemsDetailes.push(
                    <div className="issue-not-table-body">
                  </div>
                  )   
                }
              }
             }
          }
          return itemsDetailes
        })
      }
    </div>
        <div className="btn-section">
            <button disabled={ issueNotNav?.items?.length===0 ? false : issueNotNav?.items?.every(item=> item?.issued==true)} onClick={handleUpdateItemsInTheIssueNot}>Finish</button>
        </div>
  </div>
  )
}
