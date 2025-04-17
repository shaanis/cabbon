import { useContext, useEffect, useState } from "react";
import { Modal, Button, Card, Spinner } from "react-bootstrap";
import { PlusCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { addEventApi,getEventApi } from "../services/allApis";
import { eventResponseContext } from "../contextApi/ContextApi";



const CreateEvent = ({ height, width }) => {
  const[isLoading,setIsLoading]=useState(false)
    const{fetchEventResponse,setFetchEventResponse} = useContext(eventResponseContext)
  const[eventData,setEventData]=useState({
    name:"",time:"",finetime:"",place:""
  })
  const[eventDetails,setEventDetails]=useState([])
  useEffect(()=>{
    fetchEvent()
  },[])
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  const navigate = useNavigate()
  const handleAddEvent=async()=>{
    const boyData = JSON.parse(sessionStorage.getItem('user'))
    const token = JSON.parse(sessionStorage.getItem("token"))
    const reqHeader={ "Authorization":`Bearer ${token}`}
    if(eventData.name && eventData.time && eventData.finetime&&eventData.place){
      try{
        setIsLoading(true)
         const result = await addEventApi({...eventData,userId:boyData._id},reqHeader)
         if(result.status>=200 && result.status<299){
          alert("added")
          localStorage.setItem("event",JSON.stringify(result.data.event))
          localStorage.setItem("eventToken",JSON.stringify(result.data.token))
          // navigate('/captain/view-auditorium')
          handleClose()
          fetchEvent()
         }
      }catch(e){
      console.log(e);
      }finally{
        setIsLoading(false)
      }
    }
  }

  // getevents
  
  const fetchEvent = async () => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const reqHeader = { "Authorization": `Bearer ${token}` };
    try {
      const result = await getEventApi(reqHeader);
      if (result.status === 200) {
        setEventDetails(result.data);
        setFetchEventResponse(result.data);
        console.log(result.data);
      }
    } catch (e) {
      console.log("Fetch event failed:", e);
    }
  }
  

  return (

    <>

      <div className='home d-flex flex-column ' style={{ width: `${width}px`, height: `${height}px`, paddingLeft: "10px", paddingRight: "10px" }}>
        <div style={{ marginTop: `${height * 0.1 + 15}px`, }}>


        </div>
       {
         eventDetails.length <= 0?
        <div onClick={handleShow} className='d-flex justify-content-center align-items-center' style={{
          height: `${height * 0.18}px`, margin: "10px", borderRadius: "10px", border: "1px solid", cursor: "pointer"
        }}>
          <div className="d-flex gap-3 justify-content-between align-items-center">
            <span className="fw-semibold fs-5">Create a Event</span>
            <PlusCircle className="text-success" size={30} />
          </div>
        </div>
        :
         eventDetails.map(item=>(
                    <Link key={item._id} to={`/captain/view/${item._id}/auditorium`} className='text-dark'  style={{ textDecoration:'none',
                      height: `${height * 0.18}px`, margin: "10px", borderRadius: "10px", border: "1px solid", cursor: "pointer"
                    }}>
                      <div className="d-flex gap-3 justify-content-between p-3 fs-5">
                        <p>Today</p>
                        <p className='text-success'>08:30 am</p>
                      </div>
                      <p style={{fontWeight:'500'}} className='ps-3 fs-5'>{item?.name}</p>
                    </Link>
                  ))
        }
        <span style={{ marginLeft: "10px", fontSize: "18px", fontWeight: "500" }}>Overview</span>
        <div className='service ' style={{ height: `${height * 0.2}px`, margin: "10px", marginTop: "10px", borderRadius: "10px", border: "1px solid", padding: "10px", backgroundImage: `url(https://i.postimg.cc/pLqW3rtB/service-bg.png)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: "right" }}>
          <div className=''> <span style={{ fontSize: "18px", fontWeight: "500" }}>Service</span>
            <span style={{ color: "rgba(50, 168, 82)", fontSize: "16px", fontWeight: "500" }}></span>
          </div>
          <div className='d-flex justify-content-start mt-2'><span style={{ fontSize: "20px", fontWeight: "500" }}>25</span></div>
        </div>

        <div  className='Payment ' style={{ height: `${height * 0.2}px`, margin: "10px", marginTop: "10px", borderRadius: "10px", border: "1px solid", padding: "10px", backgroundImage: `url(https://i.postimg.cc/gJBGjT0L/paymentbg.png)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: "right" }}>
          <div className=' d-flex justify-content-between'> <span style={{ fontSize: "18px", fontWeight: "500" }}>Earnings</span>
            <span style={{ color: "rgba(50, 168, 82)", fontSize: "16px", fontWeight: "500" }}></span>
          </div>
          <div className='d-flex justify-content-start mt-2'><span style={{ fontSize: "20px", fontWeight: "500" }}>2500</span></div>
        </div>

      </div>

      <Modal show={show} centered>
        <Modal.Header >
          <Modal.Title>Create a Event</Modal.Title>
          <span className="ms-auto text-muted">10-02-2025</span>
        </Modal.Header>
        <Modal.Body>
          <input value={eventData.name} onChange={(e)=>setEventData({...eventData,name:e.target.value})} type="text" className="form-control mb-3 border border-1" placeholder="Auditorium" />
          <input value={eventData.place} onChange={(e)=>setEventData({...eventData,place:e.target.value})} type="text" className="form-control mb-3 border border-1" placeholder="Place" />
          <input value={eventData.time} onChange={(e)=>setEventData({...eventData,time:e.target.value})} type="text" className="form-control mb-3 border border-1" placeholder="Time (breakfast/noon/dinner)" />
           <input value={eventData.finetime} onChange={(e)=>setEventData({...eventData,finetime:e.target.value})} type="time" className="form-control mb-3 border border-1" placeholder="Fine time" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddEvent} className="btn btn-primary" variant="primary">Add{isLoading && <Spinner animation="border" size="sm" />}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateEvent;
