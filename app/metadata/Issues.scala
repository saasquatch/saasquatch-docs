package metadata

/**
 * Represents a single issue
 * 
 */
case class Issue(code: String, message: String, howToFix: String);

object Issues {

    val all = List(
        Issue(
            "RS001",
            "We've detected that your using a legacy call that's been deprecated. At one point it was possible to use only `account_id` but now `payment_provider_id` is a required field. If your users don't have a `payment_provider_id`, then still include the field, just set it to null.",
            """
            
            """),
        Issue(
            "RS002",
            "For security reasons, you must include a `checksum` when `payment_provider_id` is set to null.",
            """
            
            """),
        Issue(
            "RS003",
            "`account_id` is required at initialization.",
            """
            
            """),
        Issue(
            "RS004",
            "`account_id` is required at initialization.",
            """
            
            """),
        Issue(
            "RS005",
            "For security reasons you must always include a `checksum` once secure mode has been enabled.",
            """
            
            """),
        Issue(
            "RS006",
            "The `checksum` value ({{checksum}}) is incorrect.",
            """
            
            """),
        Issue(
            "RS007",
            "We've detected that your using a legacy call that's been deprecated. At one point it was possible to use only `account_id` but now `payment_provider_id` is a required field. If your users don't have a `payment_provider_id`, then still include the field, just set it to null.",
            """
            
            """),
        Issue(
            "RS008",
            "We could not find a Recurly Account using the `payment_provider_id` you provided: {{paymentProviderId}}. `payment_provider_id` must be either a valid Recurly Account Id or null.",
            """
            
            """),
        Issue(

            "RS009",
            "We could not find a Stripe Customer using the `payment_provider_id` you provided: {{paymentProviderId}}. `payment_provider_id` must be a either valid Stripe Customer Id or null.",
            """
            
            """),
        Issue(
            "RS010",
            "We could not find a Braintree Customer using the `payment_provider_id` you provided: {{paymentProviderId}}. `payment_provider_id` must be a either valid Braintree Customer Id or null.",
            """
            
            """),
        Issue(
            "RS011",
            "We could not find a Zuora Account using the `payment_provider_id` you provided: {{paymentProviderId}}. `payment_provider_id` must be a either valid Zuora Account Id or null.",
            """
            
            """),
        Issue(
            "RS012",
            "The `payment_provider_id` that you provided is not valid. Just set `payment_provider_id: null` you're not using a payment system connector such as Stripe, Recurly or Braintree.",
            """
            
            """),
        Issue(
            "RS013",
            "Unable create user on account. The `account_id` {{accountId}} already has reached the maximum number of users per account. (limit 1000 users per 'account_id')",
            """
            
            """),
        Issue(
            "RS014",
            "An internal error occurred.",
            """
            
            """),
        Issue(
            "RS015",
            "No tenant alias was provided or the provided tenant alias {{tenantAlias}} does not exist.",
            """
            
            """),
        Issue(
            "RS016",
            "An internal error occurred.",
            """
            
            """),
        Issue(
            "RS017",
            "An internal error occurred.",
            """
            
            """),
        Issue(
            "RS018",
            "An unexpected error occurred while communicating with your payment system. This could be due to some unexpected downtime by the company who hosts your payment system or invalidated access credentials. ",
            """
            
            """),
        Issue(
            "RS019",
            "The value of `payment_provider_id` can be set but it can't be updated. The account with `account_id={{accountId}}` already has `payment_provider_id={{payment_provider_id}}` and it can NOT be updated to `{{new payment_provider_id}}`", ,
            """
            
            """),
        Issue(
            "RS020",
            "An internal error occurred.",
            """
            
            """),
        Issue(
            "RS021",
            "An internal error occurred.",
            """
            
            """)
            
    ) // end of `all` issue list

}