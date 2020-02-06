import React from "react"

const styles = {
  main: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  todoList: {
    width: "80vw",
    height: "80vh",
    border: "1px solid black"
  },
  header: {
    height: 50,
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid black",
    justifyContent: "space-between",
    padding: "0px 15px 0px 15px"
  }
}

function App() {
  return (
    <div style={styles.main}>
      <div style={styles.todoList}>
        <div style={styles.header}>
          <button>add item</button>
          <div style={{ fontSize: 20, fontWeight: "bold" }}>Title</div>
          <input value="" placeholder="search" />
        </div>
      </div>
    </div>
  )
}

export default App
