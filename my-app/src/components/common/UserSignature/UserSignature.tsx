import { AnyAction, Dispatch } from 'redux';
import React, { Component } from 'react';
import { formatDate, getRandomDate } from '../../../utils/dateUtils';

import { BiBuilding } from "react-icons/bi";
import { Store } from '../../../store';
import Img from '../Img/Img';
import { Link } from 'react-router-dom';
import { RiNewspaperLine } from "react-icons/ri";
import { UsersState } from '../../../reducers/UsersReducer';
import { connect } from 'react-redux';
import { usersFetchData } from './../../../actions/UserActions';
import styled from 'styled-components';
import { Sizes } from '../../../styledHelpers/Sizes';

interface StateProps {
    users: UsersState['users']
}

interface DispatchProps {
    fetchData: (id: number) => void
}

type P = {
    onWhiteBg: boolean,
    userId: number,
    type: 'user' | 'company'
} & StateProps & DispatchProps

const UserSignatureCont = styled.div`
    font-size: ${Sizes.spacing3};
    display: flex;
    align-items: center;
    justify-content: flex-start;
    `;

const CompanyCont = styled.div`
    display: flex;
    align-items: center;

    svg {
        margin-right: ${Sizes.spacing1};
    }
`;

const LinkCont = styled(Link)`
display: flex;
align-items: center;
border-radius: 3px;
padding-right: ${Sizes.spacing1};
margin: 0 ${Sizes.spacing1};
.UserAvatar {
    margin: 0 ${Sizes.spacing1};
}

&:hover {
    background: rgba(red, 0.25);
}
`;

const UserAvatarCont = styled(Img)`
width: 15px;
height: 15px;
margin: 0 ${Sizes.spacing2};
border-radius: 50%;

object-fit: cover;
`;

class UserSignature extends Component<P, {}> {

    randomDate = getRandomDate();
    isCompany: boolean = false;

    constructor(props: P) {
        super(props);
        this.props.fetchData(props.userId);
        if (props.type === 'company') {
            this.isCompany = true;
        }
    }

    static defaultProps: P = {
        userId: null,
        onWhiteBg: false,
        type: 'user',
        users: [],
        fetchData: null
    }

    renderComType() {
        if (this.isCompany) {
            return <>
                <CompanyCont >
                    <BiBuilding />
                    <span>Company</span>
                </CompanyCont>
            </>
        }

        return <CompanyCont >
            <RiNewspaperLine />
            <span>Contractor</span>
        </CompanyCont>
    }

    contentSwitch() {
        const { type, userId } = this.props;
        const user = this.props.users.find(v => v.id === userId)?.user;
        if (user) {

            switch (type) {
                case 'user':
                    return <>
                        <time>{formatDate(this.randomDate)}</time>
                        <LinkCont to={`/profile/${userId}`}>
                            <UserAvatarCont skeletonize src={user.photo.thumbnailUrl} alt={`${user.name} avatar`} />
                            <p>{user.name}</p>
                        </LinkCont>
                    </>;
                case 'company':
                    return <>
                        <UserAvatarCont skeletonize src={user.photo.thumbnailUrl} alt={`${user.company.name} logo`} />
                        <p>{user.company.name}</p>
                        {this.renderComType()}
                        <LinkCont to={`/profile/${userId}`}>
                            <time>Updated {formatDate(this.randomDate, true)} by {user.name}</time>
                        </LinkCont>
                    </>;
            }
        }

        return null;
    }


    render() {
        return (
            <UserSignatureCont >
                {this.contentSwitch()}
            </UserSignatureCont>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserSignature);