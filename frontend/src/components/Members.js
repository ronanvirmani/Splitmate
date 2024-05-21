import React, {useCallback} from 'react'
import { Grid, Paper, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddMemberField from './AddMemberField';
import removeUsersFromGroup from '../hooks/useRemoveUserFromGroup';

function Members({ groupMembers, selectedGroupId}) {

    const handleRemoveMember = useCallback(async (memberId) => {
        try {
          await removeUsersFromGroup(selectedGroupId, memberId);
        } catch (error) {
          console.error('Error removing member from group:', error);
        }
      }, [selectedGroupId]);

  return (
    <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, overflowY: 'auto', height: 'fit' }}>
            <Typography variant="h6" component="div">Members</Typography>
            <List sx={{ overflowY: 'auto', maxHeight: '60%' }}>
                {groupMembers && groupMembers.map((member) => (
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
            <AddMemberField selectedGroupId={selectedGroupId} />
        </Paper>
    </Grid>
  )
}

export default Members
