import { useState } from 'react';
import { useGroupsContext } from './useGroupContext';

const API_URL = process.env.REACT_APP_API_URL;

const useAddItemToGroup = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useGroupsContext();

  const addItemToGroup = async (groupId, name, price) => {
    try {
      const parsedPrice = parseFloat(price);

      const response = await fetch(`${API_URL}/api/groups/${groupId}/addItem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, price: parsedPrice })
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'ADD_GROUP_ITEM', payload: { groupId, item: json } });
        setError(null);
        return json;
      } else {
        setError(json.message);
      }
    } catch (err) {
      console.error('Error adding item to group:', err);
      setError('An error occurred while adding the item to the group.');
    }
  };

  return { addItemToGroup, error };
};

export default useAddItemToGroup;
