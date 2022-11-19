import './App.css'

import React, { PropsWithChildren, useEffect, useState } from 'react'

interface P {
  n: string | number
}
type set = () => void

const App: React.FC<PropsWithChildren> = () => {
  const [count, setCount] = useState(0)
  const ff: set = () => {
    setCount(count + 1)
  }
  const A: P = {
    n: 123,
  }
  useEffect(() => {
    console.log(A)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      THishdio
      <p>{count}</p>
      <button onClick={ff}>Click</button>
    </div>
  )
}

export default App
