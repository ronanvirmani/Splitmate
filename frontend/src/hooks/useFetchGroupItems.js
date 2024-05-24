import { useState, useCallback } from 'react';

const useFetchGroupItems = () => {
  const [members, setMembers] = useState([]);

  const fetchGroupItems = useCallback(async (groupId) => {
    try {
      const response = await fetch(`/api/groups/${groupId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch group items');
      }

      setMembers(data.members);
    } catch (err) {
      console.error('Error fetching group items:', err.message || err);
    }
  }, []);

  return { members, fetchGroupItems };
};

export default useFetchGroupItems;
