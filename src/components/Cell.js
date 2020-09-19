import * as React from 'react';

function Cell(props) {
    const { content } = props;

    return (
        <td>{content}</td>
    )
}

export default Cell;