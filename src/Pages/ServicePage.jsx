import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { boysEventApi } from '../services/allApis';
import moment from 'moment';
import { serviceResponseContext } from '../contextApi/ContextApi';
import ModalService from './ModalService';
import { Spinner } from 'react-bootstrap';


const ServicePage = ({ height, width }) => {
  const [show, setShow] = useState(false);
  const{serviceResponse,setserviceResponse}=useContext(serviceResponseContext)
  const [selectedEvent, setSelectedEvent] = useState(null);
  const[isLoading,setIsLoading]=useState(false)

  const[eventDetails,setEventDetails]=useState("")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(()=>{
    fetchEvents()
  },[])
  const fetchEvents = async () => {
  try {
    setIsLoading(true)
    const boyData = JSON.parse(sessionStorage.getItem('user'));
    if (!boyData._id) {
      console.error("Boy ID not found in sessionStorage");
      return;
    }

    const result = await boysEventApi({boyId:boyData._id});
    if (result.status === 200) {
      const sortedEvents = result.data.sort((a, b) => new Date(b.entry) - new Date(a.entry));
      setEventDetails(sortedEvents);
      console.log(result.data);
      
    }
  } catch (e) {
    console.log("Error fetching events:", e);
  }finally{setIsLoading(false)}
};


  return (
    <div className='home d-flex flex-column ' style={{ width: `${width}px`, marginTop: `${height * 0.1 + 10}px`, padding: "10px 20px" }}>
      <h5>Services</h5>
      {
        isLoading ? (
          <div style={{ minHeight: '400px' }} className='d-flex align-items-center justify-content-center'>
            <Spinner animation="border" />
          </div>
        ) :
        eventDetails.length>0 ?
        eventDetails.map((item,i)=>(
          <div onClick={() => {
            setSelectedEvent(item);  // set event details
            handleShow();            // show the modal
          }}
           key={item._id} className='list d-flex justify-content-between align-items-center mb-2 ' style={{ height: `${height * 0.08}px`, width: `${width - 40}px`, border: "1px solid", borderRadius: "10px", fontSize: "15px",padding:"0px 20px" }} >
        <span>{i+1}</span>
        <span>{moment(item.entry).format('D-MM-YYYY')}</span>
        <span>{item.mongoEventId?.name}</span>
      </div>
        )):
        <div style={{minHeight:'400px'}} className='d-flex align-items-center justify-content-center '>No services Yet</div>}
        
      
{selectedEvent && (
  <ModalService
    show={show}
    handleClose={handleClose}
    eventDetail={selectedEvent}
  />
)}
    </div>
  )
}

export default ServicePage