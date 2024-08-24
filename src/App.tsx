import { useState } from 'react'
import './App.css'
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once

const getCookie = (key: string, defaultValue = ""): string => {
  var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() ?? defaultValue : defaultValue;
}

const setCookie = (key: string, val: string, expiration = new Date()): void => {
  expiration.setDate(expiration.getDate() + 1);
  document.cookie = key + "=" + val + "; SameSite=Strict;expires=" + expiration.toUTCString()
}

const App = () => {

  const [date, setDate] = useState(new Date(getCookie("date") || new Date().toISOString()))
  return (
    <>
      <div className="card">
        <p>
          date is {date.toISOString()}
        </p>
        <button onClick={() => { setCookie("date", date.toISOString()); window.location.reload() }}>
          Save Date to Cookie
        </button>
        <button onClick={() => { setCookie("date", "0", new Date(0)); window.location.reload() }}>
          Delete Cookie
        </button>
        <p>
          Cookies: {document.cookie}
        </p>
        <div>
          <InfiniteCalendar width={600} height={400}
            selected={date}
            onSelect={setDate}
            displayOptions={{
              showHeader: false
            }}
          />
        </div>
      </div>
    </>
  )
}

export default App
