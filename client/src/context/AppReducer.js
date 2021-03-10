export default (state, action) => {
    switch(action.type) {
        case "GETTransaction": 
            return {
                ...state,
                transactions: action.data
            }
        case "delete": 
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction._id !== action.data)
            }

        case "add":
            return {
                ...state,
                transactions: [...state.transactions, action.data]
            }
        
        case "TransactionError": 
            return {
                ...state,
                error: action.data
            }
        default:
            return state;
    }
}