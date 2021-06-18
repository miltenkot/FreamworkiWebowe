import React, { Component, RefObject } from 'react';
import { formatDate, newMomentDate } from '../../../utils/dateUtils';

import { FiUsers } from "react-icons/fi";
import { IWorkspace } from '../../../utils/Rest';
import { Link } from 'react-router-dom';
import RestService from '../../../utils/RestService';
import { FaFileContract, FaFileArchive, FaFileCode } from 'react-icons/fa';
import styled from "styled-components";

const WorkspaceContainer = styled.section`
    display: flex;
    overflow-x: auto;
    box-sizing: border-box;
    width: 100%;
    padding: 0.5rem;
    gap: 0.75rem;
   
`;

const LinkWithTitle = styled(Link)`
    z-index: 1;
    flex-shrink: 0;
    width: 250px;
    background: #fff;

    >
    div {
            position: relative;
            z-index: 1;
            display: flex;
            overflow: hidden;
            align-items: flex-start;
            justify-content: flex-start;
            width: 100%;
            height: 100%;
            transition: background 0.24s, transform 0.24s;
            border-radius: 4px;
            background: $fff;
        }

        .Logo {
            width: 5rem;
            height: 5rem;
            margin-right: 0.75rem;
            padding: 0.5rem;
            border-radius: 4px;
            background: #fff;
        }
`;

const Title = styled.div`
            display: flex;
            align-items: center;

            >
            h4 {
                color: black;
            }
`;

const BG = styled.div`
            position: absolute;
            z-index: -1;
            top: 0;
            left: 0;
            width: 100%;
            height: 80px;
            background-size: cover;
            
`;

const Content = styled.div`
            display: block;
            box-sizing: border-box;
            width: 100%;
            height: auto;
            margin-top: 3rem;
            padding: 0.5rem;
            color: gray;
            

            >
            time {
                font-size: 0.70rem;
                color: grey;
            }
`;

const Info = styled.div`
       font-size: 0.85rem;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin: 0.5rem 0;
            color: grey;
            >
            svg {
                margin-right: 0.5rem;
            }
`;

const Seperator = styled.div`
                width: 4px;
                height: 4px;
                margin: 0 0.5rem;
                border-radius: 2px;
                background: #a2a2a2
`;

type S = {
    workspaces: Array<IWorkspace> | null
}


class WorkspacesSlider extends Component<{}, S> {
    slider: RefObject<HTMLDivElement> = React.createRef();
    pos = { top: 0, left: 0, x: 0, y: 0, inMove: false };
    constructor(props: {}) {
        super(props);
        this.state = {
            workspaces: null
        }

        this.mouseDownHandler = this.mouseDownHandler.bind(this);
        this.mouseClickHandler = this.mouseClickHandler.bind(this);
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
        this.mouseUpHandler = this.mouseUpHandler.bind(this);
    }

    componentDidMount() {
        const service = new RestService();
        this.setState({
            workspaces: service.getWorkspaces()
        })
        this.slider.current?.addEventListener('mousedown', this.mouseDownHandler);
        this.slider.current?.addEventListener('click', this.mouseClickHandler);
    }

    componentWillUnmount() {
        this.slider.current?.removeEventListener('mousedown', this.mouseDownHandler);
        this.slider.current?.removeEventListener('click', this.mouseClickHandler);
    }

    mouseClickHandler(e: MouseEvent) {
        if (this.pos.inMove) {
            e.preventDefault();
            e.stopPropagation();
        }
    }

    mouseDownHandler(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        const ele = this.slider.current as HTMLDivElement;
        this.pos.left = ele.scrollLeft;
        this.pos.top = ele.scrollTop;
        this.pos.x = e.clientX;
        this.pos.y = e.clientY;


        document.addEventListener('mousemove', this.mouseMoveHandler);
        document.addEventListener('mouseup', this.mouseUpHandler);
    };

    mouseMoveHandler(e: MouseEvent) {
        this.pos.inMove = true;
        const ele = this.slider.current as HTMLDivElement;
        const dx = e.clientX - this.pos.x;
        const dy = e.clientY - this.pos.y;
        ele.scrollTop = this.pos.top - dy;
        ele.scrollLeft = this.pos.left - dx;
    };

    mouseUpHandler(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        document.removeEventListener('mousemove', this.mouseMoveHandler);
        document.removeEventListener('mouseup', this.mouseUpHandler);

        setTimeout(() => {
            this.pos.inMove = false;
        }, 0);
    };

    getLogo(type: IWorkspace['type']) {
        let Icon;
        switch (type) {
            case 'Contract': Icon = FaFileContract; break;
            case 'Corporate': Icon = FaFileArchive; break;
            case 'Norms': Icon = FaFileCode; break;
            default: Icon = FaFileArchive; break;
        }
        return FaFileContract && <Icon className={'Logo'} />;
    }

    getIcon(type: IWorkspace['type']) {
        let Icon;
        switch (type) {
            case 'Contract': Icon = FaFileContract; break;
            case 'Corporate': Icon = FaFileArchive; break;
            case 'Norms': Icon = FaFileCode; break;
            default: Icon = FaFileArchive; break;
        }
        return FaFileContract && <Icon />;
    }

    getWorkspaceTile(work: IWorkspace) {
        return <LinkWithTitle to={`/workspace/${work.id}`} key={`ws_${work.id}`}>
            <div>
                <BG style={{ backgroundImage: `url(${work.background})` }}></BG>
                <Content>
                    <Title>
                        {this.getLogo(work.type)}
                        <h4>{work.title}</h4>
                    </Title>
                    <Info>
                        {this.getIcon(work.type)}
                        <span>{work.type}</span>
                        <Seperator />
                        <FiUsers />
                        <span>{work.users} users</span>
                    </Info>
                    <time>Last update {formatDate(newMomentDate(work.lastUpdate), true)}</time>
                </Content>
            </div>
        </LinkWithTitle>
    }

    render() {
        const { workspaces } = this.state;
        return (<>
            <h2 className={'header-2'}>Workspaces</h2>
            <WorkspaceContainer ref={this.slider}>
                {workspaces?.map((ws) => this.getWorkspaceTile(ws))}
            </WorkspaceContainer>
        </>);
    }
}

export default WorkspacesSlider;