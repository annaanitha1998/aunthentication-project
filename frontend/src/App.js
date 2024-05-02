import { Container, Col, Row } from "react-bootstrap";
import Register from "./component/Register";

function App() {
  return (
    <Container>
    <Row>
      <Col xs={12} sm={12} md={6} lg={6}>
        <Register />
      </Col>

      <Col xs={12} sm={12} md={6} lg={6}></Col>
    </Row>
  </Container>
  );
}

export default App;
