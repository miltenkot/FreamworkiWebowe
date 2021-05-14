import { FC } from "react";
import styled from "styled-components";
import { Colors } from "../../styledHelpers/Colors";
import SearchImage from "../../media/icons/search.png";

const SearchBoxContainer = styled.div`
  flex-direction: row;
  align-items: center;
  border: 1px solid;
  border-color: ${Colors.gray};
  border-radius: 3px;
  margin: 3px;
`;

const SearchQuery = styled.div`
  height: 21px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  color: ${Colors.lightGray};
  margin: 3px;
`;

const Gap = styled.div`
  display: flex;
  width: 1px;
`;
const Search = styled.div`
  display: flex;`

const Input = styled.input`
  text-align: left;
  justify-content: left;
  border: none;
  border-radius: 3px;
  ::placeholder {
    color: ${Colors.lightGray};
  }
  &:focus {
        outline: none;
        /* box-shadow: 0px 0px 2px red; */
    }
`;

const CustomImg = styled.img`
    margin:5px;
`;

export const SearchBox: FC = () => {
  return (
    <SearchBoxContainer>
      <SearchQuery>
        <Gap />
        <Search>
          <Input
            type="text"
            placeholder="Search Legalcluster"
          />
        </Search>
        <CustomImg src={SearchImage} />
      </SearchQuery>
    </SearchBoxContainer>
  );
};