import { useEffect } from "react"
import { useFinancesContext } from "../hooks/useFinancesContext"

// components
import FinanceDetails from "../components/FinanceDetails"
import FinanceForm from "../components/FinanceForm"


const Home = () => {
//   const [finances, setFinances] = useState(null)
  const { finances, dispatch } = useFinancesContext()


  useEffect(() => {
    const fetchFinances = async () => {
      const response = await fetch('/api/finances')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_FINANCES', payload: json})
        console.log(json)
      }
    }

    fetchFinances()
  }, [dispatch])

  return (
    <div className="home">
      <div className="finances">
        {finances && finances.map(finance => (
          <FinanceDetails finance={finance} key={finance._id} />
        ))}
      </div>
      <FinanceForm/>
    </div>
  )
}

export default Home