import React, { useEffect } from 'react'
import { useGetDetailesAboutOutSourceMachineLogQuery } from '../../../../../store/apiSlice';

export const Production = ({setProgress,id,index}) => {

  const{data:machineOutSourceData}=useGetDetailesAboutOutSourceMachineLogQuery(id)
  
  useEffect(()=>{
    if(machineOutSourceData?.data?.length>0)
    setProgress(pre=> pre?.map((_,i)=> i<=index?true:false))
  },[machineOutSourceData])

  const headerStyle = {
    backgroundColor: '#347dac',
    color: 'white',
    borderRadius: '5px'
  };


  return (
    <div className='Production-detailes flex column align-cen' style={{width:'100%'}}>
      {machineOutSourceData?.data?.machineLogs?.length>0 &&(
        <>
        <h3>Machine log</h3>
            <table style={{ borderSpacing: '5px', maxWidth: '800px', width: '100%' }}>
        <thead>
          <tr>
            <td style={headerStyle}>No</td>
            <td style={headerStyle}>Operator</td>
            <td style={headerStyle}>Date</td>
          </tr>
        </thead>
        <tbody>
            {
              machineOutSourceData?.data?.machineLogs?.map((machine,no)=>{
                return <tr>
                    <td>{no+1}</td>
                    <td>{machine?.operator}</td>
                    <td>{machine?.date}</td>
                </tr>
              })
            }
        </tbody>
      </table>
        </>
      )}
      
{machineOutSourceData?.data?.outsources?.length>0&& (
  <>
        <h3>Out source log</h3>
            <table style={{ borderSpacing: '5px', maxWidth: '800px', width: '100%' }}>
        <thead>
          <tr>
            <td style={headerStyle}>No</td>
            <td style={headerStyle}>Ds no</td>
            <td style={headerStyle}>Supplier</td>
            <td style={headerStyle}>Date</td>
          </tr>
        </thead>
        <tbody>
            {
              machineOutSourceData?.data?.outsources?.map((outS,no)=>{
                return <tr >
                    <td>{no+1}</td>
                    <td>{outS?.ds_no}</td>
                    <td>{outS?.supplier}</td>
                    <td>{outS?.date}</td>
                </tr>
              })
            }
        </tbody>
      </table>
  </>  
)}

{machineOutSourceData?.data?.machineLogs?.length==0 && machineOutSourceData?.data?.outsources?.length==0 && (<h4>Empty</h4>)}
    </div>
  )
}
