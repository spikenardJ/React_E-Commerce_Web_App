import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, getUser, updateUser } from "./userService";
import "bootstrap/dist/css/bootstrap.min.css";

interface User {
  id?: string;
  name: string;
  age?: number;
  email: string;
  phone: string;
}

interface UserFormProps {
  userId?: string;
  buttonMessage?: string;
}

const ProfileForm: React.FC<UserFormProps> = ({ userId, buttonMessage = "Save" }) => {
  const [data, setData] = useState<Omit<User, 'id'>>({
    name: '',
    age: 0,
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      setLoading(true);
      getUser(userId).then((userData: User | null) => {
        if (userData) {
          setData(userData);
        }
        setLoading(false);
      }).catch((err: any) => {
        console.error("Error fetching user: ", err);
        setLoading(false);
      });
    }
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
    setLoading(true);
    setError(null);
  
    try {
      if (userId) {
        await updateUser(userId, data);
      } else {
        await createUser(userId || "", { ...data, createdAt: new Date().toISOString() });
      }
      alert("Profile saved successfully!");
      navigate("/profile");
    } catch (err: any) {
      console.error("Error saving profile: ", err);
      setError(err.message || "An error occurred while saving the profile.");
    } finally {
      setLoading(false);
      // console.log("Loading state is now:", loading);
    }
  };

  return (
    <div style={{ border: "1px solid black", borderRadius: "10px", boxShadow: "0 0 4px black", paddingTop: "30px", paddingBottom: "40px", backgroundColor: "azure" }} className="container mt-4">
      <div style={{ borderRadius: "10px", backgroundColor: "azure" }}>
        <div style={{ marginBottom: "30px", borderRadius: "10px", padding: "10px", backgroundColor: "teal"}} className="card-header text-center text-white">
          <h4 className="mb-0">{userId ? "Profile" : "Create Profile"}</h4>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form id="profile-form" onSubmit={handleSubmit}>
            <div style={{ marginLeft: "15%"}}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  id="name"
                  style={{width: "80%"}}
                  type="text"
                  className="form-control"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  id="email"
                  style={{width: "80%"}}
                  type="email"
                  className="form-control"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input
                  id="phone"
                  style={{width: "80%"}}
                  type="tel"
                  className="form-control"
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="age" className="form-label">Age</label>
                <input
                  id="age"
                  style={{width: "80%"}}
                  type="number"
                  className="form-control"
                  value={data.age}
                  onChange={(e) => setData({ ...data, age: Number(e.target.value) })}
                  required
                />
              </div>
            </div>
            <button style={{ marginTop: "30px"}} type="submit" className="btn btn-secondary w-100" disabled={loading}>
              {loading ? "Saving..." : buttonMessage}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
