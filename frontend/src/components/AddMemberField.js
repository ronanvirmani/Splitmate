import React, { useState, useCallback } from 'react';
import { Box, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import useAddUserToGroup from '../hooks/useAddUserToGroup';

function AddMemberField({ selectedGroupId }) {
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const { addUsersToGroup } = useAddUserToGroup();

  const handleAddMember = useCallback(async () => {
    try {
      await addUsersToGroup(selectedGroupId, newMemberEmail);
      setNewMemberEmail('');
    } catch (error) {
      console.error('Error adding member to group:', error);
    }
  }, [addUsersToGroup, selectedGroupId, newMemberEmail]);

  return (
    <Box display="flex" alignItems="center" my={2}>
      <TextField
        label="New member email"
        value={newMemberEmail}
        onChange={(e) => setNewMemberEmail(e.target.value)}
      />
      <Button
        startIcon={<AddIcon />}
        onClick={handleAddMember}
        sx={{ ml: 2 }}
      >
        Add Member
      </Button>
    </Box>
  );
}

export default AddMemberField;
