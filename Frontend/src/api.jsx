import axios from "axios";

const API_URL = "http://localhost:5000";

export const registerUser = (userData) =>
  axios.post(`${API_URL}/auth/register`, userData);

export const loginUser = (credentials) =>
  axios.post(`${API_URL}/auth/login`, credentials);

export const fetchUsers = (token) =>
  axios.get(`${API_URL}/admin/users`, { headers: { Authorization: token } });

export const approveUser = (id, token) =>
  axios.put(
    `${API_URL}/admin/approve/${id}`,
    {},
    { headers: { Authorization: token } }
  );

export const disableUser = (id, token) =>
  axios.put(
    `${API_URL}/admin/disable/${id}`,
    {},
    { headers: { Authorization: token } }
  );

export const addMarks = (marksData, token) =>
  axios.post(`${API_URL}/teacher/marks`, marksData, {
    headers: { Authorization: token },
  });

export const fetchMarks = (token) =>
  axios.get(`${API_URL}/student/marks`, { headers: { Authorization: token } });

export const fetchTeacherMarks = (token) =>
  axios.get(`${API_URL}/teacher/marks`, { headers: { Authorization: token } });
