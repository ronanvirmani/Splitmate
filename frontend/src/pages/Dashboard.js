import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useFetchUserGroups } from '../hooks/useFetchUserGroups';

const Dashboard = () => {

  const { user } = useAuthContext();
  const groups = useFetchUserGroups();
  

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Groups</h2>
      {user && <p>User ID: {user._id}</p>}
      <ul>
        {groups.map((group) => (
          <li key={group._id}>{group.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
