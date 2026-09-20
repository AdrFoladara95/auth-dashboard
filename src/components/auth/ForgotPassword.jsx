import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router'
import { ForgotUserPassword } from '../../api/api'

export default function ForgotPassword() {

    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setSuccess('')
        setError('')

        try {
            await ForgotUserPassword({email})
            setSuccess('A password reset link has been set')
            setEmail('')
        } catch(err) {
            setError(err.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
        
    }
  return (
    <div style={{maxWidth:520,margin:'40px auto',border:'1px solid #eee',borderRadius:8}} className='shadow bg-gray-100 p-4'>
        <h1 className= 'font-semibold text-2xl text-center mb-4'>Forgot Password?</h1>
        <p className='mb-2'> Enter your email address and we'll send you a link to reset your password</p>
        

        <form onSubmit={handleSubmit}>
        
            <input 
            className= 'w-full p-2 border border-grey-500 rounded-md my-2 border-[#A59788] outline-blue-400'
            type="email" 
            value={email}
            placeholder='Enter your email'
            onChange={(e)=> setEmail(e.target.value)}
            required
            
            />
            <button 
            className='btn btn-primary bg-blue-500 cursor-pointer w-full text-white font-semibold rounded-md hover:bg-blue-600 my-2 p-2'
            type='submit' 
            disabled={loading} 
            >
                {loading ? 'Sending...' : 'Send Reset Link'}

            </button>


        </form>
        {success && (
            <p>{success}</p>
        )}
        {error && (
            <p>{error}</p>
        )}
        <Link to='/' className='text-sm'>
        Back to Login
        </Link>


      
    </div>
  )
}
