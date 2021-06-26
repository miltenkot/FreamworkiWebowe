import { IoAdd, IoClose } from 'react-icons/io5';
import React, { Component } from 'react';

import Button from '../../common/Button/Button';
import Field from '../../common/Field/Field';
import { Profile } from '../../../utils/Rest';
import { v4 as uuid } from "uuid";
import styled from 'styled-components';
import { Sizes } from '../../../styledHelpers/Sizes';

type _keys = 'expertise' | 'specialities' | 'admissions' | 'counties';

interface IField {
    label: string | undefined;
    stateKey: _keys,
    values: {
        id: string,
        value: string
    }[]
}

type P = {
    data: Profile['details'],
    formActive: boolean
}

type S = {
    data: Profile['details']
}

const ProfileDetailsContainer = styled.div`
    padding: ${Sizes.spacing2} 0;
`;

const DataStyle = styled.div`
        .Input {
            &:not(:last-of-type) {
                margin-bottom: ${Sizes.spacing1};
            }
        }
`;

const ItemsStyle = styled.form`
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-start;
        padding: 0 ${Sizes.spacing2};

        gap: ${Sizes.spacing2};
        row-gap: ${Sizes.spacing1};
        p {
            margin: 0;
            padding: 2px ${Sizes.spacing1};
            color: #7d91a1;
            border-radius: 4px;
            background-color: #e2f2ff;

            &.empty {
                background-color: #f7f7f7;
            }
        }
`;

const ItemStyle = styled.div`
color: red;
    display: flex;
        input {
            border-radius: 4px 0 0 4px;
        }

        button {
            display: flex;
            align-items: center;
            color: white;
            border: 0;
            border-radius: 0  4px  4px 0;
            background-color: #ff5f5f;
        }
`;

class ProfileDetails extends Component<P, S> {
    constructor(props: P) {
        super(props);
        this.state = {
            data: props.data
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


    removeItem(key: _keys, id: string) {
        this.setState((prevState) => {
            const newState = prevState.data;
            newState[key] = newState[key].filter((item) => id !== item.id);
            return {
                data: newState
            }
        });
    }

    addItem(key: _keys) {
        this.setState((prevState) => {
            const newState = prevState.data;
            newState[key].push({
                id: uuid(),
                value: ''
            });
            return {
                data: newState
            }
        });
    }

    onInputChange(val: { value: string, valid?: boolean }, key: _keys, index: number) {
        this.setState((prevState) => {
            let newVal = prevState.data;
            newVal[key][index].value = val.value;
            return {
                data: newVal
            }
        });
    }

    createForm(active: boolean, fields: IField[]) {
        if (active) {
            return fields.map((field, index) => <div key={field.stateKey}>
                <p className="header-4">{field.label}</p>
                <ItemsStyle key={`form_${field.stateKey}_${index}`} >
                    <>
                        {field.values.map((item, i) => <ItemStyle key={item.id}>
                            <Field key={`field_${field.stateKey}_${item.id}`} label={field.label} type="string" value={item.value} onChange={(e: { value: string, valid: boolean }) => this.onInputChange(e, field.stateKey, i)} />
                            <button type="button" onClick={() => this.removeItem(field.stateKey, item.id)}><IoClose /></button>
                        </ItemStyle>)}
                        <Button icon={IoAdd} iconOnly onClick={() => this.addItem(field.stateKey)} />
                    </>
                </ItemsStyle>
            </div>)
        }

        return fields.map((field, i) => <div key={field.stateKey}>
            <p className="header-4" key={`staticField_${i}`} >{field.label}</p>
            <ItemsStyle key={`staticVals_${i}`}>
                {field.values.length > 0
                    ? field.values.map((item) => item && <p key={`staticField_${i}_${item.id}`}>{item.value}</p>)
                    : <p className="empty">No items</p>}
            </ItemsStyle>
        </div>)
    }

    render() {
        const data = { ...this.state.data };

        const fields: IField[] = [{
            label: "Expertise",
            stateKey: 'expertise',
            values: data.expertise
        }, {
            label: "Specialities",
            stateKey: 'specialities',
            values: data.specialities
        }, {
            label: "Admissions to practice law",
            stateKey: 'admissions',
            values: data.admissions
        }, {
            label: "Counties",
            stateKey: "counties",
            values: data.counties
        }];

        return (
            <ProfileDetailsContainer >
                <DataStyle>
                    {this.createForm(this.props.formActive, fields)}
                </DataStyle>
            </ProfileDetailsContainer>
        );
    }
}

export default ProfileDetails;