import api from './axios';

// Get restaurants list
export const getRestaurants = async () => {
  try {
    const response = await api.get('/restaurants');
    return response.data; // return restaurants list
  } catch (error) {
    throw new Error('Failed to fetch restaurants: ' + error.message);
  }
};

// Get single restaurant info
export const getRestaurantDetails = async (id) => {
  try {
    const response = await api.get(`/restaurants/${id}`);
    return response.data; // return info
  } catch (error) {
    throw new Error('Failed to fetch restaurant details: ' + error.message);
  }
};
