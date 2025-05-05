import moment from 'moment'
import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const ModalService = ({show,handleClose,eventDetail}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton>
      <Modal.Title>Service Details</Modal.Title>
    </Modal.Header>
    <Modal.Body className='d-flex'>
     <div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li>Date </li>
          <li>Venue </li>
          <li>Entry </li>
          <li>Exit </li>
          <li>Fair </li>
          <li>Expense </li>
          <li>Others </li>
          <li>Fine </li>
          <li style={{fontSize:"18px",fontWeight:"600"}}>Total </li>
        </ul>

     </div>
     <div className='ms-2'>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li>: {moment(eventDetail.entry).format('D-MM-YYYY')}</li>
          <li>: {eventDetail.mongoEventId?.name}</li>
          <li style={{ color: "rgba(50, 168, 82)", }}>:{moment(eventDetail.entry).format('hh:mm A')} </li>
          <li style={{ color: "rgba(191, 48, 48)", }}>: {eventDetail.exit?moment(eventDetail.exit).format('hh:mm A'):"Not Exited"}</li>
          <li>: 480</li>
          <li>: 0</li>
          <li>: 0</li>
          <li>: <span>{eventDetail.fine}</span></li>
          <li style={{fontSize:"18px",fontWeight:"600"}}>: 480</li>
        </ul>

     </div>

    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ModalService