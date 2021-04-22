export function getAppointmentsForDay(state, day) {
  const result = [];
  let selectedDay;

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

//Approach for this function based on the getAppointmentsForDay walkthrough in this breakout session: https://www.youtube.com/watch?v=dr9KjrI5Ihg
export function getInterviewersForDay(state, day) {
  const dayFound = state.days.find(eachDay => eachDay.name === day);
  if(!dayFound) {
    return [];
  }

  const interviewersForDay = dayFound.interviewers.map(interviewerId => state.interviewers[interviewerId])

  return interviewersForDay;
}