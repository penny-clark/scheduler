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