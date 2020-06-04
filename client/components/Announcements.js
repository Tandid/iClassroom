import React from 'react'
import {connect} from 'react-redux'
import Sidebar from './Sidebar.js'
import AnnouncementCard from './AnnouncementCard.js'
import {Link} from 'react-router-dom'

class Announcements extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {course, teachers, filteredAnnouncements, user} = this.props
    const instructor = teachers.find(teacher =>
      course.UserCourses.find(usercourse => usercourse.userId === teacher.id)
    )

    if (!course || !instructor) {
      return null
    }
    return (
      <div className="course-home-wrapper">
        <Sidebar {...course} instructor={instructor} />
        <div className="course-content">
          <div className="course-content-header">
            <h1>Announcements</h1>
            {user.isTeacher === true && (
              <Link className="add-button" to="/createAnnouncement">
                +
              </Link>
            )}
          </div>
          <div>
            {filteredAnnouncements.map(announcement => {
              return (
                <AnnouncementCard key={announcement.id} {...announcement} />
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({courses, teachers, announcements, user}, {match}) => {
  const course = courses.find(_course => _course.id === Number(match.params.id))
  const filteredAnnouncements = announcements.filter(
    announcement => announcement.courseId === Number(match.params.id)
  )
  return {course, teachers, filteredAnnouncements, user}
}

export default connect(mapStateToProps)(Announcements)
