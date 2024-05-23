import { useGroupsContext } from './useGroupContext';

const useAddUserToGroup = () => {
  const { dispatch } = useGroupsContext();

  const addUsersToGroup = async (groupId, userEmail) => {
    try {
      const response = await fetch(`/api/groups/${groupId}/addUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userEmail })
      });

      const user = await response.json();

      if (!response.ok) {
        throw new Error(user.message || 'Failed to add user to group');
      }

      dispatch({ type: 'ADD_GROUP_MEMBER', payload: { groupId, user } });

      return user;
    } catch (err) {
      console.error('Error adding user to group:', err.message || err);
      throw new Error('An error occurred while adding the user to the group.');
    }
  }

  return { addUsersToGroup };
}

export default useAddUserToGroup;
