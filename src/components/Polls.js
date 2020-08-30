import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  Button,
  Paper,
  Box,
  Container,
  makeStyles,
  Typography
} from "@material-ui/core"
import { db } from "../firebase"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  listItem: {
    margin: theme.spacing(1),
    width: theme.spacing(64),
    padding: 1
  },
  link: {
    textDecoration: "none"
  }
}))

export default function Polls(props) {
  const [ polls, setPolls ] = useState([])
  const classes = useStyles()
  
  useEffect(() => {
    let unsubscribe = db.collection("polls").onSnapshot(snapShot => {
      let pollsData = []

      snapShot.forEach(snap => {
        pollsData.push({...snap.data(), id: snap.ref.id })
      })

      setPolls(pollsData)
    }, err => {
      console.log(err)
    })
    
    return () => {
      if(unsubscribe){
        unsubscribe()
      }
    }
  }, [])
  
  return (
    <Container>
      <Box className={classes.root}>
        {polls.map((poll, index) => 
          <Link to={`/poll/${poll.id}`} className={classes.link} key={index}>
          <Paper elevation={4} className={classes.listItem}>
            <Box m={2.5}>
            <Typography variant="h5">{poll.pollName}</Typography>
            </Box>
          </Paper>
        </Link>
        )}
      </Box>
    </Container>
  )
}
