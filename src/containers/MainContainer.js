import * as React from 'react';
import styled from '@emotion/styled';

import AppointmentTable from '../components/AppointmentTable';
import Topbar from './Topbar';

const StyledMainContainer = styled.div`
    border: 1px solid lightgrey;
    padding: 4px;
    width: 1900px;
`;

class MainContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            appointments: []
        };
    }

 
    
    render() {
        return (
            <StyledMainContainer>
                <Topbar />
                <AppointmentTable appointments={this.state.appointments}/>
            </StyledMainContainer>
        )
    }
}

export default MainContainer;