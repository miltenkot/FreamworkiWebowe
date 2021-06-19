import React, { Component } from 'react';
import { formatDate, getRandomDate } from '../../../utils/dateUtils';

import { IComment } from './../../../utils/Rest';
import UserSignature from './..//UserSignature/UserSignature';
import styled from "styled-components";
import { Sizes } from '../../../styledHelpers/Sizes';

const WorkTileContainer = styled.div`
    margin-bottom: ${Sizes.spacing2};
    margin-right: 50px;
    height: 80px;
    padding: ${Sizes.spacing2} ${Sizes.spacing3};
    border-radius: 4px;
    background: #fff;
`;

const Name = styled.h3`
    font-size: 1.0rem;
    margin-bottom: ${Sizes.spacing1};
    color: #31408a;
`;

const Body = styled.p`
    font-size: ${Sizes.spacing3};
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