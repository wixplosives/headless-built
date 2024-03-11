import { useEffect, useState } from 'react';

export const useAsync = <T extends unknown>(fn: () => Promise<T>, deps: unknown[]) => {
    const [data, setData] = useState<T | null>(null);
    useEffect(() => {
        fn().then(setData);
    }, deps);
    return data;
};
