import {useEffect, useState} from 'react';
import axios from '../utils/axios';

function useFetch(url){
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async (url) => {
        setIsLoading(true);

        try {
            const res = await axios.get(url);
            setIsLoading(false);
            setData(res.data);
        } catch (err){
            setIsLoading(false);
            setError(err.message);
        };
    };

    useEffect(() => {
        fetchData(url);
    }, []);

    return {data, isLoading, error};
}

export default useFetch;