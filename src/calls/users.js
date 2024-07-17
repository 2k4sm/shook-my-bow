const { axiosInstance } = require('./index');

// Register new User
export const RegisterUser = async (value) => {
    try {
        const response = await axiosInstance.post("api/users/register", value);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// Login user
export const LoginUser = async (value) => {
    try {
        const response = await axiosInstance.post("api/users/login", value);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// Get current user from the frontend
export const GetCurrentUser = async () => {
    try {
        const token = getToken(); // Add token retrieval
        const response = await axiosInstance.get('api/users/get-current-user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// Forget and Reset Password
export const ForgetPassword = async (value) => {
    try {
        const response = await axiosInstance.patch("api/users/forgetpassword", value);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const ResetPassword = async (value) => {
    try {
        const response = await axiosInstance.patch("api/users/resetpassword", value);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// Helper function to get token
const getToken = () => {
    return localStorage.getItem('token');
};
