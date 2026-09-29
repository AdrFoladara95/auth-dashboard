import React from 'react'

export default function Notifications() {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold">
        Notifications
      </h1>

      <p className="text-gray-600 mt-2 text-sm sm:text-base">
        You have no new notifications.
      </p>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6 mt-6">
        <p className="text-gray-500 text-sm sm:text-base">
          You're all caught up! 🎉
        </p>
      </div>
    </div>
  )
}