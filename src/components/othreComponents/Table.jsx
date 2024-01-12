import React from 'react'
import useUpperFirstLetter from '../../costoumHoks/useUpperFirstLetter'
import { removingUnderscoore } from '../../costoumHoks/removingUnderscoore'

export const Table = ({tHead,dataField,handleFun,isId,selectedId,secondFun,math,isDubleItems}) => {
    const handleClick = (event,el) => {
        if(isDubleItems){
            switch (event.detail) {
              case 1:
                if(isId){
                    secondFun(el.id)
                }else{
                    secondFun(el)
                }
                break;
              case 2:
                if(isId){
                    handleFun(el._id)
                }else{
                    handleFun(el)
                }
                break;
              default:
                return
            }
        }else{
            if(isId){
                handleFun(el._id)
            }else{
                handleFun(el)
            }
        }
    };

  return (
    <table>
        <thead>
            <tr>
                {
                    tHead?.map((el,i)=>{
                        if(typeof(el)=='object'){
                            return <th>{useUpperFirstLetter(removingUnderscoore(`${el.name}`))}</th>
                        }else{
                            return <th >{useUpperFirstLetter(removingUnderscoore(`${el}`))}</th>
                        }
                    })
                }
            </tr>
        </thead>
        <tbody>
            {
                dataField?.map((el,i)=>{
                    let tableBody=[]
                    for(let key in el){
                       if(key=='_id'){
                        tableBody.push(<td  >{i+1}</td>)
                       }else if(tHead?.some(e=>e==key )||tHead?.some(e=> e.name==key )){
                            tableBody.push(<td  >{el[key]}</td>)
                       }
                    }
                    return <tr  style={selectedId===el._id?{backgroundColor:'#347dac',color:'white'}:{}}
                     onClick={(event)=>handleClick(event,el)} >{tableBody}{math&&<td>{math(el)}</td>}</tr>
                })
            }
        </tbody>
    </table>
  )
}
