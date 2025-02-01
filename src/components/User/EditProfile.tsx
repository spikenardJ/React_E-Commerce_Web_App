import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { updateUser } from "./userService";

interface EditProfileProps {
  userId: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  onSave: (name: string, age: number, email: string, phone: string) => void;
  onCancel: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ userId, name, email, phone, age, onSave, onCancel }) => {
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedAge, setUpdatedAge] = useState(age);
  const [updatedEmail, setUpdatedEmail] = useState(email);
  const [updatedPhone, setUpdatedPhone] = useState(phone);

  const handleSave = async () => {
    try {
      await updateUser(userId, { name: updatedName, age: updatedAge, email: updatedEmail, phone: updatedPhone });
      onSave(updatedName, updatedAge, updatedEmail, updatedPhone);
    } catch (error) {
      alert("Failed to update profile.");
    }
  };

  return (
    <Form>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="age">
        <Form.Label>Age</Form.Label>
        <Form.Control
          type="number"
          value={updatedAge}
          onChange={(e) => setUpdatedAge(Number(e.target.value))}
        />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          value={updatedEmail}
          onChange={(e) => setUpdatedEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="phone">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="tel"
          value={updatedPhone}
          onChange={(e) => setUpdatedPhone(e.target.value)}
        />
      </Form.Group>
      <Button onClick={handleSave} variant="success" className="mt-3">
        Save
      </Button>{" "}
      <Button onClick={onCancel} variant="secondary" className="mt-3">
        Cancel
      </Button>
    </Form>
  );
};

export default EditProfile;
