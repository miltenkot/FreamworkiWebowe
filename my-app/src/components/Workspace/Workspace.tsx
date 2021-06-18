import { FaCalendarAlt, FaRegBuilding } from 'react-icons/fa';
import { Link, RouteComponentProps } from 'react-router-dom';
import React, { Component } from 'react';

import Button from '../common/Button/Button';
import { VscSymbolStructure } from 'react-icons/all';
import { IWorkspace } from '../../utils/Rest';
import Img from '../common/Img/Img';
import RestService from '../../utils/RestService';
import { RiSettings3Line } from 'react-icons/ri';
import Work from '../Work/Work';
import { FaFileContract, FaFileArchive, FaFileCode } from 'react-icons/fa';
import styled from 'styled-components';

const WorkspaceSection = styled.section`
        position: relative;
        padding-top: 0.75rem;
        color: black;

        h3 {
            display: flex;
            justify-content: space-between;
            color: gray;
            font-weight: bold;
            margin-top: 10px; 
        }

        .Head {
            overflow: hidden;
            padding: 0;
            border-radius: 4px;
            background: #fff;
            box-shadow: 0 2px 6px rgba(91,94,106,0.3);}
`;

const BannerImage = styled(Img)`
            width: 100%;
            height: 200px;
            margin-bottom: 0.5rem;
            object-fit: cover;
`;

const HeadInfo = styled.div`
        position: relative;
        display: flex;
        align-items: center;
        padding: 0.75rem;
        background: white;

        .tileLogo {
                    font-size: 5rem;
                    margin-right: 0.5rem;
                    color: gray;
                }
 `;

const TilesContainer = styled.div`
        display: grid;
        box-sizing: border-box;
        transition: max-height 0.24s;

        grid-template-columns: 1fr 1fr 1fr;
        gap: 0.75rem;
        max-height: 20rem;
        &[hidden] {
            overflow: hidden;
            max-height: 0;
        }


 `;

const Content = styled.div`
    p {
        font-size: 1rem;
        margin-top: 0.5rem;
        margin-bottom: 10;
        color: grey;
    }

    h2 {
        color: black;
        justify-content: space-between;
        display: flex;
        align-items: center;

        Button {
            color: grey;
            justify-content: space-between;
        }
    }
`;

const TileTitle = styled.h2`
        font-size: 1rem;
                font-weight: 500;
`;

const TileDesc = styled.p`
    font-size: 0.75rem;
`;

const ButtonWithHide = styled(Button)`
    position: absolute;
    top: 0;
    right: 0.75rem;
    color: gray;
    font-weight: bold;

`;

const TiledLink = styled(Link)`
            position: relative;
            overflow: hidden;
            padding: 0.75rem 0.5rem;
            color: black;
            border-radius: 4px;
            background: #fff;
            box-shadow: 0 2px 6px rgba(91,94,106,0.3);

            .Ico {
                font-size: 4rem;
                color: #31408a;
            }

            .Icon {
                font-size: 4rem;
                color: #31408a;
                &.Bg {
                    font-size: 9rem;
                    position: absolute;
                    right: 1rem;
                    bottom: 1rem;
                    pointer-events: none;
                    opacity: 0.05;
                }
            }
`;


interface WorkspaceParams {
    id: number;
}
type S = {
    workspace: IWorkspace | null
    sectionHidden: boolean
}
class Workspace extends Component<RouteComponentProps, S> {
    service = new RestService();

    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            workspace: null,
            sectionHidden: false
        }
    }

    componentDidMount() {
        const workspaceId = Number((this.props.match.params as WorkspaceParams).id);
        this.getWorkspace(workspaceId);
    }

    componentDidUpdate() {
        const workspaceId = Number((this.props.match.params as WorkspaceParams).id);
        if (this.state.workspace?.id !== workspaceId) {
            this.getWorkspace(workspaceId);
        }
    }

    getLogo(type: IWorkspace['type'] | undefined) {
        let Icon;
        switch (type) {
            case 'Contract': Icon = FaFileContract; break;
            case 'Corporate': Icon = FaFileArchive; break;
            case 'Norms': Icon = FaFileCode; break;
            default: Icon = FaFileContract; break;
        }
        return Icon && <Icon className='tileLogo' />;
    }
    getWorkspace(id: number) {
        const workspace = this.service.getWorkspace(id);
        if (workspace) {
            this.setState({
                workspace: workspace
            })
        } else {
            this.props.history.push('/404');
        }
    }

    hideSection() {
        this.setState((prevState) => {
            return {
                sectionHidden: !prevState.sectionHidden
            }
        })
    }

    getTiles() {
        const tiles = [{
            title: <>Explore your <b>entities</b></>,
            description: 'Take a few minutes to look at the most important elements and specificities of your entities',
            icon: FaRegBuilding,
            route: '/404'
        }, {
            title: <>Structure the <b>ownership</b></>,
            description: 'Get a clear view of the ownership by looking at the realations between individuals and entities',
            icon: VscSymbolStructure,
            route: '/404'
        }, {
            title: <>Define the <b>calendar</b></>,
            description: 'Prepare future events by creating detailed plans around the life of your entity',
            icon: FaCalendarAlt,
            route: '/404'
        }];

        return tiles.map((tile, i) => {
            const Ico = tile.icon;
            const content = <>
                <Ico className='Ico' />
                <TileTitle>{tile.title}</TileTitle>
                <TileDesc>{tile.description}</TileDesc>
            </>;
            return <TiledLink to={tile.route} key={`tile_${i}`}>{content}</TiledLink>;
        });
    }

    render() {
        const { workspace, sectionHidden } = this.state;
        return (
            <div>
                <WorkspaceSection className='Head'>
                    <BannerImage src={workspace?.background} />
                    <HeadInfo>
                        {this.getLogo(workspace?.type)}
                        <Content>
                            <h2 className="header-2">{workspace?.title} <Button icon={RiSettings3Line} /></h2>
                            <p>Worckspace purpose and a bit of context. This much needed description is here to remind people where they are, if they are new or have poor memory.</p>
                        </Content>
                    </HeadInfo>
                </WorkspaceSection>
                <WorkspaceSection >
                    <h3 className={'header-3'}>Start working on what corporate matters <ButtonWithHide label={sectionHidden ? 'Show' : 'Hide'} onClick={() => this.hideSection()} /></h3>
                    <TilesContainer hidden={sectionHidden}>
                        {this.getTiles()}
                    </TilesContainer>
                </WorkspaceSection>
                <WorkspaceSection>
                    <Work uselessButtons />
                </WorkspaceSection>
            </div >
        );
    }
}

export default Workspace;