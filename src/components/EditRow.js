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

class EditRow extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            nameInput: '',
            commentInput: '',
            toInput: '',
            fromInput: ''
        };
    }

    componentDidMount() {
        this.setState((state, props) => {
            const {
                name,
                comment,
                to,
                from
            } = props.appointment;

            return {
                nameInput: name,
                commentInput: comment,
                toInput: to,
                fromInput: from
            }
        });
    }

    handleEdit = async () => {
        try {
            await axios.patch(`/appointment/${this.props.appointment._id}`, {
                name: this.state.nameInput,
                comment: this.state.commentInput,
                to: this.state.toInput,
                from: this.state.fromInput
            });

            this.props.changeIsEdit();
            this.props.refreshAppointment();
        } catch (error) {
            console.log(error);
        }
    }

    renderButtons = () => {
        return (
            <Button 
                onClick={this.handleEdit}
                content='Edit'
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

    renderInput = (handler, value) => {
        return (
            <input onChange={handler} value={value}/>
        )
    }

    render() {
        return(
            <tr>
                <StyledCell
                    content={this.renderInput(this.handleName, this.state.nameInput)}
                />
                <StyledCell
                    content={this.renderInput(this.handleFrom, this.state.fromInput)}
                />
                <StyledCell
                    content={this.renderInput(this.handleTo, this.state.toInput)}
                />
                <StyledCell
                    content={this.renderInput(this.handleComment, this.state.commentInput)}
                />
                <ButtonCell
                    content={this.renderButtons()}
                />
            </tr>
        )
    }
}

export default EditRow;