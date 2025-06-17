import React, { useContext, useEffect, useState } from 'react'
import { boysEventApi, currentEventApi } from '../services/allApis';
import moment from 'moment';
import { serviceResponseContext } from '../contextApi/ContextApi';
import { Helmet } from 'react-helmet';

const HomePage = ({ height, width }) => {
    const{serviceResponse}=useContext(serviceResponseContext)
    const [events, setEvents] = useState([])
      const[eventDetails,setEventDetails]=useState("")
    
    useEffect(() => {
        currentEvent()
        fetchEvents()
    }, [])
    const boyData = JSON.parse(sessionStorage.getItem('user'));

    const currentEvent = async () => {
        if (!boyData._id) {
            alert("login failed. Please login again")
        }
        const result = await currentEventApi({ boyId: boyData._id });
        if (result.status === 200) {
            console.log("current event",result.data);
            setEvents([result.data])
        } else {
            alert("login failed. Please login again")
        }
    }

    // for service count
     const fetchEvents = async () => {
      try {
        const result = await boysEventApi({boyId:boyData._id});
        if (result.status === 200) {
          setEventDetails(result.data);
        }
      } catch (e) {
        console.log("Error fetching events:", e);
      }
    };

    return (
        <>
        <Helmet>
            <div className='home d-flex flex-column ' style={{ width: `${width}px`, height: `${height}px`, paddingLeft: "10px", paddingRight: "10px" }}>
                <div style={{ marginTop: `${height * 0.1 + 15}px`, }}>
                    {/* <img src={profile} alt="" width={"50px"} height={"0px"} /> */}
                    <span style={{ paddingLeft: "10px", fontSize: "18px" }}>Welcome {boyData.name},</span>

                </div>
               
                    
                    
                       {
                        events.length > 0 ?
                        events.map((item) => (
                        <div key={item._id} className='today ' style={{
                            height: `${height * 0.18}px`, margin: "10px", borderRadius: "10px", border: "1px solid", padding: "10px", backgroundImage: `url(https://i.postimg.cc/j2Pq1hsW/today-bg.png)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: "right"
                        }}>
                            <div className=' d-flex justify-content-between'> <span style={{ fontSize: "18px", fontWeight: "500" }}>TODAY</span>
                                <span style={{ color: "rgba(50, 168, 82)", fontSize: "16px", fontWeight: "400" }}>{moment(item.entry).format('hh:mm A')}
                                </span>
                            </div>
                            <div className='d-flex justify-content-center mt-4'><span style={{ fontSize: "20px", fontWeight: "500" }}>{item.mongoEventId?.name}</span></div>
                        </div>
                       )):
                       <div className='today ' style={{
                        height: `${height * 0.18}px`, margin: "10px", borderRadius: "10px", border: "1px solid", padding: "10px", backgroundImage: `url(https://i.postimg.cc/j2Pq1hsW/today-bg.png)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: "right"
                    }}>
                        <div className=' d-flex justify-content-between'> <span style={{ fontSize: "18px", fontWeight: "500" }}>TODAY</span>
                        </div>
                        <div className='d-flex justify-content-center mt-4'><span style={{ fontSize: "20px", fontWeight: "500" }}>Not Joined Yet</span></div>
                    </div>
                        }
                 
                   

                
                <span style={{ marginLeft: "10px", fontSize: "18px", fontWeight: "500" }}>Overview</span>
                <div className='service ' style={{ height: `${height * 0.2}px`, margin: "10px", marginTop: "10px", borderRadius: "10px", border: "1px solid", padding: "10px", backgroundImage: `url(https://i.postimg.cc/pLqW3rtB/service-bg.png)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: "right" }}>
                    <div className=''> <span style={{ fontSize: "18px", fontWeight: "500" }}>Service</span>
                        <span style={{ color: "rgba(50, 168, 82)", fontSize: "16px", fontWeight: "500" }}></span>
                    </div>
                    <div className='d-flex justify-content-start mt-2'><span style={{ fontSize: "20px", fontWeight: "500" }}>{eventDetails.length || 0}</span></div>
                </div>

                <div className='Payment ' style={{ height: `${height * 0.2}px`, margin: "10px", marginTop: "10px", borderRadius: "10px", border: "1px solid", padding: "10px", backgroundImage: `url(https://i.postimg.cc/gJBGjT0L/paymentbg.png)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: "right" }}>
                    <div className=' d-flex justify-content-between'> <span style={{ fontSize: "18px", fontWeight: "500" }}>Earnings</span>
                        <span style={{ color: "rgba(50, 168, 82)", fontSize: "16px", fontWeight: "500" }}></span>
                    </div>
                    <div className='d-flex justify-content-start mt-2'><span style={{ fontSize: "20px", fontWeight: "500" }}>2500</span></div>
                </div>

            </div>
            </Helmet>
        </>

    )
}

export default HomePage