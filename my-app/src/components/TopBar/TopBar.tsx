import { FC } from 'react';
import styled, { css } from 'styled-components';
import { SearchBox } from "./SearchBox";
import LogoImage from "../../media/icons/logo.png";
import HouseImage from "../../media/icons/house.svg";
import CommentsImage from "../../media/icons/comments.png";
import BellImage from "../../media/icons/bell.png";
import { ExpandedMenu } from "./ExpandedMenu";
import { Wrapper } from "../../styledHelpers/Components";
import { Colors } from '../../styledHelpers/Colors';

const MainContainer = styled(Wrapper)`
display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background: ${Colors.white};
  width: 100%;
  height: 40px;
  display: flex;
  box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.2);
`;

const InnerWrapper = styled.div`
  width: 100%;
  padding: 5px 20px;
  background: ${Colors.white};
  display: flex;
  justyfy-content: space-between;
  align-items: center;
`

const Logo = styled.img`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 30px;
  height: 30px;
  margin: 3px;
  padding-right: 20px;
`;

const CustomImg = styled.img`
    margin:10px;
`;

const ImgBackground = styled.div<{ showBG: boolean }>`
  ${props => props.showBG && css`
    background: ${Colors.Gray};
    border-radius: 60%;
    margin-left: 15px;
    width: 40px;
    height: 40px;
  `}
`

const RightSite = styled.div`
  display: inline-flexbox;
  justify-content: center;
  align-items: center;
  padding-left: 400px;
`;

const SearchBoxContainer = styled.div`
  width: 30%;
`;

const ExpandedMenuContainer = styled.div`
  width: 30%;
`;

export const TopBar: FC = () => {
  return (
    <MainContainer>
      <InnerWrapper>
        <Logo src={LogoImage} />
        <ExpandedMenuContainer>
          <ExpandedMenu />
        </ExpandedMenuContainer>
        <SearchBoxContainer>
          <SearchBox />
        </SearchBoxContainer>
        <RightSite>
          <CustomImg src={HouseImage} />
          <ImgBackground showBG>
            <CustomImg src={CommentsImage} />
          </ImgBackground>
          <ImgBackground showBG>
            <CustomImg src={BellImage} />
          </ImgBackground>
        </RightSite>
      </InnerWrapper>
    </MainContainer>
  );
}

export default TopBar;