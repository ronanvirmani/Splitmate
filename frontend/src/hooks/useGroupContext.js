import { useContext } from 'react';
import { GroupsContext } from '../context/GroupContext';

export const useGroupsContext = () => {
  const context = useContext(GroupsContext);

  if (!context) {
    throw new Error('useGroupsContext must be used inside a GroupsContextProvider');
  }

  return context;
};
