import { useState, useEffect } from 'react';
import { db } from '../../config/firebaseConfig';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

interface User {
  id?: string;
  name: string;
  age: number;
}

const DisplayUserData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const dataArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as User[];
        setUsers(dataArray);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  
  const updateUser = async (userId: string, updatedData: Partial<User>) => {
    try {
      setLoading(true);
      const userDoc = doc(db, 'users', userId);
      await updateDoc(userDoc, updatedData);
      setMessage('User updated successfully!');
      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, ...updatedData } : user))
      );
    } catch (error) {
      console.error('Error updating user:', error);
    }
    setLoading(false);
  };

  
  const deleteUser = async (userId: string): Promise<void> => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      setLoading(true);
      await deleteDoc(doc(db, 'users', userId));
      setMessage('User deleted successfully!');
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
    setLoading(false);
  };

 
  const handleEdit = (user: User) => {
    setSelectedUser(user);
  };

  
  const handleUpdate = () => {
    if (selectedUser && selectedUser.id) {
      updateUser(selectedUser.id, { name: selectedUser.name, age: selectedUser.age });
      setSelectedUser(null); 
    }
  };

  return (
    <div>
      <h2>Users List</h2>
      {loading && <p>Loading...</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {users.map((user) => (
        <div
          key={user.id}
          style={{
            border: '2px solid black',
            margin: '10px',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          <p>Name: {user.name}</p>
          <p>Age: {user.age}</p>
          <button onClick={() => handleEdit(user)}>Edit</button>
          <button
            style={{ backgroundColor: 'crimson', color: 'white', marginLeft: '10px' }}
            onClick={() => user.id && deleteUser(user.id)}
          >
            Delete
          </button>
        </div>
      ))}
      {selectedUser && (
        <div style={{ marginTop: '20px' }}>
          <h3>Edit User</h3>
          <input
            type="text"
            value={selectedUser.name}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, name: e.target.value })
            }
            placeholder="Name"
          />
          <input
            type="number"
            value={selectedUser.age}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, age: parseInt(e.target.value) })
            }
            placeholder="Age"
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setSelectedUser(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default DisplayUserData;
