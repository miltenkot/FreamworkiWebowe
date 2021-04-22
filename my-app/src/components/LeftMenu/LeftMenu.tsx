import React from 'react';
import styled from 'styled-components';
import NetworkImage from "../../media/icons/network.png";
import PublicationImage from "../../media/icons/publications.png";
import UserPlusImage from "../../media/icons/user-plus.png";
import PlusImage from "../../media/icons/plus.png";
import EcosystemImage from "../../media/icons/ecosystem.png";
import EntitiesImage from "../../media/icons/entities2.png";

const LeftMain = styled.div`
    padding: 10px;
    width:200px;
    height:auto;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    
`;
const LeftMainPhotoBox = styled.div`
    width:200px;
    height:250px;
   
    margin:auto;
    box-shadow: 0 0 10px 0px #dfdfdf;
    border-radius:5px;
`;
const LeftMainPhotoBoxTop = styled.div`
    border-bottom:3px solid #f5f7f9;
    padding-bottom:20px;
`;
const LeftMainPhotoBoxAvatar = styled.div`
    width:60px;
    height:60px;
   
    margin:auto;
    margin-top:8px;
    box-shadow: 0 0 10px 0px #dfdfdf;
    border-radius:60px;
`;
const LeftMainPhotoBoxBottom = styled.div`
`;
const LeftMainPhotoBoxBottomList = styled.ul`
`;
const LeftMainPhotoBoxBottomContent = styled.li`
    list-style-type: none;
    padding-bottom:10px;
    text-align:left;
`;
const ListBelowPhotoBox = styled.ul`
`;
const ListBelowPhotoBoxContent = styled.li`
    list-style-type: none;
    padding:5px;
    text-align:left;
`;

const CustomImg = styled.img`
    margin:5px;
    padding: 5px;
    margin-right: 21px;
`;

function LeftMenu() {
    return (
        <LeftMain>
            <LeftMainPhotoBox>
                <br />
                <LeftMainPhotoBoxTop>
                    <LeftMainPhotoBoxAvatar>
                    </LeftMainPhotoBoxAvatar>

                </LeftMainPhotoBoxTop>
                <LeftMainPhotoBoxBottom>
                    <LeftMainPhotoBoxBottomList>
                        <LeftMainPhotoBoxBottomContent>
                            <CustomImg src={NetworkImage} />
                            Your network
                            <CustomImg src={UserPlusImage} />
                        </LeftMainPhotoBoxBottomContent>
                        <LeftMainPhotoBoxBottomContent>
                            <CustomImg src={PublicationImage} />
                            Your Publications
                            <CustomImg src={PlusImage} />
                        </LeftMainPhotoBoxBottomContent>
                    </LeftMainPhotoBoxBottomList>
                </LeftMainPhotoBoxBottom>
            </LeftMainPhotoBox>
            <ListBelowPhotoBox>
                <ListBelowPhotoBoxContent>
                <CustomImg src={PublicationImage} />
                    Publications
                </ListBelowPhotoBoxContent>
                <ListBelowPhotoBoxContent>
                <CustomImg src={EcosystemImage} />
                    Ecosystem
                </ListBelowPhotoBoxContent>
                <ListBelowPhotoBoxContent>
                <CustomImg src={EntitiesImage} />
                    Entities
                </ListBelowPhotoBoxContent>
            </ListBelowPhotoBox>
        </LeftMain>
    )
}

export default LeftMenu

