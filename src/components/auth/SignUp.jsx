import React, { useState } from 'react'
import { RegisterUser } from '../../api/api'
import {useNavigate} from 'react-router'
import {Eye, EyeOff, Check} from 'lucide-react'

export default function SignUp() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!email || !password) {
      setError('Email and password are required')
      return
    }

    setLoading(true)
    try {
      await RegisterUser({ firstName, lastName, email, password })
      setSuccess('Account created successfully')
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
      navigate('/')
      
    } catch (err) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='shadow-md bg-white max-w-130 mx-auto mt-10 p-6 border border-gray-200 rounded-xl'>
      <h2 className= 'font-bold text-2xl text-center text-gray-900'>Create an account</h2>
      <form onSubmit={handleSubmit}>
        <div style={{marginTop:10}}>
          <label>First name</label>
          <input
            placeholder="Enter your first name"
            value={firstName}
            onChange={e=>setFirstName(e.target.value)}
            className= 'w-full p-3 border border-grey-300 rounded-lg my-2 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
            
            
          />
          
        </div>
        <div style={{marginTop:10}}>
          <label>Last name</label>
          <input
            placeholder="Enter your last name"
            value={lastName}
            onChange={e=>setLastName(e.target.value)}
            className= 'w-full p-3 border border-grey-300 rounded-lg my-2 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
           
          />
        </div>

        <div style={{marginTop:10}}>
          <label>Email</label>
          <input
            placeholder="Enter your email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            className= 'w-full p-3 border border-grey-300 rounded-lg my-2 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
            type="email"
          />
        </div>

        <div style={{marginTop:10}} className= 'relative'>
          <label>Password</label>
          <input
            placeholder="Create a password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            className= 'w-full p-3 border border-grey-300 rounded-lg my-2 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
            type={showPassword ? 'text' : 'password'}
          />

          <button 
          type='button'
          onClick={() => setShowPassword(!showPassword)}
          className='absolute right-3 top-1/2 text-gray-500 hover:text-gray-700'
          >
          {showPassword ? <Eye size={20} /> : <EyeOff size={20}/>}
          
          </button>

        </div>
        <div className='text-sm text-gray-500 flex flex-col gap-2'>
          <div className='flex gap-4 items-center'> <span className=' text-white bg-gray-400 rounded-full p-1'><Check className='h-3 w-3'/></span> <p>Must be at least 8 characters</p></div>
          <div className='flex gap-4 items-center'> <span className=' text-white bg-gray-400 rounded-full p-1'><Check className='h-3 w-3'/></span> <p>Must contain an uppercase letter</p></div>
          <div className='flex gap-4 items-center'> <span className=' text-white bg-gray-400 rounded-full p-1'><Check className='h-3 w-3'/></span> <p>Must contain a number</p></div>
        </div>

        <div style={{marginTop:12}}>
          <button type="submit" disabled={loading} style={{padding:'8px 16px'}} className='btn btn-primary bg-indigo-500 cursor-pointer w-full text-white font-semibold rounded-lg hover:bg-indigo-600 transition-colors'>
            {loading ? 'Creating account...' : 'Get started'}
          </button>
        </div>

        <p className='mt-4 text-sm'>Already have an account? <button type='button' className='text-indigo-500 hover:text-indigo-600' onClick={() => navigate('/')}> Log in</button></p>
      </form>

      {error && <div className='text-red-500 mt-3 text-sm'>{error}</div>}
      {success && <div className='text-green-600 mt-3 text-sm'>{success}</div>}
    </div>
  )
}
