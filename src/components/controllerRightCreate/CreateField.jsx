import React from 'react'
import useUpperFirstLetter from '../../costoumHoks/useUpperFirstLetter'
import { useDispatch, useSelector } from 'react-redux'
import { setStoreData } from '../../store/itemsData'
import { removingUnderscoore } from '../../costoumHoks/removingUnderscoore'
import { TextField } from '@material-ui/core'


export const CreateField = ({item}) => {
    const dispath=useDispatch()
    const storeData=useSelector(state=>state.itemsDataReducer.storeData)

  return (
    <div className="data-inputfields">
        <TextField style={{width:"100%"}} id="outlined-basic" variant="outlined" 
            label={removingUnderscoore(useUpperFirstLetter(item.name))}
            value={storeData[item.name]} onChange={(e)=>dispath(setStoreData({field:item.name,data:e.target.value}))}
            type={item.type}
            inputProps={{
              style: {
                height: "35px",
                padding: '9.5px 14px'
            }}} />
    </div>
  )
}
