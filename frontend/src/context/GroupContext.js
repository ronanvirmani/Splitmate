import { createContext, useReducer } from 'react'

export const GroupContext = createContext()

export const groupReducer = (state, action) => {
    switch(action.type){
        case 'CREATE_GROUP':
            return { 
                groups: [...state.groups, action.payload]
            }
        case 'GET_GROUPS':
            return {
                groups: action.payload
            }
        default:
            return state
    }
}

export default GroupsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(groupReducer, {
        groups: []
    })

    return (
        <GroupContext.Provider value={{ ...state, dispatch }}>
            { children }
        </GroupContext.Provider>
    )
}
