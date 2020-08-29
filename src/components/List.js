import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { ListGroup, Accordion, Button, Card, Form } from "react-bootstrap";
import { db } from "../firebase";
function List({ data, subData }) {
  const [text, settext] = useState("");
  const [datas, setData] = useState(data);
  const [subDatas, setSubData] = useState(subData);
  const [voted, setVoted] = useState(false);

  const voteit = (v) => {
    let idd;
    let votes;
    if (!voted) {
      for (var i = 0; i < subData.length; i++) {
        if (subData[i].name === text) {
          idd = subData[i].id;
          votes = subData[i].votes;
        }
      }
      setVoted(true);

      db.collection("voteMe")
        .doc("poll")
        .collection("vote")
        .doc(idd)
        .update({ votes: votes + 1 });
    }
  };

  return (
    <div>
      <ListGroup>
        {data.map((i) => (
          <ListGroup.Item>
            <Accordion defaultActiveKey="0">
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="blue" eventKey="0">
                    {i.name}
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <MDBContainer>
                      <h3 className="mt-5">Pie chart</h3>
                      <Pie
                        data={{
                          labels: subData.map((k) => [k.name]),
                          datasets: [
                            {
                              data: subData.map((k) => [k.votes]),
                              backgroundColor: [
                                "#F7464A",
                                "#46BFBD",
                                "#FDB45C",
                                "#949FB1",
                                "#4D5360",
                                "#AC64AD",
                              ],
                              hoverBackgroundColor: [
                                "#FF5A5E",
                                "#5AD3D1",
                                "#FFC870",
                                "#A8B3C5",
                                "#616774",
                                "#DA92DB",
                              ],
                            },
                          ],
                        }}
                        options={{ responsive: true }}
                      />
                    </MDBContainer>
                    <Form.Group>
                      <Form.Label>Select</Form.Label>
                      <Form.Control
                        as="select"
                        onChange={(e) => settext(e.target.value)}
                      >
                        {subData.map((e) => (
                          <option>{e.name}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>

                    <Button variant="success" onClick={voteit}>
                      submit your Vote
                    </Button>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default List;
