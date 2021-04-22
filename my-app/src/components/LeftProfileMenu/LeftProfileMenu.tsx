import React from 'react';
import styled from 'styled-components';
import NetworkImage from "../../media/icons/network.png";
import PublicationImage from "../../media/icons/publications.png";
import UserPlusImage from "../../media/icons/user-plus.png";
import PlusImage from "../../media/icons/plus.png";
import EcosystemImage from "../../media/icons/ecosystem.png";
import EntitiesImage from "../../media/icons/entities2.png";

const LeftProfileMenuView = styled.div`
    padding: 10px;
    width:200px;
    height:auto;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
`;

const ProfileAvatarContainer = styled.div`
    width:200px;
    height:250px;
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
`;

const JobLabel = styled.div`
margin:auto;
margin-top:8px;
width:120px;
`;

const CustomImg = styled.img`
    margin:5px;
    padding: 5px;
    margin-right: 21px;
`;

const MainPhotoBoxBottom = styled.div`
`;

const MainPhotoBoxBottomList = styled.ul`
`;

const MainPhotoBoxBottomContent = styled.li`
    list-style-type: none;
    padding-bottom:10px;
    text-align:left;
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
                            <CustomImg src={NetworkImage} />
                            Your Network
                            <CustomImg src={UserPlusImage} />
                        </MainPhotoBoxBottomContent>
                        <MainPhotoBoxBottomContent>
                            <CustomImg src={PublicationImage} />
                            Your Publications
                            <CustomImg src={PlusImage} />
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

