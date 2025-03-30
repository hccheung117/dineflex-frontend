import api from './axios';

// Get offer info
export const getOffers = async (restaurantId) => {
  try {
    const response = await api.get(`/offers?restaurantId=${restaurantId}`);
    return response.data; // return offer info
  } catch (error) {
    throw new Error('Failed to fetch offers: ' + error.message);
  }
};
