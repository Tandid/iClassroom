import axios from 'axios'
const XLSX = require('xlsx')
/**
 * ACTION TYPES ------------------------------------------------
 */
const GET_TEST = 'GET_TEST'
const CREATE_TEST = 'CREATE_TEST'
const DELETE_TEST = 'DELETE_TEST'

/**
 * INITIAL STATE --------------------------------------------------
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const _getTest = test => ({
  type: GET_TEST,
  test
})
const _createTest = test => ({
  type: CREATE_TEST,
  test
})
const _deleteTest = id => ({
  type: DELETE_TEST,
  id
})

/**
 * THUNK CREATORS -------------------------------------------------
 */

export const deleteTest = id => {
  return async dispatch => {
    await axios.delete(`/api/test/${id}`)
    dispatch(_deleteTest(id))
  }
}

export const getTest = () => {
  console.log('hello from store')
  let rowObj
  let allRows = []
  let testObj = {}
  let testArray = []
  let data

  return async dispatch => {
    data = await axios.get('/api/test')
    // let len = data.data.length
    // console.log(data.data.length)

    // // for (let i = 0; i < len; i++) {
    // console.log('inside return ', data.data)
    // //for (let i = 0; i < len; i++) {
    // let name = data.data[0].name
    // data = Object.fromEntries(data.data[0].test)
    // data = Object.values(data).map(Number)
    // //let a = data.split(',').map(Number)
    // let wb = XLSX.read(data, {type: 'array'})
    // wb.SheetNames.forEach(sheet => {
    //   rowObj = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheet])
    //   allRows.push(rowObj)
    // })
    // testObj = {name: name, test: allRows}

    // testArray.push(testObj)
    //}

    //console.log(testObj, testArray)
    dispatch(_getTest(data.data))
  }
}

export const createTest = testObj => {
  return async dispatch => {
    const response = await axios.post('/api/test', testObj)
    dispatch(_createTest(response.data))
  }
}

/**
 * REDUCER -------------------------------------------------------
 */
export const test = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEST:
      return action.test

    case CREATE_TEST:
      return [...state, action.test]

    case DELETE_TEST:
      return state.filter(test => test.id !== action.id)

    default:
      return state
  }
}

//export {getTest, createTest, test}
