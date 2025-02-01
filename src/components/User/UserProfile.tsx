import React, { useState, useEffect } from "react";
import { getUser, updateUser, deleteUser } from "./userService";
import { useAuth } from "../../context/auth";
import NavBar from "../NavBar"; // Ensure this is correctly imported

const UserProfile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Please log in to view your profile</p>;
  }
  const userId = user?.uid;

  interface UserData {
    name: string;
    email: string;
    phone: string;
    age?: number;
  }

  const [userData, setUserData] = useState<UserData | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", age: 0 });

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const data = await getUser(userId);
        setUserData(data!);
        setFormData({ name: data!.name, email: data!.email, phone: data!.phone, age: data!.age ?? 0 });
      }
    };
    fetchData();
  }, [userId]);

  const handleUpdate = async () => {
    if (userId) {
      await updateUser(userId, formData);
      setEditing(false);
      setUserData({ ...userData, ...formData });
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      if (userId) {
        await deleteUser(userId);
      } else {
        console.error("User ID is undefined");
      }
      alert("Account deleted");
    }
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <>
      <NavBar /> {/* Added Navigation Bar */}
      <div className="container mt-4">
        {!editing ? (
          <>
            <h2 style={{ color: "teal" }}>{userData.name}</h2>
            <p>Email: {userData.email}</p>
            <p>Phone: {userData.phone}</p>
            <p>Age: {userData.age}</p>
            <br />
            <div className="text-center">
              <button className="btn btn-outline-dark" onClick={() => setEditing(true)}>
                Edit Profile
              </button>
              <br />
              <br />
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete Account
              </button>
            </div>
          </>
        ) : (
          <>
            <div style={{ border: "1px solid black", borderRadius: "10px", boxShadow: "0 0 4px black", paddingTop: "30px", paddingBottom: "40px", backgroundColor: "azure" }}>
              <div style={{ marginBottom: "30px", borderRadius: "10px", padding: "10px", backgroundColor: "teal"}} className="card-header text-center text-white mx-3">
                <h4 className="mb-0">{userId ? "Profile" : "Create Profile"}</h4>
              </div>
              <div style={{ marginLeft: "15%"}} className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  style={{width: "80%"}} 
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-control"
                />
              </div>
              <div style={{ marginLeft: "15%"}} className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  style={{width: "80%"}}
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-control"
                />
              </div>
              <div style={{ marginLeft: "15%"}} className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  style={{width: "80%"}}
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="form-control"
                />
              </div>
              <div style={{ marginLeft: "15%"}} className="mb-5">
                <label htmlFor="age" className="form-label">
                  Age
                </label>
                <input
                  style={{width: "80%"}}
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                  className="form-control"
                />
              </div>
              <div className="text-center mx-3">
                <button style={{width: "20%"}} className="btn btn-secondary w-100" onClick={handleUpdate}>
                  Save
                </button>
                <br /><br />
                <button style={{width: "20%"}} className="btn btn-outline-dark w-100" onClick={() => setEditing(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserProfile;
