import React, { useState, useEffect } from 'react';
import { useGroupsContext } from '../hooks/useGroupContext';
import useFetchGroupItems from '../hooks/useFetchGroupItems';

import { Box, Typography, Grid } from '@mui/material';
import GroupNav from '../components/GroupNav';
import DashboardHeader from '../components/DashboardHeader';
import Members from '../components/Members';
import Items from '../components/Items';

const Dashboard = () => {
  const { groups } = useGroupsContext();
  const [selectedGroupId, setSelectedGroupId] = useState(null);  

  const { items: groupItems, members: groupMembers } = useFetchGroupItems(selectedGroupId);

  useEffect(() => {
    if (groups.length > 0 && !selectedGroupId) {
      setSelectedGroupId(groups[0]._id);
    }
  }, [groups, selectedGroupId]);
  
  return (
    <Grid container spacing={2} sx={{ height: '100vh' }}>
      <GroupNav 
        groups={groups}
        setSelectedGroupId={setSelectedGroupId}
      />

      <Grid item xs={12} md={10}>
        {groups.map((group) => (
          <TabPanel value={selectedGroupId} index={group._id} key={group._id} sx={{ height: '100%' }}>
            <DashboardHeader group={group} />

            <Grid container spacing={2} sx={{ height: 'fit' }}>
              <Members groupMembers={groupMembers} selectedGroupId={selectedGroupId} />

              <Items groupItems={groupItems} selectedGroupId={selectedGroupId} />
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

export default Dashboard;
