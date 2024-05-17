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
            { children }
        </GroupsContext.Provider>
    );
}
