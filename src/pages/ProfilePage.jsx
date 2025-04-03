import React, { useState } from "react";
import ProfileDialog from "../Components/ProfileDialog";
import { Card } from "react-bootstrap";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import { Edit, Delete } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "../assets/scss/Profile.scss";

const ProfilePage = () => {
  localStorage.removeItem("previousRoute");
  localStorage.removeItem("lastRoute");

  const [formData, setFormData] = useState({ firstName: "" });
  const [profiles, setProfiles] = useState([
    { firstName: "Gourav", avatar: "/avatars/avatar1.png" },
  ]); // Default profile
  const [showDialog, setShowDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const MAX_PROFILES = 6;
  const navigate = useNavigate();

  const handleOpen = () => {
    if (profiles.length >= MAX_PROFILES) {
      toast.error("Only 6 profiles can be added!", { position: "top-center" });
      return;
    }
    setIsEditing(false);
    setFormData({ firstName: "" });
    setShowDialog(true);
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setFormData(profiles[index]);
    setShowDialog(true);
  };

  const handleDelete = (index) => {
    const updatedProfiles = profiles.filter((_, i) => i !== index);
    setProfiles(updatedProfiles);
  };

  const handleConfirm = () => {
    if (formData.firstName.trim() === "") {
      toast.error("Profile name cannot be empty!", { position: "top-center" });
      return;
    }

    if (
      profiles.some(
        (profile, index) =>
          profile.firstName.toLowerCase() === formData.firstName.toLowerCase() &&
          (!isEditing || index !== editIndex)
      )
    ) {
      toast.error("Profile name already exists!", { position: "top-center" });
      return;
    }

    if (isEditing) {
      const updatedProfiles = [...profiles];
      updatedProfiles[editIndex] = formData;
      setProfiles(updatedProfiles);
    } else {
      setProfiles([...profiles, formData]);
    }

    setFormData({ firstName: "" });
    setShowDialog(false);
  };

  return (
    <div className="profile-page">
      <ToastContainer />
      <ProfileDialog
        show={showDialog}
        onClose={() => setShowDialog(false)}
        onConfirm={handleConfirm}
        formData={formData}
        setFormData={setFormData}
        isEditing={isEditing}
      />

      {/* Header Section */}
      <div className="profile-header">
      <Avatar 
        sx={{ 
          backgroundImage: "linear-gradient(90deg, #E31B53 0%, #FF7AA8 100%)", 
          width: 80, 
          height: 80 
        }} 
        src="/avatars/main-user.png"
      >
      </Avatar>
        <h2>Welcome, Serena!</h2>
      </div>

      {/* Profile Selection Section */}
      <div className="profile-selection">
  {profiles.map((profile, index) => (
    <div key={index} className="profile-item">
      <Avatar
        sx={{ bgcolor: "#09FBD3", width: 56, height: 56, color: "black" }}
        src={profile.avatar || ""}
        onClick={() => handleEdit(index)} // Open dialog with prefilled values
      >
        {!profile.avatar && profile.firstName[0].toUpperCase()}
      </Avatar>
      <p>{profile.firstName}</p>
    </div>
  ))}

        {/* Add Profile Button */}
        <div>
        <div className="profile-item add-profile" onClick={handleOpen}>
          <i className="fa-solid fa-plus"></i>
          
        </div>
        <div>
        <p>Add Profile</p>
        </div>
        </div>
        
      </div>

      {/* Navigation Buttons */}
      <div className="profile-menu">
        <div className="menu-item" onClick={() => navigate("/manage-profile")}>
          <i className="fa-solid fa-user-pen" style={{color:"#E31B53"}}></i>
          <span>Manage Profile</span>
        </div>
        <div className="menu-item" onClick={() => navigate("/subscription")}>
          <i className="fa-solid fa-money-check-alt" style={{color:"#E31B53"}}></i>
          <span>Subscription Plan</span>
        </div>
        <div className="menu-item" onClick={() => navigate("/parent-dashboard")}>
          <i className="fa-solid fa-chart-line" style={{color:"#E31B53"}}></i>
          <span>Parent Dashboard</span>
        </div>
        <div className="menu-item" onClick={() => navigate("/account-settings")}>
          <i className="fa-solid fa-cog" style={{color:"#E31B53"}}></i>
          <span>Account Settings</span>
        </div>
        <div className="menu-item" onClick={() => navigate("/help")}>
          <i className="fa-solid fa-question-circle" style={{color:"#E31B53"}}></i>
          <span>Help & Support</span>
        </div>
        <div className="menu-item sign-out" onClick={() => navigate("/sign-out")}>
          <i className="fa-solid fa-sign-out-alt" style={{color:"#E31B53"}}></i>
          <span>Sign Out</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
