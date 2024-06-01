import { useEffect } from 'react';
import { useAuthContext } from './useAuthContext';
import { useGroupsContext } from './useGroupContext';

const API_URL = process.env.REACT_APP_API_URL;


const useFetchGroups = () => {
  const { user } = useAuthContext();
  const { dispatch } = useGroupsContext();

  useEffect(() => {
    const fetchGroups = async () => {
      if (!user) return;

      try {
        const response = await fetch(`${API_URL}/api/users/${user._id}/groups/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const json = await response.json();

        if (response.ok) {
          dispatch({ type: 'SET_GROUPS', payload: json });
        } else {
          console.error('Failed to fetch groups:', json);
        }
      } catch (err) {
        console.error('Error fetching groups:', err);
      }
    };

    fetchGroups();
  }, [user, dispatch]);
};

export default useFetchGroups;
