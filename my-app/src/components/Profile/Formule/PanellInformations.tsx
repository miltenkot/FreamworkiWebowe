import { IoAdd, IoClose } from 'react-icons/io5';
import React, { Component } from 'react';

import { BiMessage } from 'react-icons/bi';
import Button from '../../common/Button/Button';
import { FaUser } from 'react-icons/fa';
import Field from '../../common/Field/Field';
import { Profile } from '../../../utils/Rest';
import { v4 as uuid } from "uuid";
import styled from 'styled-components';
import { Sizes } from '../../../styledHelpers/Sizes';

type _keys = 'hourlyFee' | 'terms' | 'correspondants';

type P = {
    data: Profile['panelInformations'],
    formActive: boolean
}

type S = {
    data: Profile['panelInformations']
}

const PanelCont = styled.div`
    padding: ${Sizes.spacing2} 0;
`;

const PanelData = styled.div`
    :global {
            .header-5 {
                font-size: ${Sizes.spacing2};
                margin-left: ${Sizes.spacing2};
            }
        }
`;

const Value = styled.p`
        margin-top: ${Sizes.spacing1};
        margin-left: ${Sizes.spacing2};
`;

const FileField = styled(Field)`
    margin-top: ${Sizes.spacing1};
        margin-bottom: ${Sizes.spacing4};
        margin-left: 0.5.rem;
        padding: 0.5.rem;
        border-radius: 4px;
        background-color: rgba(#31408a, 0.1);
        input {
            background: none;
            margin: 0;
        }
`;

const FileFieldP = styled.p`
    margin-top: ${Sizes.spacing1};
        margin-bottom: ${Sizes.spacing4};
        margin-left: 0.5.rem;
        padding: 0.5.rem;
        border-radius: 4px;
        background-color: rgba(#31408a, 0.1);
        input {
            background: none;
            margin: 0;
        }
`;

const UserContainer = styled.div`
        display: flex;
        align-items: center;
        margin: ${Sizes.spacing1} ${Sizes.spacing2};
        padding: ${Sizes.spacing1} ${Sizes.spacing2};
        border-radius: 4px;
        background-color: rgba(#31408a, 0.1);
        justify-content: space-between;
        > div {
            gap: 2rem;
            display: flex;
            align-items: center;
        }
`;

class PanellInformations extends Component<P, S> {

    constructor(props: P) {
        super(props);
        this.state = {
            data: props.data
        }

        // this.onInputChange = this.onInputChange.bind(this);
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
        newState.correspondants.splice(index, 1);
        this.setState({
            data: newState
        });
    }

    addRow() {
        const newState = this.props.data;
        newState.correspondants.push({
            id: uuid(),
            value: ''
        });
        this.setState({
            data: newState
        });
    }

    onInputChange(val: { value: string, valid?: boolean }, key: _keys, index?: number) {
        this.setState((prevState) => {
            let newVal = prevState.data;
            if (index !== undefined) {
                (newVal[key][index] as any).value = val.value as any;
            } else {
                newVal[key] = val.value as any;
            }
            return {
                data: newVal
            }
        });
    }

    getHourlyFee(isActive: boolean) {
        const value = this.props.data.hourlyFee;
        return <div>
            <p className="header-4 ">Hourly fee</p>
            {isActive
                ? <Field label="Hourly fee" type="string" value={value} onChange={(val: { value: string, valid?: boolean }) => this.onInputChange(val, "hourlyFee")} />
                : <Value>{value || '- no info -'}</Value>
            }
        </div>;
    }
    geTerms(isActive: boolean) {
        const value = this.props.data.terms;
        return <div>
            <p className="header-4 ">Terms & conditions</p>
            <p className="header-sub ">Monthly 10k€ retainer - see with Jeanny Smith</p>
            {isActive
                ? <FileField label="Terms file" type="file" value="" onChange={(val: { value: string, valid?: boolean }) => this.onInputChange(val, "terms")} />
                : <FileFieldP>{value || '- no info -'}</FileFieldP>
            }
        </div>;
    }
    getSP() {
        return <div>
            <p className="header-5 ">Service & projects</p>
            <p className="header-sub ">Corporate M&A and international qcquisitions</p>
        </div>;
    }

    getCorrespondants(isActive: boolean) {
        const value = this.props.data.correspondants;
        const usersEdit = value.map((user, i) => {
            return <UserContainer key={user.id}>
                <div>
                    <Field label="User name" type="string" value={user.value} onChange={(val: { value: string, valid?: boolean }) => this.onInputChange(val, "correspondants", i)} />
                    <Button disabled label="Message" icon={BiMessage} />
                    <Button disabled label="Profile" icon={FaUser} />
                </div>
                <Button iconOnly icon={IoClose} onClick={() => this.removeRow(i)} />
            </UserContainer>;
        });
        const users = value.map((user) => {
            return <UserContainer key={user.id}>
                <div>
                    {user.value || '- no info -'}
                    <Button label="Message" icon={BiMessage} />
                    <Button label="Profile" icon={FaUser} />
                </div><span />
            </UserContainer>;
        });
        return <div>
            <p className="header-5 ">Internal correspondants</p>
            {isActive
                ? <>
                    {usersEdit}
                    <Button label="Add new row" icon={IoAdd} onClick={() => this.addRow()} />
                </>
                : users
            }
        </div>;
    }


    render() {
        return (
            <PanelCont>
                <h3 className="header-3">Panel informations</h3>
                <PanelData>
                    {this.getHourlyFee(this.props.formActive)}
                    {this.geTerms(this.props.formActive)}
                    {this.getSP()}
                    {this.getCorrespondants(this.props.formActive)}
                </PanelData>
            </PanelCont>
        );
    }
}


export default PanellInformations;