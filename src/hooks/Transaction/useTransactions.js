import { useCallback, useEffect, useState } from "react";
import { AXIOS_METHOD, doApiCall } from "../useApi";

export const useTransactions = (wallet_id, limit = 5) => {
  const [cursor, setCursor] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const apiCallCallback = useCallback(
    (newCursor) => {
      setLoading(true);
      doApiCall(
        AXIOS_METHOD.POST,
        "/transactions",
        (responseData) => {
          console.log("API Response:", responseData);
          setTransactions((oldTransactions) => {
            if (oldTransactions === false || newCursor === "") {
              return responseData?.transactions;
            }
            return [...oldTransactions, ...responseData?.transactions];
          });
          setCursor(responseData?.cursor);
          setHasMore(responseData?.has_more);
          setError(false);
          setLoading(false);
        },
        (errorMessage) => {
          setError(errorMessage);
          setTransactions(false);
          setHasMore(true);
          setCursor("");
          setLoading(false);
        },
        {
          wallet_id,
          limit,
          ...(newCursor && { cursor: newCursor }),
        }
      );
    },
    [setTransactions, setError, setLoading, setHasMore, wallet_id, limit]
  );
  

  const addTransaction = useCallback(
    (newTransaction) => {
      setTransactions((prevTransactions) => [newTransaction, ...prevTransactions]);
    },
    []
  );

  const resetTransactionList = useCallback(() => {
    setTransactions([]);
    setCursor("");
    setHasMore(true);
    apiCallCallback("");
  }, [apiCallCallback]);

  const fetchTransactions = useCallback(() => {
    setLoading(true);
    setTransactions([]);
  
    doApiCall(
      AXIOS_METHOD.POST,
      "/transactions",
      (responseData) => {
        console.log("Fetched transactions:", responseData);
        setTransactions(responseData?.transactions || []);
        setCursor(responseData?.cursor);
        setHasMore(responseData?.has_more);
        setError(false);
        setLoading(false);
      },
      (errorMessage) => {
        setError(errorMessage);
        setTransactions([]);
        setHasMore(true);
        setCursor("");
        setLoading(false);
      },
      {
        wallet_id,
        limit,
      }
    );
  }, [wallet_id, limit]);

  const onLoadMore = useCallback(() => {
    if (cursor) {
      setLoading(true);
      doApiCall(
        AXIOS_METHOD.POST,
        "/transactions",
        (responseData) => {
          setTransactions((oldTransactions) => [
            ...oldTransactions,
            ...responseData?.transactions,
          ]);
          setCursor(responseData?.cursor);
          setHasMore(responseData?.has_more);
          setLoading(false);
        },
        (errorMessage) => {
          setError(errorMessage);
          setLoading(false);
        },
        {
          wallet_id,
          limit,
          cursor,
        }
      );
    }
  }, [cursor, wallet_id, limit]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return [
    transactions,
    loading,
    error,
    onLoadMore,
    hasMore,
    fetchTransactions,
    addTransaction,
    resetTransactionList,
  ];
};
