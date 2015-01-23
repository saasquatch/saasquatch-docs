package metadata


/**
 * Represents a single issue
 * 
 */
case class Issue(code: String, message: String, why:String, howToFix: String){ }

/**
 * List of all issues codes
 * 
 * Original list of codes: https://docs.google.com/a/referralsaasquatch.com/spreadsheets/d/1R5gqU5EVfbGShopzIVsu4rRoKn3uWknBA2FsGl3uufw/edit#gid=0
 */
object Issues {

    val all = List(
Issue(
"RS001",
"We've detected that your using a legacy call that's been deprecated. At one point it was possible to use only `account_id` but now `payment_provider_id` is a required field. If your users don't have a `payment_provider_id`, then still include the field, just set it to null.",
"""
You're probably only going to run into this issue if you've been using Referral SaaSquacth for a long time and you are one of our first users.

If you just recently started using Referral SaaSquatch, then you've probably worked yourself into a strange state and should get in touch with us to see how you got here.

If you're one of our existing customers, then you might be mid migration between the old world when `account_id` was the only required variable to the new world where `payment_provider_id` is now always required. 
This error is probably happening because `payment_provider_id` hasn't been included in all of your squatch.js init calls or links to the mobile web view.
""",
"""
 - Make sure you're using a valid `payment_provider_id`
"""),
Issue(
"RS002",
"For security reasons, you must include a `checksum` when `payment_provider_id` is set to null.",
"""
When you're using third party javascript like Squatch.js it's possible for your customers to arbitrarily change the data that you've passed into Squatch.js. For example, a clever user could potentially abuse
your system by setting `account_status: "PAID"`. To prevent this, we require a `checksum` as a security measure whenever a `payment_provider_id` doesn't exist.

We recommend that all our customers use a `checksum` to enable [Signed Requests](/squatchjs/signed-requests). It's a good thing to use.
""",
"""
 - Read the article about [Signed Requests](/squatchjs/signed-requests)
 - Make sure to include a `checksum`
"""),
Issue(
"RS003",
"`account_id` is required at initialization.",
"""
We need an `account_id` to help us identify the account that a user is grouped under. If you're not sure what to set here, have a read on the article about [Shared vs Solo accounts](/shared-vs-solo-accounts) and then update your code.
""",
"""
 - Read the article about [Shared vs Solo accounts](/shared-vs-solo-accounts)
 - Make sure to include an `account_id`
"""),
Issue(
"RS004",
"`account_id` is required at initialization.",
"""
We need an `account_id` to help us identify the account that a user is grouped under. If you're not sure what to set here, have a read on the article about [Shared vs Solo accounts](/shared-vs-solo-accounts) and then update your code.
""",
"""
 - Read the article about [Shared vs Solo accounts](/shared-vs-solo-accounts)
 - Make sure to include an `account_id`
"""),
Issue(
"RS005",
"For security reasons you must always include a `checksum` once secure mode has been enabled.",
"""
Once you've used [Signed Requests](/squatchjs/signed-requests) at least once by including a `checksum` then you'll need to use a `checksum` every time afterwards. If you've used a `checksum` for Squatch.js then you'll need to use that for the mobile webview, and vice versa.

If you're encountering this error mid-development while launching your program, then we can temporarily disable signed requests for you to help you better understand how to generate and use a `checksum`. After launch, a `checksum` should always be calculated and included.

Signed Request are important because when you're using third party javascript like Squatch.js it's possible for your customers to arbitrarily change the data that you've passed into Squatch.js. For example, a clever user could potentially abuse
your system by setting `account_status: "PAID"`. To prevent this, we require a `checksum` as a security measure whenever a `payment_provider_id` doesn't exist.

We recommend that all our customers use a `checksum` to enable [Signed Requests](/squatchjs/signed-requests). It's a good thing to use.
""",
"""
 - Read the article about [Signed Requests](/squatchjs/signed-requests)
 - Make sure to include a `checksum`
"""),
Issue(
"RS006",
"The `checksum` value ({{checksum}}) is incorrect.",
"""
You're probably getting this error because your checksum generation code isn't outputting the correct string to be signed.
Most often this is caused because people forget to sort their parameters before signing them or because they're using extra parameters.
Check out the [Signed Requests](/squatchjs/signed-requests) for a full walkthrough with code samples.
""",
"""
 - Check that you're using the right API key (test or live) to match the `tenant_alias` that you're using
 - Check that you're not including extra paramaters like `mode` or `fbShareImage` in your checksum generation
 - Find sample code in the article about [Signed Requests](/squatchjs/signed-requests)
"""),
Issue(
"RS007",
"We've detected that your using a legacy call that's been deprecated. At one point it was possible to use only `account_id` but now `payment_provider_id` is a required field. If your users don't exist in your payment system, then set `payment_provider_id=null`.",
"""
You're probably only going to run into this issue if you've been using Referral SaaSquacth for a long time and you are one of our first users.

If you just recently started using Referral SaaSquatch, then you've probably worked yourself into a strange state and should get in touch with us to see how you got here.

If you're one of our existing customers, then you might be mid migration between the old world when `account_id` was the only required variable to the new world where `payment_provider_id` is now always required. 
This error is probably happening because `payment_provider_id` hasn't been included in all of your squatch.js init calls or links to the mobile web view.
""",
"""
 - Make sure you're using a valid `payment_provider_id`
 - Try setting `payment_provider_id: null` if your users don't exist in a payment system
"""),
Issue(
"RS008",
"We could not find a Recurly Account using the `payment_provider_id` you provided: {{paymentProviderId}}. `payment_provider_id` must be either a valid Recurly Account Id or null.",
"""
We immediately validate any `payment_provider_id` by using it to [look up a Recurly Account with a matching Account Code](https://docs.recurly.com/api/accounts#get-account). If you're running into
this issue, it means that we couldn't find a Recurly account using the `payment_provider_id` that you provided. If some of your free users don't exist in Recurly, then you can 
set `payment_provider_id: null` for those users.
""",
"""
 - Log in to your Recurly dashboard and make sure the `payment_provider_id` is a real Account ID
 - Try setting `payment_provider_id: null` if your users don't exist in Recurly
"""),
Issue(
"RS009",
"We could not find a Stripe Customer using the `payment_provider_id` you provided: {{paymentProviderId}}. `payment_provider_id` must be a either valid Stripe Customer Id or null.",
"""
We immediately validate any `payment_provider_id` by using it to look up a Stripe Customer with a matching Customer ID. If you're running into
this issue it means that we couldn't find a Stripe Customer using the `payment_provider_id` that you provided. If some of your free users don't exist in Stripe, then you can 
set `payment_provider_id: null` for those users.
""",
"""
 - Log in to your Stripe dashboard and make sure the `payment_provider_id` is a real Customer ID
 - Try setting `payment_provider_id: null` if your users don't exist in Stripe
"""),
Issue(
"RS010",
"We could not find a Braintree Customer using the `payment_provider_id` you provided: {{paymentProviderId}}. `payment_provider_id` must be a either valid Braintree Customer Id or null.",
"""
We immediately validate any `payment_provider_id` by using it to look up a Braintree Customer with a matching Customer ID. If you're running into
this issue it means that we couldn't find a Braintree Customer using the `payment_provider_id` that you provided. If some of your free users don't exist in Braintree, then you can 
set `payment_provider_id: null` for those users.
""",
"""
 - Log in to your Braintree dashboard and make sure the `payment_provider_id` is a real Customer ID
 - Try setting `payment_provider_id: null` if your users don't exist in Braintree
"""),
Issue(
"RS011",
"We could not find a Zuora Account using the `payment_provider_id` you provided: {{paymentProviderId}}. `payment_provider_id` must be a either valid Zuora Account Id or null.",
"""
We immediately validate any `payment_provider_id` by using it to look up a Zuora Account with a matching AccountId. 
Note that in Zuora an `AccountId` is different than an `AccountNumber` ((docs)[https://knowledgecenter.zuora.com/D_SOAP_API/C_SOAP_API_Reference/F_API_Objects/Account]). If you're running into
this issue it means that we couldn't find a Zuora Account using the `payment_provider_id` that you provided. If some of your free users don't exist in Zuora, then you can 
set `payment_provider_id: null` for those users.
""",
"""
 - Log in to your Zuora dashboard and make sure the `payment_provider_id` is a real Account ID
 - Try setting `payment_provider_id: null` if your users don't exist in Zuora
"""),
Issue(
"RS012",
"The `payment_provider_id` that you provided is not valid. Just set `payment_provider_id: null` you're not using a payment system connector such as Stripe, Recurly or Braintree.",
"""
This is probably happening because you're using a non-empty value for `payment_provider_id` and integrating using our API. Most likely the fix to your problem is to set `payment_provider_id: null` for your users.
""",
"""
 - Try setting `payment_provider_id: null` if your users don't exist in a payment system
"""),
Issue(
"RS013",
"Unable create user on account. The `account_id` {{accountId}} already has reached the maximum number of users per account. (limit 1000 users per 'account_id')",
"""
There is a hard limit (1000) on the number of users that can exist in an account. You're encountering this error because of one your accounts (identified by `account_id`) has hit this limit and we can't create any more users in this account.There

This error should only happen in exceedingly rare circumstances in the real world. If you've encountered this error, then you may have erroneously grouped all of your users under a single `account_id` and should contact us.
""",
"""
 - Make sure you're using the right value for `account_id`
 - Read the article about [Shared vs Solo accounts](/shared-vs-solo-accounts)
"""),
Issue(
"RS014",
"An internal error occurred.",
"""
Something went wrong inside of the SaaSquatch system. This may be the result of some temporary outage, and in most cases you should just reload the page and try again. 
If you continue to see this error, then please get in touch.
""",
"""
 - Please contact us and include the details being used for this user (e.g. tenant_alias, user_id, account_id)
"""),
Issue(
"RS015",
"No tenant alias was provided or the provided tenant alias {{tenantAlias}} does not exist.",
"""
A `tenant_alias` is how we can identify your referral program seperately from the other companies using SaaSquatch. 
If you're encountering this error, it is usually this is just a matter of a type-o when you set up your Squatch.js code or some sort of rendering problem.
Recheck your code, or [Login to your SaaSquatch portal](https://app.referralsaasquatch.com) to fix this.
""",
"""
 - [Login to your SaaSquatch portal](https://app.referralsaasquatch.com) to lookup your `tenant_alias`
"""),
Issue(
"RS016",
"An internal error occurred.",
"""
Something went wrong inside of the SaaSquatch system. This may be the result of some temporary outage, and in most cases you should just reload the page and try again. 
If you continue to see this error, then please get in touch.
""",
"""
 - Please contact us and include the details being used for this user (e.g. tenant_alias, user_id, account_id)
"""),
Issue(
"RS017",
"An internal error occurred.",
"""
Something went wrong inside of the SaaSquatch system. This may be the result of some temporary outage, and in most cases you should just reload the page and try again. 
If you continue to see this error, then please get in touch.
""",
"""
 - Please contact us and include the details being used for this user (e.g. tenant_alias, user_id, account_id)
"""),
Issue(
"RS018",
"An unexpected error occurred while communicating with your payment system. This could be due to some unexpected downtime by the company who hosts your payment system or invalidated access credentials. ",
"""
This error can happen when the company that hosts your payment system (e.g. Stripe, Recurly, Braintree or Zuora) is having a temporary connection issue with their servers or data center. Most often these connectivity issues are temporary and service is restored quickly.

In some cases this problem might be due to some invalidated account credentials, a longer term outage of the payment system or some other sort of unexpected case while communicating with your payment system.

These types of errors should not continue to persist, so if you keep seeing this error, please get in touch.
""",
"""
 - Please try again. This is most likely a temporary communication issue between SaaSquatch's servers and the servers of the company that hosts your payment system.
 - If the problem persists, then please contact us and include the details being used for this user (e.g. tenant_alias, user_id, account_id)
"""),
Issue(
"RS019",
"The value of `payment_provider_id` can be set but it can't be updated. The account with `account_id={{accountId}}` already has `payment_provider_id={{payment_provider_id}}` and it can NOT be updated to `{{new payment_provider_id}}`",
"""
Once an account has had a value of `payment_provider_id` set to something other then null, then the `payment_provider_id` can not be updated.
You're receiving this error because the `account_id` that you're working with already has had a `payment_provider_id` being set.

You might be running into this case because you have a test account that is shared between multiple developers, and each developer starts using `account_id: 1` as the first account in their local system.
If that is the case, then you may want to consider an alternative strategy for identifying `account_id`.
""",
"""
 - Make sure that each `account_id` has it's own `payment_provider_id`
 - Make sure you're using the right value for `payment_provider_id`
"""),
Issue(
"RS020",
"An internal error occurred.",
"""
Something went wrong inside of the SaaSquatch system. This may be the result of some temporary outage, and in most cases you should just reload the page and try again. 
If you continue to see this error, then please get in touch.
""",
"""
 - Please contact us and include the details being used for this user (e.g. tenant_alias, user_id, account_id)
"""),
Issue(
"RS021",
"An internal error occurred.",
"""
Something went wrong inside of the SaaSquatch system. This may be the result of some temporary outage, and in most cases you should just reload the page and try again. 
If you continue to see this error, then please get in touch.
""",
"""
 - Please contact us and include the details being used for this user (e.g. tenant_alias, user_id, account_id)
"""),
Issue(
"RS022",
"`account_status: {{accountStatus}}` is not a valid value. Possible values are `PAID`, `TRAIL`, `FREE` or `CANCELLED`.",
"""
There are only a few values for `account_status` that are valid: `PAID`, `TRAIL`, `FREE` or `CANCELLED`. Make sure that you
don't have a type-o and that you're using one of these values in your code.

Also it's important to remember that `account_status` is an optional field and can be left out.
If you don't set a value it will keep whatever value was last set.
If you have never set a value then it will default to `TRIAL`. 
""",
"""
 - Use a valid value for `account_status` (one of `PAID`, `TRAIL`, `FREE` or `CANCELLED`)
 - `account_status` is optional and can be left out
""")
)

 // end of `all` issue list

}