import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

export default function VerifyEmail() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold">
            Verifying your email...
          </h2>

          <p className="text-gray-500 mt-2">
            Please wait.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-lg mx-auto mt-10 px-5">
      <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 text-center">
        <div className="text-4xl mb-4">✅</div>

        <h2 className="text-xl sm:text-2xl font-bold">
          Email verification successful!
        </h2>

        <p className="text-gray-600 mt-2">
          Your email has been verified successfully.
        </p>

        <button
          onClick={() => navigate('/')}
          className="mt-6 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold p-3 rounded-lg"
        >
          Continue to Login
        </button>
      </div>
    </div>
  )
}