import { Row, Col, Container } from 'react-bootstrap';

function Landing() {
    return (
        <Container fluid="true">
            <Row>
                <Col className="landing-hero-image"></Col>
                <Col className="d-flex flex-column justify-content-center">
                    <h1 className="text-center">Petstagram</h1>
                    <h3 className="text-center fw-light">The fun hangout where your pets can socialize!</h3>
                </Col>
            </Row>
        </Container>
    )
}

export default Landing;