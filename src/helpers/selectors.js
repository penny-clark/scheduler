export function getAppointmentsForDay(state, day) {
  const result = [];
  let selectedDay;

  /* alt method from breakout session
  const dayFound = state.days.find(eachDay => eachDay.name === day);
  if(!dayFound) {
    return [];
  }

  dayFound.appoinments.map(appointmentId => state.appointments[appointmentId])
  */

  for (const givenday of state.days) {
    if (givenday.name === day) {
      selectedDay = givenday;
    }
  }

  if (selectedDay === undefined) return result;

  for (const appointment of selectedDay.appointments) {
    result.push(state.appointments[appointment])
  }
  return result;
};

export function getInterview(state, interview) {
  const result = {}
  if (interview === null) return null;
  const interviewerMatch = state.interviewers[interview.interviewer]
  result["student"] = interview.student;
  result["interviewer"] = interviewerMatch;
  return result;
}