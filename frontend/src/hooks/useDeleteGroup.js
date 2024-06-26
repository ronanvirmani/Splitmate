import { useState } from 'react';
import { useGroupsContext } from './useGroupContext';

const API_URL = process.env.REACT_APP_API_URL;


const useDeleteGroup = () => {
  const { dispatch } = useGroupsContext();
  const [error, setError] = useState(null);

  const deleteGroup = async (groupId) => {
    try {
      const response = await fetch(`${API_URL}/api/groups/${groupId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'DELETE_GROUP', payload: groupId });
        setError(null);
      } else {
        setError(json.message);
      }
    } catch (err) {
      console.error('Error deleting group:', err);
      setError('An error occurred while deleting the group.');
    }
  };

  return { deleteGroup, error };
};

export default useDeleteGroup;
