import { Card } from 'components/homepages/Card';
import PageHeader from 'components/PageHeader';
import * as React from 'react';
import styled from 'styled-components'

export default function render() {
    return (
        <>
            <PageHeader
                title="Success Center"
                highlights="The SaaSquatch Growth Automation platform helps marketers and success teams better drive customer usage and purchase behaviour inside the products they support."
                category="landingPages"
            />
            <Card
                title="SaaSquatch Growth Automation"
                description="Learn more about how to automate and grow your Customer Lifetime Value."
                iconCode="fa-question"
                // imageSrc="https://images.ctfassets.net/s68ib1kj8k5n/6lanuIP3dr7CaMAXnjFit6/ec0d742b72e09235769d1d84dc8e8668/salesforce-integration.png"
                linkText="Read more"
                linkUrl="#"
            />
        </>
    )
}