import { BsArrowsAngleExpand, BsGridFill, BsList } from 'react-icons/bs';
import { Dropdown, IDropdownItem } from '../common/DropDown/Dropdown';
import { FaSortAlphaUp, FaSortAlphaUpAlt } from 'react-icons/fa';
import { ISwitcherOption, Switcher } from '../common/Switcher/Switcher';
import { MdMoreHoriz, MdShare } from 'react-icons/md';
import React, { Component } from 'react';
import { VscFilter } from 'react-icons/vsc';

import Button from '../common/Button/Button';
import EntitiesFilters from './EntitiesFilters/EntitiesFilters';
import { FCompany } from '../../utils/Rest';
import Img from '../common/Img/Img';
import RestService from '../../utils/RestService';
import Search from '../common/Search/Search';
import Skeleton from '../common/Skeleton/Skeleton';
import { sortBy } from 'lodash';
import styled from "styled-components";
import { Sizes } from '../../styledHelpers/Sizes';

const EntitiesSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding-bottom: ${Sizes.spacing4};
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: ${Sizes.spacing3};
`;

const Options = styled.div`
    display: flex;
    align-items: center;
    color: black;
`;

const Title = styled.h2`
    font-size: ${Sizes.spacing4};
    margin: 0;
    margin-right: ${Sizes.spacing2};
`;

const EntitiesContainer = styled.div`
        display: grid;
        width: 100%;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: ${Sizes.spacing2};

        &.EntitiesContainerList {
            display: flex;
            flex-direction: column;
        }
`;

const Entity = styled.div`
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: ${Sizes.spacing2};
        border-radius: 4px;
        background: #fff;
`;

const Photo = styled(Img)`
    height: 4rem;
    width: 4rem;
    border-radius: 4px;
    flex-shrink: 0;
`;

const Content = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    margin-left: ${Sizes.spacing3};
`;

const Name = styled.h4`
    font-size: ${Sizes.spacing4};
    margin: 0;
    color: #31408a;
`;

const Adress = styled.p`
    font-size: ${Sizes.spacing3};
    margin: 0;
    color: rgb(162, 162, 162);
`;

const RightOption = styled.div`
    display: flex;
    gap: ${Sizes.spacing2};

    button {
        &.OptionButtonActive {
            background: rgba(#31408a, 0.4); 
        }
    }
`;

const DropDownItem = styled.div`
    display: flex;
    align-items: center;
    svg {
        flex-shrink: 0;
        margin-right: ${Sizes.spacing2};
    }
`;

type S = {
    listMode: boolean,
    showOptions: boolean,
    showFilters: boolean,
    searchValue: string,
    sort: number,
    onlyMyEntities: boolean,
    entities: FCompany[] | []
}

interface StateProps {
    isFullscreen: boolean
}

class Entities extends Component<StateProps, S> {
    service;

    constructor(props: StateProps) {
        super(props);
        this.service = new RestService();
        this.state = {
            listMode: false,
            showOptions: false,
            showFilters: false,
            entities: [],
            searchValue: '',
            sort: 0,
            onlyMyEntities: false
        }

        this.changeUI = this.changeUI.bind(this);
        this.showOptions = this.showOptions.bind(this);
        this.changeSearch = this.changeSearch.bind(this);
        this.onDropdownChange = this.onDropdownChange.bind(this);
        this.changeSort = this.changeSort.bind(this);
    }

    componentDidMount() {
        this.getEntities();
    }


    getEntities() {
        this.service.getCompanies().then(entities => {
            this.setState({
                entities: entities
            })
        });
    }

    changeUI(isList: boolean) {
        this.setState({
            listMode: isList
        })
    }

    changeSearch(val: string) {
        this.setState({
            searchValue: val
        })
    }

    onDropdownChange(value: boolean) {
        this.setState({
            onlyMyEntities: value
        })
    }

    showOptions() {
        this.setState((prevState) => {
            return {
                showOptions: !prevState.showOptions
            }
        });
    }


