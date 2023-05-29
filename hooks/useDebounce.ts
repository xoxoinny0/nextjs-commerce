import { useState, useEffect } from 'react'
const useDebounce = <T = any>(value: T, delay = 600) => {
  const [debouncedValue, setDebounced] = useState<T>(() => value)

  // input 이벤트 최적화
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
