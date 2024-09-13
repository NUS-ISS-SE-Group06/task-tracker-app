import React, { useState } from "react";
import "./Modal.css";

export const LeaderDashBoardModal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      id: "",
      userId: "",
      name: "",
      groupId: "",
      groupName: "",
      taskRewardPoint: ""
   
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.id &&formState.userId && formState.name && formState.groupId && formState.groupName && formState.taskRewardPoint) {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
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
            <label htmlFor="id"> ID</label>
            <input name="id" onChange={handleChange} value={formState.id} />
          </div>
          <div className="form-group">
            <label htmlFor="userId"> User ID</label>
            <input name="userId" onChange={handleChange} value={formState.userId} />
          </div>
          <div className="form-group">
            <label htmlFor="name">User Name</label>
            <input name="name" onChange={handleChange} value={formState.name} />
          </div>
          <div className="form-group">
            <label htmlFor="groupId">Group ID</label>
            <input name="groupId" onChange={handleChange} value={formState.groupId} />
          </div>
          <div className="form-group">
            <label htmlFor="groupName">Group Name</label>
            <input name="groupName" onChange={handleChange} value={formState.groupName} />
          </div>
          <div className="form-group">
            <label htmlFor="taskRewardPoint">Task Reward Point</label>
            <input name="taskRewardPoint" onChange={handleChange} value={formState.taskRewardPoint} />
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