import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa"; // Import icons
import Modal from "react-modal"; // Import Modal component
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // Import Leaflet components
import DatePicker from "react-datepicker"; // Import date picker
import Select from "react-select"; // Import React Select
import "react-datepicker/dist/react-datepicker.css"; // Import date picker styles
import "leaflet/dist/leaflet.css"; // Import Leaflet styles


// Mock data for restaurant details
const fakeRestaurantDetails = {
  id: 1,
  name: "The Italian Bistro",
  description: "A cozy place serving authentic Italian dishes.",
  address: "1234 Italian St, Rome, Italy",
  contact: "(123) 456-7890",
  cuisine: "Italian",
  priceRange: "$$$",
  lat: 41.9028, // Latitude for the location
  lng: 12.4964, // Longitude for the location
  images: [
    "https://placehold.co/600x400/orange/white?text=Italian+Restaurant+1",
    "https://placehold.co/600x400/orange/white?text=Italian+Restaurant+2",
    "https://placehold.co/600x400/orange/white?text=Italian+Restaurant+3",
  ],
  operatingHours: [
    { day: "Monday", hours: "10:00 AM - 10:00 PM" },
    { day: "Tuesday", hours: "10:00 AM - 10:00 PM" },
    { day: "Wednesday", hours: "10:00 AM - 10:00 PM" },
    { day: "Thursday", hours: "10:00 AM - 10:00 PM" },
    { day: "Friday", hours: "10:00 AM - 11:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 11:00 PM" },
    { day: "Sunday", hours: "10:00 AM - 9:00 PM" },
  ],
  availableTimes: {
    "2025-04-06": [
      { time: "15:00", offer: "30% OFF" },
      { time: "15:30", offer: "30% OFF" },
      { time: "16:00", offer: "30% OFF" },
      { time: "16:30", offer: "30% OFF" },
      { time: "17:00", offer: "30% OFF" },
      { time: "17:30", offer: "30% OFF" },
    ],
    "2025-04-07": [
      { time: "15:00", offer: "20% OFF" },
      { time: "15:30", offer: "20% OFF" },
      { time: "16:00", offer: "20% OFF" },
      { time: "16:30", offer: "20% OFF" },
    ],
  }, // Sample available times with discounts
};

Modal.setAppElement("#root"); // This is needed for accessibility

const RestaurantPage = () => {
  const { id } = useParams(); // Get restaurant ID from URL
  const [restaurant, setRestaurant] = useState(null); // Store restaurant details
  const [loading, setLoading] = useState(true); // Loading state
  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal visibility state
  const [selectedImage, setSelectedImage] = useState(null); // Store the image selected for the modal
  const [selectedDate, setSelectedDate] = useState(null); // Selected date for booking
  const [partySize, setPartySize] = useState(2); // Number of diners
  const [availableTimes, setAvailableTimes] = useState([]); // Available times based on selected date

  // Simulate fetching restaurant details using mock data
  useEffect(() => {
    setTimeout(() => {
      setRestaurant(fakeRestaurantDetails); // Using mock data
      setLoading(false); // Set loading to false after fetching
    }, 1000); // Simulating an API delay of 1 second
  }, [id]);

  useEffect(() => {
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
      setAvailableTimes(restaurant.availableTimes[dateStr] || []);
    }
  }, [selectedDate, restaurant]);

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
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Overview</h3>
          <p className="text-lg text-gray-700 mb-6">{restaurant.description}</p>
        </div>
        

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
          <p className="text-gray-700 mb-2 flex items-center">
            <FaMapMarkerAlt className="mr-2 text-gray-600" /> <strong>Address:</strong> {restaurant.address}
          </p>
          <p className="text-gray-700 mb-2 flex items-center">
            <FaPhoneAlt className="mr-2 text-gray-600" /> <strong>Contact:</strong> {restaurant.contact}
          </p>
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

        {/* Restaurant Location - Map */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Restaurant Location</h3>
          <MapContainer center={[restaurant.lat, restaurant.lng]} zoom={13} style={{ width: "100%", height: "400px" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[restaurant.lat, restaurant.lng]}>
              <Popup>
                {restaurant.name} <br /> {restaurant.address}
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Make a Booking Form */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Make a Booking</h3>

          {/* Number of Diners */}
          <div className="mb-4">
            <label htmlFor="partySize" className="block text-sm font-medium text-gray-700">Number of diners:</label>
            <Select
              options={[
                { value: 1, label: "1 Person" },
                { value: 2, label: "2 People" },
                { value: 3, label: "3 People" },
                { value: 4, label: "4 People" },
                { value: 5, label: "5 People" },
                { value: 6, label: "6 People" },
              ]}
              value={{ value: partySize, label: `${partySize} People` }}
              onChange={(e) => setPartySize(e.value)}
              className="mt-2"
            />
          </div>

          {/* Date Picker */}
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Select a date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
              className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          {/* Time Slots */}
          {selectedDate && availableTimes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Select a time</h3>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {availableTimes.map((slot, index) => (
                  <button
                    key={index}
                    className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600"
                    onClick={() => alert(`Booking time: ${slot.time}`)}
                  >
                    {slot.time} <br />
                    <span className="text-sm">{slot.offer}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
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