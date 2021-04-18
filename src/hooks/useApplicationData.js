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

//spots avaialable =  # of appointments where interview is null
//need to call this when appoitment is added or deleted
//update should happen to days.spots of the day of the appointment
//apparently the fact that I have access to the appointment id is a tip
//changes should only happen here

//GUESSES
//since it's all I get to work with,
//maybe instead of giving setSpots a day param, it should take an appointement id param 
//and find the day based on the id 


function setSpots(intId) {
  let day;
  let pos;
  if (intId <= 5) {
   day = "Monday"
   pos = 0
  }
    
  if (intId > 5 && intId <= 10) {
    day = "Tuesday"
    pos = 1
  }

  if (intId > 10 && intId <= 15) {
    day = "Wednesday"
    pos = 2
  }

  if (intId > 15 && intId <= 20) {
    day = "Thursday"
    pos = 3
  }

  if (intId > 20 && intId <=25) {
    day = "Friday"
    pos = 4
  }
  const dayFound = state.days.find(eachDay => eachDay.name === day)
  const emptyAppointments = dayFound.appointments.filter(appointmentId => state.appointments[appointmentId].interview === null)
  return [pos, emptyAppointments.length]
}

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

function bookInterview(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  const daysInfo = setSpots(id)
  const newDays = [ ...state.days.slice()]
  newDays[daysInfo[0]].spots = (daysInfo[1] -1)
  
  
  return axios
  .put(`/api/appointments/${id}`, {
    interview
  })
  .then((response) => {
    console.log(response)
    setState({ ...
      state,
      appointments,
      days: newDays
    });
  })
}

function cancelInterview(id) {
  const appointments = { 
    ...state.appointments,
    [id]: { ...[id], interview: null}
  };

  const daysInfo = setSpots(id)
  const newDays = [ ...state.days.slice()]
  newDays[daysInfo[0]].spots = (daysInfo[1] + 1)
  console.log(newDays, "NEW DAYS")

  return axios
  .delete(`/api/appointments/${id}`, {})
  .then((response) => {
    setState({ ...state,
    appointments,
    days: newDays
    });
  })
}

  return { state, setDay, bookInterview, cancelInterview}
}
