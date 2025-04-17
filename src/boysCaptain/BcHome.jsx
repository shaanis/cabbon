
import React, { useEffect } from 'react'
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { PlusCircle } from "lucide-react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { addBoysApi } from '../services/allApis';
import { Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

const BcHome = ({ height, width }) => {
  
  const navigate = useNavigate();
  const[boysDetails,setBoysDetails]=useState({
    name:"",
    email:"",
    mobile:"",
    place:"",
    grade:"",
    wage:"",
    password:"",
    imgUrl:""

})
  const[loading,setLoading]=useState(false)


  // Handler for navigating to the "Today" page
  const handleTodayClick = () => {
    navigate('/boyscaptain/events');
  };
  const handlePay= () => {
    navigate('/boyscaptain/pay');
  };


  const [show, setShow] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(
    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?uid=R114668176&ga=GA1.1.1837137669.1726030558&semt=ais_keywords_boost"
  );


  const handleClose=()=> {
    setShow(false)
    setPreview("")
    setImageFileStatus(false)
    setBoysDetails({name:"",email:'',
      mobile:'',
      password:'',
      grade:'', wage:"",place:"",
      imgUrl:''})
  }
  const handleShow = () => setShow(true);
  const [preview, setPreview] = useState("");
  const [imageFileStatus, setImageFileStatus] = useState(false);
  useEffect(() => {
    if (
      boysDetails.imgUrl.type == "image/png" ||
      boysDetails.imgUrl.type == "image/jpg" ||
      boysDetails.imgUrl.type == "image/jpeg"
    ) {
      setImageFileStatus(false);
      setPreview(URL.createObjectURL(boysDetails.imgUrl));
    } else {
      // invalid
      setImageFileStatus(true);
      setBoysDetails({ ...boysDetails, imgUrl: "" });
      setPreview("");
    }
  }, [boysDetails.imgUrl]);

  const handleaAddBoys = async () => {
    const { name, email, mobile, place, wage, password, grade, imgUrl } = boysDetails;
    const reqBody = new FormData();
    reqBody.append("name", name);
    reqBody.append("email", email);
    reqBody.append("mobile", mobile);
    reqBody.append("place", place);
    reqBody.append("wage", wage);
    reqBody.append("password", password);
    reqBody.append("grade", grade);
    reqBody.append("imgUrl", imgUrl);
    
    const token = JSON.parse(sessionStorage.getItem("token"))
    console.log(token);
    
    if(token){
      const reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      if(name && email && mobile  && place && wage && imgUrl && grade){
        try {
          setLoading(true)
          const result = await addBoysApi(reqBody, reqHeader);
          
          if(result.status === 200){
            toast.success("Successfully added");
            handleClose();
          }else if(result.status == 409){
            toast.error("user Already exist");
            handleClose();
          }
        } catch (e) {
          console.error("Error adding boy:", e);
        }finally{
          setLoading(false)
        }
      }else{
        alert("all fields are required")
      }
      
    } else {
      alert("Authentication token missing. Please login again.");
    }
  }

  const triggerFileInput = () => {
    document.getElementById("imageInput").click();
  };


  return (
    <>

      <div className='home d-flex flex-column ' style={{ width: `${width}px`, height: `${height}px`, paddingLeft: "10px", paddingRight: "10px" }}>
        <div style={{ marginTop: `${height * 0.1 + 15}px`, }}>
          {/* <img src={profile} alt="" width={"50px"} height={"0px"} /> */}
          <span style={{ paddingLeft: "10px", fontSize: "18px" }}>Welcome Shahir ,</span>

        </div>
        <div className='d-flex'>

          <div onClick={handleTodayClick} className='today d-flex justify-content-center align-items-center ' style={{
            height: `${height * 0.18}px`, width: `${width}px`, margin: "10px", borderRadius: "10px", border: "1px solid", padding: "10px", backgroundImage: `url("https://img.freepik.com/premium-photo/notebook-with-events-alarm-clock-two-tone_185193-45714.jpg?uid=R114668176&ga=GA1.1.1837137669.1726030558&semt=ais_keywords_boost")`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: "center"
          }}
          >
          </div>




        </div>
        <span style={{ marginLeft: "10px", fontSize: "18px", fontWeight: "500" }}>Overview</span>
        <div onClick={handleShow} className='service ' style={{ height: `${height * 0.2}px`, margin: "10px", marginTop: "10px", borderRadius: "10px", border: "1px solid", padding: "10px", backgroundImage: `url(https://i.postimg.cc/4xCNpqQz/boysbg.png)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: "right" }}>
          <div className=''> <span style={{ fontSize: "18px", fontWeight: "500" }}>Boys <PlusCircle style={{ color: "green" }} /></span>
            <span style={{ color: "rgba(50, 168, 82)", fontSize: "16px", fontWeight: "500" }}></span>
          </div>
          <div className='d-flex justify-content-start mt-2'><span style={{ fontSize: "20px", fontWeight: "500" }}>25</span></div>
        </div>

        <div className='Payment ' onClick={handlePay} style={{ height: `${height * 0.2}px`, margin: "10px", marginTop: "10px", borderRadius: "10px", border: "1px solid", padding: "10px", backgroundImage: `url(https://i.postimg.cc/gJBGjT0L/paymentbg.png)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: "right" }}>
          <div className=' d-flex justify-content-between'> <span style={{ fontSize: "18px", fontWeight: "500" }}>Pay  <PlusCircle style={{ color: "green" }} /></span>
            <span style={{ color: "rgba(50, 168, 82)", fontSize: "16px", fontWeight: "500" }}></span>
          </div>
          <div className='d-flex justify-content-start mt-2'><span style={{ fontSize: "20px", fontWeight: "500" }}>2500</span></div>
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
          <Modal.Title>Add new boy</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
          <div
            onClick={triggerFileInput}
            style={{
              height: "100px",
              width: "100px",
              backgroundColor: "green",
              borderRadius: "10px",
              border: "1px solid",
              backgroundImage: `url(${preview ? preview : backgroundImage})`,
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
            onChange={(e)=>setBoysDetails({...boysDetails,imgUrl:e.target.files[0]})}
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
                <li>Mobile</li>
                <li>Email</li>
                <li>Place</li>
                <li>Grade</li>
                <li>Wage</li>
                <li>Password</li>
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
                    onChange={(e)=>setBoysDetails({...boysDetails,name:e.target.value})}

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
                    onChange={(e)=>setBoysDetails({...boysDetails,mobile:e.target.value})}

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
                    onChange={(e)=>setBoysDetails({...boysDetails,email:e.target.value})}

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
                    onChange={(e)=>setBoysDetails({...boysDetails,place:e.target.value})}

                  />
                </li>
                <li>

                  <select
                    
                    aria-label="Select Category"
                    style={{
                      fontSize: "16px",
                      borderRadius: "5px",
                      height: "35px",
                      width: `${width / 2 + 40}px`,
                      paddingLeft: "5px",
                      marginBottom: "10px",
                      border: "1px solid",
                    }}
                    onChange={(e)=>setBoysDetails({...boysDetails,grade:e.target.value})}



                  >
                    <option hidden value="">Select</option>
                    
                    <option value="captain">Captain</option>
                    <option value="vicecaptain">Vice Captain</option>
                    <option value="agrade">A Grade</option>
                    <option value="bgrade">B Grade</option>
                    <option value="general">General</option>

                  </select>
                </li>
                <li>
                  <input
                   
                    style={{
                      borderRadius: "5px",
                      height: "35px",
                      width: `${width / 2 + 40}px`,
                      paddingLeft: "5px",
                      marginBottom: "10px",
                      border: "1px solid",
                    }}
                    placeholder="00"
                    onChange={(e)=>setBoysDetails({...boysDetails,wage:e.target.value})}


                  />
                </li>
                <li>
                  <input
                  
                    style={{
                      borderRadius: "5px",
                      height: "35px",
                      width: `${width / 2 + 40}px`,
                      paddingLeft: "5px",
                      marginBottom: "10px",
                      border: "1px solid",
                    }}
                    placeholder="Password"
                    onChange={(e)=>setBoysDetails({...boysDetails,password:e.target.value})}


                  />
                </li>


              </ul>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>

          <Button onClick={handleaAddBoys} variant="success">{loading ? <Spinner animation="border" size="sm" />: "Add"}</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Delete */}

    </>
  )
}

export default BcHome