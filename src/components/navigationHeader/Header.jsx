import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useGetPostQuery } from '../../store/apiSlice'
import useUpperFirstLetter from '../../costoumHoks/useUpperFirstLetter'

export const Header = () => {

  const location=useLocation()
  const navTitile=useUpperFirstLetter(location.pathname.split("").slice(1).join(""))
  const{error,isLoading,data}=useGetPostQuery()

  return (
    <div className='header' >
      <div className="header-titile">
      <ul>
        {
          data?.data?.map((item)=>{
              return(
                  <li key={item._id}>
                      <NavLink to={item.linkName} className='items'>
                          <img style={{color:'white'}} src={item.path} alt="" />
                          <h4>{item.name}</h4>
                      </NavLink>
                  </li>
              )
          })
        }
        </ul>
      </div> 
      <h3>{ navTitile!='' ? navTitile : 'Store' }</h3>
    </div>
  )
}
