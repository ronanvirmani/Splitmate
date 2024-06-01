import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useGroupsContext } from './useGroupContext';

const useCreateGroup = () => {
  const { user } = useAuthContext();
  const { dispatch } = useGroupsContext();
  const [error, setError] = useState(null);

  const createGroup = async (name, items) => {
    if (!name) {
      setError('Group name is required');
      return;
    }

    const group = { name, items };

    try {
      const response = await fetch(`/api/groups/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(group)
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'CREATE_GROUP', payload: json });
        setError(null);
      } else {
        setError(json.message);
      }
    } catch (err) {
      console.error('Error creating group:', err);
      setError('An error occurred while creating the group.');
    }
  };

  return { createGroup, error };
};

export default useCreateGroup;
