import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import InputField from "./InputField";
import "../assets/scss/ProfileDialog.scss";

const avatars = [
  "/assets/images/avatar/avatar1.png",
  "/assets/images/avatar/avatar2.png",
  "/assets/images/avatar/avatar3.png",
  "/assets/images/avatar/avatar4.png",
  "/assets/images/avatar/avatar5.png",
  "/assets/images/avatar/avatar6.png",
  "/assets/images/avatar/avatar7.png",
  "/assets/images/avatar/avatar8.png",
  "/assets/images/avatar/avatar9.png",
  "/assets/images/avatar/avatar10.png",
];

function ProfileDialog({ show, onClose, onConfirm, formData, setFormData, isEditing }) {
  const [activeTab, setActiveTab] = useState("avatar");

  if (!formData) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarSelect = (avatar) => {
    setFormData({ ...formData, avatar });
  };

  const handleSave = () => {
    onConfirm(formData); // This should trigger saving in the parent component
  };

  return (
    <Modal show={show} onHide={onClose} centered dialogClassName="profile-modal">
      
      <Modal.Body className="profile-body">
        <div className="profile-sidebar">
          <h1>Profile</h1>
          <Avatar
            sx={{ bgcolor: "#09FBD3",width: 80, height: 80 ,color:"black",margin:"auto"}}
            src={formData.avatar || ""}
          />
          <InputField
            type="text"
            name="firstName"
            placeholder="Enter Name"
            value={formData.firstName || ""}
            onChange={handleChange}
            required
          />
          <p style={{color:"#E31B53"}}>Complete your profile and win exciting prizes</p>
          <Button className="save-btn" onClick={handleSave}>Save Changes</Button>
        </div>

        <div className="profile-content card-with-border">
          <div className="profile-tabs">
            <button className={activeTab === "avatar" ? "active" : ""} onClick={() => setActiveTab("avatar")}>
              Choose Avatar
            </button>
            <button className={activeTab === "achievements" ? "active" : ""} onClick={() => setActiveTab("achievements")}>
              Achievements
            </button>
          </div>

          {activeTab === "avatar" ? (
            <div className="avatar-grid">
              {avatars.map((avatar, index) => (
                <div key={index}  className={`avatar-card ${formData.avatar === avatar ? "selected" : ""}`}  onClick={() => handleAvatarSelect(avatar)}>
                  <img src={avatar} alt={`Avatar ${index + 1}`} />
                </div>
              ))}
            </div>
          ) : (
            <div className="achievements-tab">
              <p className="achievement-text">
                Hey buddy, no achievement yet <br />
                but no worries, you can win now!
              </p>
              <Button className="game-btn">Go to game section</Button>
            </div>
          )}
        </div>

        <button className="close-btn" onClick={onClose}>
          <i className="fa-solid fa-xmark" style={{color:"#E31B53"}}></i> 
        </button>
      </Modal.Body>
    </Modal>
  );
}

export default ProfileDialog;
