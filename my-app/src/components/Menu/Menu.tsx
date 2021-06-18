import React from 'react';

import UserCard from "./UserCard/UserCard";
import styled from 'styled-components';
import { Sizes } from '../../styledHelpers/Sizes';

const MenuContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-shrink: 0;
    justify-content: flex-start;
    width: 15rem;
    padding-top: ${Sizes.spacing3};
`;

const Menu = () =>  {
        return (
            <MenuContainer>
                <UserCard />
            </MenuContainer>
        );
}

export default Menu;