// @ts-ignore
export const defaultFetcher = <T extends any[]>(...args: T) => fetch(...args).then(res => res.json())