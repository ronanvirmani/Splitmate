import { createContext, useReducer } from 'react';

export const GroupsContext = createContext();

export const groupsReducer = (state, action) => {
    switch(action.type){
        case 'CREATE_GROUP':
            return { 
                groups: [...state.groups, action.payload]
            }
        case 'SET_GROUPS':
            return {
                groups: action.payload
            }
        case 'DELETE_GROUP':
            return {
                groups: state.groups.filter(group => group._id !== action.payload)
            }
        case 'ADD_GROUP_ITEM':
            return {
                groups: state.groups.map(group => {
                    if (group._id === action.payload.groupId) {
                        return {
                            ...group,
                            items: [...group.items, action.payload.item]
                        };
                    }
                    return group;
                })
            }
        case 'REMOVE_GROUP_ITEM':
            return {
                groups: state.groups.map(group => {
                    if (group._id === action.payload.groupId) {
                        return {
                            ...group,
                            items: group.items.filter(item => item._id !== action.payload.itemId)
                        };
                    }
                    return group;
                })
            };
        case 'ADD_GROUP_MEMBER':
            return {
              groups: state.groups.map(group => {
                if (group._id === action.payload.groupId) {
                  return {
                    ...group,
                    members: [...group.members, action.payload.user]
                  };
                }
                return group;
              })
            };
        case 'REMOVE_GROUP_MEMBER':
            return {
              groups: state.groups.map(group => {
                if (group._id === action.payload.groupId) {
                  return {
                    ...group,
                    members: group.members.filter(member => member._id !== action.payload.userId),
                  };
                }
                return group;
              }),
            };
        default:
            return state;
    }
}


export const GroupsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(groupsReducer, {
        groups: []
    });

    return (
        <GroupsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </GroupsContext.Provider>
    );
};
