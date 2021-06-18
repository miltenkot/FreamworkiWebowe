import { AnyAction, Dispatch } from 'redux';
import { Dropdown, IDropdownItem } from '../common/DropDown/Dropdown';
import React, { Component } from 'react';

import { BiBuildings } from "react-icons/bi";
import Button from '../common/Button/Button';
import { IComment } from '../../utils/Rest';
import { IStore } from '../../store';
import { IoMdPaper } from 'react-icons/io';
import { MdPeopleOutline } from "react-icons/md";
import Pagination from '../common/Pagination/Pagination';
import RestService from '../../utils/RestService';
import { RiSurveyLine } from "react-icons/ri";
import Search from '../common/Search/Search';
import Skeleton from './../common/Skeleton/Skeleton';
import WorkTile from '../common/WorkTile/WorkTile';
import { WorksState } from '../../reducers/WorksReducer';
import { connect } from 'react-redux';
import { worksFetchData } from '../../actions/WorksActions';
import styled from 'styled-components';
import { Sizes } from '../../styledHelpers/Sizes';

const PAGE_SIZE = 10;
const WORKS_LIMIT = 200;

const WorkContainer = styled.div`
    .header  {
        display: flex;
        justify-content: space-between;
        margin-bottom: ${Sizes.spacing3};
    }
    & .actions {
        display: flex;
        align-items: center;
    }
    .buttons {
        display: flex;
        justify-content: flex;
        margin-bottom: ${Sizes.spacing2};
        padding-right: 20px;
        gap: ${Sizes.spacing2};
    }
    .dropdown {
        margin-left: ${Sizes.spacing3};
    }
    & .item {
        display: flex;
        align-items: center;
    }
`;

interface StateProps {
    works: WorksState['works']
}

interface DispatchProps {
    fetchData: (limit: number) => void
}

type P = {
    uselessButtons?: boolean
} & StateProps & DispatchProps
type S = {
    currentPage: number,
    searchValue: string,
    onlyMyWorks: boolean
}

class Work extends Component<P, S> {
    service;
    static defaultProps = {
        uselessButtons: false,
    }
    constructor(props: P) {
        super(props);
        this.service = new RestService();
        this.state = {
            searchValue: '',
            onlyMyWorks: false,
            currentPage: 0
        }
        this.changePage = this.changePage.bind(this);
        this.changeSearch = this.changeSearch.bind(this);
        this.onDropdownChange = this.onDropdownChange.bind(this);
    }

    componentDidMount() {
        this.props.fetchData(WORKS_LIMIT);
    }

    changePage(index: number) {
        this.setState({
            currentPage: index
        })
    }

    changeSearch(val: string) {
        this.setState({
            searchValue: val
        })
    }

    onDropdownChange(value: boolean) {
        this.setState({
            onlyMyWorks: value
        })
    }

    filterRows(works: IComment[]): IComment[] {
        let worksFiltered = [...works];
        if (this.state.searchValue !== '') {
            const filterString = this.state.searchValue.toLowerCase();
            worksFiltered = worksFiltered.filter(v => v.name.toLowerCase().includes(filterString));
        }
        if (this.state.onlyMyWorks) {
            worksFiltered = worksFiltered.filter(v => v.post?.userId === 1);
        }

        return worksFiltered;
    }

    getWorks(filteredWorks: IComment[]) {
        const { works } = this.props;
        const range = this.state.currentPage * PAGE_SIZE;

        return (works && filteredWorks.length > 0
            ? filteredWorks.slice(range, range + PAGE_SIZE).map((work, i) =>
                <WorkTile key={`work_${work.id}`} work={work} />)
            : works.length === 0 && filteredWorks.length === 0
                ? <Skeleton type="work" count={10} />
                : <h4>No matches</h4>);
    }

    render() {
        const { currentPage } = this.state;
        const { works } = this.props;
        const filteredWorks = this.filterRows(works ? [...works] : []);
        const dropdownItems: IDropdownItem[] = [{
            label: <div className="item"> My items</div>,
            value: true
        }, {
            label: <div className="item"> All items</div>,
            value: false
        }];
        const dropdownValue = dropdownItems[dropdownItems.findIndex((v) => v.value === this.state.onlyMyWorks)];

        return (
            <WorkContainer>
                <div className="header">
                    <h2>Latest updates</h2>
                    <div className="actions">
                        <Search placeholder="Filter by title..." onChange={this.changeSearch} />
                        <Dropdown items={dropdownItems} value={dropdownValue} onChange={this.onDropdownChange} />
                    </div>
                </div>
                {this.props.uselessButtons &&
                    <div className="buttons">
                        <Button label="All" theme="#b2bec3" />
                        <Button label="SAS" icon={BiBuildings} theme="#6c5ce7" />
                        <Button label="SARL" icon={BiBuildings} theme="#00cec9" />
                        <Button label="Secondary business" icon={BiBuildings} theme="#ffeaa7" />
                        <Button label="Communities" icon={MdPeopleOutline} theme="#ff7675" />
                        <Button label="POA" icon={IoMdPaper} theme="#d63031" />
                        <Button label="Survey" icon={RiSurveyLine} theme="#fdcb6e" />
                        <Button label="..." theme="#b2bec3" />
                    </div>
                }
                <div >
                    {this.getWorks(filteredWorks)}
                </div>
                <div >
                    {(works && filteredWorks.length > 0) && <Pagination itemsCount={filteredWorks.length} pageSize={PAGE_SIZE} currentPage={currentPage} onChange={this.changePage} />}
                </div>
            </WorkContainer>
        );
    }
}

const mapStateToProps = (state: IStore) => {
    return {
        works: state.works.works,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return {
        fetchData: (id: number) => dispatch(worksFetchData(id) as unknown as AnyAction)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Work);