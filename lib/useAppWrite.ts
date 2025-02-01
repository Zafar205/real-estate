import { Alert } from "react-native";
import { useEffect, useState, useCallback } from "react";


// This code defines a custom React hook called useAppwrite that is designed to handle asynchronous data fetching using a provided function (fn). It manages the state of the data, loading status, and errors, and provides a way to refetch data with new parameters. Here's a detailed explanation of the code:
// Key Components:
// Interfaces:
// UseAppwriteOptions<T, P>: Defines the options for the hook.
// fn: The function to call for fetching data. It takes parameters of type P and returns a Promise<T>.
// params: Optional parameters to pass to the function. Defaults to an empty object.
// skip: Optional boolean to skip the initial fetch. Defaults to false.
// UseAppwriteReturn<T, P>: Defines the return type of the hook.
// data: The fetched data of type T or null.
// loading: A boolean indicating if the data is being fetched.
// error: A string representing any error that occurred, or null if no error.
// refetch: A function to refetch data with new parameters.
// State Management:
// data: Stores the fetched data.
// loading: Tracks whether the data is currently being fetched.
// error: Stores any error that occurs during fetching.
// fetchData Function:
// This function is responsible for fetching data using the provided function (fn).
// It sets loading to true and clears any previous errors.
// If the fetch is successful, it updates the data state.
// If an error occurs, it updates the error state and shows an alert.
// Finally, it sets loading to false.
// useEffect Hook:
// This hook runs when the component mounts or when skip changes.
// If skip is false, it calls fetchData with the initial parameters.
// refetch Function:
// This function allows the caller to refetch data with new parameters.
// It simply calls fetchData with the new parameters.
// Summary:
// useAppwrite is a reusable hook for fetching data asynchronously.
// It handles loading states, errors, and provides a way to refetch data.
// It is generic and can be used with any function that returns a promise.
// It provides a clean and consistent way to manage asynchronous data fetching in React components.


interface UseAppwriteOptions<T, P extends Record<string, string | number>> {
  fn: (params: P) => Promise<T>;
  params?: P;
  skip?: boolean;
}

interface UseAppwriteReturn<T, P> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: (newParams: P) => Promise<void>;
}

export const useAppwrite = <T, P extends Record<string, string | number>>({
  fn,
  params = {} as P,
  skip = false,
}: UseAppwriteOptions<T, P>): UseAppwriteReturn<T, P> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (fetchParams: P) => {
      setLoading(true);
      setError(null);

      try {
        const result = await fn(fetchParams);
        setData(result);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        Alert.alert("Error", errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [fn]
  );

  useEffect(() => {
    if (!skip) {
      fetchData(params);
    }
  }, []);

  const refetch = async (newParams?: P) => await fetchData(newParams!);

  return { data, loading, error, refetch };
};