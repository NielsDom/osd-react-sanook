import React, { useState } from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import { useSpring, animated } from "react-spring/web.cjs" // web.cjs is required for IE 11 support

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}))

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter()
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited()
      }
    }
  })

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  )
})

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func
}

export default function SpringModal({
  open,
  setOpen,
  _editItem,
  title,
  price,
  id
}) {
  const [input, setInput] = useState({
    title,
    price
  })
  const [error, setError] = useState(false)
  const classes = useStyles()

  const _onChangeInput = (key, value) => {
    setInput({ ...input, [key]: value })
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const _onSubmit = e => {
    e.preventDefault()
    {
      if (
        input.title.length < 4 ||
        isNaN(input.price) ||
        Number(input.price) < 101
      ) {
        setError("error")
      } else {
        _editItem(id, input.title, input.price)
        setOpen(false)
      }
    }
  }

  return (
    <>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="spring-modal-title">EDIT</h2>
            <form onSubmit={_onSubmit}>
              <div>
                Title:{" "}
                <input
                  value={input.title}
                  onChange={e => _onChangeInput("title", e.target.value)}
                />
              </div>
              <div>
                Price:{" "}
                <input
                  value={input.price}
                  onChange={e => _onChangeInput("price", e.target.value)}
                />
              </div>
              <button type="submit">Submit</button>
            </form>
            {error && (
              <div
                style={{
                  fontSize: 22,
                  color: "red",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "bold"
                }}
              >
                {error}
              </div>
            )}
          </div>
        </Fade>
      </Modal>
    </>
  )
}
