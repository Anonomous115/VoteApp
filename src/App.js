import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import List from "./components/List";
import { db } from "./firebase";
import "./App.css";

function App() {
  const [data, setData] = useState([{ name: "fetching" }]);
  const [subData, setSubData] = useState([{ name: "fetching" }]);
  useEffect(() => {
    db.collection("voteMe").onSnapshot((s) => {
      const docdata = s.docs.map((i) => {
        return { ...i.data(), id: i.id };
      });
      setData(docdata);
    });

    db.collection("voteMe")
      .doc("poll")
      .collection("vote")
      .onSnapshot((s) => {
        const docdata2 = s.docs.map((i) => {
          return { ...i.data(), id: i.id };
        });

        setSubData(docdata2);
      });
  }, []);

  return (
    <div>
      <Header data={data} subData={subData} />
      <List data={data} subData={subData} />
    </div>
  );
}

export default App;
