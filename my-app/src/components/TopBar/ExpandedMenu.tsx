import { FC } from "react";
import styled from "styled-components";
import { Colors } from "../../styledHelpers/Colors";
import HomeIconPhoto from "../../media/icons/house.svg";
import ArrowDownIconPhoto from "../../media/icons/arrow-down.svg";
import useDropdown from "react-dropdown-hook";

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

const MenuWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;  
`;

const HomeIcon = styled.img`
  margin-left: 3px;
`;

const Menu = styled.div`
padding: .5em;
flex-grow: 2;
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

const Dropdown = styled.div`
    position: absolute;
    top: 40px;
    background-color: ${Colors.white};
    width: 13%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: ${Colors.black} solid 1px;
    border-top: 0;
    border-radius: 6px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
`;

const Filter = styled.input`
    background-color: ${Colors.white};
    border: ${Colors.black} solid 1px;
    border-radius: 3px;
    margin: .5em;
    padding: 6px 3px;
`;

const Container = styled.div`
    overflow: auto;
    max-height: 300px;
    padding: .5em;
    padding-top: 0;
`;

const Nav = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
`;


export const ExpandedMenu: FC = () => {
  const [wrapperRef, dropDownOpen, toggleDropDown] = useDropdown();

  return (
    <ExpandedMenuContainer>
      <MenuWrapper ref={wrapperRef}>
        <HomeIcon src={HomeIconPhoto} onClick={toggleDropDown} />
        <Menu>
          <CategoryName>Home</CategoryName>
        </Menu>

        <ArrowDown src={ArrowDownIconPhoto} />
      </MenuWrapper>
      {
        dropDownOpen &&
        <Dropdown>
          <Filter type="text" placeholder="Filter..." />
          <Container>
            <Nav>
              <li>Home</li>
              <li>Publications</li>
              <li>People</li>
              <li>Entities</li>
              <li> Administration</li>
            </Nav>
            <li> Workspaces</li>
            <Nav>
              <li>Client contracts</li>
              <li> Supplier contract</li>
              <li> Corporate</li>
              <li> Group norms</li>
              <li> Real estate contracts</li>
            </Nav>
          </Container>
        </Dropdown>

      }
    </ExpandedMenuContainer>
  );
};