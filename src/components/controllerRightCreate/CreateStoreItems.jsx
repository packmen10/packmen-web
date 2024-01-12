import React from 'react'
import { useCreateStoreItemMutation, useGetStoreRightCreateTextQuery } from '../../store/apiSlice'
import { CreateField } from './CreateField'
import { useDispatch, useSelector } from 'react-redux'
import { initialStoreData,resetStoreData} from '../../store/itemsData'
import { changeTheStatusOfStoreState } from '../../store/storeNavigation'
import { Button } from '@material-ui/core'


const CreateStoreItems = () => {
  const[createStoreItem]=useCreateStoreItemMutation()
  const{isLoading,data,error}=useGetStoreRightCreateTextQuery()
  const dispatch=useDispatch()
  const storeData=useSelector(state=>state.itemsDataReducer.storeData)
  
  const handlesubmit=()=>{
    for(let key in storeData){
      if(storeData[key]=='') return
    }
    createStoreItem(storeData)
    dispatch(resetStoreData({...initialStoreData}))
  }
  
  const handleCancel=()=>{
    dispatch(changeTheStatusOfStoreState({key:'create',status:true}))
  }
  
  return (
    <div className="controller-right-section-createStoreItem">
      <h3 className='create-item'>Create New Item</h3>
      <div className="container-input-fields">
        {
          data?.data.map((item,i)=>{
            return <CreateField key={i} item={item}/>
          })
        }
      </div>
      <div className="bottm-btns">
               <Button style={{textTransform:'none'}} onClick={handlesubmit} variant="outlined">Create</Button>
               <Button style={{textTransform:'none'}} onClick={handleCancel} variant="outlined">Cancel</Button>
      </div>
    </div>
  )
}


export default CreateStoreItems