import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

const initialState = {
    transactions: [],
    error: null
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    async function getTransactions() {
        try {
            const res = await axios.get('/transactions');


            dispatch({
                type: 'GETTransaction',
                data: res.data.data
            });
        } catch (error) {
            dispatch({
                type: 'TransactionError',
                data: error.response.data.error
            });
        }
    }

    async function deleteTransaction(id) {
        try {
            await axios.delete('/transactions/' + id);
            dispatch({
                type: 'delete',
                data: id
            });
        } catch (error) {
            dispatch({
                type: 'TransactionError',
                data: error.response.data.error
            });
        }
        
    }

    async function addTransaction(transaction) {

        try {
            const res = await axios.post('/transactions', transaction);

            dispatch({
                type: 'add',
                data: res.data.data
            });
        } catch (error) {
            dispatch({
                type: 'TransactionError',
                data: error.response.data.error
            });
        }
        
    }

    return (<GlobalContext.Provider value={{transactions: state.transactions,
        error: state.error,
        getTransactions,
        deleteTransaction, 
        addTransaction
        }}>
        {children}
    </GlobalContext.Provider>);
}