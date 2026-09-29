import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router'
import { loginDemoUser } from '../../utils/demoAuth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    setError(null)

    if (!email || !password) {
      setError('Email and password are required')
      return
    }

    setLoading(true)

    try {
      loginDemoUser(email, password)

      setTimeout(() => {
        navigate('/dashboard')
      }, 500)
    } catch (err) {
      setError(err.message || 'Login failed')
      setLoading(false)
    }
  }

  return (
    <div className="shadow-md bg-white w-full max-w-130 mx-auto mt-6 sm:mt-10 p-5 sm:p-6 border border-gray-200 rounded-xl">
      <h2 className="font-bold text-xl sm:text-2xl text-center text-gray-900">
        Log in to your account
      </h2>

      <p className="text-center text-sm text-gray-500 mt-2">
        Demo mode — use any email and password
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mt-5">
          <label>Email</label>

          <input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg my-2 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            type="email"
          />
        </div>

        <div className="mt-3 relative">
          <label>Password</label>

          <input
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pr-12 border border-gray-300 rounded-lg my-2 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            type={showPassword ? 'text' : 'password'}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>

        <button
          type="button"
          onClick={() => navigate('/forgot-password')}
          className="text-indigo-500 hover:underline mt-2 text-sm hover:text-indigo-600"
        >
          Forgot password
        </button>

        <div className="mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-500 cursor-pointer w-full p-3 text-white font-semibold rounded-lg hover:bg-indigo-600 transition-colors disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'Sign in'}
          </button>
        </div>

        <p className="mt-4 text-sm">
          Don't have an account?{' '}
          <button
            type="button"
            className="text-indigo-500 hover:text-indigo-600"
            onClick={() => navigate('/signup')}
          >
            Sign up
          </button>
        </p>
      </form>

      {error && (
        <div className="text-red-500 mt-3 text-sm">
          {error}
        </div>
      )}
    </div>
  )
}