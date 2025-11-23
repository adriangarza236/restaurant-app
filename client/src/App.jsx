import { useState, useEffect } from 'react'
import './App.css'

function App() {
  
  const [health, setHealth] = useState(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    //fetch health check
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        console.log('Health check:', data)
        setHealth(data)
      })
      .catch(err => console.error('Health check failed:', err))

      //fetch items
      fetch('/api/data')
        .then(res => res.json())
        .then(data => {
          console.log('Item data:', data)
          setItems(data.items)
          setLoading(false)
        })
        .catch(err => {
          console.error('Data fetch failed:', err)
          setLoading(false)
        })
      }, [])

    return (
      <div className="App">
        <h1> Restaurant App - Test Deploy</h1>

        <div style={{
          margin: '20px',
          padding: '20px',
          border: '2px solid #4CAF50',
          borderRadius: '8px'
        }}>
          <h2>Backend Status</h2>
          {health ? (
            <div>
              <p>Check <strong>Status:</strong> {health.status}</p>
              <p>Connection <strong>Message:</strong> {health.message}</p>
            </div>
          ) : (
            <p> loading connection to backend...</p>
          )}
        </div>

        <div style={{
          margin: '20px',
          padding: '20px',
          border: '2px solid #2196f3',
          borderRadius: '8px'
        }}>
          <h2>Items from backend</h2>
          {loading ? (
            <p>loading menu...</p>
          ) : (
            <ul style={{ textAlign: 'left', fontSize: '18px' }}>
              {items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }

  export default App