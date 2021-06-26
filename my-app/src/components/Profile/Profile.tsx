import { AnyAction, Dispatch } from 'redux';
import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { VscClose, VscEdit, VscSave } from 'react-icons/vsc';
import { inputDate, newMomentDate } from '../../utils/dateUtils';

import { BsBriefcase } from "react-icons/bs";
import Button from '../common/Button/Button';
import Fees from './Formule/Fees';
import { FiMessageCircle } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { Profile } from '../../utils/Rest';
import { Store } from '../../store';
import MainInfo from './Formule/MainInfo';
import PanellInformations from './Formule/PanellInformations';
import ProfileDetails from './Formule/ProfileDetails';
import Proposals from './Formule/Proposals';
import RestService from '../../utils/RestService';
import Reviews from './Formule/Reviews';
import { UsersState } from '../../reducers/UsersReducer';
import { connect } from 'react-redux';
import { usersFetchData } from '../../actions/UserActions';
import { v4 as uuid } from "uuid";
import styled from 'styled-components';
import { Sizes } from '../../styledHelpers/Sizes';

const ProfileContainer = styled.section`
    padding: ${Sizes.spacing2} ${Sizes.spacing3};
    color: black;
    border-radius: 4px;
    background: #eaeaea;
    margin-bottom: ${Sizes.spacing4};
`;

const Header = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const ButtonStyled = styled(Button)`
    margin-right: ${Sizes.spacing2};
`;

const ButtonEdit = styled(Button)`
    position: absolute;
        top: 0;
        right: 0;
        display: flex;
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

const Content = styled.div`
    position: relative;
    :global {
        .header-3 {
            margin-bottom: ${Sizes.spacing5};
        }
    }
`;

const StyledHr = styled.hr`
    border-top: 0;
    border-bottom: 1px solid #d3d3d3;
