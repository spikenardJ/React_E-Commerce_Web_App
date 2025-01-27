import React, { useState } from "react";
import { db } from "../../config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

interface User {
  id?: string;
  name: string;
  age: number;
}

interface UserFormProps {
  submitFunction?: (data: Omit<User, 'id'>) => void; // Optional submit function
  prefillData?: Partial<User>; // Optional prefill data
  buttonMessage?: string; // Custom button text
}

const UserForm: React.FC<UserFormProps> = ({
  submitFunction,
  prefillData,
  buttonMessage = "Add User", // Default value
}) => {
  const [data, setData] = useState<Omit<User, 'id'>>({
    name: prefillData?.name || '',
    age: prefillData?.age || 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: name === 'age' ? parseInt(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!data.name || data.age <= 0) {
      setError('Please provide a valid name and age.');
      return;
    }
    try {
      setLoading(true);
      if (submitFunction) {
        // Use the provided submit function
        submitFunction(data);
      } else {
        await addDoc(collection(db, 'users'), data);
        alert('User data added successfully!');
      }
      setData({ name: '', age: 0 });
    } catch (error) {
      setError('Failed to add user data. Please try again.');
      console.error('Error adding document: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        value={data.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <label htmlFor="age">Age</label>
      <input
        id="age"
        name="age"
        type="number"
        value={data.age}
        onChange={handleChange}
        placeholder="Age"
        min="1"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : buttonMessage}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default UserForm;
