import commonApi from "./commonApi"
import severurl from "./severurl"

// login
export const loginUserApi=async(reqBody)=>{
    return await commonApi('POST',`${severurl}/login`,reqBody)
}
// addEvent
export const addEventApi=async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${severurl}/add-event`,reqBody,reqHeader)
}
// getEvent
export const getEventApi=async()=>{
    return await commonApi('GET',`${severurl}/get-event`,{})
}
// getEvent
export const updateStatusapi=async(id,status)=>{
    return await commonApi('GET',`${severurl}/status/${id}/update?status=${status}`,{})
}
// boys scan
export const scanBoysApi=async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${severurl}/scan-boys`,reqBody,reqHeader )
}
//fetch scanned boys 
export const scannedBoysApi=async(reqHeader)=>{
    return await commonApi('GET',`${severurl}/workers`,{},reqHeader)
}
//add boys from boys captian 
export const addBoysApi=async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${severurl}/add-boys`,reqBody,reqHeader)
}
//get all boys from added user 
export const getAllBoysApi=async(reqHeader)=>{
    return await commonApi('GET',`${severurl}/all-boys`,{},reqHeader)
}
//scan and exit boy 
export const scanAndExitBoysApi=async(reqBody,reqHeader)=>{
    return await commonApi('PUT',`${severurl}/exit-boy`,reqBody,reqHeader)
}
//individual event detail
export const eventByIdApi=async(id)=>{
    return await commonApi('GET',`${severurl}/event/${id}/detail`,{})
}
//boys login
export const boysLogindApi=async(reqBody)=>{
    return await commonApi('POST',`${severurl}/login-boys`,reqBody)
}

export const boysEventApi=async(reqBody)=>{
    return await commonApi('POST',`${severurl}/events`,reqBody,{})
}
// current event to show boys page
export const currentEventApi=async(reqBody)=>{
    return await commonApi('POST',`${severurl}/current-events`,reqBody,{})
}