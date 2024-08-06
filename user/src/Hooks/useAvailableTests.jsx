import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const useAvailableTests = () => {
    const user = useSelector(state => state.auth.user);
    const userId = user ? user._id : null;
    const [availableTests, setAvailableTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAvailableTests = async () => {
            if (!userId) {
                setError("Admin Not Found!");
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get(`/api/user/${userId}/tests/available`);
                setAvailableTests(response.data.data);
                console.log("Available Tests:", response.data.data);
            } catch (error) {
                setError(error.message.response); // Error fixed Since User
            } finally {
                setLoading(false);
            }
        };

        if(userId){
            fetchAvailableTests();
        }else{
            setLoading(false);
        }
    }, [userId]);

    return { availableTests, loading, error };
};

export default useAvailableTests;


