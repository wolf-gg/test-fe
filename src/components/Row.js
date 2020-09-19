import * as React from 'react';

import Cell from './Cell';

function Row(props) {
    const { content } = props;

    const renderRow = content.map((element) => {
        return (
            <Cell
                content={element}
            />
        )
    })

    return (renderRow);
}

export default Row;