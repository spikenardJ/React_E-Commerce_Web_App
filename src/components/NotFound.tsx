// A gentle Not Found page to redirect user to home page

import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import errorImage from "../images/error.webp";

const NotFound = () => {
  return (
    <Container fluid className="d-flex justify-content-center pt-5 mt-5 align-items-center vh-200 bg-light">
      <Row className="text-center w-150">
        <Col md={6} className="d-flex justify-content-center">
            <div id="to-home-div">
            <Image
                id="error-image"
                src={errorImage} 
                alt="404 Error"
                fluid
                style={{ maxWidth: '800px', marginBottom: "80px" }}
            />
          </div>
        </Col>
        <Col md={6}>
          <h1 className="text-danger">404 - Page Not Found</h1>
          <p className="text-muted mb-4">
            Oops! The page you're looking for doesn't exist. <br />But don't worry, we'll help you find your way back home.
          </p>
          <div id="to-home-div">
            <Button variant="secondary" className="text-dark px-4 py-2">
                <Link id="to-home" to="/" className="text-dark text-decoration-none">
                Go Back to Homepage
                </Link>
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;