import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  Button,
  FormControl,
  Modal,
  InputGroup,
} from "react-bootstrap";
import { db } from "../firebase";
function Header({ data, subData }) {
  const [text, settext] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [polls, setPolls] = useState([1]);
  const [show, setShow] = useState(false);
  const [text1, settext1] = useState("");
  const [text2, settext2] = useState("");
  const [text3, settext3] = useState("");
  const [text4, settext4] = useState("");
  const [text5, settext5] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (w, e) => {
    if (polls.length === 1) {
      settext1(e.target.value);
    }
    if (polls.length === 2) {
      settext2(e.target.value);
    }
    if (polls.length === 3) {
      settext3(e.target.value);
    }
    if (polls.length === 4) {
      settext4(e.target.value);
    }
    if (polls.length === 5) {
      settext5(e.target.value);
    }
  };
  const addpoll = () => {
    let last;
    if (polls.length < 5) {
      for (var i = 0; i < polls.length; i++) {
        last = polls[i];
      }
      setPolls([...polls, last + 1]);
    }
  };

  const submit = () => {
    db.collection("polls").add({ name: text });
    if (text1) {
      db.collection("voteMe")
        .doc("poll")
        .collection("vote")
        .add({ name: text1, votes: 0 });
    }
    if (text2) {
      db.collection("voteMe")
        .doc("poll")
        .collection("vote")
        .add({ name: text2, votes: 0 });
    }
    if (text3) {
      db.collection("voteMe")
        .doc("poll")
        .collection("vote")
        .add({ name: text3, votes: 0 });
    }
    if (text4) {
      db.collection("voteMe").collection("vote").add({ name: text4, votes: 0 });
    }

    console.log(text);
  };
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Voting app</Navbar.Brand>
        <Nav className="mr-auto"></Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />

          <Button variant="primary" onClick={handleShow}>
            Add a poll
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Create a Poll
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-default">
                    Title
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={(e) => settext(e.target.value)}
                />
              </InputGroup>
              <h3>Total Polls: {polls.length}</h3>
              {polls.map((w, i) => (
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">
                      Poll {w}
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={(e) => handleChange(w, e)}
                  />
                </InputGroup>
              ))}
              <Button variant="primary" onClick={addpoll}>
                Add another poll
              </Button>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="success" onClick={submit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Form>
      </Navbar>
    </div>
  );
}

export default Header;
