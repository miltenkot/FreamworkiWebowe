import React from 'react';
import styled from 'styled-components';
import NetworkImage from "../../media/icons/network.png";
import PublicationImage from "../../media/icons/publications.png";
import UserPlusImage from "../../media/icons/user-plus.svg";
import PlusImage from "../../media/icons/plus.svg";
import EcosystemImage from "../../media/icons/ecosystem.png";
import EntitiesImage from "../../media/icons/entities2.png";
import AvatarImage from "../../media/icons/avatarImage.jpeg";
import { Colors } from '../../styledHelpers/Colors';

const LeftProfileMenuView = styled.div`
    width:200px;
    padding-right: 10px;
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
    text-align: center
`;

const ProfileAvatarImage = styled.img`
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
color: ${Colors.electronBlue};
 align-items: center;
 justify-content: center;
`;

const JobLabel = styled.div`
margin:auto;
margin-top:8px;
width:150px;
display: flex;
 align-items: center;
 color: ${Colors.lightGray};
 font-size: 12px;
 justify-content: center;
`;

const CustomImg = styled.img`
padding-right: 15px;

`;

const CustomImgLeft = styled.img`
margin-left: 2px;

`;

const CustomImgRightBorder = styled.div`
display: flex;
 align-items: center;
 justify-content: center;
border: 1.0px solid ${Colors.black};
width: 30px;
height: 20px;
border-radius: 15%;


`;
const CustomImgRight = styled.img`

`;

const MainPhotoBoxBottom = styled.div`
border-top: 1.0px solid ${Colors.lightGray};
margin-top: 10px;
`;

const MainPhotoBoxBottomList = styled.div`
    padding: 5px;
`;

const ContentTitleLabel = styled.div`
    padding-left: 8px;
    padding-top: 5px;
    text-align: left;
    width: 120px;
`;

const MainPhotoBoxBottomContent = styled.div`
display: flex;
padding: 5px;
align-items: center;
justify-content: space-between;


`;

const BottomList = styled.ul`
`;

const BottomListContent = styled.div`
    display: flex;
    list-style-type: none;
    padding:5px;
    text-align:left;
    justify-content: flex-start;
    padding-top: 20px;
`;

function LeftProfileMenu() {
    return (
        <LeftProfileMenuView>
            <ProfileAvatarContainer>
                <ProfileAvatarImage src={AvatarImage}/>
                <NameLabel>Andrzej Andrzej</NameLabel>
                <JobLabel>Job title - Company</JobLabel>
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

