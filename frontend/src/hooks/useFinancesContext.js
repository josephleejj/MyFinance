import { FinancesContext } from "../context/FinancesContext"
import { useContext } from "react"

export const useFinancesContext = () => {
  const context = useContext(FinancesContext)

  if(!context) {
    throw Error('useFinancesContext must be used inside an FinancesContextProvider')
  }

  return context
}