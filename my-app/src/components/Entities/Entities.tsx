import { AnyAction, Dispatch } from 'redux';
import { BsArrowsAngleContract, BsArrowsAngleExpand, BsGridFill, BsList } from 'react-icons/bs';
import { Dropdown, IDropdownItem } from '../common/DropDown/Dropdown';
import { FaSortAlphaUp, FaSortAlphaUpAlt } from 'react-icons/fa';
import { ISwitcherOption, Switcher } from '../common/Switcher/Switcher';
import { MdMoreHoriz, MdShare } from 'react-icons/md';
import React, { Component } from 'react';
import { VscFeedback, VscFilter, VscRss } from 'react-icons/vsc';

import Button from '../common/Button/Button';
import EntitiesFilters from './EntitiesFilters/EntitiesFilters';
import { IFakeCompany } from '../../utils/Rest';
import { INotification } from '../../reducers/NotificationReducer';
import { IStore } from '../../store';
import Img from '../common/Img/Img';
import RestService from '../../utils/RestService';
import { RiSettings3Line } from 'react-icons/ri'
import Search from '../common/Search/Search';
import Skeleton from '../common/Skeleton/Skeleton';
import { addNotification } from '../../actions/NotificationsActions';
import { connect } from 'react-redux';
import cx from "classnames";
import { sortBy } from 'lodash';
import styles from "./Entities.module.scss";
import { switchFullscreen } from './../../actions/FullscreenActions';

type S = {
    listMode: boolean,
    showOptions: boolean,
    showFilters: boolean,
    searchValue: string,
    sort: number,
    onlyMyEntities: boolean,
    entities: IFakeCompany[] | []
}

interface StateProps {
    isFullscreen: boolean
}

interface DispatchProps {
    addNotification: (notif: INotification) => void,
    switchFullscreen: () => void
}

type P = DispatchProps & StateProps;

class Entities extends Component<P, S> {
    service;

    constructor(props: P) {
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
        this.service.getFakeCompanies().then(entities => {
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

    filterEntities(entities: IFakeCompany[]) {
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
        this.props.addNotification({
            title: `${window.location.href} coppied to clipboard`
        });
    }

    toggleFilters() {
        this.setState((prevState) => {
            return {
                showFilters: !prevState.showFilters
            }
        })
    }

    switchFullscreen() {
        this.props.switchFullscreen();
    }

    getEntitiesUI(entities: IFakeCompany[]) {

        return entities.map((ent, i) => <div key={`entity_${ent.id}`} className={styles.Entity}>
            <Img src={ent.photo?.url} alt={ent.photo?.title} skeletonize className={styles.EntityPhoto} />
            <div className={styles.EntityContent}>
                <h4 className={styles.EntityName}>{ent.name}</h4>
                <p className={styles.EntityAddress}>{ent.address}</p>
            </div>
        </div>);
    }

    render() {
        const { onlyMyEntities, entities, listMode, showOptions, sort, showFilters } = this.state;
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
            label: <div className={styles.dropdownItem}><VscFeedback /> My items</div>,
            value: true
        }, {
            label: <div className={styles.dropdownItem}><VscRss /> All items</div>,
            value: false
        }];
        const fakeDropdown = {
            label: <div className={styles.dropdownItem}><VscFeedback /> All </div>,
            value: true
        }
        const dropdownValue = dropdownItems[dropdownItems.findIndex((v) => v.value === onlyMyEntities)];
        const filteredEntities = this.filterEntities(entities ? [...entities] : []);

        return (
            <section className={styles.Entities}>
                <div className={styles.EntitiesHeader}>
                    <div className={styles.EntitiesHeaderOptions}>
                        <h2 className={styles.title}>Entities</h2>
                        <Button icon={RiSettings3Line} iconOnly onClick={() => this.showOptions()} className={showOptions ? styles.optionsButtonActive : ''} />
                    </div>
                    <Switcher value={listMode} options={switcherOptions} onChange={(val: boolean) => this.changeUI(val)} />
                </div>
                {showOptions && <div className={styles.EntitiesOptions}>
                    <div className={styles.EntitiesOptionsRight}>
                        <Dropdown items={[]} disabled value={fakeDropdown} />
                        <Button icon={MdMoreHoriz} iconOnly />
                        <Button icon={sort === 2 ? FaSortAlphaUpAlt : FaSortAlphaUp} className={sort > 0 ? styles.optionsButtonActive : ''} label="Sort" onClick={() => this.changeSort()} />
                        <Button icon={VscFilter} label="Filters" onClick={() => this.toggleFilters()} className={showFilters ? styles.optionsButtonActive : ''} />
                        <Button icon={!this.props.isFullscreen ? BsArrowsAngleExpand : BsArrowsAngleContract} iconOnly onClick={() => this.switchFullscreen()} />
                        <Button icon={MdShare} label="Share" onClick={() => this.share()} />
                    </div>
                    <div className={styles.EntitiesOptionsRight}>
                        <Search placeholder="Filter by title..." onChange={this.changeSearch} />
                        <Dropdown items={dropdownItems} value={dropdownValue} onChange={this.onDropdownChange} />
                    </div>
                </div>}
                {this.state.showFilters && this.state.showOptions && <EntitiesFilters />}
                <div className={cx(styles.EntitiesContainer, listMode ? styles.EntitiesContainerList : null)}>
                    {!filteredEntities && <Skeleton type="tile" count={30} />}
                    {filteredEntities && filteredEntities.length === 0
                        ? <h4 className={'header-2 header-indent'}>No matches</h4>
                        : filteredEntities && this.getEntitiesUI(filteredEntities)
                    }
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state: IStore) => {
    return {
        isFullscreen: state.FullscreenReducer.isFullscreen
    }
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return {
        switchFullscreen: () => dispatch(switchFullscreen() as unknown as AnyAction),
        addNotification: (notif: INotification) => dispatch(addNotification(notif) as unknown as AnyAction)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Entities);