import React, { useEffect, useState } from 'react'
import { getDemoUser } from '../../src/utils/demoAuth'

export default function Profile() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const demoUser = getDemoUser()
    setUser(demoUser)
  }, [])

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
        Profile
      </h1>

      <p className="text-gray-500 mt-2 text-sm sm:text-base">
        Manage your profile information.
      </p>

      <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 mt-6 sm:mt-8 shadow-sm">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 border-b border-gray-200 pb-4">
          Personal Information
        </h2>

        <div className="mt-6 space-y-5">

          <div>
            <p className="text-sm text-gray-500">
              First Name
            </p>

            <p className="mt-1 font-medium text-gray-900 wrap-break-word">
              {user?.firstName || 'Demo'}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Last Name
            </p>

            <p className="mt-1 font-medium text-gray-900 wrap-break-word">
              {user?.lastName || 'User'}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Email
            </p>

            <p className="mt-1 font-medium text-gray-900 wrap-break-word">
              {user?.email || 'demo@example.com'}
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}