import { useState } from 'react';

const useAddItemToGroup = () => {
  const [error, setError] = useState(null);

  const addItemToGroup = async (groupId, name, price) => {
    try {
      // Ensure the price is a number
      const parsedPrice = parseFloat(price);

      const response = await fetch(`/api/groups/${groupId}/addItem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, price: parsedPrice })
      });

      const json = await response.json();

      if (response.ok) {
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
