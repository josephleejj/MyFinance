import { useFinancesContext } from '../hooks/useFinancesContext'

const FinanceDetails = ( {finance} ) => {
    const { dispatch } = useFinancesContext()

    const handleDeleteClick = async () => {
        const response = await fetch('/api/finances/' + finance._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type:'DELETE_FINANCE', payload: json})

        }
    }

    return (
        <div className="finance-details">
            <h4>{finance.description}</h4>
            <p><strong>Category:</strong> {finance.type}</p>
            <p><strong>Amount($):</strong> {finance.amount}</p>
            <p><strong>Date:</strong> {new Date(finance.date).toLocaleDateString('en-gb')}</p>
            <span onClick={handleDeleteClick}>X</span>
        </div>
    )
}

export default FinanceDetails