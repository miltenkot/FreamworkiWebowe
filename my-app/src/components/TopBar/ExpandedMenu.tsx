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
import PrivacyImage from "../../media/icons/privacy.svg";
import SettingsImage from "../../media/icons/settings.svg";

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
padding: 5px;
justyfy-content: space-between;
align-items: center;

    img {
      vertical-align: bottom;
    }

    span {
      margin-left: 10px;
      margin-bottom: 5px;
      vertical-align: center;
      width: 200px;
    }

`;

const ListImage = styled.img`

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

              <DropDownItem><ListImage src={HomeIconPhoto} alt="HomeIconPhoto"/><span>Home</span></DropDownItem>
              <DropDownItem><ListImage src={PublicationsImage} alt="PublicationsImage"/><span>Publications</span></DropDownItem>
              <DropDownItem><ListImage src={PeopleImage} alt="PeopleImage"/><span>People</span></DropDownItem>
              <DropDownItem><ListImage src={EntitiesImage} alt="EntitiesImage"/><span>Entities</span></DropDownItem>
              <DropDownItem><ListImage src={AdministrationImage} alt="AdministrationImage"/><span>Administration</span></DropDownItem>
            </Nav>
            <Category>Workspaces</Category>
            <Nav>
              <DropDownItem><ListImage src={HomeIconPhoto} alt="HomeIconPhoto"/><span>Client contracts</span></DropDownItem>
              <DropDownItem><ListImage src={PublicationsImage} alt="PublicationsImage"/><span>Supplier contract</span></DropDownItem>
              <DropDownItem><ListImage src={PeopleImage} alt="PeopleImage"/><span>Corporate</span></DropDownItem>
              <DropDownItem><ListImage src={EntitiesImage} alt="EntitiesImage"/><span>Group norms</span></DropDownItem>
              <DropDownItem><ListImage src={AdministrationImage} alt="AdministrationImage"/><span>Real estate contracts</span></DropDownItem>
            </Nav>
            <Category>Account</Category>
            <Nav>
              <DropDownItem><ListImage src={HomeIconPhoto} alt="HomeIconPhoto"/><span>Client contracts</span></DropDownItem>
              <DropDownItem><ListImage src={PrivacyImage} alt="PrivacyImage"/><span>Privacy</span></DropDownItem>
              <DropDownItem><ListImage src={SettingsImage} alt="SettingsImage"/><span>Settings</span></DropDownItem>
              </Nav>
          </Container>
        </Dropdown>

      }
    </ExpandedMenuContainer>
  );
};