import React, { useEffect, useState } from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { useSelector } from "react-redux";

const ProgressSteps=({status})=>{

  const setStyle={
    width:'30px',
    borderRadius:'50px',
    backgroundColor:'#347dac',
    height:'30px',
    position:'relative'
  }

  const titileStyle={
    width:'100px',
    position:'absolute',
  }

  const arr=['MIR','PO','Invoice','Issue note','Production','QC']
  
  return (
    <div className="progress-container" style={{padding:'10px 165px 50px 165px',}}>
      <ProgressBar
       percent={(()=>{
        if(status?.every(el=> el==false)){
          return 0
        }else{
           switch(status?.findLastIndex(element => element === true)){
            case 0 :
            return 10;
            case 1 :
            return 30;
            case 2 :
            return 50;
            case 3 :
            return 70;
            case 4 :
            return 90;
            case 5 :
            return 100;
           }
        }
       })()}
       filledBackground="linear-gradient(to right, #347dac, #347dac)">
      
      {
        arr?.map((name,i)=>{
        return <Step transition="scale">
                  {({ accomplished }) => (
                    <div style={{filter:`grayscale(${accomplished ? 0 : 80}%)`,...setStyle}} className="flex justify-cen align-cen">
                      <p style={{color:'white',}}>{i+1}</p>
                      <h4 style={{...titileStyle, top:'40px',left:'-19px'}}>{name}</h4>
                    </div>
                  )}
               </Step>
        })
      }
  </ProgressBar>
    </div>
  )
}

export default ProgressSteps