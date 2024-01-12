import React, { createRef, useRef } from 'react'

import { FcExpand } from "react-icons/fc";
import useUpperFirstLetter from '../../costoumHoks/useUpperFirstLetter';
import { removingUnderscoore } from '../../costoumHoks/removingUnderscoore';


export const TableWithExpandable = ({tHead,dataField,}) => {

  const expandableSection=useRef([])

  if (expandableSection.current.length !== dataField.length) {
    expandableSection.current = Array(dataField.length)
      .fill()
      .map((_, i) => expandableSection.current[i] || createRef());
  }

  const handleClick=(event,el)=>{

  }

  const expand=(i)=>{
    console.log(expandableSection.current[i].current.classList)
    if(expandableSection.current[i].current){
      if([...expandableSection.current[i].current.classList].some(el=>el=='disable')){

        expandableSection.current.map(el=>{
          el.current.classList.remove('enable')
          el.current.classList.add('disable')
        })
        
         expandableSection.current[i].current.classList.add('enable')
         expandableSection.current[i].current.classList.remove('disable')
      }else{
        expandableSection.current[i].current.classList.add('disable')
        expandableSection.current[i].current.classList.remove('enable')
      }
    }
  }

  return (
    <table style={{width:"100%"}}>
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
        <tbody style={{position:"relative"}}>
            {
                dataField?.map((el,i)=>{
                    let tableBody=[]
                    tableBody.push(<td style={{ width:'50px'}} ><button
                    style={{width:"30px",height:"30px"}}
                    onClick={(e)=>expand(i)}><span><FcExpand/></span></button></td>)
                    for(let key in el){
                       if(key=='_id'){
                        tableBody.push(<td  >{i+1}</td>)
                       }else if(tHead?.some(e=>e==key )||tHead?.some(e=> e.name==key )){
                            tableBody.push(<td  >{el[key]}</td>)
                       }
                    }
                    return <>
                            <tr onClick={(event)=>handleClick(event,el)} >{tableBody}</tr>
                           <div style={{
                               position:'absolute',
                               backgroundColor:"rgb(240, 238, 238)",
                               width:"100%",
                               padding:"5px"
                            }} className='disable' ref={expandableSection?.current[i]}> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni doloremque eligendi ut nemo exercitationem soluta debitis asperiores hic voluptates laudantium cum laborum quam commodi consequuntur, autem culpa alias fugiat sit at. Sapiente voluptas quidem, tempora debitis ut eveniet maiores corrupti culpa totam, accusantium odio recusandae quos facilis minima quibusdam, fugit aspernatur optio sed cupiditate alias? Molestias accusamus ullam nostrum ab dolorum quas, necessitatibus recusandae voluptatem maxime voluptatibus rem similique eos tenetur atque quia repellendus voluptates itaque deleniti minima eligendi rerum? Accusantium culpa quo quae, neque quas ipsum eius iusto facere cupiditate inventore dolorem molestias animi repellat deleniti, aperiam vero reprehenderit tenetur? Recusandae commodi assumenda ipsam suscipit, eligendi maxime voluptatum cum ratione illum quae facilis excepturi tempora? Ducimus nostrum nihil deserunt enim repellat reiciendis consectetur animi error officiis amet nam, hic, temporibus esse nisi fugit possimus quibusdam molestiae ullam fuga porro facere rerum corrupti? Necessitatibus doloribus, placeat omnis rem aperiam ut reprehenderit. Non culpa nisi est fugiat doloribus unde facere ad deserunt animi provident esse, cum porro, expedita alias eum numquam, praesentium quidem error odit ipsa dolorem soluta atque nemo. Quidem maiores qui iure a neque. Quaerat ipsum id aut, molestiae eum distinctio eius ducimus reprehenderit voluptates at voluptas labore sit modi explicabo blanditiis expedita vel ut ad, unde culpa maxime eveniet veniam obcaecati accusamus! Voluptate, aspernatur! Quos accusamus officiis architecto ratione illum, sunt culpa corrupti quisquam? Culpa provident, eius ipsa necessitatibus soluta pariatur veritatis doloremque similique et aperiam ab rerum officiis ad harum saepe laborum alias eum quaerat voluptates excepturi consectetur nulla. Ipsa, praesentium! Mollitia itaque quos cumque et porro cum, dolores magnam dignissimos quam distinctio vel obcaecati fugiat soluta ratione. Error quod totam magni, iusto doloribus soluta dolore saepe accusantium ipsum placeat laborum neque corrupti quisquam. Quaerat sint nihil voluptatem cum nulla, magni ipsa quo laudantium reprehenderit esse neque quibusdam ullam tempora fugiat totam praesentium veritatis optio quas rerum maxime corporis aperiam incidunt! Possimus sunt nostrum voluptates atque adipisci obcaecati, exercitationem autem nisi itaque officia qui alias numquam distinctio, expedita assumenda ipsa amet, accusamus doloremque sit consequatur ad provident quis consequuntur. Corrupti obcaecati totam iusto unde illo corporis voluptatibus doloremque ducimus ratione numquam sapiente molestiae velit nihil minima ab dignissimos, voluptatum vero cumque doloribus modi dicta quaerat aut voluptate culpa? Dolor similique odit illum exercitationem molestias nihil architecto rem. Maxime quisquam dolorum suscipit laboriosam ipsa, vero deserunt, repellendus perspiciatis eum molestiae ex? Quis in quae consequuntur laboriosam dolor consectetur.
                           </div>
                    </>
                })
            }
        </tbody>
    </table>
  )
}
