import React, { useEffect, useState } from "react";
import QrIcon from "../assets/scanner.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { eventByIdApi, scanAndExitBoysApi, scanBoysApi, scannedBoysApi, updateStatusapi } from "../services/allApis";
import { Howl } from "howler";
import beepSound from "../assets/beep.mp3";
import { toast } from "react-toastify";

const Auditorium = ({ height, width }) => {
  const { id } = useParams();
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [show, setShow] = useState(false);
  const[workers,setWorkers]=useState([])
  const [eventDetail,setEventDetails] = useState('')

  const navigate = useNavigate();
  const back = () => navigate(-1);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

    // 🔊 Initialize sound
  const sound = new Howl({ src: [beepSound] });
  const playBeep = () => {
    sound.play();
  };
  // fetch id by id from params
  const eventByid = async(id)=>{
    try {
      const result = await eventByIdApi(id)
      if(result.status == 200){
        console.log("Auditorium",result.data);
        setEventDetails(result.data)     
      }
    } catch (e) {
      console.log(e);
      
    }
  }


  useEffect(() => {
    if (isScanning && eventDetail) {
      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        },
        false
      );
  
      scanner.render(
        async (decodedText) => {
          setScanResult(decodedText);
          playBeep()
          setIsScanning(false);
          scanner.clear(); // Stop scanning after success
          
          const token = JSON.parse(localStorage.getItem("eventToken"))
          console.log(token);
            const reqHeader = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
        
          if(eventDetail?.status == 'ongoing'){

            try {
              
              console.log(eventDetail._id);
              
              const response = await scanBoysApi({ id: decodedText,mongoEventId:eventDetail._id },reqHeader); // ✅ Send as object
              console.log("Scanned Data:", response);
                console.log(response.data);
                if(response.status == 200){
                  fetchScannedBoys()
                }
                
        if(response.status == 401){
          toast.warn("Already Scanned")
        }
               
            } catch (error) {
              console.error("Scan API Error:", error);
            }
          }else if(eventDetail?.status == 'pending'){
            try {
              const result = await scanAndExitBoysApi({boyId:decodedText},reqHeader)
              if(result.status == 200){
                toast.success("Boy exited successfully");
                fetchScannedBoys()
              }
            } catch (e) {
             console.log(e);
              
            }
          }
        },
        (error) => {
          console.warn("QR Scan Error:", error);
        }
      );
  
      return () => {
        scanner.clear().catch((err) => console.warn("Error clearing scanner:", err));
      };
    }
  }, [isScanning,eventDetail]); // ✅ No infinite re-renders
  
 
// close event
  const updateStatus = async (status) => {
    try {
      const result = await updateStatusapi(id, status);
      if (result.status === 200) {
        toast.info("Event closed");
        // localStorage.removeItem('eventToken');
        // localStorage.removeItem('event');
        console.log(result.data);
        
         navigate("/captain");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  // fetch workers
  useEffect(()=>{
    fetchScannedBoys()
    eventByid(id)
    
  },[id])

  const fetchScannedBoys=async()=>{
    const token = JSON.parse(localStorage.getItem("eventToken"))
    console.log(token);
      const reqHeader = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
    try {
      const result = await scannedBoysApi(reqHeader)
      if(result.status == 200){
        setWorkers(result.data)
        console.log(result.data);  
      }

    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div style={{ marginTop: `${height * 0.1 + 10}px`, width: `${width}` }}>
        <div className="d-flex p-2 justify-content-between mx-3 " style={{ fontSize: "13px" }}>
          <div className="d-flex gap-3 ">
            <i onClick={back} className="fa-solid fa-angle-left fs-3 "></i>
            <h5 style={{ marginTop: "1px" }}>{eventDetail.name}, {eventDetail.place}</h5>
          </div>
          <p style={{ marginTop: "3px" }} className="text-success fw-semibold ">
            08:30 am
          </p>
        </div>

        <div className="d-flex justify-content-center align-items-center mt-3 ">
          <div
            className={`border border-dark px-5 w-75 ms-3 me-3 rounded d-flex justify-content-center align-items-center ${
              isScanning  &&  "d-none" 
            }`}
            style={{ height: "39px" }}
          >
            Search
          </div>

          <div className="text-center">
            <img
              onClick={() => setIsScanning(true)}
              className={`me-3`}
              width={"50px"}
              src={QrIcon}
              alt="QR Scanner"
            />

            {isScanning && <div id="qr-reader" style={{ width: "300px", margin: "auto" }}></div>}

            {/* {scanResult && (
              <div className="mt-3">
                <button className="btn btn-success" onClick={() => setIsScanning(true)}>
                  Scan Again
                </button>
              </div>
            )} */}
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center ms-3 me-3 mt-4">
          <p className="ms-1">Count : {workers.length}</p>
          <p onClick={()=>updateStatus("pending")} className="border border-dark px-4 rounded ">close</p>
        </div>

        <hr className="border w-100 shadow border-secondary mx-1 mb-3" />

        <div className="d-flex justify-content-between ">
          <p className="ms-3">Boys :</p>
          <p style={{ fontSize: "13px" }} className="btn">
            Clear all
          </p>
        </div>

        <div className="min-vh-100 mb-3">
          { workers.length>0 ?
          workers.map((items,i)=>(
            <div key={items._id}
            onClick={handleShow}
            className="d-flex justify-content-between align-items-center border rounded border-dark mx-3 mt-4 "
          >
            <div className="d-flex gap-5 ms-3 mt-2">
              <h3>{i+1}</h3>
              <h3>{items.boyName}</h3>
            </div>
            <div className="d-flex gap-2 justify-content-center align-items-center mt-3 ">
              <p className="text-secondary ">c/o</p>
              <p style={{ fontSize: "12px" }} className="text-danger btn ">
                Remove
              </p>
            </div>
          </div>
          )): <div className="d-flex align-items-center justify-content-center">No Boys Yet...!!</div>
           
          }
          {/* <button
          
          className="mb-5 btn btn-danger float-end me-3 mt-2 d-flex align-items-center justify-content-center mb-3 "
          style={{ fontSize: "13px" }}
        >
          Close
        </button> */}
          <button
          onClick={()=>updateStatus("closed")}
          className="mb-5 btn btn-danger float-end me-3 mt-2 d-flex align-items-center justify-content-center mb-3 "
          style={{ fontSize: "13px" }}
        >
          Close
        </button>
        </div>
        
        

        <button
          className="btn btn-success fs-4 d-flex align-items-center justify-content-center rounded-circle"
          style={{ position: "fixed", bottom: "120px", right: "15px", width: "50px", height: "50px" }}
        >
          +
        </button>
      </div>

      <Modal show={show} centered>
        <Modal.Body className="pt-4">
          <div className="mb-3 d-flex align-items-center">
            <label className="form-label me-2">Name&nbsp;&nbsp;:</label>
            <input type="text" className="form-control" />
          </div>
          <div className="mb-3 d-flex align-items-center">
            <label className="form-label me-3">Entry&nbsp;&nbsp;:</label>
            <input type="text" className="form-control" />
          </div>
          <div className="mb-3 d-flex align-items-center">
            <label className="form-label me-4">C/O&nbsp;&nbsp;:</label>
            <input type="text" className="form-control" />
          </div>
          <div className="mb-3 d-flex align-items-center">
            <label className="form-label me-4">Fine&nbsp;&nbsp;:</label>
            <input type="time" className="form-control" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Link to={"/captain/view-auditorium"} className="btn btn-primary">
            Save
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Auditorium;
