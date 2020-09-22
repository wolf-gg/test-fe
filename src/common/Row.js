import * as React from 'react';
import styled from '@emotion/styled';

import Cell from './Cell';

const Header = styled(Cell)`
    border: 1px solid black;
    padding: 10px 10px 10px 10px;
    text-align: center;
    width: 400px;
`;

const StyledCell = styled(Cell)`
    padding: 10px 10px 10px 10px;
    text-align: center;
    width: 400px;
`;

function Row(props) {
    const { isHeader, content } = props;

    const renderCells = () => content.map((element) => (
        <StyledCell
            content={element}
        />
    ));
    
    const renderHeaders = () => content.map((element) => (
        <Header
            content={element}
        />
    ));

    if (isHeader) {
        return (
            renderHeaders()
        )
    } else {
        return (
            renderCells()
        )
    }
}

export default Row;