import { useState } from 'react';
import { useGroupsContext } from './useGroupContext';

const useRemoveItemFromGroup = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useGroupsContext();

  const removeItemFromGroup = async (groupId, itemId) => {
    try {
      const response = await fetch(`/api/groups/${groupId}/removeItem`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemId })
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'REMOVE_GROUP_ITEM', payload: { groupId, itemId } });
        setError(null);
        return json;
      } else {
        setError(json.message);
      }
    } catch (err) {
      console.error('Error removing item from group:', err);
      setError('An error occurred while removing the item from the group.');
    }
  };

  return { removeItemFromGroup, error };
};

export default useRemoveItemFromGroup;
