import React, {Component} from 'react'
import {connect} from 'react-redux'

class Grades extends Component {
  constructor() {
    super()
  }

  // componentDidMount() {
  //   this.props.load()
  // }

  render() {
    console.log('props', this.props)
    //   const {course, teachers, remove, user} = this.props
    //   const instructor = teachers.find(teacher =>
    //     course.UserCourses.find(usercourse => usercourse.userId === teacher.id)
    //   )

    //   //console.log('current user', user)
    //   const isInstructor = instructor.id === user.id
    //   const theUserassignments = this.props.userassignment.filter(
    //     userassignment => userassignment.userId === user.id
    //   )
    //   //console.log('current user assignments', theUserassignments)

    //   const assignmentsForCourse = this.props.assignment.filter(
    //     assignment => assignment.courseId === course.id
    //   )
    //   //console.log('assignments', assignmentsForCourse)

    //   if (!this.props.assignment || !instructor) {
    //     return null
    //   }
    return (
      <h1>Grades here!!</h1>

      // <Grid container>
      //   <Sidebar {...course} instructor={instructor} />
      //   {isInstructor ? (
      //     <Grid item xs={12} sm={11}>
      //       <ManageAssignments assignment={assignmentsForCourse} />
      //     </Grid>
      //   ) : (
      //     <Grid item xs={12} sm={11}>
      //       <TableAssignments
      //         assignment={assignmentsForCourse}
      //         remove={remove}
      //       />
      //     </Grid>
      //   )}
      // </Grid>
    )
  }
}

const mapStateToProps = ({userassignment}) => {
  if (!userassignment) {
    return {}
  }
  return {
    userassignment
  }
}

//   const mapStateToProps = (
//     {courses, teachers, assignment, user, userassignment},
//     {match}
//   ) => {
//     const course = courses.find(_course => _course.id === Number(match.params.id))
//     return {course, teachers, assignment, user, userassignment}
//   }

//   const mapDispatchToProps = dispatch => {
//     return {
//     }
//   }

export default connect(mapStateToProps)(Grades)
