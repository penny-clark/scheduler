import axios from "axios";
import { useState, useEffect } from "react";

export default function useApplicationData() {
const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
})

const setDay = day => setState({ ...state, day})

//sets satae with initial load from the database
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

//these two functions are going to go
function bookInterview(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  
    return axios
    .put(`/api/appointments/${id}`, {
      interview
    })
    .then((response) => {
      setState({ ...
        state,
        appointments
      });
    })
    
}

function cancelInterview(id) {
  const appointments = { 
    ...state.appointments,
    [id]: { ...[id], interview: null}
  };
    return axios
    .delete(`/api/appointments/${id}`, {})
    .then((response) => {
      setState({ ...state,
      appointments
      });
    })
  }

  return { state, setDay, bookInterview, cancelInterview}
}