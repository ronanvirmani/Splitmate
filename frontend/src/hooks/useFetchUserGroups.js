import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

export const useFetchUserGroups = () => {
  const [groups, setGroups] = useState([]);
  const { user } = useAuthContext();

  const fetchGroups = async () => {

    console.log(user.groups)
    try {
      const response = await fetch(`/api/users/${user._id}/groups/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch groups');
      }

      const groupsData = await response.json();
      setGroups(groupsData);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  useEffect(() => {
    console.log('User object:', user);
  
    if (user) {
      fetchGroups();
    }
  }, [user]);

  return groups;
};
