import React, { useState } from 'react'
import { useHttp } from '../hooks/http.hooks'

export const AuthPage = () => {
  const { loading, error, request } = useHttp()
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }
  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      console.log('Data', data)
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