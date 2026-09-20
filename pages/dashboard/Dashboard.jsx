import React from 'react'

export default function Dashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold">
                Dashboard
            </h1>

            <p className="text-gray-600 mt-2">
                Welcome to your dashboard.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">

                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="text-gray-500">
                        Total Users
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                        120
                    </h2>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="text-gray-500">
                        Activities
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                        45
                    </h2>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="text-gray-500">
                        Notifications
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                        8
                    </h2>
                </div>

            </div>
        </div>
    );
}