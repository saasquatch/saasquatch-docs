import * as React from 'react';
import styled from 'styled-components'

// Card Styled Componennts
const CardContainerDiv = styled.div`
    background-color: #ffffff;
    // max-width: 600px;
    max-width:500px
    height: fit-content;
    // 27px margin above title somewhere in class="sc-iRbamj jheQfW"
    padding: 0px 27px 27px 27px;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.08);
    display: flex;
    // align-items: center;
    gap: 25px;
    @media (max-width: 1025px) {
        max-width: 280px;
        flex-direction: column;
        align-items: center;
    }
    justify-self: center;
`

const CardImageDiv = styled.div`
    margin-top: 27px;
    max-width: 200px;
    min-width: 155px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const CardBodyDiv = styled.div`
    font-family: Helvetica, Sans-Serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // justify-content: space-between;
    // justify-content: start;
    gap: 5px;
`

const CardTitleH3 = styled.h3`
    font-weight: 700;
    font-size: 18px;
    color: #003b45;
    line-height: 18px;
    // margin-top: -3px;
    // margin-bottom: -10px;
    @media(max-width: 1025px){
        margin-top: 0px;
    }
`

const CardDescriptionP = styled.p`
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    color: #333333;
    // margin-top: 0.8em;
    // margin-bottom: 1em;
`

const CardLinkA = styled.a`
    // justify-self: end;
    font-weight: 700;
    font-size: 14px;
    line-height: 14px;
    color: #00A176;
    text-decoration: none;
    margin-top: 5px;
`

// Icon Styled Components
const IconCircleDiv = styled.div`  
    max-width: 250px;
    min-width: 120px;
    max-height: 250px;
    min-height: 120px;
    font-size: 30px;
    border-radius: 50%;
    color: #65BD60;
    background-color: #003B45; 
    display: flex;
    align-items: center;
    justify-content: center;

    @media(max-width: 1025px) {
        max-width: 200px;
        min-width: 100px;
        max-height: 200px;
        min-height: 100px;
        font-size: 25px;
    }
`

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