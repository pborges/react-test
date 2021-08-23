import React from 'react';
import {Button, FloatingLabel, Form} from "react-bootstrap";
import Socket from "../Socket";

interface Props {
    ws: Socket
}

interface State {
    response?: string
    request?: string
}

class Page1 extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            request: undefined
        };
        this.writeData = this.writeData.bind(this);
    }

    writeData(request: string) {
        this.props.ws.sendAsync<string, string>("echo",
            request,
            (res: string) => {
                this.setState({response: (this.state.response || "") + "\n" + res});
            },
            (err: Error) => {
                this.setState({response: err.name + ": " + err.message});
            }
        )
        this.setState({request: undefined});
    }

    render() {
        return (
            <div>
                <h1>Page 1</h1>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Echo Message</Form.Label>
                        <Form.Control
                            type="message"
                            placeholder="Message"
                            value={this.state.request || ""}
                            onChange={e => this.setState({request: e.target.value})}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Button variant="primary" onClick={() => this.writeData(this.state.request as string)}
                                disabled={this.state.request === undefined}>
                            Write
                        </Button>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <FloatingLabel label="">
                            <pre>{this.state.response}</pre>
                        </FloatingLabel>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}

export default Page1;
