export default function useLocalStorage() {

  function setItem(key: string, value: any) {
    
  }

  function getItem(key: string) {
    const item = window.localStorage.getItem(key) as string

    return JSON.parse(item)
  }

}