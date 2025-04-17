import React, { useEffect } from 'react'
import logo from "../assets/cabbon-logo.png"; // Import the image
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import QRCode from 'react-qr-code';

const CpAppbar = ({ height, width }) => {
  
    const user = JSON.parse(sessionStorage.getItem('user'))
    console.log("appbar",user);
    
      
    const [backgroundImage, setBackgroundImage] = useState(
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?uid=R114668176&ga=GA1.1.1837137669.1726030558&semt=ais_keywords_boost"
    );

    const [show, setShow] = useState(false);
    const [qrshow, setQRShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const qrhandleClose = () => setQRShow(false);
    const qrhandleShow = () => setQRShow(true);


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert("File size must be less than 2MB.");
                return;
            }
            const imageUrl = URL.createObjectURL(file);
            setBackgroundImage(imageUrl);
        }
    };

    const triggerFileInput = () => {
        document.getElementById("imageInput").click();
    };
    // const user = JSON.parse(sessionStorage.getItem("user"))
    // console.log("appbar",user);

    return (
        <>
            <div
                className="appbar d-flex justify-content-between align-items-center bg-white"
                style={{
                    height: `${height * 0.1}px`,
                    width: `${width}px`,
                    boxShadow: "0px 0px 5px black",
                    position: 'fixed',
                    top: 0,
                    zIndex: 1000
                }}
            >
                <div className='d-flex justify-content-between align-items-center'>
                    <img
                        src={logo} // Use the imported image here
                        alt=""
                        style={{ height: "50px", paddingLeft: "10px" }} // Add height or width for proper scaling
                    />
                    <span
                        className="title"
                        style={{ paddingLeft: "0px", fontSize: "20px", fontWeight: "500" }}
                    >
                        Cabbon
                    </span>
                </div>
                <div className="appbarIcons d-flex column-gap-3 me-3">
                    <div
                        className="icons"
                        style={{ width: `30px`, height: `30px` }}
                        onClick={qrhandleShow}
                    >
                        <i className="fa-solid fa-qrcode" style={{ fontSize: "25px" }}></i>
                    </div>
                    <div
                        className="icons"
                        style={{ width: `30px`, height: `30px` }}
                        onClick={handleShow}
                    >
                        <i className="fa-regular fa-user" style={{ fontSize: "25px" }}></i>
                    </div>

                </div>
            </div>

            {/* Modal for Details */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
                    <div
                        onClick={triggerFileInput}
                        style={{
                            height: "100px",
                            width: "100px",
                            backgroundColor: "white",
                            borderRadius: "10px",
                            border: "1px solid",
                            backgroundImage: `url(${user.imgUrl? user.imgUrl: backgroundImage})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                        }}
                    ></div>
                    <input
                        type="file"
                        accept="image/*"
                        id="imageInput"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                    />
                    <div className="d-flex mt-3">
                        <div>
                            <ul
                                style={{
                                    listStyle: "none",
                                    padding: 0,
                                    margin: 0,
                                    fontSize: "18px",
                                    fontWeight: "400",
                                    lineHeight: "2.45",
                                }}
                            >
                                <li>Name</li>
                                <li>UID</li>
                                <li>Mobile</li>
                                <li>Email</li>
                                <li>Place</li>
                                <li>Grade</li>
                                <li>Wage</li>
                                <li>Works</li>
                                <li>Earnings</li>
                            </ul>
                        </div>
                        <div className="ms-2">
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: "400",
                }}
              >
                <li>
                  <input
                    type="text"
                    style={{
                      borderRadius: "5px",
                      height: "35px",
                      width: `${width / 2 + 40}px`,
                      paddingLeft: "5px",
                      marginBottom: "10px",
                      border: "1px solid",
                    }}
                    placeholder="Name"
                    value={user.name}
                  />
                </li>
                <li>
                  <input
                    type="text"
                    style={{
                      borderRadius: "5px",
                      height: "35px",
                      width: `${width / 2 + 40}px`,
                      paddingLeft: "5px",
                      marginBottom: "10px",
                      border: "1px solid",
                    }}
                    placeholder="UID"
                    readOnly
                    value={user._id}
                  />
                </li>
                <li>
                  <input
                    type="text"
                    style={{
                      borderRadius: "5px",
                      height: "35px",
                      width: `${width / 2 + 40}px`,
                      paddingLeft: "5px",
                      marginBottom: "10px",
                      border: "1px solid",
                    }}
                    placeholder="Mobile"
                    value={user.mobile}
                  />
                </li>
                <li>
                  <input
                    type="text"
                    style={{
                      borderRadius: "5px",
                      height: "35px",
                      width: `${width / 2 + 40}px`,
                      paddingLeft: "5px",
                      marginBottom: "10px",
                      border: "1px solid",
                    }}
                    placeholder="Email"
                    value={user.email}
                  />
                </li>
                <li>
                  <input
                    type="text"
                    style={{
                      borderRadius: "5px",
                      height: "35px",
                      width: `${width / 2 + 40}px`,
                      paddingLeft: "5px",
                      marginBottom: "10px",
                      border: "1px solid",
                    }}
                    placeholder="Place"
                    value={user.place}
                  />
                </li>
                <li>
                  <input
                    type="text"
                    style={{
                      borderRadius: "5px",
                      height: "35px",
                      width: `${width / 2 + 40}px`,
                      paddingLeft: "5px",
                      marginBottom: "10px",
                      border: "1px solid",
                    }}
                    placeholder="Grade"
                    readOnly
                    value={user.grade}
                  />
                </li>
               

                  
                <li>
                  <input
                    type="text"
                    style={{
                      borderRadius: "5px",
                      height: "35px",
                      width: `${width / 2 + 40}px`,
                      paddingLeft: "5px",
                      marginBottom: "10px",
                      border: "1px solid",
                    }}
                    placeholder="--"
                    readOnly
                    value={user.wage}
                  />
                </li>
                <li>
                  <input
                    type="text"
                    style={{
                      borderRadius: "5px",
                      height: "35px",
                      width: `${width / 2 + 40}px`,
                      paddingLeft: "5px",
                      marginBottom: "10px",
                      border: "1px solid",
                    }}
                    placeholder="--"
                    readOnly
                  />
                </li>
                <li>
                  <input
                    type="text"
                    style={{
                      borderRadius: "5px",
                      height: "35px",
                      width: `${width / 2 + 40}px`,
                      paddingLeft: "5px",
                      marginBottom: "10px",
                      border: "1px solid",
                    }}
                    placeholder="--"
                    readOnly
                  />
                </li>

              </ul>
            </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="primary">Save</Button>
                </Modal.Footer>
            </Modal>


            <Modal
                show={qrshow}
                onHide={qrhandleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header >
                    <Modal.Title>QR Code</Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex flex-column justify-content-center align-items-center'>
                  <QRCode value={user._id} size={200}/>
                    <h5><span>UID : </span>{user.name}</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={qrhandleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CpAppbar