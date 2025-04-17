import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Carousel from 'react-bootstrap/Carousel';
import { getAllBoysApi } from "../services/allApis";
import { useNavigate } from "react-router-dom";
import BcBoyDetails from "./BcBoyDetails";

const BcBoys = ({ height, width }) => {

  const[boy,setBoys]=useState([])
  const navigate = useNavigate()

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

 

  const triggerFileInput = () => {
    document.getElementById("imageInput").click();
  };

  const array = Array.from({ length: 11 }, (_, i) => i);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  useEffect(()=>{
    getAllBoys()
  },[])

  const getAllBoys = async () => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    console.log(token);
    
    if (token) {
      try {
        const reqHeader = {
          "Authorization": `Bearer ${token}`
        };
        const result = await getAllBoysApi(reqHeader);
        if (result.status === 200) {
          setBoys(result.data);
          console.log(result.data);
          console.log(boy);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Login Failed.. Please Login again!!");
      navigate('/');
    }
  };
  

  return (
    <>
      <div
        className="home d-flex flex-column"
        style={{
          width: `${width}px`,
          marginTop: `${height * 0.1 + 10}px`,
          marginBottom: `${height * 0.1 + 10}px`,
          padding: "10px 20px",
        }}
      >
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center">
          <h5>Boys</h5>
          <div className="position-relative">
            <input
              type="text"
              placeholder="Search"
              style={{
                height: "35px",
                width: `${width / 2 + 40}px`,
                borderRadius: "5px",
                border: "1px solid",
                paddingLeft: "10px",
                paddingRight: "35px",
              }}
            />
            <Search
              className="position-absolute"
              style={{
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "gray",
              }}
            />
          </div>
        </div>

        {/* Green Divs Section */}
        <div
          className="mt-4"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            columnGap: "10px",
            rowGap: "10px",
            textAlign: "center",
          }}
        >
          {boy.map((item, index) => (
            <div
              className="p-1 border border-secondary rounded"
              style={{
                height: "200px",
                width: `${width / 2 - 25}px`,
              }}
              key={index}
              
            >
             
              <div
                style={{
                  width: "100%",
                  height: "80%",
                  backgroundImage: `url(${item.imgUrl})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "top",
                }}
              ></div>
              <h5 className="mt-2">{item.name}</h5>
              <BcBoyDetails data={item}/>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Details */}
      {/* <Modal
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
              activeIndex={index}
              onSelect={handleSelect}
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
                    onClick={triggerFileInput}
                    style={{
                      height: "100px",
                      width: "100px",
                      backgroundColor: "white",
                      borderRadius: "10px",
                      border: "1px solid",
                      backgroundImage: `url(${backgroundImage})`,
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
      </Modal> */}

      {/* Modal for Delete */}
      {/* <Modal
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
      </Modal> */}
    </>
  );
};

export default BcBoys;
