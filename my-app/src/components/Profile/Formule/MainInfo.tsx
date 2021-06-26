import { AnyAction, Dispatch } from 'redux';
import React, { Component } from 'react';
import { RiBriefcase4Line, RiNewspaperLine } from "react-icons/ri";
import { VscClose, VscEdit, VscSave } from "react-icons/vsc";

import Button from '../../common/Button/Button';
import Field from '../../common/Field/Field';
import { UserLocal } from '../../../utils/Rest';
import Img from '../../common/Img/Img';
import RestService from '../../../utils/RestService';
import { connect } from 'react-redux';
import { set } from 'lodash';
import { setUser } from '../../../actions/UserActions';
import styled from 'styled-components';
import { Sizes } from '../../../styledHelpers/Sizes';

const MainInfoContainer = styled.div`
    position: relative;
    display: grid;
    align-items: flex-end;
    margin-top: ${Sizes.spacing4};

    grid-template-columns: 7rem 14rem 14rem;
`;

const PhotoContainer = styled.div`
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: flex-start;
        height: 100%;

        img {
            width: 4rem;
            height: 4rem;
            margin-bottom: ${Sizes.spacing1};
            border-radius: 50%;
        }
`;

const PhotoContainerPos = styled.div`
    position: relative;
`;

const Badge = styled.div`
                position: absolute;
                top: 2rem;
                right: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;                
                width: 2rem;
                height: 2rem;
                border: 3px solid rgb(162, 162, 162);
                border-radius: 50%;
                color: white;
                background: #31408a;
`;

const DataStyle = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        margin-left: 1.0rem;
        p {
            margin: 0;
            padding: 0 ${Sizes.spacing2};
            border: 2px solid transparent;
            &.keyInfo {
                font-weight: 600;
            }

            &:not(:last-of-type) {
                margin-bottom: ${Sizes.spacing1};
            }
        }

        .Input {
            &:not(:last-of-type) {
                margin-bottom: ${Sizes.spacing1};
            }
        }
`;

const ProfileButton = styled(Button)`
    height: ${Sizes.spacing4};
`;

const FieldInput = styled(Field)`
    &:not(:last-of-type) {
                margin-bottom: ${Sizes.spacing1};
            }
`;

const EditHeader = styled.div`
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        >div {
            &:not(:last-of-type) {
                margin-right: ${Sizes.spacing2};
            }
        }
`;

interface IField {
    label: string | undefined;
    stateKey: string,
    type: 'string' | 'number' | 'email' | 'dropdown';
    value: string | number | undefined;
    values?: string[]
}

interface DispatchProps {
    setUser: (id: UserLocal) => void
}

type P = {
    profile: UserLocal,
    changeState: Function
} & DispatchProps

type S = {
    profile: UserLocal,
    profileBasicEditMode: boolean,
}

class MainInfo extends Component<P, S> {
    service = new RestService();
    validTemp: any = {};

    constructor(props: P) {
        super(props);
        this.state = {
            profile: { ...props.profile },
            profileBasicEditMode: false
        }

        this.onInputChange = this.onInputChange.bind(this);
        this.editBasics = this.editBasics.bind(this);
        this.saveBasics = this.saveBasics.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }

    componentDidUpdate() {
        if (this.state.profile.id !== this.props.profile.id) {
            this.setState({
                profile: this.props.profile
            })
        }
    }

    editBasics() {
        this.setState({
            profileBasicEditMode: true
        })
    }

    saveBasics() {
        this.setState({
            profileBasicEditMode: false
        }, () => {
            if (this.state.profile) {
                this.props.setUser(this.state.profile)
                this.props.changeState({ profile: this.state.profile });
                this.validTemp = {};
            }
        })
    }

    cancelEdit() {
        this.setState({
            profileBasicEditMode: false,
            profile: { ...this.props.profile }
        });
        this.validTemp = {};
    }

    onInputChange(val: { value: string, valid?: boolean }, key: string) {
        const newKeys = key.split('.');
        this.setState((prevState) => {
            let newVal = prevState;
            if (val.valid !== undefined) {
                this.validTemp[`valid_${key}`] = val.valid;
            }
            set(newVal, newKeys, val.value);

            return newVal;
        });
    }

    createForm(active: boolean, fields: IField[]) {
        if (active) {
            return <form>{fields.map((field, i) =>
                <FieldInput key={`${field}_${i}`} required label={field.label} type={field.type} values={field.values} value={field.value} onChange={(e: { value: string, valid: boolean }) => this.onInputChange(e, field.stateKey)} />
            )}</form>
        }

        return fields.map((field, i) => <p key={`staticField_${i}`} >{field.value}</p>)
    }

    render() {
        const profile = this.state.profile;

        const basic1: IField[] = [{
            label: "Name",
            type: 'string',
            stateKey: 'profile.name',
            value: profile?.name
        }, {
            label: "Company",
            type: 'string',
            stateKey: 'profile.company.name',
            value: profile?.company.name
        }, {
            label: "City",
            type: 'string',
            stateKey: 'profile.address.city',
            value: profile?.address.city
        }, {
            label: "Role",
            type: 'dropdown',
            stateKey: "profile.partner",
            values: ['Partner', 'Contractor'],
            value: profile?.partner || 'Partner'
        }];

        const basic2: IField[] = [{
            label: "Email",
            type: 'email',
            stateKey: 'profile.email',
            value: profile?.email
        }, {
            label: "Phone number",
            type: 'string',
            stateKey: 'profile.phone',
            value: profile?.phone
        }];

        const isSomeInvalid = Object.values(this.validTemp).some(v => v === false);

        return (
            <MainInfoContainer>
                <EditHeader>
                    {this.state.profileBasicEditMode
                        ? <>
                            <Button iconOnly disabled={isSomeInvalid} icon={VscSave} onClick={() => this.saveBasics()} />
                            <Button iconOnly icon={VscClose} onClick={this.cancelEdit} />
                        </>
                        : <Button iconOnly icon={VscEdit} onClick={this.editBasics} />}
                </EditHeader>
                <PhotoContainer>
                    <PhotoContainerPos >
                        <Img src={profile?.photo?.url} alt={profile?.photo?.title} />
                        <Badge>
                            {profile?.partner === "Contractor"
                                ? <RiNewspaperLine />
                                : <RiBriefcase4Line />}
                        </Badge>
                    </PhotoContainerPos>
                    <ProfileButton label={"See profile"} />
                </PhotoContainer>
                <DataStyle>
                    {this.createForm(this.state.profileBasicEditMode, basic1)}
                </DataStyle>
                <DataStyle>
                    {this.createForm(this.state.profileBasicEditMode, basic2)}
                </DataStyle>
            </MainInfoContainer>
        );
    }
}


const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return {
        setUser: (user: UserLocal) => dispatch(setUser(user) as unknown as AnyAction)
    };
};

export default connect(null, mapDispatchToProps)(MainInfo);