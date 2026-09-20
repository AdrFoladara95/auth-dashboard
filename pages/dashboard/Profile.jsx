import React, { useState, useEffect } from "react";
import { GetUser } from "../../src/api/api";

export default function Profile() {

    const [user, setUser] = useState(null)
    // const [user] = useState(() => {
    //     const savedUser = sessionStorage.getItem("user");
    //     return savedUser ? JSON.parse(savedUser) : null;
    // });
    useEffect(() => {
        async function fetchUser() {
           try {
              const response = await GetUser();
              console.log("User response:", response);
              if (!response) {
               
                return;
              }
              setUser(response);
    
            } catch (error) {
                console.error("GetUser error:", error);
               
            }
        }
    
        fetchUser();
    })

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">
                Profile
            </h1>

            <p className="text-gray-500 mt-2">
                Manage your profile information.
            </p>

            <div className="bg-white border border-gray-200 rounded-xl p-6 mt-8 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-4">
                    Personal Information
                </h2>

                <div className="mt-6 space-y-5">
                    <div>
                        <p className="text-sm text-gray-500">
                            First Name
                        </p>
                        <p className="mt-1 font-medium text-gray-900">
                            {user?.data.firstName}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Last Name
                        </p>
                        <p className="mt-1 font-medium text-gray-900">
                            {user?.data.lastName}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Email
                        </p>
                        <p className="mt-1 font-medium text-gray-900">
                            {user?.data.email}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}