import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { Eye, EyeOff, Check } from 'lucide-react'
import { saveDemoUser } from '../../utils/demoAuth'

export default function SignUp() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    setError(null)

    if (!firstName || !lastName || !email || !password) {
      setError('Please fill in all fields')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)

    const demoUser = {
      firstName,
      lastName,
      email,
      avatarUrl: null,
    }

    saveDemoUser(demoUser)

    setTimeout(() => {
      setLoading(false)
      navigate('/')
    }, 500)
  }

  return (
    <div className="shadow-md bg-white w-full max-w-130 mx-auto mt-6 sm:mt-10 p-5 sm:p-6 border border-gray-200 rounded-xl">
      <h2 className="font-bold text-xl sm:text-2xl text-center text-gray-900">
        Create an account
      </h2>

      <p className="text-center text-sm text-gray-500 mt-2">
        Create a demo account for the portfolio
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mt-5">
          <label>First name</label>

          <input
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg my-2 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mt-3">
          <label>Last name</label>

          <input
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg my-2 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mt-3">
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
            placeholder="Create a password"
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

        <div className="text-sm text-gray-500 flex flex-col gap-2 mt-2">
          <div className="flex gap-3 items-center">
            <span className="text-white bg-gray-400 rounded-full p-1">
              <Check className="h-3 w-3" />
            </span>
            <p>Must be at least 8 characters</p>
          </div>

          <div className="flex gap-3 items-center">
            <span className="text-white bg-gray-400 rounded-full p-1">
              <Check className="h-3 w-3" />
            </span>
            <p>Must contain an uppercase letter</p>
          </div>

          <div className="flex gap-3 items-center">
            <span className="text-white bg-gray-400 rounded-full p-1">
              <Check className="h-3 w-3" />
            </span>
            <p>Must contain a number</p>
          </div>
        </div>

        <div className="mt-5">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-500 cursor-pointer w-full p-3 text-white font-semibold rounded-lg hover:bg-indigo-600 transition-colors disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Get started'}
          </button>
        </div>

        <p className="mt-4 text-sm">
          Already have an account?{' '}
          <button
            type="button"
            className="text-indigo-500 hover:text-indigo-600"
            onClick={() => navigate('/')}
          >
            Log in
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