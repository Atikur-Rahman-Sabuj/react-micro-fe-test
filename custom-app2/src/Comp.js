import React from 'react'
export default (props) => (
    <div>
        <strong>--- Remote component ---</strong>
        <h2>
            {props.header ?? "I am a header"}
        </h2>
        <p>
            {props.desc ?? "Description of that header"}
        </p>
        <button onClick = {props.decreaseCounter}>
            Increase Counter
        </button>
        <div></div>
        <strong>--- Remote component ---</strong>
    </div>
)