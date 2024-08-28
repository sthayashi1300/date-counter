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

const _MS_PER_DAY = 1000 * 60 * 60 * 24;
const dateDiffInDays = (a: Date, b: Date): number => {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc1 - utc2) / _MS_PER_DAY);
}

const App = () => {

  const now = () => new Date()
  const isDateInPast = (d: Date) => d < now()
  const dateString = "date"
  const eventString = "event"
  const yesterday = now()
  yesterday.setHours(0, 0, 0, 0)
  const [date, setDate] = useState(new Date(getCookie(dateString) || yesterday.toISOString()))
  const [event, setEvent] = useState(getCookie(eventString))
  const [isCalendarVisible, setIsCalendarVisible] = useState(isDateInPast(date))
  return (
    <>
      <div className="card">

        <h1>
          {!isDateInPast(date) && (dateDiffInDays(date, now())) + " days until " + event}
        </h1>
        {!isCalendarVisible
          ? <div>
            <button onClick={() => setIsCalendarVisible(true)}>Choose another date</button>
          </div>
          : <>
            <div>
              <InfiniteCalendar width={600} height={400}
                selected={date}
                onSelect={setDate}
                displayOptions={{
                  showHeader: false
                }}
              />
            </div>
            <p>
              <label>Name of the Event
                <input type="text" id="eventName" onChange={e => setEvent(e.target.value)}></input>
              </label>
              <button onClick={() => { setCookie(dateString, date.toISOString(), date); setCookie(eventString, event, date); window.location.reload() }}>
                Save Date & Event
              </button>
            </p>
            <p>
              <button onClick={() => { setCookie(dateString, "0", new Date(0)); window.location.reload() }}>
                Delete Cookie
              </button>
              Current Cookies: {document.cookie}
            </p>
          </>}
      </div>
    </>
  )
}

export default App
