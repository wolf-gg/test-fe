import * as React from 'react';

function Button(props) {
    const { onClick, content } = props;

    return (
        <button onClick={onClick}>
            {content}
        </button>
    )
}

export default Button;
