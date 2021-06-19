import React, { Component, ReactElement, RefObject } from "react";
import { UsersState } from "../../../reducers/UsersReducer";
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { ImHome } from 'react-icons/im';
import { FaNewspaper } from 'react-icons/fa';
import { BsFillPeopleFill } from 'react-icons/bs';
import { FaBuilding, FaFileContract, FaUserLock } from 'react-icons/fa';
import { RiAdminFill } from 'react-icons/ri';
import { FiBook } from 'react-icons/fi';
import { RiUserSettingsFill } from 'react-icons/ri';
import Img from '../../common/Img/Img';
import { MdArrowDropDown } from 'react-icons/md';
import { AnyAction, Dispatch } from 'redux';
import Search from '../../common/Search/Search';
import Button from '../../common/Button/Button';
import { FiLogOut } from 'react-icons/fi';
import { Store } from '../../../store';
import { connect } from 'react-redux';
import { usersFetchData } from '../../../actions/UserActions';
import styled from 'styled-components';
import { Sizes } from '../../../styledHelpers/Sizes';

const DropDMenuBtn = styled.button`
    font-size: 0.85rem;
    position: relative;
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: space-between;
    min-width: 14rem;
    height: 2rem;
    padding: ${Sizes.spacing1} ${Sizes.spacing2};
    cursor: pointer;
    color: #31408a;
    outline: 0;
    background: transparent;
    border: transparent;

    
    svg {
        font-size: ${Sizes.spacing4};
        flex-shrink: 0;
        flex-shrink: 0;
        margin-left: ${Sizes.spacing1};
        color: black;
    }

    &.open {
        border-color: black;
        border-bottom-color: transparent;
        border-radius: 4px 4px 0 0;
    }
`;

const Container = styled.div`
    position: relative;
    margin-left: ${Sizes.spacing4};;
`;

const LinkWithDisable = styled(Link)`
    &.disabled {
        background: #f2f2f2;
    }

    &.item {
        display: flex;
        align-items: center;
        width: auto;
        padding: ${Sizes.spacing1};
        cursor: pointer;
        color: black;
        border: 0;
        border-radius: 4px;
        background: none;
        &:hover,
        &:focus {
            outline: 0;
            background: rgba(#31408a, 0.1);
        }
       

        &.disabled {
            pointer-events: none;
        }

        >
        div {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            
        }
    }
`;

const Description = styled.span`
    font-size: ${Sizes.spacing3};
    color: #31408a;
`;

const ImageWithPhoto = styled(Img)`
    width: 1.5rem;
        height: 1.5rem;
        margin-right: ${Sizes.spacing3};
        border-radius: 50%;
`;

const Section = styled.div`
    padding: ${Sizes.spacing1};
`;

const Values = styled.div`
        font-size: ${Sizes.spacing4};
        position: absolute;
        z-index: 1;
        right: 0;
        left: 0;
        color: #31408a;
        border-top: 0;
        border-radius: 0 0 4px 4px;
        background: #fff;

        backdrop-filter: blur(4px);

        :global {
            .header-4 {
                margin-bottom: 0;
            }
        }

        hr {
            margin: 0;
            border: 0;
        }
`;

const SearchStyled = styled(Search)`
    margin: ${Sizes.spacing1} ${Sizes.spacing1} 0;
`;

const ValuesContainer = styled.div`
        overflow-y: auto;
        max-height: 16rem;
`;

const LogoutButton = styled(Button)`
    color: grey;
    width: 100%;
`;

const Seperator = styled.div`
    padding-left: 20px;
    justify-content: center;
    text-align: right;
`;


interface IMenuItem {
    title: string,
    items: {
        name: string,
        description?: string,
        icon: ReactElement,
        route: string
    }[]
}

interface StateProps {
    users: UsersState['users']
}

interface DispatchProps {
    fetchData: (id: number) => void
}

type P = RouteComponentProps & StateProps & DispatchProps;

type S = {
    isListOpen: boolean,
    searchValue: string
}

class DropdownMenu extends Component<P, S>{
    ripple: RefObject<HTMLSpanElement> = React.createRef();

