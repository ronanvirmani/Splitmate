import { useState, useCallback, useEffect } from 'react';

const API_URL = process.env.REACT_APP_API_URL;


const useFetchGroupItems = () => {
  const [members, setMembers] = useState([]);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchGroupItems = useCallback(async (groupId) => {
    try {
      const response = await fetch(`${API_URL}/api/groups/${groupId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch group items');
      }

      setMembers(data.members);
      setItems(data.items);

      // Calculate total price
      const totalPrice = data.items.reduce((sum, item) => sum + item.price, 0);
      setTotal(totalPrice);
    } catch (err) {
      console.error('Error fetching group items:', err.message || err);
    }
  }, []);


  return { members, items, total, fetchGroupItems };
};

export default useFetchGroupItems;
