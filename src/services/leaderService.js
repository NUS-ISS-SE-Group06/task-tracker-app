import { BASE_URL } from "../components/common/Constants";
import { getCookieValue } from './cookieService';

 const fetchLeaderBoard = async () => {
    try {
        const accessToken = getCookieValue('authToken');
      
        const response = await fetch(BASE_URL + "/taskinfo/leaderboard", {
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

export {fetchLeaderBoard}
