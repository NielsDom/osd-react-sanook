import React, { useState } from "react"

const styles = {
  header: {
    height: 50,
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid black",
    justifyContent: "space-between",
    padding: "0px 15px 0px 15px"
  },
  errorMsg: {
    color: "red"
  }
}

const Header = ({ searchInput, setSearchInput, _addItem }) => {
  const [inputTitle, setInputTitle] = useState("")
  const [inputPrice, setInputPrice] = useState("")
  const [msgError, setMsgError] = useState({
    title: false,
    price: false
  })

  const _onSubmit = e => {
    e.preventDefault()
    if (
      inputTitle.length < 4 ||
      isNaN(inputPrice) ||
      Number(inputPrice) < 101
    ) {
      if (inputTitle.length < 4) {
        setMsgError({
          ...msgError,
          title: "More than 3 chars"
        })
      }
      if (Number(inputPrice) < 101) {
        setMsgError({
          ...msgError,
          price: "More than 100"
        })
      }
      if (isNaN(inputPrice)) {
        setMsgError({
          ...msgError,
          price: "Only number"
        })
      }
    } else {
      _addItem(inputTitle, inputPrice)
      setInputPrice("")
      setInputTitle("")
      setMsgError({
        title: false,
        price: false
      })
    }
  }

  return (
    <div style={styles.header}>
      <form onSubmit={_onSubmit} style={{ display: "flex" }}>
        <button type="submit">add item</button>
        <div>
          <input
            value={inputTitle}
            onChange={e => setInputTitle(e.target.value)}
            placeholder="title"
          />
          <div style={styles.errorMsg}>{msgError.title}</div>
        </div>
        <div>
          <input
            value={inputPrice}
            onChange={e => setInputPrice(e.target.value)}
            placeholder="price"
          />
          <div style={styles.errorMsg}>{msgError.price}</div>
        </div>
      </form>

      <div style={{ fontSize: 20, fontWeight: "bold" }}>Title</div>
      <input
        value={searchInput}
        onChange={e => setSearchInput(e.target.value)}
        placeholder="search"
      />
    </div>
  )
}

export default Header
