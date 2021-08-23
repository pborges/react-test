import React, {ChangeEvent, useState} from "react"
import {Button, Form, FormControl} from "react-bootstrap";

interface HTMLInput {
    name: string
    type: string
    value: string
    checked?: boolean
}

const SimpleForm = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        checkbox: false
    })

    // React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> is probably better, but then
    const handleChange = (e: React.ChangeEvent<HTMLInput>) => {
        // make a new object with all the keys from input (...input) then change input[e.target.name] to value
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setInput({
            ...input,
            [e.target.name]: value
        })
    }

    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        value={input.email}
                        onChange={handleChange}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={input.password}
                        onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check name="checkbox"
                                type="checkbox"
                                label="Check me out"
                                checked={input.checkbox}
                                onChange={handleChange}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <br/>
            <h4> FORM DATA</h4>
            <pre>
                {JSON.stringify(input)}
            </pre>
        </div>
    )
}

export default SimpleForm