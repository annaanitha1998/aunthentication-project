import { Container, Col, Row } from "react-bootstrap";
import {
  Route,
  Router,
  Routes
} from "react-router-dom";

import Register from "./component/Register";
import Login from "./component/Login";
import Home from "./component/Home";

function App() {
  return (
    <Container>
      <Row>
        <Col className="text-center">
          <h1>React Authentication Module</h1>

          <section id="navigation">
            <a href="/">Register</a>
            <a href="/login">Login</a>
            <a href="/home">Home</a>
          </section>
        </Col>
      </Row>


        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>

    </Container>

  );
}

export default App;
