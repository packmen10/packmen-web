import React, { useEffect } from 'react'
import { useGetQcInTheBomQuery } from '../../../../../store/apiSlice'

export const QcOnBom = ({setProgress,id,index}) => {
    const headerStyle = {
        backgroundColor: '#347dac',
        color: 'white',
        borderRadius: '5px'
      };
   const {data:qcData}=useGetQcInTheBomQuery(id)

  useEffect(()=>{
    if(qcData?.data?.length>0)
    setProgress(pre=> pre?.map((_,i)=> i<=index?true:false))
  },[qcData])
   
  return (
    <div className='qc_on_bom flex justify-cen' style={{width:'100%'}}>
        {qcData?.data?.length==0 && (<h4>Empty</h4>)}
        {
            qcData?.data?.length>0 && (
                <table style={{ borderSpacing: '5px', maxWidth: '800px', width: '100%' }}>
                    <thead>
                      <tr>
                        <td style={headerStyle}>No</td>
                        <td style={headerStyle}>Date</td>
                        <td style={headerStyle}>Done by</td>
                      </tr>
                    </thead>
                    <tbody>
                        {
                            qcData?.data?.map((qc,no)=>{
                                return <tr >
                                <td>{no+1}</td>
                                <td>{qc?.date}</td>
                                <td>{qc?.qc_done_by}</td>
                            </tr>
                            })
                        }
                    </tbody>
                </table>
            )
        }
    </div>
  )
}
