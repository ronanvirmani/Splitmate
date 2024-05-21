const removeUserFromGroup = async (groupId, userId) => {
    try {
        const response = await fetch(`/api/groups/${groupId}/removeUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: userId })
        });

        const json = await response.json();

        if (!response.ok) {
            throw new Error(json.message || 'Failed to remove user from group');
        }

        return json;
    } catch (err) {
        console.error('Error removing user from group:', err.message || err);
        throw new Error('An error occurred while removing the user from the group.');
    }
}

export default removeUserFromGroup;