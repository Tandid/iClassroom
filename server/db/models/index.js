const db = require('../db')
const User = require('./user')
const Assignment = require('./assignment')
const Course = require('./course')
const Announcement = require('./announcement')
const Lesson = require('./lesson')
const Image = require('./image')

// blank models
const UserCourse = db.define('UserCourse')

User.belongsToMany(Course, {through: UserCourse})
Course.belongsToMany(User, {through: UserCourse})

Course.hasMany(UserCourse)
UserCourse.belongsTo(Course)

Course.hasMany(Assignment)
Assignment.belongsTo(Course)

Assignment.belongsToMany(User, {through: 'UserAssignment'})
User.belongsToMany(Assignment, {through: 'UserAssignment'})

Course.hasMany(Announcement)
Announcement.belongsTo(Course)

Course.hasMany(Lesson)
Lesson.belongsTo(Course)

module.exports = {
  User,
  Assignment,
  Image,
  Course,
  UserCourse,
  Announcement,
  Lesson
}
