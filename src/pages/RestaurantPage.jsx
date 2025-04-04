import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa"; // 引入图标
import Modal from "react-modal"; // 引入 Modal 组件

// Mock data for restaurant details
const fakeRestaurantDetails = {
  id: 1,
  name: "The Italian Bistro",
  description: "A cozy place serving authentic Italian dishes.",
  location: "1234 Italian St, Rome, Italy", // location field added
  cuisine: "Italian",
  phone: "(123) 456-7890", // phone field added
  images: [
    "https://placehold.co/600x400/orange/white?text=Italian+Restaurant+1",
    "https://placehold.co/600x400/orange/white?text=Italian+Restaurant+2",
    "https://placehold.co/600x400/orange/white?text=Italian+Restaurant+3",
  ],
  hasEarlyBird: true, // Early bird offer field added
  hasLastMinute: false, // Last-minute offer field added
  ownerId: "user-123", // ownerId field added (mock value)
  operatingHours: [
    { day: "Monday", hours: "10:00 AM - 10:00 PM" },
    { day: "Tuesday", hours: "10:00 AM - 10:00 PM" },
    { day: "Wednesday", hours: "10:00 AM - 10:00 PM" },
    { day: "Thursday", hours: "10:00 AM - 10:00 PM" },
    { day: "Friday", hours: "10:00 AM - 11:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 11:00 PM" },
    { day: "Sunday", hours: "10:00 AM - 9:00 PM" },
  ],
};

Modal.setAppElement("#root"); // This is needed for accessibility

const RestaurantPage = () => {
  const { id } = useParams(); // Get restaurant ID from URL
  const [restaurant, setRestaurant] = useState(null); // Store restaurant details
  const [loading, setLoading] = useState(true); // Loading state
  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal visibility state
  const [selectedImage, setSelectedImage] = useState(null); // Store the image selected for the modal

  // Simulate fetching restaurant details using mock data
  useEffect(() => {
    setTimeout(() => {
      setRestaurant(fakeRestaurantDetails); // Using mock data
      setLoading(false); // Set loading to false after fetching
    }, 1000); // Simulating an API delay of 1 second
  }, [id]);

  // Function to open the modal and set the selected image
  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto"></div>
      </div>
    );
  }

  if (!restaurant) {
    return <div className="text-center py-4">Restaurant not found</div>;
  }

  return (
    <div className="bg-gray-100 py-8 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        {/* Restaurant Name */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">{restaurant.name}</h1>

        {/* Restaurant Description */}
        <p className="text-lg text-gray-700 mb-6">{restaurant.description}</p>

        {/* Location */}
        <p className="text-gray-700 mb-6 flex items-center">
          <FaMapMarkerAlt className="mr-2 text-gray-600" />
          <strong>Location:</strong> {restaurant.location}
        </p>

        {/* Phone */}
        <p className="text-gray-700 mb-6 flex items-center">
          <FaPhoneAlt className="mr-2 text-gray-600" />
          <strong>Contact:</strong> {restaurant.phone}
        </p>

        {/* Restaurant Image Gallery */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Gallery</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurant.images.map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg shadow-lg transform transition-all hover:scale-105 duration-200 cursor-pointer"
                onClick={() => openModal(image)} // Open the modal when an image is clicked
              >
                <img
                  src={image}
                  alt={`Restaurant image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Restaurant Details */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Details</h3>
          <p className="text-gray-700 mb-2">
            <strong>Cuisine Type:</strong> {restaurant.cuisine}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Price Range:</strong> {restaurant.priceRange}
          </p>
        </div>

        {/* Restaurant Operating Hours */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Operating Hours</h3>
          <ul className="list-disc pl-5 text-gray-700">
            {restaurant.operatingHours.map((day, index) => (
              <li key={index}>
                <strong>{day.day}:</strong> {day.hours}
              </li>
            ))}
          </ul>
        </div>

        {/* Offers */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Special Offers</h3>
          <p className="text-gray-700 mb-2">
            <strong>Early Bird:</strong> {restaurant.hasEarlyBird ? "Available" : "Not Available"}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Last Minute:</strong> {restaurant.hasLastMinute ? "Available" : "Not Available"}
          </p>
        </div>

        {/* Booking Button */}
        <div className="text-center">
          <button
            onClick={() => alert("Redirecting to booking page")}
            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
          >
            Book a Table
          </button>
        </div>
      </div>

      {/* Modal for Fullscreen Image View */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="relative bg-white p-4 rounded-lg">
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-white text-xl"
          >
            X
          </button>
          <img src={selectedImage} alt="Selected Restaurant" className="max-w-full max-h-full object-contain" />
        </div>
      </Modal>
    </div>
  );
};

export default RestaurantPage;