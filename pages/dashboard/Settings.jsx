import React, { useState, useEffect } from "react";
import { ChangePassword } from "../../src/api/api";
import { Eye, EyeOff } from "lucide-react";
import { GetUser, UpdateAvatar } from "../../src/api/api";


export default function Settings() {

    const [showForm, setShowForm] = useState(false)

    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)


    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [user, setUser] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [avatarError, setAvatarError] = useState('')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    async function handleChangePassword(e) {
        e.preventDefault()
        setError('')
        setSuccess('')

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('Please fill in all fields')
            return;

        }
        if (newPassword !== confirmPassword) {
            setError('New passwords do not match')
            return;
        }
        if (newPassword.length < 8) {
            setError('New password must be at least 8 characters')
            return;
        }
        try {
            setLoading(true)
            await ChangePassword({currentPassword, newPassword})
            setSuccess('Password changed successful')

            setCurrentPassword('')
            setNewPassword('')
            setConfirmPassword('')
        } catch(err) {
            setError(err.message || 'Failed to change password')
        } finally {
            setLoading(false)
        }

        
    }

    useEffect(() => {
        async function fetchUser() {
            try{
                const response = await GetUser()
                setUser(response)
            } catch(error) {
                console.log(error)
            }
        } fetchUser()
    }, [])

    async function handleAvatarChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    setAvatarError("");

    if (!file.type.startsWith("image/")) {
        setAvatarError("Please select an image.");
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        setAvatarError("Image must be less than 5MB.");
        return;
    }

    setAvatar(URL.createObjectURL(file));

    try {
        setUploading(true);

        await UpdateAvatar(file);

        const updatedUser = await GetUser();

        setUser(updatedUser);

    } catch (error) {
        setAvatarError(error.message);
    } finally {
        setUploading(false);
    }
}

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">
                Settings
            </h1>

            <p className="text-gray-500 mt-2">
                Manage your account settings.
            </p>

            <div className="bg-white border border-gray-200 rounded-xl p-6 mt-8 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900">
                    Account Settings
                </h2>

                <div className="mt-5">
                    <button 
                    type="button"
                    onClick={() => {
                        setShowForm(!showForm)
                        setError('')
                        setSuccess('')
                    }}
                    className=" px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white">
                         {showForm ? 'Cancel' : 'Change Password' }
                    </button>
                </div>
                {showForm && (
                    <form 
                    onSubmit={handleChangePassword}
                    className="mt-6 max-w-md"
                    >
                        <div className="mb-4">
                            <label className="block mb-2 font-medium">
                                Current Password
                            </label>
                            <div className="relative">
                                <input 
                                    type={showCurrentPassword ? 'text' : 'password'}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="Enter current password"
                                    className="w-full p-3 pr-10 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    className="absolute right-3 inset-y-0 flex items-center text-gray-500 hover:text-gray-700"
                                    >
                                    {showCurrentPassword ? ( <Eye size={20}/>) : (<EyeOff size={20} />)} 

                                </button>
                            </div>

                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 font-medium">
                                New Password
                            </label>

                            <div className="relative">
                               <input 
                                type={showNewPassword ? 'text' : 'password'} 
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                className="w-full p-3 pr-10 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                /> 
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3 inset-y-0 flex items-center text-gray-500 hover:text-gray-700"
                                    >
                                    {showNewPassword ? ( <Eye size={20}/>) : (<EyeOff size={20} />)} 

                                </button>
                            </div>
                            

                        </div>

                         <div className="mb-4">
                            <label className="block mb-2 font-medium">
                                Confirm New Password
                            </label>

                            <div className="relative">
                                <input 
                                    type={showConfirmPassword ? 'text' : 'password'} 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm new password"
                                    className="w-full p-3 pr-10 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 inset-y-0 flex items-center text-gray-500 hover:text-gray-700"
                                    >
                                    {showConfirmPassword ? ( <Eye size={20}/>) : (<EyeOff size={20} />)} 
                                </button>
                            </div>
                            

                        </div>

                        {error && (
                            <p className="text-red-500 mb-4">{error}</p>
                        )}

                        {success && (
                            <p className="text-green-600 mb-4">{success}</p>
                        )}

                        <button
                        type="submit"
                        disabled={loading}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-3 rounded-lg transition-colors"
                        >
                            {loading? 'Changing...' : 'Change Password'}

                        </button>

                    </form>
                )}
                <div className="bg-white border rounded-xl p-6 mb-6 mt-5">
                    <h2 className="text-xl font-semibold mb-4">
                        Profile Picture
                    </h2>

                    <div className="flex items-center gap-6">

                        <img
                            src={avatar || user?.avatarUrl || "/images.png"}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border"
                        />

                        <div>

                            <label
                                htmlFor="avatar"
                                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                            >
                                {uploading ? "Uploading..." : "Change Photo"}
                            </label>

                            <input
                                id="avatar"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatarChange}
                            />

                            <p className="text-sm text-gray-500 mt-2">
                                JPG, PNG or JPEG (Maximum 5MB)
                            </p>

                            {avatarError && (
                                <p className="text-red-500 mt-2">
                                    {avatarError}
                                </p>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}