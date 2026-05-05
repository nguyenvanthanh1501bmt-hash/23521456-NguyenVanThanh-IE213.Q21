import React from "react";
import { Button, Card, Container, Form } from "react-bootstrap";

function Login(props) {
  const [name, setName] = React.useState("Thanh");
  const [id, setId] = React.useState("23521456");

  const onSubmit = (e) => {
    e.preventDefault();

    props.login({
      name: name.trim() || "Thanh",
      id: id.trim() || "23521456",
    });

    props.history.push("/movies");
  };

  return (
    <Container className="page-shell narrow-shell">
      <Card className="form-card">
        <Card.Body>
          <Card.Title>Login</Card.Title>

          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="id">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Enter user ID"
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
