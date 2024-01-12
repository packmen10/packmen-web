import React from 'react'
import { LeftSideMenu } from './LeftSideMenu'

export const NextedComponent = ({id}) => {
  
    return (
      <div className="nextedWorkDetailes">
          <div className="left-section">
            <LeftSideMenu id={id}/>
          </div>
      </div>
    )
}
