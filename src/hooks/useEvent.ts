import { useCallback, useLayoutEffect, useRef } from "react";

export function useEvent<T extends Function>(handler: T) {
  const handlerRef = useRef<T>(null);

  useLayoutEffect(() => {
    // @ts-ignore
    handlerRef.current = handler;
  });

  // @ts-ignore
  return useCallback((...args) => {
    // @ts-ignore
    return handlerRef.current(...args);
  }, []) as T;
}
