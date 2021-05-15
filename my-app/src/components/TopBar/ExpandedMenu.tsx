import { FC } from "react";
import styled from "styled-components";
import { Colors } from "../../styledHelpers/Colors";
import HomeIconPhoto from "../../media/icons/house2.svg";
import ArrowDownIconPhoto from "../../media/icons/arrow-down.svg";
import useDropdown from "react-dropdown-hook";
import PublicationsImage from "../../media/icons/publications.svg";
import PeopleImage from "../../media/icons/people.svg";
import EntitiesImage from "../../media/icons/entities.svg";
import AdministrationImage from "../../media/icons/administration.svg";

const ExpandedMenuContainer = styled.div`
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 85%;
  height: 27px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
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
    width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 3px;
`;

const Filter = styled.input`
    background-color: ${Colors.white};
    border: ${Colors.lightGray} solid 1px;
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
const Category = styled.div`
  color: ${Colors.lightGray};
  font-weight:bold;
`;

const DropDownItem = styled.div`
    display: flex;
    list-style-type: none;
    padding: 5px;
    justify-content: start;
    text-align: center;
`;

const ListImage = styled.img`
    padding-right: 5px;
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
            <Category>Platform</Category>
            <Nav>

              <DropDownItem><ListImage src={HomeIconPhoto} alt="HomeIconPhoto"/>Home</DropDownItem>
              <DropDownItem><ListImage src={PublicationsImage} alt="PublicationsImage"/>Publications</DropDownItem>
              <DropDownItem><ListImage src={PeopleImage} alt="PeopleImage"/>People</DropDownItem>
              <DropDownItem><ListImage src={EntitiesImage} alt="EntitiesImage"/>Entities</DropDownItem>
              <DropDownItem><ListImage src={AdministrationImage} alt="AdministrationImage"/>Administration</DropDownItem>
            </Nav>
            <Category>Workspaces</Category>
            <Nav>
              <DropDownItem><ListImage src={HomeIconPhoto} alt="HomeIconPhoto"/>Client contracts</DropDownItem>
              <DropDownItem><ListImage src={PublicationsImage} alt="PublicationsImage"/>Supplier contract</DropDownItem>
              <DropDownItem><ListImage src={PeopleImage} alt="PeopleImage"/>Corporate</DropDownItem>
              <DropDownItem><ListImage src={EntitiesImage} alt="EntitiesImage"/> Group norms</DropDownItem>
              <DropDownItem><ListImage src={AdministrationImage} alt="AdministrationImage"/>Real estate contracts</DropDownItem>
            </Nav>
          </Container>
        </Dropdown>

      }
    </ExpandedMenuContainer>
  );
};