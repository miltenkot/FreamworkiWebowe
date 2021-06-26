import { IoAdd, IoClose } from 'react-icons/io5';
import React, { Component } from 'react';

import Button from '../../common/Button/Button';
import Field from '../../common/Field/Field';
import { Profile } from '../../../utils/Rest';
import { v4 as uuid } from "uuid";
import styled from "styled-components";
import { Sizes } from '../../../styledHelpers/Sizes';

type _keys = 'id' | 'name' | 'entity' | 'location' | 'expertise' | 'date';

const Table = styled.table`
    border-collapse: collapse;
    tr {
        &:first-of-type {
            border-bottom: 1px solid #d3d3d3;
        }
        
        th, td {
            text-align: left;
            &:not(:last-of-type) {
                padding: ${Sizes.spacing1} ${Sizes.spacing3};
                max-width: 10rem;
                width: 10rem;
            }
            @include truncate();

            &.empty {
                color: #eaeaea;
            }

            input {
                min-width: auto;
            }
        }
    }
`;

interface ITable {
    columnName: string | undefined;
    stateKey: _keys,
    type: 'string' | 'date'
}

type P = {
    data: Profile['reviews'],
    formActive: boolean
}

type S = {
    data: Profile['reviews']
    expand: boolean
}

const ReviewContainer = styled.div`
  padding: ${Sizes.spacing2} 0;
`;

const DataContainer = styled.div`
    padding-left: ${Sizes.spacing4};
`;

class Reviews extends Component<P, S> {

    constructor(props: P) {
        super(props);
        this.state = {
            data: props.data,
            expand: false
        }

        this.onInputChange = this.onInputChange.bind(this);
    }

    componentDidUpdate(prevProps: P) {
        if (prevProps.formActive !== this.props.formActive) {
            this.setState({
                data: this.props.data
            })
        }
    }

    removeRow(index: number) {
        let newState = this.props.data;
        newState.splice(index, 1);
        this.setState({
            data: newState
        });
    }

    addRow() {
        const newState = this.props.data;
        newState.push({
            id: uuid(),
            name: '',
            entity: '',
            location: '',
            expertise: '',
            date: ''
        });
        this.setState({
            data: newState
        });
    }

    onInputChange(val: { value: string, valid?: boolean }, key: _keys, index: number) {
        this.setState((prevState) => {
            let newVal = prevState.data;
            newVal[index][key] = val.value;
            return {
                data: newVal
            }
        });
    }

    createTable(active: boolean, tab: ITable[]) {
        const headers = tab.map((v) => v.columnName);
        let rows = [...this.state.data].map((v) => tab.map(x => v[x.stateKey]));

        if (active) {
            return <>
                <Table>
                    <tbody>
                        <tr>
                            {headers.map((v, i) => <th key={i}>{v}</th>)}
                            <th></th>
                        </tr>
                        {rows.map((row, parentIndex) => <tr key={parentIndex}>
                            {row.map((val, i) =>
                                <td key={i}>
                                    <Field key={`item_${this.state.data[parentIndex].id}`} label={headers[i]} type={tab[i].type} value={val} onChange={(e: { value: string, valid: boolean }) => this.onInputChange(e, tab[i].stateKey, parentIndex)} />
                                </td>
                            )}
                            <td> <Button iconOnly icon={IoClose} onClick={() => this.removeRow(parentIndex)} /></td>
                        </tr>)}
                    </tbody>
                </Table>
                <Button label="Add new row" icon={IoAdd} onClick={() => this.addRow()} />
            </>;
        }

        if (!this.state.expand) {
            rows = rows.slice(0, 3);
        }

        return rows.length > 0
            ? <Table>
                <tbody>
                    <tr>
                        {headers.map((v, i) => <th key={`header${i}`}>{v}</th>)}
                    </tr>
                    {rows.map((row, i) => <tr key={`tr_${i}`}>
                        {row.map((val, chI) => <td key={`td_${i}_${chI}`} className={!val ? "empty" : ''}>{val || 'empty'}</td>)}
                    </tr>)}
                </tbody>
            </Table>
            : <p>No items</p>;
    }

    getExpandBtn() {
        const label = this.state.expand ? "See less" : "See more reviews";
        return (!this.props.formActive && this.state.data.length > 3) && <Button label={label} onClick={() => {
            this.setState((prevState) => {
                return {
                    expand: !prevState.expand
                }
            })
        }} />
    }

    render() {
        const table: ITable[] = [{
            columnName: "Expertise",
            stateKey: 'name',
            type: "string"
        }, {
            columnName: "Entity",
            stateKey: 'entity',
            type: "string"
        }, {
            columnName: "Location",
            stateKey: 'location',
            type: "string"
        }, {
            columnName: "Expertise",
            stateKey: 'expertise',
            type: "string"
        }, {
            columnName: "Date",
            stateKey: 'date',
            type: "date"
        }];

        return (
            <ReviewContainer>
                <h3 className="header-3">Interal reviews</h3>
                <DataContainer>
                    {this.createTable(this.props.formActive, table)}
                    {this.getExpandBtn()}
                </DataContainer>
            </ReviewContainer>
        );
    }
}


export default Reviews;