import { AnyAction, Dispatch } from 'redux';
import { IoAdd, IoNewspaperOutline } from 'react-icons/io5'
import { IoIosPeople, IoMdPersonAdd } from 'react-icons/io'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import styled from 'styled-components';

import Button from '../../common/Button/Button';
import { FaRegBuilding } from 'react-icons/fa'
import { GiAtom } from 'react-icons/gi'
import { IStore } from './../../../store';
import Img from '../../common/Img/Img';
import { UsersState } from '../../../reducers/UsersReducer';
import { connect } from 'react-redux';
import { usersFetchData } from './../../../actions/UserActions';

import { Colors } from '../../../styledHelpers/Colors';
import { Sizes } from '../../../styledHelpers/Sizes';

const USER_ID = 1;

interface StateProps {
    users: UsersState['users']
}

interface DispatchProps {
    fetchData: (id: number) => void
}

type P = RouteComponentProps & StateProps & DispatchProps;

const UserCardContainer = styled.div`
    display: flex;
    align-items: left;
    flex-direction: column;
    box-sizing: border-box;
    text-align: center;
    width: 13rem;
    padding: ${Sizes.spacing1} ${Sizes.spacing2} ${Sizes.spacing2};
    border-radius: 4px;
    background: ${Colors.white};
    box-shadow: ${Colors.shadow1};

    Link {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100%;
        border-radius: 4px;
    }

    .Picture {
        width: 5rem;
        height: 5rem;
        border-radius: 50%; 
    }

    .Name {
        margin-top: ${Sizes.spacing2};
    }

    .Position {
        margin: 0 0 ${Sizes.spacing3};
    }

    h3 {
        margin-top: ${Sizes.spacing1};
        color: ${Colors.electronBlue}};
        font-weight: normal;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 14px;
    }

    h4 {
        margin: 0 0 ${Sizes.spacing1};
        color: ${Colors.gray};
        font-family: Arial, Helvetica, sans-serif;
        font-size: 12px;
    }

    hr {
        width: calc(100% + 1rem);
        margin-left: -0.5rem;
        border: 0;
        border-top: 1px solid ${Colors.borderWhite};
    }

    svg {
        font-size: 1rem; 
    }
`;


const UserCardButtonsContainer = styled.div`
display: flex;
align-items: center;
width: 100%;
justify-content: space-between;


button {
  color: ${Colors.black};
  justify-content: flex-start;
  padding-left: 0px;
  padding-right: 0px;

  svg {
        font-size: 1rem; 
    }
}

`;

const CenterButton = styled.button`
    position: relative;
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    height: 2rem;
    cursor: pointer;
    transition: color 0.24s, border-color 0.24s;
    color: $active;
    border: 0;
    border-radius: 4px;
    outline: 0;
    background: transparent;
    border: 2px solid transparent;
    width: 100px;
`;

const UserTransparentContainerMain = styled.div`
margin-left: -70px;
`;

const UserTransparentContainer = styled.div`
    display: flex;
    align-items: center;

    button {
        color: ${Colors.black};
        width: 100%;
    }
`;

class UserCard extends Component<P> {

    componentDidMount() {
        this.props.fetchData(1);
    }

    goTo(route: string) {
        this.props.history.push(route);
    }


    render() {
        const user = this.props.users.find((v) => v.id === USER_ID)?.user;

        return (
            <>
                <UserCardContainer>
                    <Link to="/profile/1">
                        <Img skeletonize src={user?.photo?.url} className="Picture" alt="Profile pic" />
                        <h3 className="Name">{user?.name}</h3>
                        <h4 className="Position">Job title - {user?.company?.name}</h4>
                    </Link >
                    <hr />
                    <UserCardButtonsContainer>
                        <Button icon={IoIosPeople} />
                        <CenterButton onClick={() => this.goTo('/404')}>Your network</CenterButton>
                        <Button iconOnly icon={IoMdPersonAdd} border />
                    </UserCardButtonsContainer>
                    <UserCardButtonsContainer>
                        <Button icon={IoNewspaperOutline} />
                        <CenterButton onClick={() => this.goTo('/404')}>Your publications</CenterButton>
                        <Button iconOnly icon={IoAdd} border />
                    </UserCardButtonsContainer>
                </UserCardContainer>
                <UserTransparentContainerMain>
                    <UserTransparentContainer>
                        <Button icon={IoNewspaperOutline} onClick={() => this.goTo('/404')} />
                        <Button label="Publications" onClick={() => this.goTo('/404')}/>
                    </UserTransparentContainer>
                    <UserTransparentContainer>
                        <Button icon={GiAtom} onClick={() => this.goTo('/404')} />
                        <Button label="Ecosystem" onClick={() => this.goTo('/404')}/>
                    </UserTransparentContainer>
                    <UserTransparentContainer>
                        <Button icon={FaRegBuilding} onClick={() => this.goTo('/entities')} />
                        <Button label="Your Entities" onClick={() => this.goTo('/entities')} />
                    </UserTransparentContainer>
                </UserTransparentContainerMain>
            </>
        );
    }
}

const mapStateToProps = (state: IStore) => {
    return {
        users: state.users.users,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return {
        fetchData: (id: number) => dispatch(usersFetchData(id) as unknown as AnyAction)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserCard));