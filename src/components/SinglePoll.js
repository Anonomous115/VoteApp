import React, { useEffect, useState } from "react"
import {
  Button,
  Paper,
  Box,
  Container,
  makeStyles,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions
} from "@material-ui/core"
import { Pie } from "react-chartjs-2"
import { db } from "../firebase"
import { useParams } from "react-router-dom"
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  gridContainer: {
    marginTop: theme.spacing(8)
  },
  topBorderLine: {
    borderTop: "7px solid #3f51b5"
  },
  listBtn: {
    margin: "0px 0 20px 0",
    padding: "16px",
    justifyContent: "left",
    borderLeft: "4px solid #3f51b5"
  }
}))

export default function SinglePoll(props) {
  const [poll, setPoll] = useState()
  const classes = useStyles()
  const params = useParams()

  useEffect(() => {
    let unsubscribe

    if (params.id) {
      unsubscribe = db
        .collection("polls")
        .doc(params.id)
        .onSnapshot(
          (snapShot) => {
            const pollDoc = snapShot.data()
            if (pollDoc) {
              setPoll({ ...pollDoc, id: snapShot.ref.id })
            }
          },
          (err) => {
            console.log(err)
          }
        )
    }

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  function castVote(index) {
    const { candiates } = poll

    let candiatesCopy = candiates.slice()
    candiatesCopy[index].score += 1

    db.collection("polls").doc(params.id).update({candiates: candiatesCopy})
  }

  return (
    <Container>
      {poll && (
        <Grid container spacing={6} className={classes.gridContainer}>
          <Grid item md={6} xs={12}>
            <Card
              className={(classes.root, classes.topBorderLine)}
              elevation={8}
            >
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {poll.pollName}
                </Typography>
                <Box display="flex" flexDirection="column" mt={5}>
                  {poll.candiates.map((candidate, index) => (
                    <Button
                      key={index}
                      variant="outlined"
                      className={classes.listBtn}
                      onClick={(e) => castVote(index)}
                    >
                      {candidate.candidateName}
                    </Button>
                  ))}
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item md={6} xs={12}>
            <Card className={classes.root}>
              <CardContent>
                <Pie
                  data={{
                    labels: poll.candiates.map(
                      (candidate) => candidate.candidateName
                    ),
                    datasets: [
                      {
                        data: poll.candiates.map(
                          (candidate) => candidate.score
                        ),
                        backgroundColor: [
                          "#F7464A",
                          "#46BFBD",
                          "#FDB45C",
                          "#949FB1",
                          "#4D5360",
                          "#AC64AD"
                        ],
                        hoverBackgroundColor: [
                          "#FF5A5E",
                          "#5AD3D1",
                          "#FFC870",
                          "#A8B3C5",
                          "#616774",
                          "#DA92DB"
                        ]
                      }
                    ]
                  }}
                  options={{ responsive: true }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  )
}
