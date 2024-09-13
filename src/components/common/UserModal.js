import React, { useState } from "react";
import "./Modal.css";
import { createUserInfo, editUserInfo } from "../../services/userRegistrationService";

export const UserModal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      email: "",
      name: "",
      userRole: "ROLE_USER",
      passwordChangeMandatory: "TRUE"
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.email && formState.name && formState.passwordChangeMandatory) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('onSubmit type:', typeof onSubmit);  // Debugging
    console.log('onSubmit value:', onSubmit);        // Debugging

    if (typeof onSubmit === 'function') {
        onSubmit(formState);
    } else {
        console.error('onSubmit is not a function', onSubmit);
    }

    console.log("Submitting User Registration form");
    if (!validateForm()) return;

    
    try {
      const userRegData = {
          userId: formState.userId,
          name: formState.name,
          email: formState.email,
          userRole: formState.userRole,
          username: formState.username,
          passwordChangeMandatory: formState.passwordChangeMandatory,
          deleteFlag: formState.deleteFlag
      };

      if(formState.userId === undefined){
        console.log("New User Insertion");
        userRegData.userId = 0;
        const response = await createUserInfo(userRegData);
        if (response !== null && response.error === "") {
           // onSubmit(formState, response);
         //  onSubmit(formState);
            closeModal();
        } else {
           setErrors(response.error);
           throw new Error("Failed to edit user Registration"+response.error);
        }
      } else{
        const response = await editUserInfo(userRegData);
        if (response !== null && response.error === "") {
            onSubmit(formState);
            closeModal();
        } else {
           setErrors(response.error);
           throw new Error("Failed to edit user Registration"+response.error);
        }
      }
  } catch (error) {
      setErrors(error);
      console.error("Error handling User Creation submission:", error);
      return false;
      // Handle error (e.g., display an error message to the user)
  }


  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
        <div className="form-group">
            <label htmlFor="username">User Name</label>
            <input name="username" onChange={handleChange} value={formState.username} />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input name="name" onChange={handleChange} value={formState.name} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input name="email" onChange={handleChange} value={formState.email} />
          </div>
          <div className="form-group">
            <label htmlFor="userRole">User Role</label>
            <select name="userRole" onChange={handleChange} value={formState.userRole}>
              <option value="ROLE_USER">User</option>
              <option value="ROLE_ADMIN">Admin</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="passwordChangeMandatory">Reset Password</label>
            <select
              name="passwordChangeMandatory"
              onChange={handleChange}
              value={formState.passwordChangeMandatory}>
              <option value="TRUE">Yes</option>
              <option value="FALSE">No</option>
            </select>
          </div>
        
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};