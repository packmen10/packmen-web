import React, { useEffect } from 'react';
import {
  useGetdataFromMirForBomQuery
} from '../../../../../store/apiSlice';


export const MirDetailes = ({setProgress,id,index }) => {
  const { data: mirData, isLoading: mirLoading, isError: mirError } = useGetdataFromMirForBomQuery(id);

  const headerStyle = {
    backgroundColor: '#347dac',
    color: 'white',
    borderRadius: '5px'
  };

  useEffect(()=>{
    if(mirData?.data?.length>0){
      setProgress(pre=> pre?.map((_,i)=> i<=index?true:false))
    }
  },[mirData])

  if (mirLoading){
    return <div>Loading...</div>
  }

  if (mirError){
    return <div>Error occurred while fetching data</div>
  }

  return (
    <div className='mir-detailes flex justify-cen' style={{ width: '100%' }}>
      {mirData?.data?.length==0 && (<h4>Empty</h4>)}
    {mirData?.data?.length>0 && (
          <table style={{ borderSpacing: '5px', maxWidth: '800px', width: '100%' }}>
            <thead>
              <tr>
                  <td style={headerStyle}>No</td>
                  <td style={headerStyle}>Mir no</td>
                  <td style={headerStyle}>mir date</td>
              </tr>
            </thead>
            <tbody>
                {
                  mirData?.data?.map((mir,no)=>{
                      return <tr>
                      <td>{no+1}</td>
                      <td>{mir?.mir_no}</td>
                      <td>{mir?.mir_date}</td>
                  </tr>
                  })
                }
            </tbody>
          </table>
      )}  
    
    </div>
  );
};
