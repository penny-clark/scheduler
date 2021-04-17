import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList.js"
import "components/Appointment"
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors.js"


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
  function bookInterview(id, interview) {
    //In the future it will allow us to change the local state when we book an interview.
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

      axios
      .put(`/api/appointments/${id}`, {
        interview
      })
      .then((response) => {
      });
      setState({ ...
        state,
        appointments
      });
  }

  function cancelInterview(id, interview) {
    
  }
 
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
      />
    );
  });


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
