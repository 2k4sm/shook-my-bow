import { axiosInstance } from ".";

const getToken = () => {
    return localStorage.getItem('token');
};

export const makePayment = async (token, amount) => {
    try{
        const response = await axiosInstance.post('/api/bookings/make-payment', {token, amount});
        // console.log(token, amount, response);
        return response.data;
    }catch(err){
        return err.response
    }
}

export const bookShow = async (payload) => {
    try{
        const response = await axiosInstance.post('/api/bookings/book-show', payload);
        console.log(response.data);
        return response.data;
    }catch(err){
        return err.response
    }
}

export const getAllBookings = async () => {
    try {
        const token = getToken();
        const response = await axiosInstance.get('/api/bookings/get-all-bookings', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        return err.response;
    }
};