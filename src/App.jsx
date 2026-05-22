import { useState } from "react"

function App() {
  let savedHabits = localStorage.getItem("habits")

  const [habits, setHabits] = useState(savedHabits ? JSON.parse(savedHabits) : [])
  const [inputValue, setInputValue] = useState("")

  function addHabit() {
    if (inputValue === "") return

    const newHabit = {
      id: Date.now().toString(),
      name: inputValue
    }

    console.log("adding habit", newHabit) // works!!

    const newHabits = [...habits, newHabit]
    setHabits(newHabits)
    localStorage.setItem("habits", JSON.stringify(newHabits))
    setInputValue("")
  }

  function deleteHabit(habitId) {
    // filter out the habit with this id
    const newHabits = habits.filter(function(h) {
      return h.id !== habitId
    })
    setHabits(newHabits)
    localStorage.setItem("habits", JSON.stringify(newHabits))
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Habit Tracker</h1>

      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a habit..."
      />
      <button onClick={addHabit}>Add</button>

      <div>
        {habits.map((habitItem) => (
          <div key={habitItem.id}>
            <span>{habitItem.name}</span>
            <button onClick={() => deleteHabit(habitItem.id)}>delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App