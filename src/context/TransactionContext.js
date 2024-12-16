import React, { createContext, useState } from 'react';

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({ type: 'all' });

  return (
    <TransactionContext.Provider value={{ transactions, setTransactions, filters, setFilters }}>
      {children}
    </TransactionContext.Provider>
  );
};
