import { ImBell, ImBubbles, ImHome } from "react-icons/im";
import React, { Component } from 'react';

import ActionButton from '../../common/ActionButton/ActionButton';
import styled from "styled-components";


const NavbarAction = styled.div`
display: flex;
align-items: center;
justify-content: center;
}
`;

class NavbarActions extends Component {
    render() {
        return (
            <>
                <NavbarAction>
                    <ActionButton icon={ImHome} disabled />
                    <ActionButton icon={ImBubbles} />
                    <ActionButton icon={ImBell} />
                </NavbarAction>
            </>
        );
    }
}

export default NavbarActions;