const jwt = require('jsonwebtoken')
const config = require('config')
module.exports = (req, res, next) => {
  //method to check server available
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    //split string 'bearer TOKEN' from headers.authorization and get [1] element (token)
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'No auth' })
    }

    //decoded token
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    req.user = decoded
    next()
  } catch (e) {

    res.status(401).json({ message: 'No auth' })
  }

}