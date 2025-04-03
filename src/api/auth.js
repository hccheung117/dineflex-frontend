import api from './axios'; 

// Authentication-related APIs (Login, Registration)
// To get the flow working, I'm currently using hardcoded data.
export const login = async (email, password) => {
  // try {
  //   const response = await api.post('/auth/login', { email, password });
  //   localStorage.setItem('token', response.data.token); // Save token
  //   return response.data;
  // } catch (error) {
  //   throw new Error('Login failed: ' + error.message);
  // }


  if (email === "user@example.com" && password === "password123") {
    // Simulate a successful returned JWT token
    return {
      token: "fake-jwt-token", // Fake token
      user: { email, username: "fakeuser" },  // Fake user data
    };
  } else {
    throw new Error("Invalid credentials");
  }
};

// Register
export const register = async (username, email, password) => {
  // try {
  //   const response = await api.post('/auth/register', { username, email, password });
  //   return response.data;
  // } catch (error) {
  //   throw new Error('Registration failed: ' + error.message);
  // }

  try {
    const response = {
      data: {
        token: "fake-jwt-token",  // Simulate JWT token
        user: {
          username: username,
          email: email,
        },
      },
    };
    return response.data;  // return fake data
  } catch (error) {
    throw new Error("Registration failed: " + error.message);
  }
};


