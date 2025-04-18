import { PlusCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getEventApi } from '../services/allApis'
import { eventResponseContext } from '../contextApi/ContextApi'

const ViewAuditorium = ({height,width}) => {
  const[eventDetails,setEventDetails]=useState([])
  useEffect(()=>{
    fetchEvent()
  },[])

  const fetchEvent = async()=>{
    try {
        const result = await getEventApi()
        if(result.status == 200){
          setEventDetails(result.data)
         
        //  const evsts = result.data?.filter(item=>item.length-1).map(item=>console.log(item.status)
        //  ) 
        //  console.log(evsts);
         
        //   console.log(result.data);
        //   console.log(eventDetails);
          
          
        }
    } catch (e) {
      console.log(e);
      
    }
  }
  return (
    <>
         <div className='home d-flex flex-column ' style={{ width: `${width}px`, height: `${height}px`, paddingLeft: "10px", paddingRight: "10px" }}>
        <div style={{ marginTop: `${height * 0.1 + 15}px`, }}>


        </div>
        {
          eventDetails?.length>0?
          eventDetails.map(item=>(
            <Link key={item._id} to={`/captain/auditorium`} className='text-dark'  style={{ textDecoration:'none',
              height: `${height * 0.18}px`, margin: "10px", borderRadius: "10px", border: "1px solid", cursor: "pointer"
            }}>
              <div className="d-flex gap-3 justify-content-between p-3 fs-5">
                <p>Today</p>
                <p className='text-danger'>08:30 am</p>
              </div>
              <p style={{fontWeight:'500'}} className='ps-3 fs-5'>{item?.name}</p>
            </Link>
          ))
          :""
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
    </>
  )
}

export default ViewAuditorium