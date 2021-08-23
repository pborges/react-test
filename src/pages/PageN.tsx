import React from 'react';
import Socket from "../Socket";

interface Props {
    id: number
    ws: Socket
}

interface State {
    message: string
    error?: Error
}

class PageN extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            message: "",
            error: undefined,
        }
    }

    componentDidMount() {
        this.props.ws.sendAsync<any, string>("time", null,
            (res: string) => this.setState({message: res}),
            (err: Error) => this.setState({error: err})
        )
    }

    render() {
        return (
            <div>
                {this.state.error !== undefined && <pre>{this.state.error.name} {this.state.error.message}</pre>}
                <div>Page {this.props.id}</div>
                <pre>{this.state.message}</pre>
            </div>
        )
    }
}

export default PageN;
