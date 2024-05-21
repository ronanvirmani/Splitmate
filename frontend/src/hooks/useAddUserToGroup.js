const addUsersToGroup = async (groupId, userEmail) => {
    try {
        const response = await fetch(`/api/groups/${groupId}/addUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userEmail: userEmail })
        });

        const json = await response.json();

        if (!response.ok) {
            throw new Error(json.message || 'Failed to add user to group');
        }

        return json;
    } catch (err) {
        console.error('Error adding user to group:', err.message || err);
        throw new Error('An error occurred while adding the user to the group.');
    }
}

export default addUsersToGroup;