`;

interface ProfileParams {
    userId: number;
}

interface StateProps {
    users: UsersState['users']
}

interface DispatchProps {
    fetchData: (id: number) => void
}
type P = RouteComponentProps & StateProps & DispatchProps;
type S = {
    profileForm: Profile
    profileEdit: boolean
}

class Profiles extends Component<P, S> {
    service = new RestService();
    validTemp: any = {};
    tempProfile: Profile | null = null;
    constructor(props: P) {
        super(props);
        this.state = {
            profileForm: {
                details: {
                    expertise: [{ id: uuid(), value: "Merges and acquisition" }],
                    specialities: [{ id: uuid(), value: "Cross border operation" }, { id: uuid(), value: "Transactions over 500M€/$" }],
                    admissions: [{ id: uuid(), value: "Paris bar association" }, { id: uuid(), value: "Tunisian bar association" }],
                    counties: [{ id: uuid(), value: "Tunisia" }]
                },
                panelInformations: {
                    hourlyFee: "610$/hour (Negociated)",
                    terms: "Attachement_lorem.jpg",
                    correspondants: [{ id: uuid(), value: "Lorem Kowalski" }, { id: uuid(), value: "Ipsum Nowak" }]
                },
                proposals: [{
                    id: uuid(),
                    name: "Operation time",
                    entity: 'Renault Corporation',
                    location: "France",
                    expertise: '#Tax',
                    date: inputDate(newMomentDate('01/20/2018')),
                    firm: 'Racine'
                }, {
                    id: uuid(),
                    name: "Op. Promtech",
                    entity: 'Renault HQ',
                    location: "USA",
                    expertise: '#M&A',
                    date: inputDate(newMomentDate('02/18/2019')),
                    firm: 'Clifford chance'
                }, {
                    id: uuid(),
                    name: "Op. Latandre",
                    entity: 'Renault Breslau',
                    location: "Germany",
                    expertise: '#Social',
                    date: inputDate(newMomentDate('02/18/2019')),
                    firm: 'SVZ'
                }],
                reviews: [{
                    id: uuid(),
                    name: "Operation time",
                    entity: 'Renault Corporation',
                    location: "France",
                    expertise: '#Tax',
                    date: inputDate(newMomentDate('01/20/2018'))
                }, {
                    id: uuid(),
                    name: "Op. Promtech",
                    entity: 'Renault HQ',
                    location: "USA",
                    expertise: '#M&A',
                    date: inputDate(newMomentDate('02/18/2019')),
                }, {
                    id: uuid(),
                    name: "Op. Latandre",
                    entity: 'Renault Breslau',
                    location: "Germany",
                    expertise: '#Social',
                    date: inputDate(newMomentDate('02/18/2019')),
                }],
                fees: [{
                    id: uuid(),
                    year: 2019,
                    costCenter: "CS 153",
                    totalAmount: 3500,
                    firm: "Clifford chance"
                }, {
                    id: uuid(),
                    year: 2018,
                    costCenter: "CS 153",
                    totalAmount: 9500,
                    firm: "Linklaters"
                }, {
                    id: uuid(),
                    year: 2017,
                    costCenter: "CS 47",
                    totalAmount: 10500,
                    firm: "Linklaters"
                }, {
                    id: uuid(),
                    year: 2017,
                    costCenter: "CS 153",
                    totalAmount: 18500,
                    firm: "Linklaters"
                }, {
                    id: uuid(),
                    year: 2017,
                    costCenter: "CS 32",
                    totalAmount: 15500,
                    firm: "Linklaters"
                }]
            },
            profileEdit: false,
        }

        this.getProfile = this.getProfile.bind(this);
        this.changeState = this.changeState.bind(this);
        this.editProfile = this.editProfile.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }

    componentDidMount() {
        const userId = Number((this.props.match.params as ProfileParams).userId);
        this.getProfile(userId);
    }

    componentDidUpdate() {
        const userId = Number((this.props.match.params as ProfileParams).userId);
        const profile = this.props.users.find(v => v.id === userId)?.user;

        if (profile?.id !== userId) {
            this.getProfile(userId);
        }
    }

    getProfile(id: number) {
        this.props.fetchData(id);
    }

    changeState(obj: any) {
        this.setState(obj);
    }

    editProfile() {
        this.tempProfile = JSON.parse(JSON.stringify(this.state.profileForm));
        this.setState({
            profileEdit: true
        })
    }

    cancelEdit() {
        this.setState({
            profileEdit: false,
            profileForm: this.tempProfile as Profile
        }, () => {
            this.tempProfile = null;
        });
    }
    saveProfile() {
        this.setState({
            profileEdit: false
        });
        this.tempProfile = null;
    }

    render() {
        const userId = Number((this.props.match.params as ProfileParams).userId);
        const profile = this.props.users.find(v => v.id === userId)?.user;

        return profile
            ? <ProfileContainer>
                <Header>
                    <ButtonStyled label={"Message"} icon={FiMessageCircle} />
                    <ButtonStyled label={"Create a request"} icon={HiOutlineDocumentText} />
                    <ButtonStyled label={"Add to cluster"} icon={BsBriefcase} />
                </Header>
                <MainInfo profile={profile} changeState={this.changeState}></MainInfo>
                <StyledHr />
                <Content>
                    <EditHeader>
                        {this.state.profileEdit
                            ? <>
                                <ButtonEdit iconOnly disabled={false} icon={VscSave} onClick={() => this.saveProfile()} />
                                <ButtonEdit iconOnly icon={VscClose} onClick={this.cancelEdit} />
                            </>
                            : <ButtonEdit iconOnly icon={VscEdit} onClick={this.editProfile} />}
                    </EditHeader>
                    <ProfileDetails data={this.state.profileForm.details} formActive={this.state.profileEdit} />
                    <StyledHr />
                    <PanellInformations data={this.state.profileForm.panelInformations} formActive={this.state.profileEdit} />
                    <StyledHr />
                    <Proposals data={this.state.profileForm.proposals} formActive={this.state.profileEdit} />
                    <StyledHr />
                    <Reviews data={this.state.profileForm.reviews} formActive={this.state.profileEdit} />
                    <StyledHr />
                    <Fees data={this.state.profileForm.fees} formActive={this.state.profileEdit} />
                </Content>
            </ProfileContainer>
            : <div></div>;
    }
}

const mapStateToProps = (state: Store) => {
    return {
        users: state.users.users,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return {
        fetchData: (id: number) => dispatch(usersFetchData(id) as unknown as AnyAction)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profiles));