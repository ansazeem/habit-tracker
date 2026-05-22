import { useState } from "react"

function getWeekDates(weekShift) {
  const dates = []
  const today = new Date()

  const monday = new Date(today)
  monday.setDate(today.getDate() - today.getDay() + 1 + weekShift * 7)

  for (let i = 0; i < 7; i++) {
    const day = new Date(monday)
    day.setDate(monday.getDate() + i)
    dates.push(day.toISOString().split("T")[0])
  }

  return dates
}

function getStreak(habitId, completions, today) {
  let streak = 0
  let current = new Date(today)

  while (true) {
    const dateStr = current.toISOString().split("T")[0]
    const dates = completions[habitId] || []

    if (dates.includes(dateStr)) {
      streak++
      current.setDate(current.getDate() - 1)
    } else {
      break
    }
  }

  return streak
}

function App() {
  let savedHabits = localStorage.getItem("habits")
  let savedCompletions = localStorage.getItem("completions")

  const [habits, setHabits] = useState(savedHabits ? JSON.parse(savedHabits) : [])
  const [completions, setCompletions] = useState(savedCompletions ? JSON.parse(savedCompletions) : {})
  const [inputValue, setInputValue] = useState("")
  const [weekShift, setWeekShift] = useState(0)

  const weekDates = getWeekDates(weekShift)
  const today = new Date().toISOString().split("T")[0]

  function addHabit() {
    if (inputValue === "") return

    const newHabit = {
      id: Date.now().toString(),
      name: inputValue
    }

    console.log("adding habit", newHabit) // adding habit

    const newHabits = [...habits, newHabit]
    setHabits(newHabits)
    localStorage.setItem("habits", JSON.stringify(newHabits))
    setInputValue("")
  }

  function deleteHabit(habitId) {
    const newHabits = habits.filter(function(h) {
      return h.id !== habitId
    })
    setHabits(newHabits)
    localStorage.setItem("habits", JSON.stringify(newHabits))

    const newCompletions = { ...completions }
    delete newCompletions[habitId]
    setCompletions(newCompletions)
    localStorage.setItem("completions", JSON.stringify(newCompletions))
  }

  function toggleCompletion(habitId, date) {
    const current = completions[habitId] || []

    let updated
    if (current.includes(date)) {
      updated = current.filter((d) => d !== date)
    } else {
      updated = [...current, date]
    }

    const newCompletions = { ...completions, [habitId]: updated }
    setCompletions(newCompletions)
    localStorage.setItem("completions", JSON.stringify(newCompletions))
  }

  return (
    <div className="container">
      <h1>Habit Tracker</h1>

      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addHabit()}
        placeholder="Add a habit..."
      />
      <button onClick={addHabit}>Add</button>


      <div className="nav-buttons">
        <button onClick={() => setWeekShift(weekShift - 1)}>← Prev</button>
        <button onClick={() => setWeekShift(0)}>Today</button>
        <button onClick={() => setWeekShift(weekShift + 1)}>Next →</button>
      </div>

      {habits.length === 0 && (
        <p>No habits yet. Add one above!</p>
      )}

      {habits.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Habit</th>
              {weekDates.map((date) => (
                <th key={date} className={date === today ? "today" : ""}>
                  {date.slice(5)}
                </th>
              ))}
              <th>Streak</th>
            </tr>
          </thead>
          <tbody>
            {habits.map((habitItem) => (
              <tr key={habitItem.id}>
                <td>
                  {habitItem.name}
                  <button onClick={() => deleteHabit(habitItem.id)}>x</button>
                </td>
                {weekDates.map((date) => (
                  <td key={date}>
                    <input
                      type="checkbox"
                      checked={completions[habitItem.id]?.includes(date) || false}
                      onChange={() => toggleCompletion(habitItem.id, date)}
                      disabled={date > today}
                    />
                  </td>
                ))}
                <td>{getStreak(habitItem.id, completions, today)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default App