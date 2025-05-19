import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * 
 * @param {*} endpoint 
 * @param {*} method 'GET'
 * @param {*} body null
 * @returns 
 */
const useAPI = (endpoint, method = 'GET', body = null, activeTab = '', printEndpoint = false) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiUrl = `${process.env.REACT_APP_SERVER_API_PROXY}${endpoint}`;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            setData(null); // Reset data when the endpoint changes

            // Handle case when no endpoint is provided (like "home" or "units")
            if (!endpoint) {
                setLoading(false);
                return;
            }

            try {
                let response;

                // Handle GET vs POST/PUT methods
                if (method.toUpperCase() === 'GET') {
                    response = await axios.get(apiUrl, {
                        params: body, // Use body as params for GET requests
                    });
                } else {
                    response = await axios({
                        method,
                        url: apiUrl,
                        data: body, // Use data for POST/PUT requests
                    });
                }
                printEndpoint && console.log("SUCCESS - API Call to:", apiUrl);
                setData(response.data);
            } catch (error) {
                printEndpoint && console.log("ERROR - API Call to:", apiUrl);
                console.error(`Error fetching data (Endpoint): ${apiUrl}`, error);
                setError(error.response ? error.response.data : `An error occurred while fetching API (Endpoint: ${apiUrl}).`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint, method, apiUrl, body, activeTab, printEndpoint]);

    return { response: data, loading, error };
};

export default useAPI;
