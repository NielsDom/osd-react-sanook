import React, { useState } from "react"
import Header from "../components/Header"
import Item from "../components/Item"
import uniqid from "uniqid"
import randomColor from "random-color"

const styles = {
  main: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  todoList: {
    width: "80%",
    height: "80%",
    border: "1px solid black"
  }
}

function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const titleA = a.title.toUpperCase()
  const titleB = b.title.toUpperCase()

  let comparison = 0
  if (titleA > titleB) {
    comparison = 1
  } else if (titleA < titleB) {
    comparison = -1
  }
  return comparison
}

const MainContainer = () => {
  const [searchInput, setSearchInput] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const [itemsList, setItemsList] = useState([
    {
      id: "2",
      title: "title item 1",
      price: "200",
      color: randomColor().hexString()
    }
  ])

  const _addItem = (title, price) => {
    setItemsList([
      ...itemsList,
      { title, price, id: uniqid(), color: randomColor().hexString() }
    ])
  }

  const _deleteItems = id => {
    setItemsList(itemsList.filter(x => x.id !== id))
  }

  const _editItem = (id, title, price) => {
    const without = itemsList.filter(x => x.id !== id)
    const selectedItem = itemsList.filter(x => x.id === id)[0]

    const editSelectedItem = {
      ...selectedItem,
      title,
      price
    }

    setItemsList([...without, editSelectedItem])
  }

  return (
    <div style={styles.main}>
      <div style={styles.todoList}>
        <Header
          _addItem={_addItem}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
        <div>
          {itemsList
            .filter(x => x.title.includes(searchInput))
            .sort(compare)
            .map(({ title, price, id, color }) => (
              <Item
                title={title}
                price={price}
                id={id}
                openModal={openModal}
                setOpenModal={setOpenModal}
                _editItem={_editItem}
                _deleteItems={_deleteItems}
                color={color}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default MainContainer
