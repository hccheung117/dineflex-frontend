import api from './axios';

// Create booking
export const createBooking = async (restaurantId, date, time, guests) => {
  try {
    const response = await api.post('/bookings', { restaurantId, date, time, guests });
    return response.data; // return booking info
  } catch (error) {
    throw new Error('Failed to create booking: ' + error.message);
  }
};

// Get booking history
export const getBookingHistory = async () => {
  try {
    const response = await api.get('/bookings');
    return response.data; // return booking history
  } catch (error) {
    throw new Error('Failed to fetch booking history: ' + error.message);
  }
};
