import { useEffect } from 'react';
import axios from 'axios';

function useWeb3AuthInitialization() {
    useEffect(() => {
        async function initWeb3Auth() {
            try {
                const response = await axios.get('/api/initWeb3Auth');
                if (response.data.message === 'Web3Auth initialization successful') {
                    // Web3Auth is initialized successfully
                    // You can add any additional logic here
                }
            } catch (error) {
                // Handle errors
                console.error('Error initializing Web3Auth:', error);
            }
        }

        initWeb3Auth();
    }, []);
}

export default useWeb3AuthInitialization;