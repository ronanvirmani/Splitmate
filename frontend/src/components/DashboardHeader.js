import React, { useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import useFetchGroupItems from '../hooks/useFetchGroupItems';

function DashboardHeader({ group }) {
  const { members, total, fetchGroupItems } = useFetchGroupItems();
  const [splitAmount, setSplitAmount] = useState(0);

  useEffect(() => {
    if (group._id) {
      fetchGroupItems(group._id);
    }
  }, [group._id, fetchGroupItems]); // Removed fetchGroupItems from the dependency array

  useEffect(() => {
    // Calculate split amount per member
    if (members.length > 0 && total > 0) {
      const split = total / members.length;
      setSplitAmount(split);
    } else {
      setSplitAmount(0);
    }
    fetchGroupItems(group._id)
  }, [total, members, setSplitAmount, fetchGroupItems, group._id]);

  return (
    <Paper sx={{ p: 2, mb: 4 }}>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
        {group.name}
      </Typography>
      <Typography variant="subtitle1" component="div">
        Amount you owe per member: ${splitAmount.toFixed(2)}
      </Typography>
    </Paper>
  );
}

export default DashboardHeader;
