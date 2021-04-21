import { FC } from 'react';
import styled from 'styled-components';
import { Wrapper } from '../../styledHelpers/Components';
import { SearchBox } from "./SearchBox";

const Wrapper2 = styled(Wrapper)`
box-sizing:border-box;
padding-top:10px;
padding-bottom:10px;
height:60px;
background-color:white;
box-shadow: 0 0 10px 1px #b6b6b6;
display:flex;
justify-content:space-between;
`;

const CustomImg = styled.img`
    margin:5px;
`;

const LeftSite = styled.div`
`;

const RightSite = styled.div`
`;

const SearchBoxContainer = styled.div`
  width: 40%;
`;

export const TopBar: FC = () => {
    return (
        <Wrapper2>
            <LeftSite>
                <CustomImg src="./media/icons/logo.png" />
                <CustomImg src="./media/icons/house2.png" />
                Home
                <CustomImg src="./media/icons/arrow-down.png" />
            </LeftSite>
            <SearchBoxContainer>
                <SearchBox />
            </SearchBoxContainer>
            <RightSite>
                <CustomImg src="./media/icons/house.png" />
                <CustomImg src="./media/icons/comments.png" />
                <CustomImg src="./media/icons/bell.png" />
            </RightSite>
        </Wrapper2>
    );
}

export default TopBar;