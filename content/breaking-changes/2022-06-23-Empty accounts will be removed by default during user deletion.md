---
title: Empty accounts will be removed by default during user deletion
deadline: 2022-06-23
contentType: breakingChange
---

This breaking change affects the `deleteUser` GraphQL mutation and the REST API [user deletion](/api/methods/#open_delete_user) open endpoint.

The historical default behaviour for these methods of user deletion has been that if the user being deleted is the last user in their account, then the account is not deleted. This is not consistent with the default behaviour when deleting users in our admin portal. 

The new default behaviour is that if the user being deleted is the last user in their account, then the account is deleted. This change brings the default behaviour of user deletion into alignment across our GraphQL, REST API and admin portal. This change will take effect on June 23rd 2022.

The default behaviour can be overridden with the usage of a field named `preserveEmptyAccount`. We recommend visiting our [GraphQL Explorer](/graphql/reference) and [REST API docs](/api/methods/#open_delete_user) for more details on how to use this field.

Please check your implementation to ensure that you were not relying on the previous behaviour and update if necessary.

We are sorry for any inconvience this causes and recommend reaching out to support if you run into issues.