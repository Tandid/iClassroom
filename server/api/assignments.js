const router = require('express').Router()
const {Assignment, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const assignments = await Assignment.findAll({
      include: [
        {
          model: User
        }
      ]
    })
    res.json(assignments)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const assignment = await Assignment.findByPk(id)
    assignment.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const assignment = await Assignment.create(req.body)
    res.status(201).send(assignment)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', (req, res, next) => {
  Assignment.findByPk(req.params.id)
    .then(assign => assign.update(req.body))
    .then(assign => res.send(assign))
    .catch(next)
})
