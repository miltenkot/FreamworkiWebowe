import React from 'react';
import styled from 'styled-components';
import NetworkImage from "../../media/icons/network.png";
import PublicationImage from "../../media/icons/publications.png";
import UserPlusImage from "../../media/icons/user-plus.png";
import PlusImage from "../../media/icons/plus.png";
import EcosystemImage from "../../media/icons/ecosystem.png";
import EntitiesImage from "../../media/icons/entities2.png";
import { Colors } from '../../styledHelpers/Colors';

const LeftProfileMenuView = styled.div`
    padding: 10px;
    width:200px;
    height:auto;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 14px;
`;

const ProfileAvatarContainer = styled.div`
    width:200px;
    height:200px;
    margin:auto;
    padding-top:8px;
    box-shadow: 0 0 10px 0px #dfdfdf;
    border-radius:5px;
`;

const ProfileAvatarImage = styled.div`
    width:60px;
    height:60px;
    margin:auto;
    margin-top:8px;
    box-shadow: 0 0 10px 0px #dfdfdf;
    border-radius:60px;
`;

const NameLabel = styled.div`
margin:auto;
margin-top:8px;
width:120px;
display: flex;
 align-items: center;
 justify-content: center;
`;

const JobLabel = styled.div`
margin:auto;
margin-top:8px;
width:120px;
display: flex;
 align-items: center;
 justify-content: center;
`;

const CustomImg = styled.img`
padding: 2px;

`;

const CustomImgLeft = styled.img`
margin-left: 2px;

`;

const CustomImgRightBorder = styled.div`
display: flex;
 align-items: center;
 justify-content: center;
border: 1.5px solid ${Colors.black};
width: 30px;
height: 20px;
border-radius: 10%;


`;
const CustomImgRight = styled.img`

`;

const MainPhotoBoxBottom = styled.div`
`;

const MainPhotoBoxBottomList = styled.div`
    padding: 5px;
`;

const ContentTitleLabel = styled.div`
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 5px;
    text-align: left;
`;

const MainPhotoBoxBottomContent = styled.div`
display: inline-flexbox;
padding-left: 10px;
padding: 5px;
align-items: left;

`;

const BottomList = styled.ul`
`;

const BottomListContent = styled.li`
    list-style-type: none;
    padding:5px;
    text-align:left;
`;

function LeftProfileMenu() {
    return (
        <LeftProfileMenuView>
            <ProfileAvatarContainer>
                <ProfileAvatarImage>
                </ProfileAvatarImage>
                <NameLabel>Andrzej Andrzej</NameLabel>
                <JobLabel>Metrics Metrics</JobLabel>
                <MainPhotoBoxBottom>
                    <MainPhotoBoxBottomList>
                        <MainPhotoBoxBottomContent>
                            <CustomImgLeft src={NetworkImage} />
                            <ContentTitleLabel>Your Network</ContentTitleLabel>
                            <CustomImgRightBorder>
                                <CustomImgRight src={UserPlusImage} />
                            </CustomImgRightBorder>
                        </MainPhotoBoxBottomContent>
                        <MainPhotoBoxBottomContent>
                            <CustomImgLeft src={PublicationImage} />
                            <ContentTitleLabel>Your Publications</ContentTitleLabel>
                            <CustomImgRightBorder>
                                <CustomImgRight src={PlusImage} />
                            </CustomImgRightBorder>
                        </MainPhotoBoxBottomContent>
                    </MainPhotoBoxBottomList>
                </MainPhotoBoxBottom>
            </ProfileAvatarContainer>
            <BottomList>
                <BottomListContent>
                    <CustomImg src={PublicationImage} />
                     Publications
                </BottomListContent>
                <BottomListContent>
                    <CustomImg src={EcosystemImage} />
                    Ecosystem
                </BottomListContent>
                <BottomListContent>
                    <CustomImg src={EntitiesImage} />
                    Entities
                </BottomListContent>
            </BottomList>
        </LeftProfileMenuView>
    )
}
export default LeftProfileMenu

