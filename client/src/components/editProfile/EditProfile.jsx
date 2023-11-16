import { useContext, useState } from "react";
import "./editProfile.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

import {
  Close,
  Favorite,
  House,
  LocationOn,
  School,
  Work,
  BusinessCenter,
} from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

export default function EditProfile({ toggleEditProfile }) {
  const { user: me } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    lives: me.lives || "",
    work: me.work || "",
    position: me.position || "",
    school: me.school || "",
    university: me.university || "",
    universityField: me.universityField || "",
    from: me.from || "",
    relationship: me.relationship || "",
    profilePicture: "",
    coverPicture: "",
    bio: me.bio || "",
  });

  const handleChange = (e) => {
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    try {
      const res = await axios.put(`/users/${me._id}/edit`, formData);
      setLoading(false);
      
      if (res.status === 200) {
        sessionStorage.setItem("user", JSON.stringify(res.data));
        window.location.reload();
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <form className="editProfile" onSubmit={handleSubmit}>
      <div className="editProfileContainer pd-8">
        <div className="editProfileTop">
          <h3 className="editProfileTopText">Edit profile</h3>
          <span className="editProfileClose" onClick={toggleEditProfile}>
            <Close />
          </span>
        </div>
        <div className="editProfileSection">
          <div className="editProfileSectionTop">
            <h3 className="editProfileSectionText">Profile picture</h3>
            <label htmlFor="profilePicture" className="editProfileSectionBtn">
              Edit
            </label>
          </div>

          {form.profilePicture ? (
            <div className="editProfileImage">
              <img src={URL.createObjectURL(form.profilePicture)} alt="main" />
            </div>
          ) : (
            ""
          )}
          <input
            type="file"
            name="profilePicture"
            id="profilePicture"
            accept=".jpg, .jpeg, .png"
            className="hidden"
            onChange={(e) =>
              setForm((prevState) => ({
                ...prevState,
                profilePicture: e.target.files[0],
              }))
            }
          />
        </div>
        <div className="editProfileSection">
          <div className="editProfileSectionTop">
            <h3 className="editProfileSectionText">Cover photo</h3>
            <label htmlFor="coverPicture" className="editProfileSectionBtn">
              Edit
            </label>
          </div>
          {form.coverPicture ? (
            <div className="editProfileCoverImage">
              <img src={URL.createObjectURL(form.coverPicture)} alt="cover" />
            </div>
          ) : (
            ""
          )}

          <input
            type="file"
            name="coverPicture"
            id="coverPicture"
            accept=".jpg, .jpeg, .png"
            className="hidden"
            onChange={(e) =>
              setForm((prevState) => ({
                ...prevState,
                coverPicture: e.target.files[0],
              }))
            }
          />
        </div>
        <div className="editProfileSection">
          <div className="editProfileSectionTop">
            <h3 className="editProfileSectionText">Bio</h3>
            <button className="editProfileSectionBtn">Add</button>
          </div>
          <div className="editProfileBio">
            <textarea
              type="text"
              placeholder="Describe yourself..."
              name="bio"
              className="editProfileBioTextarea"
              onChange={handleChange}
              value={form.bio}
            />
          </div>
        </div>
        <div className="editProfileSection">
          <div className="editProfileSectionTop">
            <h3 className="editProfileSectionText">Customize your intro</h3>
            <button className="editProfileSectionBtn">Add</button>
          </div>
          <div className="editProfileIntro">
            <div className="editProfileIntroItem">
              <label htmlFor="lives" className="editProfileIntroItemIcon">
                <House />
              </label>
              <input
                className="editProfileIntroItemInput"
                type="text"
                name="lives"
                id="lives"
                placeholder="Current city"
                onChange={handleChange}
                value={form.lives}
              />
            </div>
            <div className="editProfileIntroItem">
              <label htmlFor="work" className="editProfileIntroItemIcon">
                <Work />
              </label>

              <input
                className="editProfileIntroItemInput"
                type="text"
                name="work"
                id="work"
                placeholder="Workplace"
                onChange={handleChange}
                value={form.work}
              />
            </div>
            <div className="editProfileIntroItem">
              <label htmlFor="position" className="editProfileIntroItemIcon">
                <BusinessCenter />
              </label>

              <input
                className="editProfileIntroItemInput"
                type="text"
                name="position"
                id="position"
                placeholder="Position"
                onChange={handleChange}
                value={form.position}
              />
            </div>
            <div className="editProfileIntroItem">
              <label htmlFor="school" className="editProfileIntroItemIcon">
                <School />
              </label>

              <input
                className="editProfileIntroItemInput"
                type="text"
                name="school"
                placeholder="School"
                id="school"
                onChange={handleChange}
                value={form.school}
              />
            </div>
            <div className="editProfileIntroItem">
              <label htmlFor="university" className="editProfileIntroItemIcon">
                <School />
              </label>

              <input
                className="editProfileIntroItemInput"
                type="text"
                name="university"
                placeholder="University"
                id="university"
                onChange={handleChange}
                value={form.university}
              />
            </div>
            <div className="editProfileIntroItem">
              <label
                htmlFor="universityField"
                className="editProfileIntroItemIcon"
              >
                <School />
              </label>

              <input
                className="editProfileIntroItemInput"
                type="text"
                name="universityField"
                placeholder="University field"
                id="universityField"
                onChange={handleChange}
                value={form.universityField}
              />
            </div>
            <div className="editProfileIntroItem">
              <label htmlFor="from" className="editProfileIntroItemIcon">
                <LocationOn />
              </label>

              <input
                className="editProfileIntroItemInput"
                type="text"
                name="from"
                placeholder="Hometown"
                id="from"
                onChange={handleChange}
                value={form.from}
              />
            </div>
            <div className="editProfileIntroItem">
              <label
                htmlFor="relationship"
                className="editProfileIntroItemIcon"
              >
                <Favorite />
              </label>

              <input
                className="editProfileIntroItemInput"
                type="text"
                name="relationship"
                placeholder="Relationship Status"
                id="relationship"
                onChange={handleChange}
                value={form.relationship}
              />
            </div>
          </div>
        </div>
        <div className="editProfileSection">
          <div className="editProfileSectionTop">
            <h3 className="editProfileSectionText">Featured</h3>
            <button className="editProfileSectionBtn">Add</button>
          </div>
        </div>
        <button className="editProfileBtn" type="submit" disabled={loading}>
          {!loading ? 'Edit your About info' : <CircularProgress size="22px"/>}
        </button>
      </div>
    </form>
  );
}
