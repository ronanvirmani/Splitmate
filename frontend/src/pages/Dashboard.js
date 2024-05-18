import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useGroupsContext } from '../hooks/useGroupContext';
import useFetchGroups from '../hooks/useFetchUserGroups';
import useCreateGroup from '../hooks/useCreateGroup';
import useDeleteGroup from '../hooks/useDeleteGroup';
import useAddItemToGroup from '../hooks/useAddItemToGroup';
import useRemoveItemFromGroup from '../hooks/useRemoveItemFromGroup';
import useFetchGroupItems from '../hooks/useFetchGroupItems';

const Dashboard = () => {
  const { user } = useAuthContext();
  const { groups } = useGroupsContext();

  const [name, setName] = useState('');
  const [items, setItems] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [addItemError, setAddItemError] = useState(null);
  const [removeItemError, setRemoveItemError] = useState(null);

  useFetchGroups();
  const { createGroup, error: createGroupError } = useCreateGroup();
  const { deleteGroup, error: deleteGroupError } = useDeleteGroup();
  const { addItemToGroup } = useAddItemToGroup();
  const { removeItemFromGroup } = useRemoveItemFromGroup();

  const { items: groupItems, members: groupMembers, error: fetchGroupItemsError } = useFetchGroupItems(selectedGroupId);

  const handleAddItem = async (groupId) => {
    const result = await addItemToGroup(groupId, newItemName, newItemPrice);

    if (result) {
      setItems((prevItems) => [...prevItems, result]);
      setNewItemName('');
      setNewItemPrice('');
      setAddItemError(null);
    } else {
      setAddItemError('Failed to add item');
    }
  };

  const handleRemoveItem = async (groupId, itemId) => {
    const result = await removeItemFromGroup(groupId, itemId);

    if (result) {
      setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
      setRemoveItemError(null);
    } else {
      setRemoveItemError('Failed to remove item');
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
                <button onClick={() => setSelectedGroupId(group._id)}>Show Items</button>
              </div>
              {selectedGroupId === group._id && (
                <>
                  <ul>
                    {groupItems && groupItems.length > 0 &&
                      groupItems.map((item) => (
                        <li key={item._id}>
                          {item.name} - ${item.price}
                          <button onClick={() => handleRemoveItem(group._id, item._id)}>Remove</button>
                        </li>
                      ))}
                  </ul>
                  <ul>
                    <h3>Members</h3>
                    {groupMembers && groupMembers.length > 0 &&
                      groupMembers.map((member) => (
                        <li key={member._id}>{member.name}</li>
                      ))}
                  </ul>
                </>
              )}
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
              {removeItemError && <div className="error">{removeItemError}</div>}
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
