import { Dropdown, IDropdownItem } from '../../common/DropDown/Dropdown';
import { RiAddFill, RiCloseFill } from 'react-icons/ri';

import Button from '../../common/Button/Button';
import { Component } from 'react';
import Field from '../../common/Field/Field';
import { set } from 'lodash';
import { v4 as uuid } from "uuid";
import styled from "styled-components";
import { Sizes } from '../../../styledHelpers/Sizes';

const EntitiesFiltersContainer = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin-bottom: ${Sizes.spacing2};
    padding: ${Sizes.spacing1};
    border-radius: 4px;
    background: #fff;
    box-sizing: border-box;
    &::after {
        position: absolute;
        top: -8px;
        left: 17.8rem;
        height: 0;
        content: '';
    }
`;

const EntitiesRow = styled.div`
    display: flex;
    margin: 0 ${Sizes.spacing1} ${Sizes.spacing1};
    gap: ${Sizes.spacing2};
`;

const Condition = styled.p`
    color: #31408a;
    margin: 0;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    margin-top: -1px;
`;

interface IFilter {
    id: string,
    type: 'Where' | 'And',
    typeValue: string,
    target: 'Company' | 'Status',
    condition: 'Contains' | 'Is' | 'Ends before',
    entity: string,
    secondCodition?: 'In' | 'Not in',
    date: string
}

type S = {
    filtersList: IFilter[],
    dropdownVal: 'Where' | 'And';
}

class EntitiesFilters extends Component<{}, S> {
    constructor(props: {}) {
        super(props);
        this.state = {
            filtersList: [],
            dropdownVal: 'Where'
        }

        this.onDropdownChange = this.onDropdownChange.bind(this);
        this.addNewFilter = this.addNewFilter.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
    }

    onDropdownChange(value: IFilter['type']) {
        this.setState({
            dropdownVal: value
        })
    }

    onFilterChange(value: { value: string }, key: string, index: number) {
        this.setState((prevState) => {
            const modifiedFilters = prevState.filtersList;
            if (value.value) {
                set(modifiedFilters[index], [key], value.value);
            } else {
                set(modifiedFilters[index], [key], value || value);
            }
            return {
                filtersList: modifiedFilters
            }
        })
    }

    addNewFilter() {
        this.setState((prevState) => {
            const newFilters = prevState.filtersList;
            newFilters.push({
                id: uuid(),
                type: this.state.dropdownVal,
                typeValue: '',
                target: 'Company',
                condition: 'Contains',
                entity: '',
                secondCodition: 'In',
                date: new Date().toDateString()
            });
            return {
                filtersList: newFilters
            }
        })
    }

    removeFilter(index: number) {
        this.setState((prevState) => {
            const newFilters = prevState.filtersList;
            newFilters.splice(index, 1);
            return {
                filtersList: newFilters
            }
        })
    }

    getFilterRows() {
        const targetDropdownItems: IDropdownItem[] = [{
            label: 'Company',
            value: 'Company',
        }, {
            label: 'Status',
            value: 'Status',
        }];

        const conditionDropdownItems: IDropdownItem[] = [{
            label: 'Contains',
            value: 'Contains',
        }, {
            label: 'Is',
            value: 'Is',
        }, {
            label: 'Ends before',
            value: 'Ends before',
        }];

        const secondCoditionDropdown: IDropdownItem[] = [{
            label: 'In',
            value: 'In',
        }, {
            label: 'Not in',
            value: 'Not in',
        }];

        return this.state.filtersList.map((val, i) => <EntitiesRow key={val.id}>
            <Button iconOnly icon={RiCloseFill} onClick={() => this.removeFilter(i)} />
            <Condition>{val.type}</Condition>
            <Dropdown items={targetDropdownItems} value={targetDropdownItems[targetDropdownItems.findIndex((v) => v.value === val.target)]} onChange={(e: { value: string }) => this.onFilterChange(e, 'target', i)} />
            <Dropdown items={conditionDropdownItems} value={conditionDropdownItems[conditionDropdownItems.findIndex((v) => v.value === val.condition)]} onChange={(e: { value: string }) => this.onFilterChange(e, 'condition', i)} />
            {val.condition === 'Contains' && <Field type="string" label="Type..." value={val.typeValue} onChange={(e: { value: string }) => this.onFilterChange(e, 'typeValue', i)} />}
            {val.condition === 'Is' && <>
                <Field type="string" label="Type..." value={val.typeValue} onChange={(e: { value: string }) => this.onFilterChange(e, 'typeValue', i)} />
                <Dropdown items={secondCoditionDropdown} value={secondCoditionDropdown[secondCoditionDropdown.findIndex((v) => v.value === val.secondCodition)]} onChange={(e: { value: string }) => this.onFilterChange(e, 'secondCodition', i)} />
                <Field type="string" label="Entity..." value={val.entity} onChange={(e: { value: string }) => this.onFilterChange(e, 'entity', i)} />
            </>}
            {val.condition === 'Ends before' && <>
                <Field type="date" label="Date..." value={val.entity} onChange={(e: { value: string }) => this.onFilterChange(e, 'date', i)} />
                <Dropdown items={secondCoditionDropdown} value={secondCoditionDropdown[secondCoditionDropdown.findIndex((v) => v.value === val.secondCodition)]} onChange={(e: { value: string }) => this.onFilterChange(e, 'secondCodition', i)} />
                <Field type="string" label="Entity..." value={val.entity} onChange={(e: { value: string }) => this.onFilterChange(e, 'entity', i)} />
            </>}

        </EntitiesRow>)
    }

    getActionRow() {
        const { dropdownVal } = this.state;
        const dropdownItems: IDropdownItem[] = [{
            label: 'Where',
            value: 'Where',
        }, {
            label: 'And',
            value: 'And',
        }];
        const dropdownValue = dropdownItems[dropdownItems.findIndex((v) => v.value === dropdownVal)];

        return <EntitiesRow>
            <Button label="Add filter" icon={RiAddFill} onClick={this.addNewFilter} />
            <Dropdown items={dropdownItems} value={dropdownValue} onChange={this.onDropdownChange} />
        </EntitiesRow>
    }

    render() {
        return (
            <EntitiesFiltersContainer>
                <h5 className="header-4">Rows are <b>not</b> filtered by the following conditions starting from the top</h5>
                {this.getFilterRows()}
                {this.getActionRow()}
            </EntitiesFiltersContainer>
        );
    }
}

export default EntitiesFilters;