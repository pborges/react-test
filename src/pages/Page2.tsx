import React from 'react';
import {Link} from "react-router-dom";

interface Props {

}

interface State {

}

class Page2 extends React.Component<Props, State> {
    render() {
        return (
            <div>
                <div>Page2</div>
                <Link to={"/page1"}>Back to Page 1</Link>
            </div>
        )
    }
}

export default Page2;
