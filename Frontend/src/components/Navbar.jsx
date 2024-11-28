import React from "react";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ isAuth, role, onLogout }) {
  const navigate = useNavigate();

  return (
    <Flex
      as="nav"
      p="4"
      bg="blue.500"
      color="white"
      justifyContent="space-between"
    >
      <Heading as="h1" size="lg">
        <Link to="/">School System</Link>
      </Heading>
      <Box>
        {isAuth ? (
          <>
            {role === "Admin" && (
              <Button as={Link} to="/admin" colorScheme="teal" mx="2">
                Admin
              </Button>
            )}
            {role === "Teacher" && (
              <Button as={Link} to="/teacher" colorScheme="teal" mx="2">
                Teacher
              </Button>
            )}
            {role === "Student" && (
              <Button as={Link} to="/student" colorScheme="teal" mx="2">
                Student
              </Button>
            )}
            <Button
              onClick={() => {
                onLogout();
                navigate("/login");
              }}
              colorScheme="red"
              mx="2"
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button as={Link} to="/login" colorScheme="teal" mx="2">
              Login
            </Button>
            <Button as={Link} to="/register" colorScheme="teal" mx="2">
              Register
            </Button>
          </>
        )}
      </Box>
    </Flex>
  );
}

export default Navbar;
