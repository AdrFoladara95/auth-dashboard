import React, { useState } from 'react'
import { Link } from 'react-router'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    setLoading(true)
    setError('')
    setSuccess('')

    if (!email) {
      setError('Please enter your email address')
      setLoading(false)
      return
    }

    setTimeout(() => {
      setSuccess(
        'If an account exists with this email, a password reset link has been sent.'
      )
      setEmail('')
      setLoading(false)
    }, 800)
  }

  return (
    <div className="shadow-md bg-gray-100 w-full max-w-130 mx-auto mt-6 sm:mt-10 p-5 sm:p-6 border border-gray-200 rounded-xl">
      <h1 className="font-semibold text-xl sm:text-2xl text-center mb-4">
        Forgot Password?
      </h1>

      <p className="mb-4 text-sm sm:text-base text-gray-600">
        Enter your email address and we'll send you a link to reset your
        password.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          className="w-full p-3 border border-gray-300 rounded-md my-2 outline-none focus:ring-2 focus:ring-indigo-500"
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          className="bg-indigo-500 cursor-pointer w-full text-white font-semibold rounded-md hover:bg-indigo-600 my-2 p-3 disabled:opacity-60"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>

      {success && (
        <p className="text-green-600 text-sm mt-3">
          {success}
        </p>
      )}

      {error && (
        <p className="text-red-500 text-sm mt-3">
          {error}
        </p>
      )}

      <Link
        to="/"
        className="text-indigo-500 hover:underline text-sm inline-block mt-4"
      >
        Back to Login
      </Link>
    </div>
  )
}