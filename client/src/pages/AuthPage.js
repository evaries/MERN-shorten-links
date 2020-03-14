import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, error, request, clearError } = useHttp()
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  //hook for clearing errors
  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  //hook for active inputs after logout
  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  //register hendler
  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      message(data.message)
    } catch (e) { }
  }

  //login hendler
  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      auth.login(data.token, data.userId)
    } catch (e) { }
  }
  return (
    <div className='raw'>
      <div className="col s6 offset-s3">
        <h1 className="textCenter" >Short Link</h1>
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Card Title</span>
            <div>
              <div className="input-field col s12">
                <input
                  id="email"
                  type="email"
                  name="email"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <input
                  id="password"
                  type="password"
                  name="password"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="card-action textCenter">
              <button className='btn deep-orange'
                disabled={loading}
                onClick={loginHandler}
              >Login</button>
              <button className='btn blue'
                onClick={registerHandler}
                disabled={loading}
              >Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}