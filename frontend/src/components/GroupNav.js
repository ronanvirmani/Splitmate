import React from 'react';
import { Box, Tabs, Tab, TextField, Button, Grid } from '@mui/material';
import { useState } from 'react';
import useFetchGroups from '../hooks/useFetchUserGroups';
import useCreateGroup from '../hooks/useCreateGroup';

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function GroupNav({ groups, setSelectedGroupId}) {
  const [value, setValue] = useState(0);
  const [newGroupName, setNewGroupName] = useState('');
  const { createGroup } = useCreateGroup();

  useFetchGroups();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSelectedGroupId(groups[newValue]._id);
  };

  const handleCreateGroup = async () => {
    await createGroup(newGroupName, []);
    setNewGroupName('');
  };

  return (
    <Grid item xs={12} md={2} sx={{ borderRight: 1, borderColor: 'divider', overflowY: 'auto' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 100 }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Group tabs"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              fontSize: '1.4rem',
              width: '100%',
            },
            width: '100%',
            maxHeight: 500,
            overflowY: 'auto',
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
  );
}

export default GroupNav;
