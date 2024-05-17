import { useState, useEffect } from 'react';

const useFetchGroupItems = (groupId) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupItems = async () => {
      try {
        const response = await fetch(`/api/groups/${groupId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const group = await response.json();

        if (response.ok) {
          setItems(group.items);
        } else {
          console.error('Failed to fetch group items:', group);
          setError(group.message);
        }
      } catch (err) {
        console.error('Error fetching group items:', err);
        setError('An error occurred while fetching the group items.');
      }
    };

    fetchGroupItems();
  }, [groupId]);

  return { items, error };
};

export default useFetchGroupItems;
