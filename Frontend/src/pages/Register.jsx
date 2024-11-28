// import React, { useState } from "react";
// import { Box, Button, Input, Heading } from "@chakra-ui/react";
// import { loginUser } from "../api";
// import { useNavigate } from "react-router-dom";

// function Login({ setAuth, setRole }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await loginUser({ email, password });
//       localStorage.setItem("token", response.data.token);
//       setAuth(true);
//       const tokenPayload = JSON.parse(atob(response.data.token.split(".")[1]));
//       setRole(tokenPayload.role);
//       navigate("/");
//     } catch (err) {
//       alert(err.response.data);
//     }
//   };

//   return (
//     <Box w="400px" p="4" mx="auto" mt="10">
//       <Heading as="h2" mb="4">
//         Login
//       </Heading>
//       <form onSubmit={handleLogin}>
//         <Input
//           placeholder="Email"
//           mb="4"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <Input
//           placeholder="Password"
//           type="password"
//           mb="4"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <Button type="submit" colorScheme="blue">
//           Login
//         </Button>
//       </form>
//     </Box>
//   );
// }

// export default Login;
// Simarly we have to make a Register component in the pages folder
import React, { useState } from "react";
import { Box, Button, Input, Heading } from "@chakra-ui/react";
import { registerUser } from "../api";

function Register({ setAuth, setRole }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRoleUser] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({ name, email, password, role });
      localStorage.setItem("token", response.data.token);
      setAuth(true);
      const tokenPayload = JSON.parse(atob(response.data.token));
      setRole(tokenPayload.role);
      alert(response.data.message);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Box w="400px" p="4" mx="auto" mt="10">
      <Heading as="h2" mb="4">
        Register
      </Heading>
      <form onSubmit={handleRegister}>
        <Input
          placeholder="Name"
          mb="4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Email"
          mb="4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          mb="4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Make this a Dropdown of Teacher or Student */}
        <Input
          placeholder="Role"
          mb="4"
          value={role}
          onChange={(e) => {
            setRoleUser(e.target.value);
            setRole(e.target.value);
          }}
        />

        <Button type="submit" colorScheme="blue">
          Register
        </Button>
      </form>
    </Box>
  );
}

export default Register;
