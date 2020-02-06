import React, { useState } from "react"

import ModalSanook from "./ModalSanook"

const styles = {
  item: {
    width: "calc(100% - 30)",
    margin: 15,
    padding: 15,
    border: "1px solid black",
    display: "flex",
    justifyContent: "space-between"
  }
}

const Item = ({ title, price, id, _editItem, _deleteItems, color }) => {
  const [open, setOpen] = useState(false)
  return (
    <div
      style={{
        ...styles.item,
        background: color
      }}
    >
      <div>
        {title} - {price} - {id}
      </div>
      <div>
        <button onClick={() => setOpen(true)}>edit</button>
        <button onClick={() => _deleteItems(id)}>delete</button>
      </div>
      {open && (
        <ModalSanook
          open={open}
          setOpen={setOpen}
          _editItem={_editItem}
          title={title}
          price={price}
          id={id}
        />
      )}
    </div>
  )
}

export default Item
