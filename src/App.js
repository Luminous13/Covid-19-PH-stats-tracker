import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from "antd";
import CountUp from "react-countup";
import "antd/dist/antd.css";
import "./index.css"

const link =
  "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/2/query?where=Country_Region%20%3D%20%27PHILIPPINES%27&outFields=OBJECTID,Country_Region,Last_Update,Confirmed,Deaths,Recovered&outSR=4326&f=json";

const container = {
  height: "100vh",
  width: "100vw",
  overflow: "scroll",
  backgroundColor: "#202020",
  padding: 25
};

const colStyle = {
  backgroundColor: "#161616",
  height: "40vh",
  margin: 20,
  padding: 20,
  boxShadow: "6px 6px 2px black"
};

const header = {
  color: "white",
  fontWeight: "bold"
};

const content = {
  color: "white",
  fontWeight: "bold",
  fontSize: 100
};

const BoxContainer = props => (
  <Col
    xs={22}
    sm={22}
    md={10}
    lg={7}
    xl={7}
    align="middle"
    justify="center"
    style={colStyle}
  >
    <Row align="middle" justify="center" style={{ height: "20%" }}>
      <h1 style={header}>{props.header}</h1>
    </Row>
    <Row align="middle" justify="center" style={{ height: "75%" }}>
      {/* <h1 style={content}>{props.data}</h1>  */}
      <CountUp start={0} end={props.data} duration={2.75}>
        {({ countUpRef }) => (
          <div>
            <span ref={countUpRef} style={content} />
          </div>
        )}
      </CountUp>
    </Row>
  </Col>
);

const getData = () =>
  new Promise(resolve => {
    axios.get(link).then(response => {
      console.log(response.data.features[0].attributes)
      resolve(response.data.features[0].attributes);
    });
  });

function App() {
  const [tests, setTests] = useState(0);
  const [cases, setCases] = useState(0);
  const [deaths, setDeaths] = useState(0);

  const [recovered, setRecovered] = useState(0);
  const [PUI, setPUI] = useState(0);
  const [PUM, setPUM] = useState(0);

  const listData = [
    { title: "TESTS CONDUCTED", value: tests },
    { title: "CONFIRMED CASES", value: cases },
    { title: "DEATHS", value: deaths },
    { title: "RECOVERED", value: recovered },
    { title: "PUIs", value: PUI },
    { title: "PUMs", value: PUM }
  ];

  useEffect(() => {
    getData().then(result => {
      setTests(result.tests);
      setCases(result.Confirmed);
      setDeaths(result.Deaths);
      setRecovered(result.Recovered);
      setPUI(result.PUIs);
      setPUM(result.PUMs);
    });
  });

  return (
    <div style={container}>
      <Row gutter={6} justify="center" align="middle" id="mainContainer">
        {listData.length !== 0 &&
          listData.map((data, index) => (
            <BoxContainer key={index} header={data.title} data={data.value} />
          ))}
      </Row>
    </div>
  );
}

export default App;
