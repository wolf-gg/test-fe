import * as React from 'react';
import styled from '@emotion/styled';
import axios from '../helpers/axios';

import Cell from '../common/Cell';
import Button from '../common/Button';

const ButtonCell = styled(Cell)`
    padding: 10px 10px 10px 10px;
    text-align: center;
    width: 200px;
`;

const StyledCell = styled(Cell)`
    padding: 10px 10px 10px 10px;
    text-align: center;
    width: 400px;
`;

class AddRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    handleAdd = async () => {
        try {
            await axios.post('/appointment', {
                name: this.state.nameInput,
                comment: this.state.commentInput,
                to: this.state.toInput,
                from: this.state.fromInput
            });
        } catch (error) {
            console.log(error);
        }
    }

    renderButtons = () => {
        return (
            <Button 
                onClick={this.handleAdd}
                content='Add'
            />
        )
    }

    handleName = (event) => {
        this.setState({
            nameInput: event.target.value
        });
    }

    handleComment = (event) => {
        this.setState({
            commentInput: event.target.value
        });
    }

    handleTo = (event) => {
        this.setState({
            toInput: event.target.value
        });
    }

    handleFrom = (event) => {
        this.setState({
            fromInput: event.target.value
        });
    }

    renderInput = (handler) => {
        return (
            <input onChange={handler}/>
        )
    }

    render() {
        return(
            <tr>
                <StyledCell
                    content={this.renderInput(this.handleName)}
                />
                <StyledCell
                    content={this.renderInput(this.handleFrom)}
                />
                <StyledCell
                    content={this.renderInput(this.handleTo)}
                />
                <StyledCell
                    content={this.renderInput(this.handleComment)}
                />
                <ButtonCell
                    content={this.renderButtons()}
                />
            </tr>
        )
    }
}

export default AddRow;