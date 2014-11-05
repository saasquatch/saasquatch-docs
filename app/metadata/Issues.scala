package metadata


/**
 * Represents a single issue
 * 
 */
case class Issue(code: String, message: String, howToFix: String){
    
    def howToFixHtml() = {
        // TODO: Cache pegdown instance for better cold-start performance
        val pegdown = new org.pegdown.PegDownProcessor()
        val htmlStr = pegdown.markdownToHtml(howToFix)
        play.api.templates.Html(htmlStr)
    }
    
}

object Issues {

    val all = List(
Issue(
"RS001",
"We've detected that your using a legacy call that's been deprecated. At one point it was possible to use only `account_id` but now `payment_provider_id` is a required field. If your users don't have a `payment_provider_id`, then still include the field, just set it to null.",
"""
 - Make sure you're using a valid `payment_provider_id`
"""),
Issue(
"RS002",
"For security reasons, you must include a `checksum` when `payment_provider_id` is set to null.",
"""
 - Read the article about [Signed Requests](/squatchjs/signed-requests)
 - Make sure to include a `checksum`
"""),
Issue(
"RS003",
"`account_id` is required at initialization.",
"""
 - Read the article about [Shared vs Solo accounts](/shared-vs-solo-accounts)
 - Make sure to include an `account_id`
"""),
Issue(
"RS004",
"`account_id` is required at initialization.",
"""
 - Read the article about [Shared vs Solo accounts](/shared-vs-solo-accounts)
 - Make sure to include an `account_id`
"""),
Issue(
"RS005",
"For security reasons you must always include a `checksum` once secure mode has been enabled.",
"""
 - Read the article about [Signed Requests](/squatchjs/signed-requests)
 - Make sure to include a `checksum`
"""),
Issue(
"RS006",
"The `checksum` value ({{checksum}}) is incorrect.",
"""
 - Check that you're using the right API key (test or live) to match the `tenant_alias` that you're using
 - Check that you're not including extra paramaters like `mode` or `fbShareImage` in your checksum generation
 - Find sample code in the article about [Signed Requests](/squatchjs/signed-requests)
"""),
Issue(
"RS007",
"We've detected that your using a legacy call that's been deprecated. At one point it was possible to use only `account_id` but now `payment_provider_id` is a required field. If your users don't have a `payment_provider_id`, then still include the field, just set it to null.",
"""
 - Make sure you're using a valid `payment_provider_id`
 - Try setting `payment_provider_id: null` if your users don't exist in a payment system
"""),
Issue(
"RS008",
"We could not find a Recurly Account using the `payment_provider_id` you provided: {{paymentProviderId}}. `payment_provider_id` must be either a valid Recurly Account Id or null.",
"""
 - Log in to your Recurly dashboard and make sure the `payment_provider_id` is a real Account ID
 - Try setting `payment_provider_id: null` if your users don't exist in Recurly
"""),
Issue(
"RS009",
"We could not find a Stripe Customer using the `payment_provider_id` you provided: {{paymentProviderId}}. `payment_provider_id` must be a either valid Stripe Customer Id or null.",
"""
 - Log in to your Stripe dashboard and make sure the `payment_provider_id` is a real Customer ID
 - Try setting `payment_provider_id: null` if your users don't exist in Stripe
"""),
Issue(
"RS010",
"We could not find a Braintree Customer using the `payment_provider_id` you provided: {{paymentProviderId}}. `payment_provider_id` must be a either valid Braintree Customer Id or null.",
"""
 - Log in to your Braintree dashboard and make sure the `payment_provider_id` is a real Customer ID
 - Try setting `payment_provider_id: null` if your users don't exist in Braintree
"""),
Issue(
"RS011",
"We could not find a Zuora Account using the `payment_provider_id` you provided: {{paymentProviderId}}. `payment_provider_id` must be a either valid Zuora Account Id or null.",
"""
 - Log in to your Zuora dashboard and make sure the `payment_provider_id` is a real Account ID
 - Try setting `payment_provider_id: null` if your users don't exist in Zuora
"""),
Issue(
"RS012",
"The `payment_provider_id` that you provided is not valid. Just set `payment_provider_id: null` you're not using a payment system connector such as Stripe, Recurly or Braintree.",
"""
 - Try setting `payment_provider_id: null` if your users don't exist in a payment system
"""),
Issue(
"RS013",
"Unable create user on account. The `account_id` {{accountId}} already has reached the maximum number of users per account. (limit 1000 users per 'account_id')",
"""
 - Make sure you're using the right value for `account_id`
 - Read the article about [Shared vs Solo accounts](/shared-vs-solo-accounts)
"""),
Issue(
"RS014",
"An internal error occurred.",
"""
 - Please contact us and include the details being used for this user (e.g. tenant_alias, user_id, account_id)
"""),
Issue(
"RS015",
"No tenant alias was provided or the provided tenant alias {{tenantAlias}} does not exist.",
"""
 - [Login to your SaaSquatch portal](https://app.referralsaasquatch.com) to lookup your `tenant_alias`
"""),
Issue(
"RS016",
"An internal error occurred.",
"""
 - Please contact us and include the details being used for this user (e.g. tenant_alias, user_id, account_id)
"""),
Issue(
"RS017",
"An internal error occurred.",
"""
 - Please contact us and include the details being used for this user (e.g. tenant_alias, user_id, account_id)
"""),
Issue(
"RS018",
"An unexpected error occurred while communicating with your payment system. This could be due to some unexpected downtime by the company who hosts your payment system or invalidated access credentials. ",
"""
 - Please try again. This is most likely a temporary communication issue between SaaSquatch's servers and the servers of the company that hosts your payment system.
 - If the problem persists, then please contact us and include the details being used for this user (e.g. tenant_alias, user_id, account_id)
"""),
Issue(
"RS019",
"The value of `payment_provider_id` can be set but it can't be updated. The account with `account_id={{accountId}}` already has `payment_provider_id={{payment_provider_id}}` and it can NOT be updated to `{{new payment_provider_id}}`",
"""
 - Make sure that each `account_id` has it's own `payment_provider_id`
 - Make sure you're using the right value for `payment_provider_id`
"""),
Issue(
"RS020",
"An internal error occurred.",
"""
 - Please contact us and include the details being used for this user (e.g. tenant_alias, user_id, account_id)
"""),
Issue(
"RS021",
"An internal error occurred.",
"""
 - Please contact us and include the details being used for this user (e.g. tenant_alias, user_id, account_id)
""")
            
    ) // end of `all` issue list

}