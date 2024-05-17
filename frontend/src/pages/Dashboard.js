import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useGroupsContext } from '../hooks/useGroupContext';
import useFetchGroups from '../hooks/useFetchUserGroups';
import useCreateGroup from '../hooks/useCreateGroup';
import useDeleteGroup from '../hooks/useDeleteGroup';
import useFetchGroupItems from '../hooks/useFetchGroupItems';
import useAddItemToGroup from '../hooks/useAddItemToGroup';

const Dashboard = () => {
  const { user } = useAuthContext();
  const { groups } = useGroupsContext();

  const [name, setName] = useState('');
  const [items, setItems] = useState([]);
  const [groupItems, setGroupItems] = useState({});
  const [fetchGroupItemsError, setFetchGroupItemsError] = useState(null);

  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [addItemError, setAddItemError] = useState(null);

  useFetchGroups();
  const { createGroup, error: createGroupError } = useCreateGroup();
  const { deleteGroup, error: deleteGroupError } = useDeleteGroup();
  const { addItemToGroup } = useAddItemToGroup();

  const fetchGroupItems = async (groupId) => {
    try {
      const response = await fetch(`/api/groups/${groupId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const group = await response.json();

      if (response.ok) {
        setGroupItems((prevGroupItems) => ({
          ...prevGroupItems,
          [groupId]: group.items
        }));
        setFetchGroupItemsError(null);
      } else {
        console.error('Failed to fetch group items:', group);
        setFetchGroupItemsError(group.message);
      }
    } catch (err) {
      console.error('Error fetching group items:', err);
      setFetchGroupItemsError('An error occurred while fetching the group items.');
    }
  };

  const handleAddItem = async (groupId) => {
    const result = await addItemToGroup(groupId, newItemName, newItemPrice);

    if (result) {
      setGroupItems((prevGroupItems) => ({
        ...prevGroupItems,
        [groupId]: [...(prevGroupItems[groupId] || []), result]
      }));
      setNewItemName('');
      setNewItemPrice('');
      setAddItemError(null);
    } else {
      setAddItemError('Failed to add item');
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Groups</h2>
      {user && <p>User ID: {user._id}</p>}
      <ul>
        {groups && groups.length > 0 ? (
          groups.map((group) => (
            <li key={group._id}>
              <div>
                <span>{group.name}</span>
                <button onClick={() => deleteGroup(group._id)}>Delete</button>
                <button onClick={() => fetchGroupItems(group._id)}>Show Items</button>
              </div>
              <ul>
                {groupItems[group._id] && groupItems[group._id].length > 0  &&
                  groupItems[group._id].map((item) => (
                    <li key={item._id}>{item.name} - ${item.price}</li>
                  ))}
                
              </ul>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleAddItem(group._id);
              }}>
                <input
                  type="text"
                  placeholder="Item name"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Item price"
                  value={newItemPrice}
                  onChange={(e) => setNewItemPrice(e.target.value)}
                />
                <button type="submit">Add Item</button>
              </form>
              {addItemError && <div className="error">{addItemError}</div>}
              {fetchGroupItemsError && <div className="error">{fetchGroupItemsError}</div>}
            </li>
          ))
        ) : (
          <li>No groups available</li>
        )}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createGroup(name, items);
        }}
      >
        <label>Create new group</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button type="submit">Create Group</button>
      </form>
      {createGroupError && <div className="error">{createGroupError}</div>}
      {deleteGroupError && <div className="error">{deleteGroupError}</div>}
    </div>
  );
};

export default Dashboard;
