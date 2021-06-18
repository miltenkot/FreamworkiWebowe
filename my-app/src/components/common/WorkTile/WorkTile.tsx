import React, { Component } from 'react';
import { formatDate, getRandomDate } from '../../../utils/dateUtils';

import { IComment } from './../../../utils/Rest';
import UserSignature from './..//UserSignature/UserSignature';
import styled from "styled-components";

const WorkTileContainer = styled.div`
    margin-bottom: 0.5rem;
    margin-right: 50px;
    height: 80px;
    padding: 0.5rem 0.75rem;
    border-radius: 4px;
    background: #fff;
`;

const Name = styled.h3`
    font-size: 1.0rem;
    margin-bottom: 0.25rem;
    color: #31408a;
`;

const Body = styled.p`
    font-size: 0.75rem;
    color: black;
`;

type P = {
    work: IComment,
}

class WorkTile extends Component<P, {}> {

    randomDate = formatDate(getRandomDate());

    render() {
        const { work } = this.props;

        return (
            <WorkTileContainer>
                <div>
                    <Name className='header-3'>{work.name}</Name>
                    <Body>{work.body}</Body>
                    {work?.post && <UserSignature type="company" onWhiteBg userId={work.post.userId} />}
                </div>
            </WorkTileContainer>
        );
    }
}

export default WorkTile;