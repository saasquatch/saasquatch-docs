---
title: Event Idempotency
highlights: A detailed developer guide for logging user events with idempotency. Add idempotency to your user events to ensure at most once processing of events sent to SaaSquatch. Includes API, integration, and SDK examples.
slug: developer/event-idempotency
sectionType: guide
template: hasTableOfContents.html
date: 2022-09-23
robotsTag:
  - FOLLOW
---

# Event Idempotency Dev Guide

## SaaSquatch user events

Any time a user interacts with your system, you can send SaaSquatch an event with details about this interaction.
Some examples of user events to send to SaaSquatch include:
- Purchases or transactions
- Subscription creation, update, or removal
- Mailing list subscription

Read more about SaaSquatch user events [here](/api/methods#User-Event)

## Event idempotency

Event idempotency is a mechanism for ensuring “at most once” processing of events sent to SaaSquatch. This allows developers to retry sending SaaSquatch user events without having to worry about events being duplicated.

In order to achieve this, each event must be sent along with a unique *idempotency key*. If an additional event is received by SaaSquatch within 24 hours with the same idempotency key, it will be rejected by SaaSquatch with a `409 Conflict` HTTP status code. You will need to ensure that you are handling this status code in your request logic (in general it can be treated as a successful result).

## Idempotency keys

There are two requirements for idempotency keys:
They must be between 8 and 64 characters long
Only alphanumeric characters and `-`,`_`,`.` are accepted

Idempotency Keys are scoped per tenant, and are stored for 24 hours after they are first received.

It is recommended that you use UUID v4 identifiers for idempotency keys, as they are sufficiently unique and contain no invalid characters, however any unique identifier from your system that meets the requirements can be used.

## Adding idempotency keys to SaaSquatch user events
You can add idempotency keys to events you send us via:
GraphQL or REST API
User event imports
Integrations, including Segment, Zapier and Salesforce
SDK, including squatch-js, saasquatch-java-sdk, squatch-android and squatch-ios

### GraphQL API

Idempotency keys can now be included in the `logUserEvent` and `logUserEvents` mutations.

Example Usage: 

```graphql
mutation{
  logUserEvent(userEventInput: {
    userId: "someUserId",
    accountId: "someAccountId",
    idempotencyKey: "f650f058-192c-4e52-b72d-9634116f59eb",
    events: [
      {
        key: "purchase",
        fields: {
          revenue: 1000, 
          currency: "USD",
          order_id: "ref1234",
        }
      }
    ]
  }) {
    events {
      id
    }
  }
}
```
### REST API

Example Usage:

```
curl -X POST https://app.referralsaasquatch.com/api/v1/{tenant_alias}/open/account/{accountId}/user/{userId}/events 
  -u :API_KEY 
  -H "Content-Type: application/json" 
  -d '{
  "userId": "someUserId",
  "accountId": "someAccountId",
  "idempotencyKey": "f650f058-192c-4e52-b72d-9634116f59eb",
  "events": [
    {
      "key": "purchase",
      "fields": {
        "currency": "CAD"
      }
    }
  ]
}'
```

### Integrations

#### Segment

As of the latest version the SaaSquatch v2 Segment integration will automatically use valid Segment `messageId` s as the idempotency key for all track events sent through Segment to SaaSquatch. If you set a custom `messageId` that is an invalid idempotency key, it will be ignored and the event will be logged without idempotency. You can read more about the Segment messageId [here](https://segment.com/docs/guides/duplicate-data/)

#### Zapier

As of version 1.1.4 it is possible to add an idempotencyKey when configuring the Create Event action in our Zapier integration.  

#### Salesforce

As of version 1.10.0 it is possible to add and idempotencyKey to the input of the `SaaSquatchTrackEventById`, `SaaSquatchTrackEventByLead`, and `SaaSquatchTrackEventByContact` invocable methods.

### SaaSquatch SDKs

#### `squatch-js`

As of version `2.4.1` of squatch-js, TypeScript types have been updated to support `idempotencyKey`.

Example Usage:

```javascript
  squatch.ready(function() {

    // Always call init
    squatch.init({
      tenantAlias: "YOUR_TENANT_ALIAS"      // String (required)
    });

    squatch.events().track({
         "userId": "someUserId",
         "accountId": "someAccountId",
         "idempotencyKey": "f650f058-192c-4e52-b72d-9634116f59eb",
         "events": [
            {
              "key": "purchase",
              "fields": {
              "currency": "CAD"
            }
          }
        ]
      }, { jwt: "YOUR_USER_JWT" }).catch(function(err){
      console.log(err);
    });
  });
```

#### `saasquatch-java-sdk`

As of version `0.0.5`, the `saasquatch-java-sdk` supports adding idempotencyKeys to `UserEventInput`.

Example Usage:

```
SaaSquatchClient saasquatchClient = SaaSquatchClient.create(ClientOptions.newBuilder()
        .setTenantAlias("YOUR_TENANT_ALIAS")
        .setAuthMethod(AuthMethod.ofTenantApiKey("YOUR_API_KEY"))
        .setRequestTimeout(5, TimeUnit.SECONDS)
        // etc.
        .build());

    UserEventDataInput eventDataInput = UserEventDataInput.newBuilder().setKey("someEventKey")
        .build();

    UserEventInput userEventInput = UserEventInput.newBuilder().setUserId("someUserId")      .setAccountId("someAccountId").setIdempotencyKey("someIdempotencyKey").addEvents(eventDataInput).build();

    final Publisher<JsonObjectApiResponse> responsePublisher = saasquatchClient.logUserEvent(
        userEventInput, null);

    Flowable.fromPublisher(responsePublisher)
        .doOnNext(response -> {
          System.out.printf("Status[%d] received\n", response.getHttpResponse().getStatusCode());
          // Getting the raw JSON data as a Map and do whatever you want with it
          final Map<String, Object> data = response.getData();
          // Or unmarshal the JSON result to one of the provided model classes
          final UserEventResult userEventResult = response.toModel(UserEventResult.class);
          System.out.printf("User event logged for user with accountId[%s] and id[%s] created\n",
              userEventResult.getAccountId(), userEventResult.getUserId());
        })
        .onErrorResumeNext(ex -> {
          if (ex instanceof SaaSquatchApiException) {
            // Non 2XX received, in which case we should typically get a standard api error
            final ApiError apiError = ((SaaSquatchApiException) ex).getApiError();
            System.out.println(apiError.getMessage());
            return Flowable.empty();
          }
          // Catastrophic failure!!!
          ex.printStackTrace();
          return Flowable.error(ex);
        })
        .subscribe();

```

#### `squatch-android`

As of version `0.0.7`, the `squatch-android` supports adding idempotencyKeys to `UserEventInput`.

Example Usage:

```
Flowable.fromPublisher(squatchAndroid.getSaaSquatchClient().logUserEvent(
    UserEventInput.newBuilder()
        .setAccountId("a")
        .setUserId("a")
        .setIdempotencyKey(“12345678”)
        .addEvents(UserEventDataInput.newBuilder()
            .setKey("someEventKey")
            .build())
        .build(),
    RequestOptions.newBuilder()
        .setAuthMethod(AuthMethod.ofJwt(userJwt))
        .build()))
    // This is necessary so the main thread does not start the IO operation
    .subscribeOn(Schedulers.io())
    .onErrorComplete() // or provide your own error handling
    .subscribe();

```
#### `squatch-ios`

Example Usage:

```
        let jwt = "jwt"

        let clientOptions = try ClientOptions.Builder()
            .setTenantAlias("tenant-alias")
            .build()

        let client = SaaSquatchClient(clientOptions)

        do {

            let events: JSON = [  
                "userId": "eventtest",
                "accountId": "eventtest",
                "idempotencyKey": "123456789",
                "events": [[
                    "key": "purchase",
                    "fields":[
                        "revenue": 40,
                        "currency": "USD",
                    ]
                 ]]
            ]

            try client.logUserEvent(userEventInput: events, userJwt: jwt) { result in
                print(result)
            }

        } catch let error {
            print(error)
        }

```
