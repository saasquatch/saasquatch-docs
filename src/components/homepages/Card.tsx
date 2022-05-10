import * as React from 'react';
import styled from 'styled-components'

// Card Styled Componennts
const CardContainerDiv = styled.div`
    box-sizing: border-box;
`;

const CardImageDiv = styled.div``

const CardBodyDiv = styled.div``

const CardTitleH3 = styled.h3``

const CardDescriptionP = styled.p``

const CardLinkA = styled.a``

// Icon Styled Components
const IconCircleDiv = styled.div``

const Icon = ({iconCode}) => (
    <IconCircleDiv>
        <i className={`fa fa-solid ${iconCode} fa-3x`}></i>
    </IconCircleDiv>
)

export const Card: React.FC<CardProps> = ({title, description, imageSrc, iconCode, linkText, linkUrl}) => {
    return (
        <CardContainerDiv>
            <CardImageDiv>
                {imageSrc && <img src={imageSrc} />}
                {iconCode && <Icon iconCode={iconCode} />}
            </CardImageDiv>
            <CardBodyDiv>
                <CardTitleH3>{title}</CardTitleH3>
                <CardDescriptionP>{description}</CardDescriptionP>
                <CardLinkA href={linkUrl}>{linkText}</CardLinkA>
            </CardBodyDiv>
        </CardContainerDiv>
    )
}

interface CardProps {
    imageSrc?: string
    iconCode?: string

    title: any
    description: any
    linkText: any
    linkUrl: any
}