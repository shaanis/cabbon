import React from 'react'
import CpAppbar from './captian/CpAppbar'
import CpBottom from './captian/CpBottom'
import CreateEvent from './captian/CreateEvent'
import CaptianService from './captian/CaptianService'
import CaptainPayment from './captian/CaptainPayment'
import { Routes, Route } from 'react-router-dom';
import Auditorium from './captian/Auditorium'
import ViewAuditorium from './captian/ViewAuditorium'
import ContextApi from './contextApi/ContextApi'
const Captainmodule = ({ height, width }) => {
  return (
    <>
      {/* Appbar and Bottom Navigation */}
      <CpAppbar height={height} width={width} />
      <CpBottom height={height} width={width} />

      {/* Define Routes */}
      <ContextApi>
        <Routes>
          {/* The parent route */}
          <Route path="/" element={<CreateEvent height={height} width={width} />} />
  
          {/* Nested routes */}
          <Route path="service" element={<CaptianService height={height} width={width} />} />
          <Route path="payment" element={<CaptainPayment height={height} width={width} />} />
          <Route path="view-auditorium" element={<ViewAuditorium height={height} width={width} />} />
          <Route path="view/:id/auditorium" element={<Auditorium height={height} width={width} />} />
        </Routes>
      </ContextApi>
    </>
  )
}

export default Captainmodule