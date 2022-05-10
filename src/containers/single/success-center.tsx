import { Card } from 'components/homepages/Card';
import * as React from 'react';
import styled from 'styled-components'

export default function render() {
    return (
        <div>
            <Card
                title="Salesforce"
                description="Salesforce is the world's leading cloud CRM. SaaSquatch is a managed package built on the Force.com that lets you track your referrals in Salesforce."
                imageSrc="https://images.ctfassets.net/s68ib1kj8k5n/6lanuIP3dr7CaMAXnjFit6/ec0d742b72e09235769d1d84dc8e8668/salesforce-integration.png"
                linkText="Read more about Salesforce"
                linkUrl="#"
            />
        </div>
    )
}