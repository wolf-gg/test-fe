import * as React from 'react';

import Row from '../components/Row';

function Table() {
    const content = [
        "test1",
        "test2"
    ];

    return (
        <table>
            <Row
                content={content}
            />
        </table>
    )
}

export default Table;