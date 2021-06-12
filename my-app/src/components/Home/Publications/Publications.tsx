import { AnyAction, Dispatch } from 'redux';
import React, { Component } from 'react';

import Button from '../../common/Button/Button';
import { IStore } from '../../../store';
import Img from '../../common/Img/Img';
import { Link } from "react-router-dom";
import { PublicationsState } from '../../../reducers/PublicationsReducer';
import Skeleton from './../../common/Skeleton/Skeleton';
import UserSignature from './../../common/UserSignature/UserSignature';
import { connect } from 'react-redux';
import { publicationsFetchData } from '../../../actions/PublicationsActions';
import styles from "./Publications.module.scss";
import logo from './../../assets/react-logo.png';
import styled from 'styled-components';
import { Colors } from '../../../styledHelpers/Colors';
import { Sizes } from '../../../styledHelpers/Sizes';
import { FontSize } from '../../../styledHelpers/FontSizes';

interface StateProps {
    publications: PublicationsState['publications']
}

interface DispatchProps {
    fetchData: (limit: number) => void
}
type P = StateProps & DispatchProps;

const PublicationsContainer = styled.div`
display: flex;
overflow: hidden;
width: 100%;
border-radius: 4px;
background: ${Colors.white};
box-shadow: ${Colors.shadow1};

&Tile {
    position: relative;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    justify-content: flex-end;
    width: 30rem;
    max-width: 30%;
    margin-right: ${Sizes.spacing4};
    color: ${Colors.white};

    &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        content: '';
        background: linear-gradient(
        0deg, rgba(${Colors.electronBlue}, 0.5) 0%, rgba(${Colors.electronBlue}, 0) 100%);
    }

    .bgImage {
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;

        object-fit: cover;
    }
    &Content {
        z-index: 1;
        padding: ${Sizes.spacing5} ${Sizes.spacing3} ${Sizes.spacing4};
    }

    &Loading {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30rem;
        max-width: 30%;
        height: 10rem;
        margin-right: ${Sizes.spacing4};
        background: ${Colors.white};
    }
}

&Article {
    display: flex;
    align-items: flex-start;
    margin-bottom: ${Sizes.spacing3};
    &Image {
        width: 3rem;
        height: 3rem;
        margin-right: ${Sizes.spacing2};
    }

    &Title {
        font-size: ${Sizes.spacing2};
        margin: 0;
        margin-bottom: ${Sizes.spacing2};
        color: ${Colors.black};
        font-weight: 500;
    }
}

&Container {
    padding: ${Sizes.spacing2} 0;
    width: 100%;
    margin-right: ${Sizes.spacing4};
}

&More {
    text-decoration: none;
    color: ${Colors.infoBlue};
    font-size: ${FontSize.icon_rem0_75};
}
`;

const PubContainer = styled.article`
    position: relative;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    justify-content: flex-end;
    width: 30rem;
    max-width: 30%;
    margin-right: ${Sizes.spacing4};
    color: ${Colors.white};

    &Article {
        display: flex;
        align-items: flex-start;
        margin-bottom: ${Sizes.spacing3};
        &Image {
            width: 3rem;
            height: 3rem;
            margin-right: ${Sizes.spacing2};
        }
    
        &Title {
            font-size: ${Sizes.spacing2};
            margin: 0;
            margin-bottom: ${Sizes.spacing2};
            color: ${Colors.black};
            font-weight: 500;
        }
`;

const CustomArticle = styled.article`

`;

class Publications extends Component<P> {
    
    componentDidMount() {
        this.props.fetchData(4);
    }

    getFirstPostTile() {
        const post = this.props.publications[0];

        return (post ? <CustomArticle className={styles.PublicationsTile} >
            <Img className={styles.bgImage} src={post.photo?.url} alt={post.photo?.title} />
            <div className={styles.PublicationsTileContent}>
                <h2 className={'header-3'}>{post.title}</h2>
                <UserSignature userId={post.userId} />
            </div>
        </CustomArticle >
            : <Skeleton type="articleTile" />
        )
    }

    getPosts() {
        const posts = [...this.props.publications].slice(1);

        return (posts.length > 0 ? posts.map((post, i) =>
            <article key={`post_${i}`} className={styles.PublicationsArticle}>
                <Img skeletonize className={styles.PublicationsArticleImage} src={post.photo?.url} alt={post.photo?.title} />
                <div>
                    <h3 >{post.title}</h3>
                    <UserSignature onWhiteBg userId={post.userId} />
                </div>
            </article>) : <Skeleton type="article" count={3} />);
    }

    render() {
        return (
            <section className={styles.Publications}>
                {this.getFirstPostTile()}
                <div className={styles.PublicationsContainer}>
                    <h2 className={'header-2'}>Latest publications</h2>
                    {this.getPosts()}
                    <Link to='/404' >
                        <Button label="See more publications" />
                    </Link>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state: IStore) => {
    return {
        publications: state.publications.publications,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return {
        fetchData: (id: number) => dispatch(publicationsFetchData(id) as unknown as AnyAction)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Publications);