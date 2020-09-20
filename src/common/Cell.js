import * as React from 'react';

function Cell(props) {
    const { content } = props;

    return (
        <td className={props.className}>{content}</td>
    )
}

export default Cell;