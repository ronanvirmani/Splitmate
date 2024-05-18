import { useState, useEffect } from 'react';

const useFetchGroupItems = (groupId) => {
  const [items, setItems] = useState([]);
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupData = async () => {
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
          setMembers(group.members);
          setError(null);
        } else {
          console.error('Failed to fetch group data:', group);
          setError(group.message);
        }
      } catch (err) {
        console.error('Error fetching group data:', err);
        setError('An error occurred while fetching the group data.');
      }
    };

    if (groupId) {
      fetchGroupData();
    }
  }, [groupId]);

  return { items, members, error };
};

export default useFetchGroupItems;
