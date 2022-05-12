import Markdown from 'components/Markdown';
import * as React from 'react';
import styled from 'styled-components'

const CardBaseDiv = styled.div`
    box-sizing: border-box;
    margin: 0;

    padding: 40px 30px 30px;
    background: #FFFFFF;

    border: 1px solid #E2E2E2;

    box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.08);
    border-radius: 5px;
    margin-bottom: 25px;
    font-family: 'Helvetica';
    font-style: normal;
    display: flex;
    flex-direction: column;
`;
const CardTitle = styled.h2`
    font-weight: 700 !important;
    font-size: 24px !important;
    line-height: 28px;
    color: #003B45;
    margin: 0 0 3px 0;
`;

const CardDate = styled.p`
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    text-transform: uppercase;
    color: #858585;
    margin: 0 0 10px 0;
`;

const CardTags = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 5px 15px;

    width: fit-content;

    background: #EBF9EA;
    border-radius: 12px;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #00A176;
`

const CardMarkdown = styled.p`
    font-family: 'Helvetica';
    font-style: normal;
    font-size: 14px;
    line-height: 150%;
    color: #575757;
    & h3 {
        color: #003B45;
        font-size: 20px;
    };
    margin-bottom: 20px;
`;

const CardButton = styled.p`
    width: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 10px;
    gap: 10px;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #FFFFFF;
    background: #00A176;
    border-radius: 5px;
    margin-bottom: 0;
`

const TagsDiv = styled.div`
    display: flex;
    margin-bottom: 20px;
    > :not(:last-child) {
        margin-right: 10px;    
    }
`

const dateToString = (datePublished: string): string => {
    let newDate: Date = new Date(datePublished);
    let month: string= newDate.toLocaleString('default', { month: 'long' });
    let arrayDate: Array<string> = datePublished.split("-");
    let finalDate: string = month + " " + arrayDate[2] + ", " + arrayDate[0];
    return finalDate;
}

export const ProductNewsCard: React.FC<ProductNewsCard> = ({
    markdownContent,
    title,
    datePublished,
    tags
}) => {
    return (
        <CardBaseDiv>
            <CardTitle>
                {title}
            </CardTitle>
            <CardDate>
                {dateToString(datePublished)}
            </CardDate>
            <TagsDiv>
                {tags.map((tag: string) => {
                    return <CardTags>{tag}</CardTags>
                })}
            </TagsDiv>
            <CardMarkdown>
                <Markdown source={markdownContent} />
            </CardMarkdown>
            <CardButton>Read Full Blog Post</CardButton>
        </CardBaseDiv>
    )
}

interface ProductNewsCard {
    markdownContent: string;
    title: string;
    datePublished: string;
    tags: Array<string>;
}