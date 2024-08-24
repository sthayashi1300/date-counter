import { useState } from 'react'
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
          Cookies: { document.cookie }
        </p>
        <div>
        </div>
      </div>
    </>
  )
}

export default App
