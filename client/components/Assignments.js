import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteAssignment} from '../store/assignment'
import {deleteUserassignment} from '../store/userassignment'
import TableAssignments from './TableAssignments'
import Sidebar from './Sidebar'
import {Grid} from '@material-ui/core'
import ManageAssignments from './ManageAssignments'
import {createAssignment} from '../store/assignment'
import UploadExcel from './UploadExcel'
import {
  updateUserassignment,
  createUserassignment
} from '../store/userassignment'

class Assignments extends Component {
  constructor() {
    super()
  }

  render() {
    const {
      course,
      teachers,
      removeAssign,
      removeUserassign,
      user,
      save,
      load,
      update,
      create,
      filteredStudents
    } = this.props
    const instructor = teachers.find(teacher =>
      course.UserCourses.find(usercourse => usercourse.userId === teacher.id)
    )

    const isInstructor = instructor.id === user.id
    const allUserassignments = this.props.userassignment
    const theUserassignments = this.props.userassignment.filter(
      userassignment => userassignment.userId === user.id
    )
    const allAssignments = this.props.assignment
    const assignmentsForCourse = this.props.assignment.filter(
      assignment => assignment.courseId === course.id
    )

    if (!this.props.assignment || !instructor) {
      return null
    }
    return (
      <Grid container>
        <Sidebar {...course} instructor={instructor} />
        {isInstructor ? (
          <Grid item xs={12} sm={11}>
            <ManageAssignments
              assignment={assignmentsForCourse}
              course={course}
              removeAssign={removeAssign}
              removeUserassign={removeUserassign}
              save={save}
              load={load}
              update={update}
              create={create}
              students={filteredStudents}
              allAssignments={allAssignments}
              instructor={instructor}
              allUserassignments={allUserassignments}
            />
          </Grid>
        ) : (
          <Grid item xs={12} sm={11}>
            <TableAssignments
              assignment={assignmentsForCourse}
              update={update}
              userassignment={theUserassignments}
            />
          </Grid>
        )}
        {/* <div align="center">
          <UploadExcel />
          <div id="displayExcel" />
        </div> */}
      </Grid>
    )
  }
}

const mapStateToProps = (
  {courses, teachers, assignment, user, userassignment, students},
  {match}
) => {
  const course = courses.find(_course => _course.id === Number(match.params.id))

  const filteredStudents = students.filter(student =>
    course.UserCourses.find(usercourse => usercourse.userId === student.id)
  )
  return {course, teachers, assignment, user, userassignment, filteredStudents}
}

const mapDispatchToProps = dispatch => {
  return {
    removeAssign: id => {
      console.log('deleting assign', id)
      dispatch(deleteAssignment(id))
    },

    removeUserassign: id => {
      console.log('deleting userassign', id)
      dispatch(deleteUserassignment(id))
    },

    save: assignment => dispatch(createAssignment(assignment)),

    update: (id, userassignment) => {
      dispatch(updateUserassignment(id, userassignment))
    },

    create: userassignment => dispatch(createUserassignment(userassignment))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Assignments)
