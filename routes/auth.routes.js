const { Router } = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const router = Router()

// /api/auth/register
router.post('/register',
  [
    //middleware express-validator for checking credentials
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Enter at least 6 characters')
      .isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      //check errors after validation
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Invalid data for registration'
        })
      }
      //get email and pw rfom user request
      const { email, password } = req.body
      //check email for existing users
      const candidate = await User.findOne({ email })
      if (candidate) {
        return res.status(400).json({ message: 'User already exists!' })
      }
      //heshing the password
      const hashedPassword = await bcrypt.hash(password, 10)
      //create new user
      const user = new User({ email, password: hashedPassword })
      //save new user
      await user.save()
      res.status(201).json({ message: 'User created!' })
    } catch (e) {
      res.status(500).json({ message: 'Somthing went wrong, try again...' })
    }
  })

// /api/auth/login
router.post('/login',
  [
    //middleware express-validator for checking credentials
    check('email', 'Enter correct email').normalizeEmail().isEmail(),
    check('password', 'Enter password').exists()
  ],
  async (req, res) => {
    try {
      //check errors after login
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Invalid data for login'
        })
      }
      const { email, password } = req.body
      //find user in DB
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: 'User not found' })
      }
      //check if passwords are matched
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ message: 'Wrong password' })
      }
      //create token by jsonwebtoken 
      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      )
      //response for login
      res.json({ token, userId: user.id })
    } catch (e) {
      res.status(500).json({ message: 'Somthing went wrong, try again...' })
    }
  })

module.exports = router