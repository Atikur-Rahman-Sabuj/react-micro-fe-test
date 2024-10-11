import React, { useContext } from 'react'
import { CounterContext } from './CounterContext';
export default (props) => {
    const { value, setValue } = useContext(CounterContext);
    return (

    <div>
        <strong>--- Remote component ---</strong>
        <h2>
            {props.header ?? "I am a header"}
        </h2>
        The value from context is {value}
        <p>
            {props.desc ?? "Description of that header"}
        </p>

        <button onClick = {() => setValue(value + 1)}>
            Increase Counter through context
        </button>

        <button onClick = {props.decreaseCounter}>
            Decrease Counter through props
        </button>
        <div></div>
        <strong>--- Remote component ---</strong>
    </div>
)};