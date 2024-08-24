import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const getCookie = (key: string, defaultValue = ""): string => {
  var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() ?? defaultValue : defaultValue;
}

const setCookie = (key: string, val: string, expiration = new Date()): void => {
  expiration.setDate(expiration.getDate() + 1);
  document.cookie = key + "=" + val + "; SameSite=Strict;expires=" + expiration.toUTCString()
}

const App = () => {

  const [count, setCount] = useState(Number(getCookie("count", "0")))

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => setCookie("count", String(count))}>
          save count
        </button>
        <button onClick={() => setCookie("count", "0", new Date(0))}>
          Delete Cookie
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p>
          Cookies: { document.cookie }
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
