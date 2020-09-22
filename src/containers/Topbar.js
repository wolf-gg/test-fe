import * as React from 'react';
import styled from '@emotion/styled';

const StyledTopbar = styled.div`
    padding: 20px 10px 30px 10px
`;

function Topbar() {
    return (
        <StyledTopbar>
            Welcome to Doctor's appointment FE
        </StyledTopbar>
    )
}

export default Topbar;