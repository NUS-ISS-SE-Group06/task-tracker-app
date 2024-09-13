import React, { useState, useEffect } from "react";
import "./Modal.css";
import { createTask, editTask, fetchUserList } from "../../services/taskService";
import { createComment } from "../../services/commentService";

export const Modal = ({ closeModal, onSubmit, defaultValue, userRole }) => {
  const isAdmin = userRole === 'ROLE_ADMIN';

  const [formState, setFormState] = useState({
    taskName: "",
    taskDescription: "",
    taskAssignee: "",
    taskDueDate: "",
    taskStatus: "Pending",
    taskComment: "",
    taskCommentHistory: "",
    ...defaultValue?.row, // Spread defaultValue to merge with default state
  });
  const [errors, setErrors] = useState("");
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    // Safely access nested properties with optional chaining and provide default values
    let assignee = defaultValue?.row?.taskAssignee || "";
    if (isAdmin) {
      fetchUserList(userRole)
        .then(data => {
          setUserList(data);
          if (data.length > 0) {
            // Find the corresponding user in userList based on taskAssignee
            const defaultUser = data.find(user => user.userId === assignee);
            assignee = defaultUser?.userId || "";
          }
        }).catch(error => {
          console.error("Error fetching user list:", error);
        });
    }

    if (defaultValue) {
      const taskDueDate = new Date(defaultValue?.row?.taskDueDate);
      const localTimezoneOffset = taskDueDate.getTimezoneOffset() * 60000; // Timezone offset in milliseconds
      const localTaskDueDate = new Date(taskDueDate.getTime() - localTimezoneOffset);
      const formattedTaskDueDate = localTaskDueDate.toISOString().split('T')[0];
      const taskCommentHistory = defaultValue?.commentrows
        .sort((a, b) => b.task_comment_id - a.task_comment_id)
        .map(row => row.taskComment)
        .join('<br/>');

      // Set formatted date values and taskStatus
      setFormState(prevState => ({
        ...prevState,
        taskDueDate: formattedTaskDueDate,
        taskStatus: defaultValue?.row?.taskStatus,
        taskCommentHistory,
        taskAssignee: assignee
      }));
    } else {
      // Set default values
      setFormState({
        taskName: "",
        taskDescription: "",
        taskAssignee: assignee,
        taskDueDate: "", // You can set a default due date here
        taskStatus: "Pending" // You can set a default status here
      });
    }
  }, [isAdmin, userRole, defaultValue]);


  const validateForm = () => {
    if (formState.taskName && formState.taskDescription && formState.taskAssignee && formState.taskDueDate && formState.taskStatus) {
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
    const { name, value } = e.target;

    console.log("Selected target name :", name );
    console.log("Selected target value:", value );


    if (name === "taskAssignee") {
      if (userList.length === 0) {
        console.log("User list is empty");
        return;
      }
      console.log("Selected userlist:", userList);


       let selectedUser = userList.find(user => user.userId === value);
      selectedUser = 1;
      console.log("Selected user ID :", selectedUser);
     // let userId = selectedUser ? selectedUser.userId : "";

 
   
      setFormState({ ...formState, [name]: selectedUser });
    

      // Use a function to ensure the latest state is used for updates
      setFormState(prevState => ({ ...prevState, [name]: selectedUser }));
    } else {
      // This also ensures that the latest state is used for updates
      setFormState(prevState => ({ ...prevState, [name]: value }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form");

    if (!validateForm()) return;

    try {
      const taskData = {
        taskName: formState.taskName,
        taskDescription: formState.taskDescription,
        taskAssignee: formState.taskAssignee,
        taskDueDate: formState.taskDueDate + "T00:00:00.000Z",
        taskStatus: formState.taskStatus
      };

      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');


      const commetData = {
        taskId: formState.taskId,
        taskComment: formState.taskComment,
        createdDate: formattedDate,
      };


      if (defaultValue) {
        const response = await editTask(formState.taskId, taskData);
        if (response !== null && response.error === "") {
          const response2 = await createComment(commetData);
          if (response2 !== "success") {
            setErrors(response2.error);
            throw new Error("Failed to add task comment" + response2.error);
          }
          onSubmit(formState);
          closeModal();
        } else {
          setErrors(response.error);
          throw new Error("Failed to edit task" + response.error);
        }
      } else {
        const response = await createTask(taskData);
        if (response !== null && response.error === "") {

          onSubmit(formState, response);
          closeModal();
        } else {
          setErrors(response.error);
          throw new Error("Failed to create task" + response.error);
        }
      }
    } catch (error) {
      setErrors(error);
      console.error("Error handling task submission:", error);
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
            <label htmlFor="taskName">Task Name</label>
            <input name="taskName" onChange={handleChange} value={formState.taskName} readOnly={!isAdmin} />
          </div>
          <div className="form-group">
            <label htmlFor="taskDescription">Task Description</label>
            <textarea name="taskDescription" onChange={handleChange} value={formState.taskDescription} readOnly={!isAdmin} />
          </div>
          {isAdmin && <div className="form-group">
            <label htmlFor="taskAssignee">Task Assignee</label>
            {/* <input name="taskAssignee" onChange={handleChange} value={formState.taskAssignee} readOnly={!isAdmin}/> */}
            <select
              name="taskAssignee"
              onChange={handleChange}
              value={formState.taskAssignee}
              disabled={!isAdmin}  // Use disabled instead of readOnly for <select>
            >
              <option value="">Select Assignee</option>
              {userList.map(user => (
                <option key={user.userId} value={user.userId}>
                  {user.name}
                </option>
              ))}
            </select>

          </div>}
          {isAdmin && <div className="form-group">
            <label htmlFor="taskDueDate">Task Due Date</label>
            <input type="date" name="taskDueDate" onChange={handleChange} value={formState.taskDueDate} readOnly={!isAdmin} />
          </div>}
          <div className="form-group">
            <label htmlFor="taskStatus">Status</label>
            <select
              name="taskStatus"
              onChange={handleChange}
              value={formState.taskStatus}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Complete">Complete</option>
            </select>
          </div>
          {formState.taskId && (
            <div className="form-group" >
              <label htmlFor="taskComment">Comment</label>
              <textarea name="taskComment" onChange={handleChange} value={formState.taskComment} />
              {formState.taskCommentHistory && (
                <label dangerouslySetInnerHTML={{ __html: formState.taskCommentHistory }} ></label>
              )}
            </div>
          )}

          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};