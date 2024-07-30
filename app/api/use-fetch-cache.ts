
export interface PromiseState<T> {
    data?: T; 
    isLoading: boolean; 
    error?: Error,
  }

/** 
 * Cache for fetch requests, 
 * that supoports SSR and can be executed in server compoenents 
 * */
const CACHE_MAP: { [url: string]: PromiseState<any> } = {}

export const getFromCache = (url: string) => CACHE_MAP[url]

export const saveToCache = (url: string, state: PromiseState<any>) => {
  CACHE_MAP[url] = state
}

export const savePrefetched = <T>(url: string, data: T) => {
  CACHE_MAP[url] = { data, isLoading: false }
}
  