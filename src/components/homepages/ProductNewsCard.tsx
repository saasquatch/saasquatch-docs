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
`

export const ProductNewsCard = ({
    markdownContent,
    title,
    datePublished,
    tags
}) => {
    return <CardBaseDiv>Content here</CardBaseDiv>
}