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
import cx from 'classnames';
import styles from "./UserCard.module.scss";
import { usersFetchData } from './../../../actions/UserActions';

import LogoImage from "../../../assets/image.jpeg";
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
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    text-align: center;
    width: 13rem;
    padding: ${Sizes.padding2} ${Sizes.padding1} ${Sizes.padding1};
    border-radius: 4px;
    background: ${Colors.white};
    box-shadow: ${Colors.shadow1};

    Link {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100%;
        padding-top: ${Sizes.spacing1}};
        border-radius: 4px;
    }

    Img {
        width: 5rem;
        height: 5rem;
        border-radius: 50%; 
    }

    h3 {
        margin-top: ${Sizes.spacing2};
        color: ${Colors.infoBlue}};
    }

    h4 {
        margin: 0 0 ${Sizes.spacing3};
    }

    hr {
        width: calc(100% + 1rem);
        margin-left: -0.5rem;
        border: 0;
        border-top: 1px solid ${Colors.borderWhite}};
    }
`;

const UserCardButtonsContainer = styled.div`
    display: grid;
    align-items: center;
    width: 100%;
    color: ${Colors.black}

    grid-gap: 0.25rem;
    grid-template-columns: 1fr 2rem;

    Button {
        
        justify-content: flex-start;
        width: 100%;
    }
`;

const UserTransparentContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    width: 13rem;
    padding-top: ${Sizes.spacing3};

    Button {
        color: ${Colors.black}
        justify-content: flex-start;
        width: 100%;
         svg {
                 font-size: 0.75rem;
                 margin-right: ${Sizes.spacing3};
            }
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
                        <Img skeletonize src={LogoImage} alt="Profile pic" />
                        <h3>{'Andrzej Andrzej'}</h3>
                        <h4>Job title - {'Company'}</h4>
                    </Link >
                    <hr/>
                    <UserCardButtonsContainer>
                        <Button label="Your network" icon={IoIosPeople} onClick={() => this.goTo('/404')} />
                        <Button iconOnly icon={IoMdPersonAdd} border />
                        <Button label="Your publications" icon={IoNewspaperOutline} onClick={() => this.goTo('/404')} />
                        <Button iconOnly icon={IoAdd} border />
                    </UserCardButtonsContainer>
                </UserCardContainer>
                <UserTransparentContainer>
                    <Button label="Publications" icon={IoNewspaperOutline} onClick={() => this.goTo('/404')} />
                    <Button label="Ecosystem" icon={GiAtom} onClick={() => this.goTo('/404')} />
                    <Button label="Your Entities" icon={FaRegBuilding} onClick={() => this.goTo('/entities')} />
                </UserTransparentContainer>
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