import {useState} from "react"

const useDebounce = (cb: Function, delay: number) => {
  const [timeoutId, setTimeoutId] = useState<number>()

  return (...args: any[]) => {
    clearTimeout(timeoutId)
    setTimeoutId(
      setTimeout(() => cb(...args), delay) as unknown as number
    )
  }
}

export default useDebounce
