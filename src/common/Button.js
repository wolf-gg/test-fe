import * as React from 'react';

function Button(props) {
    const { onClick, content, disabled} = props;

    if (disabled) {
        return (
            <button disabled>
                {content}
            </button>
        )
    } else {
        return (
            <button onClick={onClick}>
                {content}
            </button>
        )
    }
}

export default Button;
