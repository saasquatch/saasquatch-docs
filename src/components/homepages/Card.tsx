import * as React from 'react';
import styled from 'styled-components'

const CardContainerDiv = styled.div`
    box-sizing: border-box;
`;

const CardImageDiv = styled.div``

const CardBodyDiv = styled.div``

const CardTitleH3 = styled.h3``

const CardDescriptionP = styled.p``

const CardLinkA = styled.a``

export const Card = ({title, description, imageSrc, linkText, linkUrl}) => {
    return (
        <CardContainerDiv>
            <CardImageDiv>
                <img src={imageSrc} />
            </CardImageDiv>
            <CardBodyDiv>
                <CardTitleH3>{title}</CardTitleH3>
                <CardDescriptionP>{description}</CardDescriptionP>
                <CardLinkA href={linkUrl}>{linkText}</CardLinkA>
            </CardBodyDiv>
        </CardContainerDiv>
    )
}