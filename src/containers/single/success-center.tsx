import { Card, CardProps } from 'components/homepages/Card';
import PageHeader from 'components/PageHeader';
import * as React from 'react';
import styled from 'styled-components'


const CardGrid = styled.div`
    -moz-column-count: 2;
    column-count: 2;
    column-gap: 30px;

    @media(max-width: 599px) {
        // -moz-column-count: 1;
        // column-count: 1;
        display: grid;
        grid-template-columns: 1fr;
    }
`
// imageSrc="https://images.ctfassets.net/s68ib1kj8k5n/6lanuIP3dr7CaMAXnjFit6/ec0d742b72e09235769d1d84dc8e8668/salesforce-integration.png"
// iconCode:"fa-question"

const SaasGrowthAuto = {
    title: "SaaSquatch Growth Automation",
    description: "Learn more about how to automate and grow your Customer Lifetime Value.",
    iconCode:"fa-line-chart",
    linkText:"Learn more",
    linkUrl:"#"
}

const ProgramLibrary = {
    ...SaasGrowthAuto,
    title: "Program Library",
    description: "A library of the available Growth Automation Programs by SaaSquatch.",
    iconCode:"fa-book",
    linkText:"Explore library"
}

const ProgramSetupQuickstart = {
    ...SaasGrowthAuto,
    title: "Program Setup Quickstart",
    description: "Learn how to select, configure, and publish a new SaaSquatch Growth Automation Program in minutes.",
    iconCode:"fa-list-ol",
    linkText:"Get started"
}

const ReferralProgramQuickstart = {
    ...SaasGrowthAuto,
    title: "Referral Program Quickstart",
    description: "End to end guide for setting up a Growth Automation referral program.",
    iconCode:"fa-user-plus",
    linkText:"Learn more"
}

const SVGIconTest = {
    title: "SVG Icon Test",
    description: "This is a test to see if an svg src will work instead of an icon code. There are some icons whose icon codes don't work.",
    svgSrc:true,
    linkText:"Learn more",
    linkUrl: "#"
}

const CardsArray: Array<CardProps> = [SaasGrowthAuto, ProgramLibrary, ProgramSetupQuickstart, ReferralProgramQuickstart, SVGIconTest];

export default function render() {
    return (
        <>
            <PageHeader
                title="Success Center"
                highlights="The SaaSquatch Growth Automation platform helps marketers and success teams better drive customer usage and purchase behaviour inside the products they support."
                category="landingPages"
            />
            <CardGrid>
                {CardsArray.map((card)=> {
                    return <div style={{display: "inline-block"}}><Card
                    title={card.title}
                    description={card.description}
                    iconCode={card.iconCode}
                    imageSrc={card.imageSrc}
                    svgSrc={card.svgSrc}
                    linkText={card.linkText}
                    linkUrl={card.linkUrl}
                    />
                    </div>
                })}
            </CardGrid>
        </>
    )
}