import * as React from 'react';
import styled from '@emotion/styled';
import axios from '../helpers/axios';
import DatePicker from 'react-datepicker';
import { TimePicker } from 'antd';

import 'antd/dist/antd.css'
import "react-datepicker/dist/react-datepicker.css";

import Cell from '../common/Cell';
import Button from '../common/Button';
import * as dateHelper from '../helpers/dateHelper';

const { RangePicker } = TimePicker;

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

const StyledDatePicker = styled(DatePicker)`
    text-align: center;
`;

class EditRow extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            nameInput: '',
            commentInput: ''
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
                startDate: dateHelper.getMomentNo(to).toDate(),
                nameInput: name,
                commentInput: comment,
                toTime: dateHelper.getTime(to),
                fromTime: dateHelper.getTime(from)
            }
        });
    }

    handleEdit = async () => {
        try {
            await axios.patch(`/appointment/${this.props.appointment._id}`, {
                name: this.state.nameInput,
                comment: this.state.commentInput,
                to: `${dateHelper.getDate(this.state.startDate)} ${this.state.toTime}`,
                from: `${dateHelper.getDate(this.state.startDate)} ${this.state.fromTime}`
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

    addDatePicker = () => {
        return (
            <StyledDatePicker 
                selected={this.state.startDate} onChange={date => {
                    this.setState({
                        startDate: date,
                    })
                }}
                dateFormat='MMMM d, yyyy'
            />
        );
    }

    addTimePicker = () => {
        return (
            <RangePicker
                format='HH:mm'
                allowClear={false}
                disabledHours={() => [0,1,2,3,4,5,6,7,8,18,19,20,21,22,23]}
                value={[dateHelper.getMoment(this.state.fromTime), dateHelper.getMoment(this.state.toTime)]}
                onChange={(times) => {
                    const timeStrings = dateHelper.getTimeFromRangePicker(times);
                    
                    this.setState({
                        fromTime: timeStrings[0],
                        toTime: timeStrings[1]
                    });
                }}
            />
        )
    }

    render() {
        return(
            <tr>
                <StyledCell
                    content={this.renderInput(this.handleName, this.state.nameInput)}
                />
                <StyledCell
                    content={this.addDatePicker()}
                />
                <StyledCell
                    content={this.addTimePicker()}
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