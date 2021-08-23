import React, {useState} from "react"
import {Button} from "react-bootstrap";

interface Props {
    message: string
}

const TestFC: React.FC<Props> = ({message}) => {
    const [data, setData] = useState({
        foo: "bar",
        fizz: "buzz",
    })

    const handleChange = () => {
        setData({
            foo: data.fizz,
            fizz: data.foo,
        })
    }

    return (
        <div>
            <div>React.FC example</div>
            <div>Prop: {message}</div>
            <br/>
            <div>State Foo: {data.foo}</div>
            <div>State Fizz: {data.fizz}</div>
            <Button onClick={handleChange}>Swap</Button>
        </div>
    )
}

export default TestFC