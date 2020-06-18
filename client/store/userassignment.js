import axios from 'axios'

//ACTION TYPES
export const READ_USERASSIGNMENT = 'READ_USERASSIGNMENT'
export const READ_USERASSIGNMENTS = 'READ_USERASSIGNMENTS'
export const UPDATE_USERASSIGNMENT = 'UPDATE_USERASSIGNMENT'
export const CREATE_USERASSIGNMENT = 'CREATE_USERASSIGNMENT'

//ACTION CREATORS
const _readUserassignment = userassignment => {
  return {
    type: READ_USERASSIGNMENT,
    userassignment
  }
}

const _readUserassignments = userassignments => {
  return {
    type: READ_USERASSIGNMENTS,
    userassignments
  }
}

const _updateUserassignment = userassignment => {
  return {
    type: UPDATE_USERASSIGNMENT,
    userassignment
  }
}

const _createUserassignment = userassignment => {
  return {
    type: CREATE_USERASSIGNMENT,
    userassignment
  }
}

//THUNK CREATORS
export const readUserassignment = id => {
  return async dispatch => {
    const _userassignment = (await axios.get(`/api/userassignments/${id}`)).data
    dispatch(_readUserassignment(_userassignment))
  }
}

export const readUserassignments = () => {
  return async dispatch => {
    const userassignments = (await axios.get('/api/userassignments')).data
    dispatch(_readUserassignments(userassignments))
  }
}

export const updateUserassignment = (id, userassignment) => {
  return async dispatch => {
    const updatedUserassignment = (await axios.put(
      `/api/userassignments/${id}`,
      userassignment
    )).data
    dispatch(_updateUserassignment(updatedUserassignment))
  }
}

export const createUserassignment = userassignment => {
  return async dispatch => {
    const createdUserassignment = (await axios.post(
      '/api/userassignments',
      userassignment
    )).data
    dispatch(_createUserassignment(createdUserassignment))
  }
}

//REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case CREATE_USERASSIGNMENT:
      return [...state, action.userassignment]
    case READ_USERASSIGNMENT:
      return action.userassignment
    case READ_USERASSIGNMENTS:
      return action.userassignments
    case UPDATE_USERASSIGNMENT:
      return state.map(
        userassignment =>
          userassignment.id === action.userassignment.id
            ? action.userassignment
            : userassignment
      )
    default:
      return state
  }
}
