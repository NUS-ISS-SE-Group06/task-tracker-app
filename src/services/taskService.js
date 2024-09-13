import { BASE_URL } from "../components/common/Constants";
import { getCookieValue } from './cookieService';

 const fetchTaskList = async () => {
    try {
        const accessToken = getCookieValue('authToken');
      
        const response = await fetch(BASE_URL + "/taskinfo/tasklist", {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};
const deleteTask = async(taskId) =>{
    const accessToken = getCookieValue('authToken');

    try{
        
        const response = await fetch(BASE_URL + "/taskinfo/delete/"+taskId, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Failed to delete task");
        }
        else{
            return "success";
        }

       
    }catch(error){

        console.error("Error fetching tasks:", error);
        throw error;
    }

}
const editTask = async(taskId, taskData) => {
    console.log(taskData)
    const accessToken = getCookieValue('authToken');
     
    try{
        // Convert taskData to JSON string
        const requestBody = JSON.stringify(taskData);
        
        const response = await fetch(BASE_URL + "/taskinfo/update/"+taskId, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: requestBody // Include JSON body in the request
        });

        if (!response.ok) {
            throw new Error("Failed to update task");
        }
        else{
            const taskObj = response.json();
            return taskObj;
        }

       
    }catch(error){

        console.error("Error fetching tasks:", error);
        throw error;
    }
}
const createTask = async (taskData) => {
    const accessToken = getCookieValue('authToken');
    try {
        const requestBody = JSON.stringify(taskData);
        const response = await fetch(BASE_URL + "/taskinfo/create", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: requestBody
        });

        if (!response.ok) {
            throw new Error("Failed to create task");
            
        } else {
            const taskObj = response.json();
            return taskObj;
        }
    } catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
};
const fetchUserList = async (role) => {
    const accessToken = getCookieValue('authToken');
    try {
        if(role === 'ROLE_ADMIN'){
            const response = await fetch(BASE_URL + "/userlist", {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });  
          if (!response.ok) {
            throw new Error("Failed to fetch user list");
          }
          const data = await response.json();
          return data; // Update userList state with fetched data
        }
      
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };
export {fetchTaskList, deleteTask, editTask, createTask,fetchUserList} 
