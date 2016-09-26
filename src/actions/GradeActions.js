import AppDispatcher from '../AppDispatcher';

const GradeActions = {
  createNewGrade(studentGrade) {
    AppDispatcher.dispatch({
      type: 'CREATE_NEW_GRADE',
      payload: { studentGrade }
    })
  },
  removeStudentGrade(_id) {
    AppDispatcher.dispatch({
      type: 'REMOVE_STUDENT_GRADE',
      payload: { _id }
    })
  },
  updateGrade(updateStudentGrade) {
    AppDispatcher.dispatch({
      type: 'UPDATE_GRADE',
      payload: { updateStudentGrade }
    })
  }
}

export default GradeActions;
