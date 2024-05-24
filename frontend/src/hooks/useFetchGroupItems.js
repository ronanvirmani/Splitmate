import { useState, useCallback } from 'react';

const useFetchGroupItems = () => {
  const [members, setMembers] = useState([]);
  const [items, setItems] = useState([]);

  const fetchGroupItems = useCallback(async (groupId) => {
    try {
      const response = await fetch(`/api/groups/${groupId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch group items');
      }

      setMembers(data.members);
      setItems(data.items);
    } catch (err) {
      console.error('Error fetching group items:', err.message || err);
    }
  }, []);

  return { members, items, fetchGroupItems };
};

export default useFetchGroupItems;
