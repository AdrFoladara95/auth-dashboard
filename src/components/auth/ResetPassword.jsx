import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { Eye, EyeOff } from 'lucide-react'

export default function ResetPassword() {
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    setError('')
    setSuccess('')

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    setTimeout(() => {
      setSuccess('Password reset successfully!')

      setTimeout(() => {
        navigate('/')
      }, 1200)

      setLoading(false)
    }, 800)
  }

  return (
    <div className="shadow-md bg-white w-full max-w-130 mx-auto mt-6 sm:mt-10 p-5 sm:p-6 border border-gray-200 rounded-xl">
      <h2 className="font-bold text-xl sm:text-2xl text-center text-gray-900">
        Reset Password
      </h2>

      <p className="text-gray-600 text-sm text-center mt-2 mb-6">
        Enter your new password below.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="relative mb-4">
          <label className="block mb-1">New Password</label>

          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full p-3 pr-12 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500"
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>

        <div className="relative mb-4">
          <label className="block mb-1">Confirm Password</label>

          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="w-full p-3 pr-12 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            className="absolute right-3 top-9 text-gray-500"
          >
            {showConfirmPassword ? (
              <Eye size={20} />
            ) : (
              <EyeOff size={20} />
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 disabled:opacity-60"
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>

      {success && (
        <p className="text-green-600 mt-4">
          {success}
        </p>
      )}

      {error && (
        <p className="text-red-500 mt-4">
          {error}
        </p>
      )}
    </div>
  )
}