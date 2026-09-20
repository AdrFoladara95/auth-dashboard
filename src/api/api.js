const API_BASE = import.meta.env.VITE_API_BASE_URL


async function request(path, options={}) {
    const response = await fetch(`${API_BASE}${path}`,{
        method:options.method || "GET",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include", 
        body:options.body?JSON.stringify(options.body):undefined
    });

    const data = await response.json().catch(()=>({}))

    if (!response.ok) {
        const error = new Error(data.message || "something went wrong")
        error.status = response.status
        error.data = data
        throw error
    }
    return data
}

export async function UpdateAvatar(file) {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await fetch(`${API_BASE}/users/me/avatar`, {
        method: "POST",
        credentials: "include",
        body: formData,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        const error = new Error(data.message || "Failed to upload avatar");
        error.status = response.status;
        error.data = data;
        throw error;
    }

    return data;
}

// Endpoint for SignUp
export function RegisterUser ({firstName, lastName, email, password}) {
    return request("/auth/register", {
        method:"POST",
        body: {firstName, lastName, email, password}
    });
}

// Endpoint for Login
export function LoginUser ({email, password}) {
    return request("/auth/login", {
        method: "POST",
        body: {email, password}
    })
}

//Endpoint for Forgot Password
export function ForgotUserPassword ({email}) {
    return request("/auth/forgot-password", {
        method: "POST",
        body: {email}
    })
}

//Endpoint for Reset Password
export function ResetUserPassword ({token, password}) {
    return request("/auth/reset-password", {
        method: "POST",
        body: {token, password}
    })
}

//Endpoint for Verify Email
export function VerifyUserEmail ({token}) {
    return request("/auth/verify-email", {
        method: "POST",
        body: {token}
    })
}

//Endpoint for Logout
export function LogoutUser() {
    return request("/auth/logout", {
        method: "POST"
    })
}

//Endpoint for User
export function GetUser(){
    return request("/users/me", {
        method: "GET"
    })
}

//Endpoint for Change password
export function ChangePassword({currentPassword, newPassword}){
    return request("/auth/change-password", {
        method: "POST",
        body: {currentPassword, newPassword}
    })
}