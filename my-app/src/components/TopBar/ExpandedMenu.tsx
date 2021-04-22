import { FC } from "react";
import styled from "styled-components";
import { Colors } from "../../styledHelpers/Colors";
import HomeIconPhoto from "../../media/icons/house.svg";
import ArrowDownIconPhoto from "../../media/icons/arrow-down.svg";

const ExpandedMenuContainer = styled.div`
  height: 27px;
  width: 50%;
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  align-items: center;
  /* border: 1px solid; */
  border-color: ${Colors.LightGray};
  border-radius: 3px;
  padding-right: 3px;
  cursor: pointer;
`;

const HomeIcon = styled.img`
  margin-left: 3px;
`;

const ArrowDown = styled.img`
  height: 6px;
  justify-content: flex-end;
`;

const CategoryName = styled.div`
  font-family: "Open Sans", sans-serif;
  min-width: 54px;
  margin-left: 3px;
  width: 70%;
`;

export const ExpandedMenu: FC = () => {
  return (
    <ExpandedMenuContainer>
      <HomeIcon src={HomeIconPhoto} />
      <CategoryName>Home</CategoryName>
      <ArrowDown src={ArrowDownIconPhoto} />
    </ExpandedMenuContainer>
  );
};