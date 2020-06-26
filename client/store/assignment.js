import axios from 'axios'
import store from './index'
import {createUserassignment} from './userassignment'
//ACTION TYPES
export const CREATE_ASSIGNMENT = 'CREATE_ASSIGNMENT'
export const READ_ASSIGNMENT = 'READ_ASSIGNMENT'
export const UPDATE_ASSIGNMENT = 'UPDATE_ASSIGNMENT'
export const DELETE_ASSIGNMENT = 'DELETE_ASSIGNMENT'
export const READ_ASSIGNMENTS = 'READ_ASSIGNMENTS'

//ACTION CREATORS
const _createAssignment = assignment => {
  return {
    type: CREATE_ASSIGNMENT,
    assignment
  }
}
const _readAssignment = assignment => {
  return {
    type: READ_ASSIGNMENT,
    assignment
  }
}
const _updateAssignment = assignment => {
  return {
    type: UPDATE_ASSIGNMENT,
    assignment
  }
}

const _deleteAssignment = id => {
  return {
    type: DELETE_ASSIGNMENT,
    id
  }
}

const _readAssignments = assignments => {
  return {
    type: READ_ASSIGNMENTS,
    assignments
  }
}

//THUNK CREATORS
export const createAssignment = assignment => {
  console.log(assignment)
  return async dispatch => {
    const createdAssignment = (await axios.post('/api/assignments', assignment))
      .data
    dispatch(_createAssignment(createdAssignment))
  }
}

export const createAssignmentTest = (assignment, push) => {
  console.log(assignment)
  return async dispatch => {
    const createdAssignment = (await axios.post('/api/assignments', assignment))
      .data

    const courses = await store.getState().courses
    let studentNames = await store.getState().students

    const students = courses.find(course => {
      return course.id === assignment.courseId
    })
    let a = students.UserCourses.filter(stud =>
      studentNames.find(s => stud.userId === s.id)
    )
    console.log({
      students: students,
      courses: courses,
      a: a,
      studentNames: studentNames
    })

    students.UserCourses.map((student, index) => {
      //console.log(studentNames[index].firstName)
      dispatch(
        createUserassignment({
          isComplete: false,
          courseId: student.courseId,
          userId: student.userId,
          assignmentId: createdAssignment.id,
          userName: studentNames[index].firstName
        })
      )
    })
    console.log(students)
    push(`/course/${assignment.courseId}/assignments`)
    //export const createAssignment = (assignment, push) => {
    // return async dispatch => {
    //   const createdAssignment = (await axios.post('/api/assignments', assignment))
    //     .data
    // if (push) {
    //   push(`/course/${assignment.courseId}/assignments`)
    // } else {
    //   null
    // }
    dispatch(_createAssignment(createdAssignment))
  }
}

export const updateAssignment = (assignment, id) => {
  return async dispatch => {
    const updatedAssignment = (await axios.put(
      `/api/assignments/${id}`,
      assignment
    )).data
    dispatch(_updateAssignment(updatedAssignment))
  }
}

export const readAssignment = id => {
  return async dispatch => {
    const _assignment = (await axios.get(`/api/assignments/${id}`)).data
    dispatch(_readAssignment(_assignment))
  }
}

export const deleteAssignment = id => {
  return async dispatch => {
    await axios.delete(`/api/assignments/${id}`)
    dispatch(_deleteAssignment(id))
  }
}

export const readAssignments = () => {
  return async dispatch => {
    const assignments = (await axios.get('/api/assignments')).data
    dispatch(_readAssignments(assignments))
  }
}

//REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case CREATE_ASSIGNMENT:
      return [...state, action.assignment]
    case READ_ASSIGNMENT:
      return action.assignment
    case READ_ASSIGNMENTS:
      return action.assignments
    case UPDATE_ASSIGNMENT:
      return state.map(
        assignment =>
          assignment.id === action.assignment.id
            ? action.assignment
            : assignment
      )
    case DELETE_ASSIGNMENT:
      return state.filter(assignment => assignment.id !== action.id)
    default:
      return state
  }
}
