import { useState } from 'react';

const useRemoveItemFromGroup = () => {
  const [error, setError] = useState(null);

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
