import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'; // 引入 useAuth
import { useNavigate } from 'react-router-dom';

// Mock 16 cards
const fakeRestaurants = [
  {
    id: 1,
    name: "The Italian Bistro",
    cuisine: "Italian",
    imageUrl: "https://placehold.co/600x400/orange/white?text=Italian+Restaurant",
    offers: ["earlyBird", "lastMinute"],
  },
  {
    id: 2,
    name: "Sushi World",
    cuisine: "Japanese",
    imageUrl: "https://placehold.co/600x400/orange/white?text=Japanese+Restaurant",
    offers: ["lastMinute"],
  },
  {
    id: 3,
    name: "Taco Fiesta",
    cuisine: "Mexican",
    imageUrl: "https://placehold.co/600x400/orange/white?text=Mexican+Restaurant",
    offers: ["earlyBird"],
  },
  {
    id: 4,
    name: "Burger King",
    cuisine: "American",
    imageUrl: "https://placehold.co/600x400/orange/white?text=American+Restaurant",
    offers: [],
  },
  {
    id: 5,
    name: "Pasta Palace",
    cuisine: "Italian",
    imageUrl: "https://placehold.co/600x400/orange/white?text=Italian+Restaurant",
    offers: ["earlyBird", "lastMinute"],
  },
  {
    id: 6,
    name: "Dim Sum House",
    cuisine: "Chinese",
    imageUrl: "https://placehold.co/600x400/orange/white?text=Chinese+Restaurant",
    offers: ["lastMinute"],
  },
  {
    id: 7,
    name: "Seafood Shack",
    cuisine: "Seafood",
    imageUrl: "https://placehold.co/600x400/orange/white?text=Seafood+Restaurant",
    offers: ["earlyBird"],
  },
  {
    id: 8,
    name: "The Veggie Spot",
    cuisine: "Vegetarian",
    imageUrl: "https://placehold.co/600x400/orange/white?text=Vegetarian+Restaurant",
    offers: [],
  },
  {
    id: 9,
    name: "Sushi Express",
    cuisine: "Japanese",
    imageUrl: "https://placehold.co/600x400/orange/white?text=Japanese+Restaurant",
    offers: ["earlyBird"],
  },
  {
    id: 10,
    name: "Ramen House",
    cuisine: "Japanese",
    imageUrl: "https://placehold.co/600x400/orange/white?text=Japanese+Restaurant",
    offers: ["lastMinute"],
  },
  {
    id: 11,
    name: "Spaghetti Central",
    cuisine: "Italian",
    imageUrl: "https://placehold.co/600x400/orange/white?text=Italian+Restaurant",
    offers: [],
  },
  {
    id: 12,
    name: "Curry Garden",
    cuisine: "Indian",
    imageUrl: "https://placehold.co/600x400/orange/white?text=Indian+Restaurant",
    offers: ["earlyBird"],
  },
  {
    id: 13,
    name: "Steakhouse Supreme",
    cuisine: "American",
    imageUrl: "https://placehold.co/600x400/orange/white?text=American+Restaurant",
    offers: ["lastMinute"],
  },
  {
    id: 14,
    name: "Burger Paradise",
    cuisine: "American",
    imageUrl: "https://placehold.co/600x400/orange/white?text=American+Restaurant",
    offers: [],
  },
  {
    id: 15,
    name: "Poke Bowl",
    cuisine: "Hawaiian",
    imageUrl: "https://placehold.co/600x400/orange/white?text=Hawaiian+Restaurant",
    offers: ["earlyBird"],
  },
  {
    id: 16,
    name: "The Salad Bar",
    cuisine: "Vegetarian",
    imageUrl: "https://placehold.co/600x400/orange/white?text=Vegetarian+Restaurant",
    offers: ["lastMinute"],
  }
];

const HomePage = () => {
  const { user } = useAuth(); // Get user info
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState(fakeRestaurants); // Mock restaurant info
  const [loading, setLoading] = useState(false); // Load state
  const [currentPage, setCurrentPage] = useState(1); // Pagination
  const restaurantsPerPage = 8; 

  useEffect(() => {
    if (!user) {
      navigate('/login'); 
    }
  }, [user, navigate]);

  // Calculate the data to be displayed on the current page
  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

  // Pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Render cards
  const renderRestaurantCards = () => {
    if (loading) {
      return (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto"></div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentRestaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={restaurant.imageUrl}
              alt={restaurant.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{restaurant.name}</h3>
              <p className="text-gray-600">{restaurant.cuisine}</p>
              <div className="mt-2 flex justify-between items-center">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    restaurant.offers.includes('earlyBird')
                      ? 'bg-green-200 text-green-800'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {restaurant.offers.includes('earlyBird')
                    ? 'Early Bird'
                    : 'No Early Bird'}
                </span>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    restaurant.offers.includes('lastMinute')
                      ? 'bg-red-200 text-red-800'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {restaurant.offers.includes('lastMinute')
                    ? 'Last Minute'
                    : 'No Last Minute'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-5xl font-bold text-center mb-10">Explore Restaurants</h1>
      {renderRestaurantCards()}

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <nav className="inline-flex items-center space-x-2">
          {/* Previous Button */}
          {currentPage > 1 && (
            <button
              onClick={() => paginate(currentPage - 1)}
              className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-l-md hover:bg-gray-200"
            >
              Previous
            </button>
          )}

          {/* Page Number */}
          <span className="px-4 py-2 text-sm font-medium text-gray-700">
            Page {currentPage}
          </span>

          {/* Next Button */}
          {indexOfLastRestaurant < restaurants.length && (
            <button
              onClick={() => paginate(currentPage + 1)}
              className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-r-md hover:bg-gray-200"
            >
              Next
            </button>
          )}
        </nav>
      </div>
    </div>
  );
};

export default HomePage;