    changeSort() {
        this.setState((prevState) => {
            let sort = prevState.sort.valueOf();
            if (prevState.sort < 2) {
                sort++;
            } else {
                sort = 0;
            }
            return {
                sort: sort
            }
        });
    }

    filterEntities(entities: FCompany[]) {
        if (entities.length === 0) {
            return null;
        }
        let entitiesFilterd = [...entities];
        if (this.state.searchValue !== '') {
            const filterString = this.state.searchValue.toLowerCase();
            entitiesFilterd = entitiesFilterd.filter(v => v.name.toLowerCase().includes(filterString));
        }
        if (this.state.onlyMyEntities) {
            entitiesFilterd = entitiesFilterd.filter(v => v.photo?.id === 1);
        }
        if (this.state.sort) {
            entitiesFilterd = sortBy(entitiesFilterd, 'name');
            if (this.state.sort === 2) {
                entitiesFilterd = entitiesFilterd.reverse();
            }
        }
        return entitiesFilterd;
    }

    share() {
        navigator.clipboard.writeText(window.location.href);
    }

    toggleFilters() {
        this.setState((prevState) => {
            return {
                showFilters: !prevState.showFilters
            }
        })
    }

    getEntitiesUI(entities: FCompany[]) {

        return entities.map((ent, i) => <Entity key={`entity_${ent.id}`}>
            <Photo src={ent.photo?.url} alt={ent.photo?.title} skeletonize />
            <Content>
                <Name>{ent.name}</Name>
                <Adress>{ent.address}</Adress>
            </Content>
        </Entity>);
    }

    render() {
        const { onlyMyEntities, entities, listMode, sort, showFilters } = this.state;
        const switcherOptions: ISwitcherOption[] = [{
            label: 'Mosaic',
            value: false,
            icon: BsGridFill
        }, {
            label: 'List',
            value: true,
            icon: BsList
        }];
        const dropdownItems: IDropdownItem[] = [{
            label: <DropDownItem>My items</DropDownItem>,
            value: true
        }, {
            label: <DropDownItem>All items</DropDownItem>,
            value: false
        }];
        const fakeDropdown = {
            label: <DropDownItem>All</DropDownItem>,
            value: true
        }
        const dropdownValue = dropdownItems[dropdownItems.findIndex((v) => v.value === onlyMyEntities)];
        const filteredEntities = this.filterEntities(entities ? [...entities] : []);

        return (
            <EntitiesSection>
                <Header>
                    <RightOption>
                        <Title>Entities</Title>
                    </RightOption>
                    <Switcher value={listMode} options={switcherOptions} onChange={(val: boolean) => this.changeUI(val)} />
                </Header>
                {<Options>
                    <RightOption>
                        <Dropdown items={[]} disabled value={fakeDropdown} />
                        <Button icon={MdMoreHoriz} iconOnly />
                        <Button icon={sort === 2 ? FaSortAlphaUpAlt : FaSortAlphaUp} className={sort > 0 ? 'OptionButtonActive' : ''} label="Sort" onClick={() => this.changeSort()} />
                        <Button icon={VscFilter} label="Filters" onClick={() => this.toggleFilters()} className={showFilters ? 'OptionButtonActive' : ''} />
                        <Button icon={BsArrowsAngleExpand} iconOnly />
                        <Button icon={MdShare} label="Share" onClick={() => this.share()} />
                    </RightOption>
                    <RightOption>
                        <Search placeholder="Filter by title..." onChange={this.changeSearch} />
                        <Dropdown items={dropdownItems} value={dropdownValue} onChange={this.onDropdownChange} />
                    </RightOption>
                </Options>}
                {this.state.showFilters && <EntitiesFilters />}
                <EntitiesContainer className={listMode ? 'EntitiesContainerList' : null}>
                    {!filteredEntities && <Skeleton type="tile" count={30} />}
                    {filteredEntities && filteredEntities.length === 0
                        ? <h4 className={'header-2 header-indent'}>No matches</h4>
                        : filteredEntities && this.getEntitiesUI(filteredEntities)
                    }
                </EntitiesContainer>
            </EntitiesSection>
        );
    }
}

export default Entities;