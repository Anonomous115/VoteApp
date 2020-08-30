import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  Fab,
  Zoom,
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  CssBaseline,
  useScrollTrigger,
  Button
} from "@material-ui/core"
import { KeyboardArrowUp } from "@material-ui/icons"
import AddPollDialog from "./AddPollDialog"

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
  },
}))

function ScrollTop(props) {
  const { children, window } = props
  const classes = useStyles()
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100
  })

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    )

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  )
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
}

export default function Header(props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Typography edge="start" variant="h6" className={classes.title}>
            Simple Polls
          </Typography>
          <Button edge="end" color="inherit" onClick={handleClickOpen}>Add Poll</Button>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
      <AddPollDialog open={open} handleClose={handleClose} />
    </React.Fragment>
  )
}
