import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router'
import { Menu, X } from 'lucide-react'
import {
  getDemoUser,
  isDemoLoggedIn,
  logoutDemoUser,
} from '../utils/demoAuth'

export default function DashboardLayout() {
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!isDemoLoggedIn()) {
      navigate('/')
      return
    }

    const demoUser = getDemoUser()

    if (!demoUser) {
      navigate('/')
      return
    }

    setUser(demoUser)
  }, [navigate])

  function handleLogout() {
    logoutDemoUser()
    navigate('/')
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          w-64 h-screen
          p-5
          bg-indigo-50
          border-r border-indigo-100
          text-gray-700
          flex flex-col
          transform transition-transform duration-300
          lg:translate-x-0
          ${
            mobileMenuOpen
              ? 'translate-x-0'
              : '-translate-x-full'
          }
        `}
      >

        {/* Sidebar Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-indigo-600">
            My Dashboard
          </h1>

          <button
            onClick={closeMobileMenu}
            className="lg:hidden text-gray-600 hover:text-gray-900"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">

          <NavLink
            to="/dashboard"
            end
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg ${
                isActive
                  ? 'bg-indigo-500 text-white'
                  : 'text-gray-700 hover:bg-indigo-100'
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg ${
                isActive
                  ? 'bg-indigo-500 text-white'
                  : 'text-gray-700 hover:bg-indigo-100'
              }`
            }
          >
            Profile
          </NavLink>

          <NavLink
            to="/dashboard/settings"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg ${
                isActive
                  ? 'bg-indigo-500 text-white'
                  : 'text-gray-700 hover:bg-indigo-100'
              }`
            }
          >
            Settings
          </NavLink>

          <NavLink
            to="/dashboard/notifications"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg ${
                isActive
                  ? 'bg-indigo-500 text-white'
                  : 'text-gray-700 hover:bg-indigo-100'
              }`
            }
          >
            Notifications
          </NavLink>

        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-auto w-full px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white"
        >
          Logout
        </button>

      </aside>

      {/* Main Content */}
      <div className="min-h-screen lg:ml-64">

        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden text-gray-600 hover:text-gray-900 mr-3"
          >
            <Menu size={24} />
          </button>

          <h2 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
            Welcome back,{' '}
            <span className="uppercase text-indigo-600">
              {user?.firstName}
            </span>{' '}
            👋
          </h2>

          <img
            src={user?.avatarUrl || '/images.png'}
            alt="Profile"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-indigo-200 shrink-0"
          />

        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>

    </div>
  )
}