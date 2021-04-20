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

//sets state with initial load from the database
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


//Set spots logic from Gary's breakout session, as it was better and more functional than my solution

const getSpotsForDay = function (dayObj, appointments) {
  let spots = 0;
  for (const id of dayObj.appointments) {
    const appointment = appointments[id];
    if (!appointment.interview) {
      spots++
    }
  }
  return spots;
}

const updateSpots = function (dayName, days, appointments) {
  const dayObj = days.find(day => day.name === dayName);
  const spots = getSpotsForDay(dayObj, appointments)
  const newDay = { ...dayObj, spots}
  const newDays = days.map(day => day.name === dayName ? newDay : day);

  return newDays;

};



function bookInterview(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  const days = [ ...updateSpots(state.day, state.days, appointments)]
  
  return axios
  .put(`/api/appointments/${id}`, {
    interview
  })
  .then((response) => {
    setState({ ...state,
      appointments,
      days
    });
  })
}

function cancelInterview(id) {
  const appointment = { 
    ...state.appointments[id],
    interview: null
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  const days = [ ...updateSpots(state.day, state.days, appointments)]

  return axios
  .delete(`/api/appointments/${id}`, {})
  .then((response) => {
    setState({ ...state,
    appointments,
    days
    });
  })
}

  return { state, setDay, bookInterview, cancelInterview}
}


