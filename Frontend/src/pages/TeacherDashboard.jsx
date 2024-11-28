import React, { useEffect, useState } from "react";
import { Box, Button, Input, Heading, Table } from "@chakra-ui/react";
import { addMarks, fetchTeacherMarks } from "../api";

function TeacherDashboard() {
  const [marks, setMarks] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [subject, setSubject] = useState("");
  const [marksValue, setMarksValue] = useState("");

  const loadMarks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetchTeacherMarks(token);
      setMarks(response.data);
    } catch (err) {
      alert(err.response.data);
    }
  };

  useEffect(() => {
    loadMarks();
  }, []);

  const handleAddMarks = async () => {
    try {
      const token = localStorage.getItem("token");
      await addMarks(
        { studentName: studentId, subject, marks: marksValue },
        token
      );
      setStudentId("");
      setSubject("");
      setMarksValue("");
      loadMarks();
    } catch (err) {
      alert(err.response.data);
    }
  };

  return (
    <Box p="4">
      <Heading mb="4">Teacher Dashboard</Heading>
      <Box mb="4">
        <Input
          placeholder="Student Name"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          mb="2"
        />
        <Input
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          mb="2"
        />
        <Input
          placeholder="Marks"
          type="number"
          value={marksValue}
          onChange={(e) => setMarksValue(e.target.value)}
          mb="2"
        />
        <Button onClick={handleAddMarks} colorScheme="blue">
          Add Marks
        </Button>
      </Box>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Student</Table.ColumnHeader>
            <Table.ColumnHeader>Subject</Table.ColumnHeader>
            <Table.ColumnHeader>Marks</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {marks.map((record) => (
            <Table.Row key={record._id}>
              <Table.Cell>{record.studentName || "Unknown"}</Table.Cell>
              <Table.Cell>{record.subject}</Table.Cell>
              <Table.Cell>{record.marks}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}

export default TeacherDashboard;
