import { useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchGraphQLData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // 简单的GraphQL查询示例
      const query = `
        query {
          __schema {
            types {
              name
            }
          }
        }
      `
      
      const response = await fetch('https://api.studio.thegraph.com/query/119001/yd-graph/v0.0.1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query
        })
      })
      
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="App">
      <h1>GraphQL Demo</h1>
      <button onClick={fetchGraphQLData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch GraphQL Data'}
      </button>
      
      {error && (
        <div className="error">
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      )}
      
      {data && (
        <div className="data">
          <h3>GraphQL Response:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default App
