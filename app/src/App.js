import React, { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [data, setData] = useState("Loading")

  const testAPI = async () => {
    try {
      const res = await fetch("/api")
      const data = await res.json()
      setData(data.message)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    testAPI()
  },[])

  return (
    <div>
      <h2>{data}</h2>
    </div>
  )
}

export default App