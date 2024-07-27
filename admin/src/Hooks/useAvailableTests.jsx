import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const useAvailableTests = () => {
    const admin = useSelector(state => state.auth.user);
    const adminId = admin ? admin._id : null;
    const [availableTests, setAvailableTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAvailableTests = async () => {
            if (!adminId) {
                setError("Admin Not Found!");
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get(`/api/admin/test/${adminId}`);
                setAvailableTests(response.data);
                // console.log("Available Tests:", response.data.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if(adminId){
            fetchAvailableTests();
        }else{
            setLoading(false);
        }
    }, [adminId]);

    return { availableTests, loading, error };
};

export default useAvailableTests;


