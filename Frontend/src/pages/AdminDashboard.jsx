import React, { useEffect, useState } from "react";
import { Box, Button, Heading, Table } from "@chakra-ui/react";
import { fetchUsers, approveUser, disableUser } from "../api";

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetchUsers(token);
      setUsers(response.data);
    } catch (err) {
      alert(err.response.data);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await approveUser(id, token);
      loadUsers();
    } catch (err) {
      alert(err.response.data);
    }
  };

  const handleDisable = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await disableUser(id, token);
      loadUsers();
    } catch (err) {
      alert(err.response.data);
    }
  };

  return (
    <Box p="4">
      <Heading mb="4">Admin Dashboard</Heading>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
            <Table.ColumnHeader>Role</Table.ColumnHeader>
            <Table.ColumnHeader>Approved</Table.ColumnHeader>
            <Table.ColumnHeader>Active</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user) => (
            <Table.Row key={user._id}>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
              <Table.Cell>{user.isApproved ? "Yes" : "No"}</Table.Cell>
              <Table.Cell>{user.isActive ? "Yes" : "No"}</Table.Cell>
              <Table.Cell>
                {!user.isApproved && (
                  <Button
                    onClick={() => handleApprove(user._id)}
                    colorScheme="green"
                    size="sm"
                    mr="2"
                  >
                    Approve
                  </Button>
                )}
                <Button
                  onClick={() => handleDisable(user._id)}
                  colorScheme="red"
                  size="sm"
                >
                  Disable
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}

export default AdminDashboard;
