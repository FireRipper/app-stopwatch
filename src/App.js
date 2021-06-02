import React, { useEffect, useState } from 'react'
import { interval, Subject, timer } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import './App.css'

function App() {
  const [time, setTime] = useState(0)
  const [watchOn, setWatchOn] = useState(false)
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    const unsubscribe$ = new Subject()
    interval(1000)
      .pipe(takeUntil(unsubscribe$))
      .subscribe(() => {
        if (watchOn) {
          setTime(prevVal => prevVal + 1000)
        }
      })
    return () => {
      unsubscribe$.next()
      unsubscribe$.complete()
    }

  }, [watchOn])

  useEffect(() => {
    if (clicked) {
      timer(300)
        .subscribe(() => setClicked(false))
    }
  }, [clicked])

  const handleStart = () => {
    setWatchOn(prevState => !prevState)
  }

  const handleStop = () => {
    setWatchOn(false)
    setTime(0)
  }

  const handleReset = () => {
    setWatchOn(true)
    setTime(0)
  }

  const handleWait = () => {
    setClicked(true)

    if (clicked) {
      setWatchOn(false)
    }
  }

  return (
    <div className="container">
      <div className="stopwatch">
        <div className="stopwatch-top">
          <span> {new Date(time).toISOString().slice(11, 19)}</span>
        </div>
        <div className="stopwatch-bottom">
          <div>
            <button className="btn start-button" onClick={handleStart}>Start</button>
            <button className="btn wait-button" onClick={handleWait}>Wait</button>
          </div>
          <div>
            <button className="btn reset-button" onClick={handleReset}>Reset</button>
            <button className="btn stop-button" onClick={handleStop}>Stop</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
