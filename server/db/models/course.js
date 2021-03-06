const Sequelize = require('sequelize')
const db = require('../db')
const {STRING, INTEGER, BOOLEAN} = Sequelize

const Course = db.define('course', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  code: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1111
  },
  syllabus: {
    type: STRING,
    defaultValue:
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  isOpen: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  subject: {
    type: STRING,
    allowNull: false
  },
  gradeLevel: {
    type: STRING,
    allowNull: false
  }
})

module.exports = Course
