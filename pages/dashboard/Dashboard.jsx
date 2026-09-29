import React from 'react'

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold">
        Dashboard
      </h1>

      <p className="text-gray-600 mt-2 text-sm sm:text-base">
        Welcome to your dashboard.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-6 sm:mt-8">

        <div className="bg-white p-5 sm:p-6 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm sm:text-base">
            Total Users
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold mt-2">
            120
          </h2>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm sm:text-base">
            Activities
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold mt-2">
            45
          </h2>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm sm:text-base">
            Notifications
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold mt-2">
            8
          </h2>
        </div>

      </div>
    </div>
  )
}