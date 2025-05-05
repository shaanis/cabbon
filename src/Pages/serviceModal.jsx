import React from 'react'


const serviceModal = ({show,handleClose}) => {
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
          <li>: 10-02-2025</li>
          <li>: Qatar Auditorium</li>
          <li style={{ color: "rgba(50, 168, 82)", }}>: 08:30 am</li>
          <li style={{ color: "rgba(191, 48, 48)", }}>: 04:30 pm</li>
          <li>: 480</li>
          <li>: 0</li>
          <li>: 0</li>
          <li>: <span>Reason</span> | <span>- 0</span></li>
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

export default serviceModal