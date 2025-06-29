import axiosInstance, { endpoints } from 'src/utils/axios';

// Toggle User Status
export const login = async (email, password) => {
    try {
        const response = await axiosInstance.post(endpoints.auth.logind({ email, password }));
        return response.data;
    } catch (error) {
        console.error('Error toggling user status:', error);
        throw error;
    }
};

// Get User Details
export const getUserDetails = async (id) => {
    try {
        const response = await axiosInstance.get(endpoints.user.details(id));
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
};
