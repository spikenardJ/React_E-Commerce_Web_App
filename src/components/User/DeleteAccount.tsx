import React from "react";
import { Button } from "react-bootstrap";
import { deleteUser } from "./userService";

interface DeleteAccountProps {
  userId: string; // The ID of the user to delete
  onAccountDeleted: () => void; // Callback to handle what happens after deletion
}

const DeleteAccount: React.FC<DeleteAccountProps> = ({ userId, onAccountDeleted }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (confirmDelete) {
      try {
        await deleteUser(userId);
        alert("Your account has been deleted.");
        onAccountDeleted(); // Trigger callback
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("Failed to delete your account. Please try again later.");
      }
    }
  };

  return (
    <Button variant="danger" onClick={handleDelete}>
      Delete Account
    </Button>
  );
};

export default DeleteAccount;
