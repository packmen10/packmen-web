import React, { useEffect } from 'react'
import { useGetAllPoQuery } from '../../../../../store/apiSlice'

export const Po = ({setProgress,id,index}) => {

  const {data:poData}=useGetAllPoQuery()
  const selectedPo = poData?.data?.filter(po=> po?.items?.some(item=> item?.bomId==id))

  useEffect(()=>{
    if(selectedPo?.length>0)
    setProgress(pre=> pre?.map((_,i)=> i<=index?true:false))
  },[poData])

  const getPoData=()=>{
    return selectedPo?.map((po,i)=>{
        return <tr>
          <td>{i+1}</td>  
          <td>{po.po_no}</td>
          <td>{po.date}</td>
        </tr>
    })
  }
  const tableHeadeStyle={backgroundColor:'#347dac',color:'white',borderRadius:'5px'}
  if(selectedPo?.length>0){
    return (
        <div className='Po flex justify-cen' >
            <table style={{maxWidth:'30vw',width:'100%'}}>
                <thead>
                    <tr>
                         <th style={tableHeadeStyle}>No</th>
                         <th style={tableHeadeStyle}>Po no</th>
                         <th style={tableHeadeStyle}>Po date</th>
                    </tr>
                </thead>
                <tbody>
                    {getPoData()}
                </tbody>
            </table>
        </div>
    )
  }else{
    return <h4 style={{textAlign:'center',width:'100%'}}>Empty</h4>
  }

}