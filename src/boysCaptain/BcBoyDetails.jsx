import React, { useState } from 'react'
import { Button, Carousel, Modal } from 'react-bootstrap';

const BcBoyDetails = ({width,height,data}) => {
      const [deleteshow, setDeleteShow] = useState(false);
      const [show, setShow] = useState(false);
    const handleShow=()=>setShow(true)
    const handleClose=()=>setShow(false)
    const deletehandleClose = () => setDeleteShow(false);
    const deletehandleShow = () => setDeleteShow(true);
      const [backgroundImage, setBackgroundImage] = useState(
        "https://img.freepik.com/free-photo/chef-with-his-arms-crossed-white-background_1368-2792.jpg?uid=R114668176&ga=GA1.1.1837137669.1726030558&semt=ais_hybrid"
      );
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
  return (
    <>
       <span style={{ opacity: 0,position:'relative',zIndex:2,bottom:"60px",fontSize:'50px'}} onClick={handleShow}>show</span>
       {/* Modal for Details */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Boys Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
        <div className=" d-flex justify-content-center" style={{ width: "100%" }}>
            <Carousel
            //   activeIndex={index}
            //   onSelect={handleSelect}
              data-bs-theme="dark"
              indicators={false}
              controls={true}
              interval={null}
            >
              <Carousel.Item>
                <div
                  className=" d-flex justify-content-center"
                  style={{
                    height: "100px",
                    width: "250px",
                  }}
                >
                  <div
                    // onClick={triggerFileInput}
                    style={{
                      height: "100px",
                      width: "100px",
                      backgroundColor: "white",
                      borderRadius: "10px",
                      border: "1px solid",
                      backgroundImage: `url(${data.imgUrl? data.imgUrl : backgroundImage})`,
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
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div
                  className=" d-flex justify-content-center"
                  style={{
                    height: "100px",
                    width: "250px",
                  }}
                >
                  <div
                    
                    style={{
                      height: "100px",
                      width: "100px",
                      backgroundColor: "white",
                      borderRadius: "10px",
                      border: "1px solid",
                      backgroundImage: `url(https://png.pngtree.com/png-clipart/20220605/original/pngtree-black-qr-code-for-web-png-image_7964376.png)`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  ></div>

                </div>
              </Carousel.Item>
            </Carousel>

          </div>
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
                    defaultValue={data.name}
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
                    defaultValue={data._id}
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
                    defaultValue={data.mobile}
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
                    defaultValue={data.email}
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
                    defaultValue={data.place}
                  />
                </li>
                <li>

                  <select

                    aria-label="Select Category"
                    style={{
                      fontSize:"16px",
                      borderRadius: "5px",
                      height: "35px",
                      width: `${width / 2 + 40}px`,
                      paddingLeft: "5px",
                      marginBottom: "10px",
                      border: "1px solid",
                    }}

                    defaultValue={data.grade}
                  >
                   
                    <option  hidden>Select</option>
                    <option value="captain">Captain</option>
                    <option value="vicecaptain">Vice Captain</option>
                    <option value="agrade">A Grade</option>
                    <option value="bgrade">B Grade</option>
                    <option value="general">General</option>
                   
                  </select>
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
                    defaultValue={data.wage}
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
          <Button
            variant="danger"
            onClick={() => {
              deletehandleShow();
              handleClose();
            }}
          >
            Delete
          </Button>
          <Button variant="primary">Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Delete */}
      <Modal
        show={deleteshow}
        onHide={deletehandleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete name record?
        </Modal.Body>
        <Modal.Footer>

          <Button variant="danger" >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default BcBoyDetails