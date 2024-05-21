import React, { useState, useEffect, useCallback } from 'react';
import { useGroupsContext } from '../hooks/useGroupContext';
import useFetchGroups from '../hooks/useFetchUserGroups';
import useCreateGroup from '../hooks/useCreateGroup';
import useDeleteGroup from '../hooks/useDeleteGroup';
import useAddItemToGroup from '../hooks/useAddItemToGroup';
import useRemoveItemFromGroup from '../hooks/useRemoveItemFromGroup';
import useFetchGroupItems from '../hooks/useFetchGroupItems';
import addUsersToGroup from '../hooks/useAddUserToGroup';
import removeUsersFromGroup from '../hooks/useRemoveUserFromGroup';

import { Box, Tabs, Tab, Typography, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Grid, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const Dashboard = () => {
  const { groups } = useGroupsContext();
  const [value, setValue] = useState(0);
  const [newGroupName, setNewGroupName] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  useFetchGroups();
  const { createGroup } = useCreateGroup();
  const { deleteGroup } = useDeleteGroup();
  const { addItemToGroup } = useAddItemToGroup();
  const { removeItemFromGroup } = useRemoveItemFromGroup();

  const { items: groupItems, members: groupMembers } = useFetchGroupItems(selectedGroupId);

  useEffect(() => {
    if (groups.length > 0 && !selectedGroupId) {
      setSelectedGroupId(groups[0]._id);
    }
  }, [groups]);

  const handleAddItem = useCallback(async () => {
    const result = await addItemToGroup(selectedGroupId, newItemName, newItemPrice);

    if (result) {
      setNewItemName('');
      setNewItemPrice('');
    }
  }, [selectedGroupId, newItemName, newItemPrice, addItemToGroup]);

  const handleRemoveItem = useCallback(async (itemId) => {
    await removeItemFromGroup(selectedGroupId, itemId);
  }, [selectedGroupId, removeItemFromGroup]);

  const handleAddMember = useCallback(async () => {
    try {
      await addUsersToGroup(selectedGroupId, newMemberEmail);
      setNewMemberEmail('');
    } catch (error) {
      console.error('Error adding member to group:', error);
    }
  }, [selectedGroupId, newMemberEmail]);

  const handleRemoveMember = useCallback(async(memberId) => {
    try{
      await removeUsersFromGroup(selectedGroupId, memberId);
    }
    catch (error) {
      console.error('Error removing member from group:', error);
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSelectedGroupId(groups[newValue]._id);
  };

  const handleCreateGroup = async () => {
    await createGroup(newGroupName, []);
    setNewGroupName('');
  };

  return (
    <Grid container spacing={2} sx={{ height: '100vh' }}>
      <Grid item xs={12} md={2} sx={{ borderRight: 1, borderColor: 'divider', overflowY: 'auto' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 100 }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Group tabs"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                fontSize: '1.1rem',
                justifyContent: 'flex-start',
                width: '75%',
              },
              width: '100%',
              maxHeight: 500, // Max height for the tabs container
              overflowY: 'auto', // Enable vertical scrolling
            }}
          >
            {groups.map((group, index) => (
              <Tab label={group.name} {...a11yProps(index)} key={group._id} />
            ))}
          </Tabs>
          <Box sx={{ mt: 2, width: '100%', px: 1 }}>
            <TextField
              label="New Group Name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateGroup}
              sx={{ mt: 1, width: '100%' }}
            >
              Create Group
            </Button>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} md={9}>
        {groups.map((group, index) => (
          <TabPanel value={value} index={index} key={group._id} sx={{ height: '100%' }}>
            <Paper sx={{ p: 2, mb: 4 }}>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {group.name}
              </Typography>
              <Typography variant="subtitle1" component="div">Amount you owe: $XX.XX</Typography>
            </Paper>

            <Grid container spacing={2} sx={{ height: 'calc(100% - 96px)' }}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, height: '100%', overflowY: 'auto', maxHeight: '100% - 100px' }}>
                  <Typography variant="h6" component="div">Members</Typography>
                  <List sx={{overflowY: 'auto', maxHeight: 'fit%' }}>
                    {groupMembers && groupMembers.map((member) => (
                      <ListItem key={member._id}>
                        <ListItemText primary={member.name} />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" onClick={() => handleRemoveMember(member._id)}>
                            <DeleteIcon />
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

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, height: '100%', overflowY: 'auto', maxHeight: 'calc(100% - 50px)' }}>
                  <Typography variant="h6" component="div">Items</Typography>
                  <List sx={{overflowY: 'auto', maxHeight: 'fit'}}>
                    {groupItems && groupItems.map((item) => (
                      <ListItem key={item._id}>
                        <ListItemText primary={`${item.name} - $${item.price}`} />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" onClick={() => handleRemoveItem(item._id)}>
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                  <Box display="flex" alignItems="center" my={2}>
                    <TextField
                      label="Item name"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                    />
                    <TextField
                      label="Item price"
                      type="number"
                      value={newItemPrice}
                      onChange={(e) => setNewItemPrice(e.target.value)}
                      sx={{ ml: 2 }}
                    />
                    <Button
                      startIcon={<AddIcon />}
                      onClick={handleAddItem}
                      sx={{ ml: 2 }}
                    >
                      Add Item
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>
        ))}
      </Grid>
    </Grid>
  );
};

const TabPanel = React.memo(function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ height: '100%' }}
    >
      {value === index && (
        <Box sx={{ p: 3, height: '100%' }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
});

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default Dashboard;
