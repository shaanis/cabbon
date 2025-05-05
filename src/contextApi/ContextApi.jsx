import React, { createContext, useState } from 'react'

export const eventResponseContext= createContext()
export const serviceResponseContext= createContext()

const ContextApi = ({children}) => {
  const[addEventResponse,setAddEventResponse]=useState("")
  const[serviceResponse,setserviceResponse]=useState("")
  return (
   <serviceResponseContext.Provider value={{serviceResponse,setserviceResponse}}>
      <eventResponseContext.Provider value={{addEventResponse,setAddEventResponse}}>
        {children}
      </eventResponseContext.Provider>
   </serviceResponseContext.Provider>
  )
}

export default ContextApi