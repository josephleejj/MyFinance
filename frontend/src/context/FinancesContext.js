import { createContext, useReducer } from 'react'

export const FinancesContext = createContext()

export const financesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FINANCES':
      return { 
        finances: action.payload 
      }
    case 'CREATE_FINANCE':
      return { 
        finances: [action.payload, ...state.finances] 
      }
    case 'DELETE_FINANCE':
      return {
        finances: state.finances.filter((finance) => finance._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const FinancesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(financesReducer, { 
    finances: null
  })
  
  return (
    <FinancesContext.Provider value={{ ...state, dispatch }}>
      { children }
    </FinancesContext.Provider>
  )
}