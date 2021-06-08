import React, { Component } from 'react';
import { formatDate, getRandomDate } from '../../../utils/dateUtils';
import styled from 'styled-components';
import { Colors } from '../../../styledHelpers/Colors';
import { FontSize } from '../../../styledHelpers/FontSizes';
import { Sizes } from '../../../styledHelpers/Sizes';

const PaginationContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;

.Button {
    background: none;
    border: 0;
    color: $info;
    text-transform: uppercase;
    font-weight: 600;
    margin: 0 ${Sizes.spacing2};
    font-size: ${FontSize.icon_rem0_75};   
    transition: 0.24s border;
    border: 2px solid transparent;
    border-radius: 4px;
    cursor: pointer;
    padding: ${Sizes.spacing1} ${Sizes.spacing2};
    &:focus {
        outline: 0;
        border: 2px solid ${Colors.black};
    }

    .Numeric {
        margin: 0 ${Sizes.spacing1};
        margin: 0 ${Sizes.spacing1};
        padding: ${Sizes.spacing1} 0;
        width: 1.5rem;
    }

    &[disabled] {
        color: ${Colors.black};
    }
 }

`;

type P = {
    pageSize: number,
    itemsCount: number,
    currentPage: number,
    onChange: Function
}

class Pagination extends Component<P, {}> {
    randomDate = formatDate(getRandomDate());

    static defaultProps: P = {
        pageSize: 0,
        itemsCount: 0,
        currentPage: 0,
        onChange: () => null as Function
    }

    getButton(index: number) {
        return <button key={`pagin_${index}`}
            disabled={this.props.currentPage === index}
            className={PaginationContainer}
            onClick={() => this.props.onChange(index)}>
            {index + 1}
        </button>;
    }

    componentDidUpdate() {
        // change page to the last, if current page is higher than possible
        if (this.props.currentPage * this.props.pageSize > this.props.itemsCount) {
            const pageCount = Math.ceil(this.props.itemsCount / this.props.pageSize);
            this.props.onChange(pageCount - 1);
        }
    }

    getLayoutType(pageCount: number) {
        let countArr = new Array(pageCount).fill(0);
        countArr = countArr.map((v, i) => i);
        if (pageCount <= 6) {
            return countArr.map((v, i) =>
                this.getButton(v)
            );
        } else {
            return <>
                {this.getButton(0)}
                {this.props.currentPage > 1 && '...'}
                {[...countArr].slice(this.props.currentPage, this.props.currentPage + 3).map((v, i) =>
                    ((v !== 0 && v < pageCount - 1) && this.getButton(v))
                )}
                {pageCount - 5 >= this.props.currentPage && '...'}
                {[...countArr].slice(pageCount - 1).map((v, i) =>
                    (v !== pageCount && this.getButton(v))
                )}
            </>;
        }
    }

    render() {
        const { itemsCount, pageSize, currentPage, onChange } = this.props;
        const pageCount = Math.ceil(itemsCount / pageSize);

        return (
            <PaginationContainer>
                <button disabled={currentPage === 0} className="Button" onClick={() => onChange(currentPage - 1)}>Previous</button>
                {this.getLayoutType(pageCount)}
                <button disabled={pageCount - 1 === currentPage} className="Button" onClick={() => onChange(currentPage + 1)}>Next</button>
            </PaginationContainer>
        );
    }
}

export default Pagination;