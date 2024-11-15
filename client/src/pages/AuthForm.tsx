import { Button, Container, Form, Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useState } from "react";

import { useStore } from '../store';

import { REGISTER_USER, LOGIN_USER } from "../graphql/mutations";

function AuthForm({ isLogin }: { isLogin: boolean }) {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        errorMessage: ''
    });
    const [registerUser] = useMutation(REGISTER_USER);
    const [loginUser] = useMutation(LOGIN_USER);
    const {setState} = useStore()!;
    const navigate = useNavigate();

    // First you gather the input information from the user
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    };

    // Now we have to do something with those inputs - here we can pass all of the variables into the formData
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // This prevents a browser refresh
        event.preventDefault();

        const mutation = isLogin ? loginUser : registerUser;
        const prop = isLogin ? 'loginUser' : 'registerUser';

        try {
            const res = await mutation({
                variables: formData
            })
    
            console.log(res);
            
    
            setState((oldState) => ({
                ...oldState,
                user: res.data[prop].user
            }));
    
            navigate('/dashboard');
        } catch (error: any) {
            setFormData({
                ...formData,
                errorMessage: error.message
            });
            
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit} style={{ width: "500px" }} className="mx-auto mt-5">
                <h2 className="text-center mt-3">{isLogin ? 'Log In' : 'Register'}</h2>

                {formData.errorMessage && (
                    <p className="text-center text-danger">{formData.errorMessage}</p>
                )}

                {!isLogin && (
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control name="username" onChange={handleInputChange} autoComplete="username" type="text" placeholder="Enter username" />
                    </Form.Group>
                )}

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" onChange={handleInputChange} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" onChange={handleInputChange} autoComplete="current-password" type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    {isLogin ? (
                        <Nav.Link className="text-center text-primary" as={NavLink} to="/register">Don't have an account? Click Here!</Nav.Link>
                    ) : (
                        <Nav.Link className="text-center text-primary" as={NavLink} to="/login">Have an account already? Click Here!</Nav.Link>
                    )}
                </Form.Group>

                <div className="d-grid gap-2 px-5">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </Container>
    )
}

export default AuthForm;