import React, { useCallback, useState, useEffect } from 'react';
import { Grid, Paper, Box, TextField, Button, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddIcon from '@mui/icons-material/Add';
import useAddUserToGroup from '../hooks/useAddUserToGroup';
import useRemoveUserFromGroup from '../hooks/useRemoveUserFromGroup';
import useFetchGroupItems from '../hooks/useFetchGroupItems';

function Members({ selectedGroupId }) {
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const { addUsersToGroup } = useAddUserToGroup();
  const { removeUserFromGroup } = useRemoveUserFromGroup();
  const { members, fetchGroupItems } = useFetchGroupItems();

  useEffect(() => {
    if (selectedGroupId) {
      fetchGroupItems(selectedGroupId);
    }
  }, [fetchGroupItems, selectedGroupId]);

  const handleAddMember = useCallback(async () => {
    const result = await addUsersToGroup(selectedGroupId, newMemberEmail);

    if (result) {
      setNewMemberEmail('');
      fetchGroupItems(selectedGroupId);
    }
  }, [addUsersToGroup, selectedGroupId, newMemberEmail, fetchGroupItems]);

  const handleRemoveMember = useCallback(async (memberId) => {
    try {
      await removeUserFromGroup(selectedGroupId, memberId);
      fetchGroupItems(selectedGroupId);
    } catch (error) {
      console.error('Error removing member from group:', error);
    }
  }, [removeUserFromGroup, selectedGroupId, fetchGroupItems]);

  return (
    <Grid item xs={12} md={6}>
      <Paper sx={{ p: 2, overflowY: 'auto', height: 'fit' }}>
        <Typography variant="h6" component="div">Members</Typography>
        <List sx={{ overflowY: 'auto', maxHeight: '60%' }}>
          {members.map((member) => (
            <ListItem key={member._id}>
              <ListItemText primary={member.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleRemoveMember(member._id)}>
                  <RemoveCircleIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
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
      </Paper>
    </Grid>
  );
}

export default Members;
