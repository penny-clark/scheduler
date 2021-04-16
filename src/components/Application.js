import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList.js"
import "components/Appointment"
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors.js"


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState({ ...state, day})

  //api calls
  useEffect(() => {
    const daysPromise = axios.get("/api/days");
    const appointmentsPromise = axios.get("/api/appointments")
    const intervierwersPromise = axios.get("/api/interviewers")
    const promises = [daysPromise, appointmentsPromise, intervierwersPromise];
    
    Promise.all(promises)
      .then((all) => {
        const newDays = all[0].data;
        const newAppointments = all[1].data
        const newInterviewers = all[2].data
        setState(prev => ({ ...prev, days: newDays, appointments: newAppointments, interviewers: newInterviewers}))
      })
      .catch()

  }, [])

  const appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });

console.log(state.interviewers)

  return (
    <main className="layout">
      <section className="sidebar">
      <img
      className="sidebar--centered"
      src="images/logo.png"
      alt="Interview Scheduler"
    />
  <hr className="sidebar__separator sidebar--centered" />
  <nav className="sidebar__menu"> 
  <DayList
    days={state.days}
    day={state.day}
    setDay={setDay}
  /></nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
