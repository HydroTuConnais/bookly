import { useState, useEffect } from 'react';

export const usePromise = <T,>(promiseFn: () => Promise<T>, deps: any[]) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [promise, setPromise] = useState<Promise<T> | null>(null);

    useEffect(() => {
        console.log('Dependencies:', deps); // Log deps
        let isMounted = true;
        setLoading(true);
        setError(null);

        const p = promiseFn();
        setPromise(p);

        p.then(result => {
            if (isMounted) {
                setData(result);
                setLoading(false);
            }
        })
        .catch(err => {
            if (isMounted) {
                setError(err);
                setLoading(false);
            }
        });

        return () => {
            isMounted = false;
        };
    }, deps);

    return { data, loading, error, promise };
};