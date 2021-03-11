import React from "react";

import Markdown from "../../components/Markdown";

import "graphiql/graphiql.css";
import GraphQLExample from "../../components/GraphQLExample";
import PageHeader from "../../components/PageHeader";

const entry = {
  title: "Building a custom Widget using GraphQL",
  highlights: `This tutorial will walk you through building a custom widget using the SaaSquatch [GraphQL API](/graphql/reference)`
}
export default function render() {
  return (
    <PageHeader {...entry}><>

      <Markdown source={started} />
      <Markdown source={first} />
      <GraphQLExample {...eg1} />

      <Markdown source={rewards} />
      <GraphQLExample {...rewardExample} />

      <Markdown source={referred} />
      <GraphQLExample {...referredExample} />

      <Markdown source={referrals} />
      <GraphQLExample {...referralsExample} />

      <Markdown source={upsert} />
      <GraphQLExample {...upsertEg} />

      <Markdown source={programInfo} />
      <GraphQLExample {...programInfoEg} />
    </>
    </PageHeader>
  );
}

const started = `
### Getting Started with GraphQL

In order to start using GraphQL, you'll need to do be using a [GraphQL client](https://graphql.org/graphql-js/graphql-clients/).
There are GraphQL clients for:

 - C# / .NET
 - Clojurescript
 - Go
 - Java / Android
 - JavaScript
 - Swift / Objective-C iOS 
 - Python

[List of GraphQL clients](https://graphql.org/code/#graphql-clients).


### Security

If you're building a custom widget, you're probably doing it on mobile or in the browser. To simplify authentication, we recommend
making GraphQL calls authorized **as the end user**.

To do enable authorization, generate a [JSON Web Token (JWT)](https://jwt.io) for your user using you tenant API key **on the server**.


\`Authorization: Bearer {JWT}\`


**Related**

 - [Build a JSON Web Tokens for your users](/topics/json-web-tokens/)

> *Important* - Never embed your API Key in your mobile app, website or javascript. If it is exposed, an attacker can get full access to your site.

`;

const first = `
### Looking up the User

The easiest way to get data in a custom widget is to use the special <code>viewer</code> property to lookup the user that is currently authorized.

`;

const rewards = `
### Showing a list of rewards

You can look up either a list of rewards to show people what they've earned from your programs.

 - <code>prettyValue</code> vs <code>value</code> - When building custom widgets it's usually best to use the <code>prettyValue</code> for rewards, since that will format and localize the reward value into something human-readable. Note that there also pretty fields for available and expired values.
 - <code>value</code> vs <code>availableValue</code> - The value of a reward may change due to it being expired, or cancelled, or redeemed. If you want to show a sense of progress, you can show lifetime earned amount.
`;

const referred = `
### Showing who referred a user

If someone has been referred, it's common to show them "You were referred by Jon Snow" in the user interface.
To look that up, use the <code>referredByReferral</code> connection to find out more about the Referral.

`;

const referrals = `
### Showing a list of referrals

To show someone their list of referrals, and any rewards earned because of those referrals, use the <code>referrals</code> connection on a user.

Note that you'll need to include your programId in this call only if one user is making referrals across different referral programs, and you want to filter them out.

`;

const upsert = `
### Update a user

You can also do a complete upsert instead of using the user upsert from Squatch.js or our REST API. Only the fields that are included are updated, so you can add new fields, or add new segments, without removing overriding previous values.

In this example Sansa becomes a bolton, is added to a new segment, updates her last name, and is flagged as married.
`;

const programInfo = `
### Look up reward configuration

You can advertise what people will earn from your program by looking up the program by id, and then looking up the program's rewards.
Every program has a different set of reward keys, so make sure to look this up when you're setting up your program.
`

const eg1 = {
  query: `{
  viewer {
    ... on User {
      firstName
      lastName
    }
  }
}
`,
  response: JSON.stringify(
    { viewer: { firstName: "Sansa", lastName: "Stark" } },
    null,
    2
  )
} as const;

const upsertEg = {
  query: `mutation{
  upsertUser(userInput:{
    id:"",
    accountId:"",
    lastName:"Bolton",
    segments: ["boltons"],
    customFields:{
        married: true
      }
  }){
    firstName
    lastName
    segments
    customFields
  }
}`,
  response: JSON.stringify(
    {
      upsertUser: {
        firstName: "Sansa",
        lastName: "Bolton",
        segments: ["starks", "boltons"],
        customFields: {
          fierce: true,
          married: true
        }
      }
    },
    null,
    2
  )
} as const;

const rewardExample = {
  query: `{
    viewer {
        ... on User {
            firstName
            lastName
            rewards{
                data{
                    prettyValue
                    prettyAvailableValue
                }
            }
        }
    }
}
    
  `,
  response: JSON.stringify(
    {
      viewer: {
        firstName: "Sansa",
        lastName: "Stark",
        rewards: {
          data: {
            prettyValue: "$10.00",
            prettyAvailableValue: "$4.75"
          }
        }
      }
    },
    null,
    2
  )
} as const;

const referredExample = {
  query: `{
        viewer {
            ... on User {
                firstName
                lastName
                referredByReferral(programId:"referral"){
                  referrerUser{
                    firstName
                    lastName
                  }
                }
            }
        }
    }
  `,
  response: JSON.stringify(
    {
      viewer: {
        firstName: "Sansa",
        lastName: "Stark",
        referredByReferral: {
          referrerUser: {
            firstName: "Jon",
            lastName: "Snow"
          }
        }
      }
    },
    null,
    2
  )
} as const;

const referralsExample = {
  query: `{
    viewer {
      ... on User {
        firstName
        lastName
        referrals(filter: {programId_eq: "referral"}, limit:3) {
          data {
            referrerUser {
              firstName
              lastName
            }
          }
          totalCount
          count
        }
      }
    }
  }`,
  response: JSON.stringify(
    {
      viewer: {
        firstName: "Sansa",
        lastName: "Stark",
        referrals: {
          data: [
            {
              referrerUser: {
                firstName: "Rob",
                lastName: "Stark"
              }
            },
            {
              referrerUser: {
                firstName: "Arya",
                lastName: "Stark"
              }
            },
            {
              referrerUser: {
                firstName: "Catelyn",
                lastName: "Stark"
              }
            }
          ],
          totalCount: 1021,
          count: 3
        }
      }
    },
    null,
    2
  )
} as const;

const programInfoEg = {
  query: `{
    viewer {
      ... on User {
        firstName
        lastName
      }
    }
    program(id:"referral"){
      rewards{
        prettyValue
      }
      tierOneOnly:reward(key:"referrerTier1"){
        prettyValue
      }
    }
  }`,
  response: JSON.stringify(
    {
      viewer: {
        firstName: "Sansa",
        lastName: "Stark",
      },
      program: {
        rewards: [
          {
            key: "referredReward",
            prettyValue: "$10.00"
          },
          {
            key: "referrerTier1",
            prettyValue: "$20.00"
          }
        ],
        tierOneOnly:{
          prettyValue: "$20.00"
        }
      }
    },
    null,
    2
  )
} as const;
