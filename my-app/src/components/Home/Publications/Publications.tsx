import { AnyAction, Dispatch } from 'redux';
import React, { Component } from 'react';

import Button from '../../common/Button/Button';
import { Store } from '../../../store';
import { Link } from "react-router-dom";
import { PublicationsState } from '../../../reducers/PublicationsReducer';
import Skeleton from './../../common/Skeleton/Skeleton';
import UserSignature from './../../common/UserSignature/UserSignature';
import { connect } from 'react-redux';
import { publicationsFetchData } from '../../../actions/PublicationsActions';
import styled from 'styled-components';
import { Colors } from '../../../styledHelpers/Colors';
import { Sizes } from '../../../styledHelpers/Sizes';

interface StateProps {
    publications: PublicationsState['publications']
}

interface DispatchProps {
    fetchData: (limit: number) => void
}
type P = StateProps & DispatchProps;

const CustomArticle = styled.article`
position: relative;
display: flex;
align-items: flex-end;
flex-direction: column;
justify-content: flex-end;
width: 30rem;
max-width: 30%;
margin-right: ${Sizes.spacing4};
color: ${Colors.black};
`;

const ImageStyle = styled.img`
position: absolute;
z-index: 0;
width: 100%;
height: 100%;
pointer-events: none;

object-fit: cover;
`;

const ArticleContainer = styled.article`
display: flex;
align-items: flex-start;
margin-bottom: ${Sizes.spacing3};
h3 {
    font-size: 0.8rem;
    color: ${Colors.black};
    font-weight: 2;
}
`;

const ArticleImageStyle = styled.img`
width: 70px;
height: 60px;
margin-right: ${Sizes.spacing2};
`;

const ContentStyle = styled.div`
    color: white;
    z-index: 1;
    padding: ${Sizes.spacing5} ${Sizes.spacing3} ${Sizes.spacing4};
`;

const Container = styled.div`
padding: ${Sizes.spacing2} 0;
width: 100%;
margin-right: ${Sizes.spacing4};
text-align: left;
align-items: left;
justify-content: left;
margin-left: 0px;
Button {
    margin-left: 0px;
    margin-right: 660px; 
    font-weight: 500;
    font-size: 13px;
}
`;

const PubCont = styled.article`
display: flex;
overflow: hidden;
width: 100%;
border-radius: 4px;
background: ${Colors.white};
margin-bottom: 15px;
`;

class Publications extends Component<P> {

    componentDidMount() {
        this.props.fetchData(4);
    }

    getFirstPostTile() {
        const post = this.props.publications[0];

        return (post ? <CustomArticle>
            <ImageStyle src={post.photo?.url} alt={post.photo?.title} />
            <ContentStyle>
                <h2 className={'header-3'}>{post.title}</h2>
                <UserSignature userId={post.userId} />
            </ContentStyle>
        </CustomArticle >
            : <Skeleton type="articleTile" />
        )
    }

    getPosts() {
        const posts = [...this.props.publications].slice(1);

        return (posts.length > 0 ? posts.map((post, i) =>
            <ArticleContainer key={`post_${i}`}>
                <ArticleImageStyle src={post.photo?.url} alt={post.photo?.title} />
                <div>
                    <h3 >{post.title}</h3>
                    <UserSignature onWhiteBg userId={post.userId} />
                </div>
            </ArticleContainer>) : <Skeleton type="article" count={3} />);
    }

    render() {
        return (
            <PubCont>
                {this.getFirstPostTile()}
                <Container>
                    <h2 className={'header-2'}>Latest publications</h2>
                    {this.getPosts()}
                    <Link to='/404' >
                        <Button label="See more publications" />
                    </Link>
                </Container>
            </PubCont>
        );
    }
}

const mapStateToProps = (state: Store) => {
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