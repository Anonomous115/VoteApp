import React, { useState, useEffect } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import IconButton from "@material-ui/core/IconButton"
import RemoveIcon from "@material-ui/icons/Remove"
import InputAdornment from "@material-ui/core/InputAdornment"
import { db } from "../firebase"

export default function AddPollDialog({ open, handleClose }) {
  const [pollName, setPollName] = useState("")
  const [currentCandidates, setCandidates] = useState(["", ""])

  useEffect(() => {
    if (!open) {
      setPollName("")
      setCandidates(["", ""])
    }
  }, [open])

  function addCandidateField(candidateName, index) {
    return (
      <React.Fragment key={`Candidate #${index + 1}`}>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label={`Candidate #${index + 1}`}
          type="text"
          fullWidth
          value={candidateName}
          onChange={(e) => {
            let allCandidates = currentCandidates.slice()
            allCandidates[index] = e.target.value

            setCandidates(allCandidates)
          }}
        />
      </React.Fragment>
    )
  }

  function handleSave() {
      if(pollName){
        const candiates = currentCandidates.filter(ele => ele !== "").map(name => {
            return {
                candidateName: name,
                score: 0
            }
        })

        if(candiates.length){
            db.collection("polls").add({pollName, candiates})
            .then(() => {
                handleClose()
            })
            .catch(err => {
                console.log(err)
            })
        }
      }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add a new Poll</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can only add 5 candidates per poll.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Poll Name"
          type="text"
          fullWidth
          value={pollName}
          onChange={(e) => setPollName(e.target.value)}
        />
        {currentCandidates.map((candidateName, index) =>
          addCandidateField(candidateName, index)
        )}

        <Button
          variant="outlined"
          style={{ marginTop: 15 }}
          disabled={currentCandidates.length === 5}
          onClick={(e) => {
            if (currentCandidates.length < 5) {
              setCandidates([...currentCandidates, ""])
            }
          }}
        >
          Add more Candidates
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}
