import * as React from 'react';
import styled from '@emotion/styled';
import DatePicker from 'react-datepicker';
import { TimePicker } from 'antd'

import 'antd/dist/antd.css'
import "react-datepicker/dist/react-datepicker.css";

import axios from '../helpers/axios';

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

class AddRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date(),
            isDisabled: true,
            toTime: '9:00 AM',
            fromTime: '9:00 AM'
        };
    }

    enableButton = () => {
         console.log(this.state.toTime, this.state.fromTime);

        if (
            this.state.nameInput !== undefined &&
            this.state.commentInput !== undefined &&
            this.state.startDate !== undefined &&
            this.state.toTime !== undefined &&
            this.state.fromTime !== undefined
        ) {
            return false;
        }

        return true;
    }

    handleAdd = async () => {
        try {
            await axios.post('/appointment', {
                name: this.state.nameInput,
                comment: this.state.commentInput,
                to: `${dateHelper.getDate(this.state.startDate)} ${this.state.toTime}`,
                from: `${dateHelper.getDate(this.state.startDate)} ${this.state.fromTime}`
            });

            this.props.refreshTable();
        } catch (error) {
            console.log(error);
        }
    }

    renderButtons = () => {
        return (
            <Button 
                onClick={this.handleAdd}
                content='Add'
                disabled={this.state.isDisabled}
            />
        )
    }

    handleName = (event) => {
        this.setState({
            nameInput: event.target.value,
            isDisabled: this.enableButton()
        });
    }

    handleComment = (event) => {
        this.setState({
            commentInput: event.target.value,
            isDisabled: this.enableButton()
        });
    }

    renderInput = (handler) => {
        return (
            <input onChange={handler}/>
        )
    }

    addDatePicker = () => {
        return (
            <StyledDatePicker 
                selected={this.state.startDate} onChange={date => {
                    this.setState({
                        startDate: date,
                        isDisabled: this.enableButton()
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
                    content={this.renderInput(this.handleName)}
                />
                <StyledCell
                    content={this.addDatePicker()}
                />
                <StyledCell
                    content={this.addTimePicker()}
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