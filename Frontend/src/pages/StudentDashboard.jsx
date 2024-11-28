import React, { useEffect, useState } from "react";
import { Box, Table, Heading } from "@chakra-ui/react";
import { fetchMarks } from "../api";

function StudentDashboard() {
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    const loadMarks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetchMarks(token);
        setMarks(response.data);
      } catch (err) {
        alert(err.response.data);
      }
    };
    loadMarks();
  }, []);

  return (
    <Box p="4">
      <Heading mb="4">Student Dashboard</Heading>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Subject</Table.ColumnHeader>
            <Table.ColumnHeader>Marks</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {marks.map((record) => (
            <Table.Row key={record._id}>
              <Table.Cell>{record.studentName}</Table.Cell>
              <Table.Cell>{record.subject}</Table.Cell>
              <Table.Cell>{record.marks}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}

export default StudentDashboard;
