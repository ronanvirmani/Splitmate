import { useState } from 'react';
import { useGroupsContext } from './useGroupContext';

const API_URL = process.env.REACT_APP_API_URL;

const useRemoveUserFromGroup = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useGroupsContext();

  const removeUserFromGroup = async (groupId, userId) => {
    try {
      const response = await fetch(`${API_URL}/api/groups/${groupId}/removeUser`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'REMOVE_GROUP_MEMBER', payload: { groupId, userId } });
        setError(null);
      } else {
        setError(json.message);
      }
    } catch (err) {
      console.error('Error removing user from group:', err);
      setError('An error occurred while removing the user from the group.');
    }
  };

  return { removeUserFromGroup, error };
};

export default useRemoveUserFromGroup;
