import { useState } from "react"
import { useFinancesContext } from '../hooks/useFinancesContext'


const FinanceForm = () => {
    const { dispatch } = useFinancesContext()

    const[description, setDescription] = useState('')
    const[type, setType] = useState('')
    const[amount, setAmount] = useState('')
    const[date, setDate] = useState(new Date())
    const[error, setError] = useState('')
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (event) => {
        // prevent default action which is refreshing
        event.preventDefault()

        const finance = {description, type, amount, date}

        const response = await fetch('/api/finances', {
            method: 'POST',
            body: JSON.stringify(finance),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if (response.ok) {
            setDescription('')
            setType('')
            setAmount('')
            setDate(new Date())
            setError(null)
            setEmptyFields([])
            dispatch({type: 'CREATE_FINANCE', payload: json})

            console.log('new finance added', json)
        }
    }


    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Finance</h3>

            <label>Description:</label>
            <input
            type ="text"
            onChange={(event) => setDescription(event.target.value)}
            value={description}
            className={emptyFields.includes('Description') ? 'error' : ''}
            />

            <label>Category:</label>
            <input
            type ="text"
            onChange={(event) => setType(event.target.value)}
            value={type}
            className={emptyFields.includes('Category') ? 'error' : ''}
            />


            <label>Amount ($):</label>
            <input
            type ="number"
            onChange={(event) => setAmount(event.target.value)}
            value={amount}
            className={emptyFields.includes('Amount') ? 'error' : ''}
            />

            <label>Date:</label>
            <input
            type ="date"
            onChange={(event) => setDate(event.target.value)}
            value={date}
            className={emptyFields.includes('Date') ? 'error' : ''}
            />

            <button>Add Finance</button>
            {error && <div className="error">{error}</div>}
        </form>
    )

}

export default FinanceForm