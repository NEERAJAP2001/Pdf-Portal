import { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Base from "../components/Base";
import NewFeed from "../components/NewFeed";

const Home = () => {
  return (
    <Base>
      <Container className="mt-3">
        <Row>
          <Col md={10}>
            <NewFeed />
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Home;
