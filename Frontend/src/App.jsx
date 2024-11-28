import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";

function App() {
  const [isAuth, setAuth] = useState(!!localStorage.getItem("token"));
  const [role, setRole] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.role;
    }
    return "";
  });

  const handleLogout = () => {
    setAuth(false);
    setRole("");
    localStorage.clear();
  };

  return (
    <Router>
      <Navbar isAuth={isAuth} role={role} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/login"
          element={<Login setAuth={setAuth} setRole={setRole} />}
        />
        <Route
          path="/register"
          element={<Register setAuth={setAuth} setRole={setRole} />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute
              isAuth={isAuth}
              role={role}
              allowedRoles={["Admin", "Teacher", "Student"]}
            >
              <Dashboard role={role} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              isAuth={isAuth}
              role={role}
              allowedRoles={["Admin"]}
            >
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher"
          element={
            <ProtectedRoute
              isAuth={isAuth}
              role={role}
              allowedRoles={["Teacher"]}
            >
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student"
          element={
            <ProtectedRoute
              isAuth={isAuth}
              role={role}
              allowedRoles={["Student"]}
            >
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
