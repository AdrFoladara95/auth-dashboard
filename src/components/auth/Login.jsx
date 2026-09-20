import React from 'react'
import { LoginUser } from '../../api/api'
import {useState} from 'react'
import {Eye, EyeOff} from 'lucide-react'
import {useNavigate} from 'react-router'

export default function Login() {
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
              const data = await LoginUser({email, password })
              // console.log("Login response:", data)
              // sessionStorage.setItem('user', JSON.stringify(data.data))

              setSuccess('Login successfully')
              setEmail('')
              setPassword('')
              navigate('/dashboard')
            } catch (err) {
              setError(err.message || 'Login failed')
            } finally {
              setLoading(false)
            }

    }
  return (
    <div className='shadow-md bg-white max-w-130 mx-auto mt-10 p-6 border border-gray-200 rounded-xl'>
      <h2 className= 'font-bold text-2xl text-center text-gray-900'>Log in to your account</h2>
      <form onSubmit={handleSubmit}>

        <div style={{marginTop:12}}>
          <label>Email</label>
          <input
            placeholder="Enter your email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            className= 'w-full p-3 border border-grey-300 rounded-lg my-2 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 border-[#A59788] outline-blue-400'
            type="email"
          />
        </div>

        <div style={{marginTop:12}} className= 'relative'>
          <label>Password</label>
          <input
            placeholder="• • • • • • • • • • • •"
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
        <button type='button' onClick={() => navigate('/forgot-password')}
          className='text-indigo-500 hover:underline mt-2 text-sm hover:text-indigo-600'>
          Forgot password
        </button>

        <div className='mt-2'>
          <button type="submit" disabled={loading} style={{padding:'8px 16px'}} 
          className='btn btn-primary bg-indigo-500 cursor-pointer w-full text-white font-semibold rounded-lg hover:bg-indigo-600 transition-colors'
          >
            {loading ? 'Logging in...' : 'Sign in'}
          </button>
        </div>

        <p className='mt-4 text-sm'>Don't have an account? <button className='text-indigo-500 hover:text-indigo-600' onClick={() => navigate('/signup')}> Sign up</button>
        </p>
      </form>

      {error && <div style={{color:'crimson',marginTop:12}}>{error}</div>}
      {success && <div style={{color:'green',marginTop:12}}>{success}</div>}
    </div>
  )
}
