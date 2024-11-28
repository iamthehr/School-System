import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard({ role }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (role === "Admin") navigate("/admin");
    if (role === "Teacher") navigate("/teacher");
    if (role === "Student") navigate("/student");
  }, [role, navigate]);

  return null;
}

export default Dashboard;