    constructor(props: P) {
        super(props);
        this.state = {
            isListOpen: false,
            searchValue: ''
        }

        this.onClick = this.onClick.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this);
        this.changeSearch = this.changeSearch.bind(this);
    }

    componentDidMount() {
        this.props.fetchData(1);
    }

    changeSearch(val: string) {
        this.setState({
            searchValue: val
        })
    }

    onClick(ev: React.MouseEvent) {
        this.setState((prevState) => {
            return {
                isListOpen: !prevState.isListOpen
            }
        });
    }

    closeDropdown() {
        this.setState({
            isListOpen: false
        });
    }

    getMenuItem(item: IMenuItem['items'][0] | null, disabled = false) {
        if (item) {
            const Icon = item.icon;
            return <LinkWithDisable key={`item_${item.name}`} className={`${disabled ? 'disabled' : null} ${'item'}`} to={disabled ? '#' : item.route} onClick={this.closeDropdown}>
                {Icon}
                <Seperator>
                    <span>{item.name}</span>
                    {item.description && <Description>{item.description}</Description>}
                </Seperator>
            </LinkWithDisable>;
        }
    }

    filterEntities(items: IMenuItem[]) {
        let itemsFilterd = [...items];
        if (this.state.searchValue !== '') {
            const filterString = this.state.searchValue.toLowerCase();
            itemsFilterd = itemsFilterd.map((element) => {
                return { ...element, items: element.items.filter((ele) => ele.name.toLowerCase().includes(filterString)) }
            })
        }

        return itemsFilterd;
    }
    render() {
        const user = this.props.users.find((v) => v.id === 1)?.user;

        const menuItems: IMenuItem[] = [{
            title: "Platform",
            items: [{
                name: 'Home',
                icon: <ImHome />,
                route: '/'
            }, {
                name: 'Publications',
                icon: <FaNewspaper />,
                route: '/publications'
            }, {
                name: 'People',
                icon: <BsFillPeopleFill />,
                route: '/people'
            }, {
                name: 'Entities',
                icon: <FaBuilding />,
                route: '/entities'
            }, {
                name: 'Administration',
                icon: <RiAdminFill />,
                route: '/admin'
            }]
        }, {
            title: "Workspaces",
            items: [{
                name: 'Client contract',
                icon: <FaFileContract />,
                route: '/clientcontract'
            }, {
                name: 'Supplier contract',
                icon: <FaFileContract />,
                route: '/supplier'
            }, {
                name: 'Corporate',
                icon: <FaBuilding />,
                route: '/corpo'
            }, {
                name: 'Group norms',
                icon: <FiBook />,
                route: '/groupnorms'
            }, {
                name: 'Real Estate contracts',
                icon: <FaFileContract />,
                route: '/realestate'
            }]
        }];
        const accountItems = {
            title: "Account",
            items: [{
                name: user?.name || '',
                description: 'See profile',
                icon: <ImageWithPhoto src={user?.photo?.thumbnailUrl} />,
                route: '/profile/1'
            }, {
                name: 'Privacy',
                icon: <FaUserLock />,
                route: '/privacy'
            }, {
                name: 'Settings',
                icon: <RiUserSettingsFill />,
                route: '/settings'
            }]
        };

        const items = this.filterEntities(menuItems).map((item, i) => <>
            <h4 key={`menuOpt_h_${i}`} className="header-4">{item.title}</h4>
            <Section key={`menuOpt_${i}`}>
                {item.items.length
                    ? item.items.map((el) => this.getMenuItem(el))
                    : <p className="header-4 header-indent">No matches</p>
                }
            </Section></>);

        const accItem = <>
            <h4 className="header-4">{accountItems.title}</h4>
            <Section key={`menuOpt_acc`}>
                {accountItems.items.map((el) => this.getMenuItem(el))}
            </Section>
        </>;

        const activeItem = [...menuItems, accountItems].map(v => v.items).flat().find(v => v.route === this.props.location.pathname) || {
            name: 'Home',
            icon: <ImHome />,
            route: '/404'
        };

        return (
            <Container >
                <DropDMenuBtn type="button" className={this.state.isListOpen ? 'open' : null} onClick={(ev) => this.onClick(ev)}>
                    {this.getMenuItem(activeItem, true)} <MdArrowDropDown />
                </DropDMenuBtn>
                {this.state.isListOpen &&
                    <Values>
                        <SearchStyled placeholder="Filter..." onChange={this.changeSearch} />
                        <ValuesContainer>
                            {items}
                        </ValuesContainer>
                        <hr />
                        {accItem}
                        <hr />
                        <LogoutButton label="Logout" icon={FiLogOut} onClick={() => {
                            this.props.history.push('/404');
                            this.closeDropdown()
                        }} />
                    </Values>
                }
            </Container>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DropdownMenu));