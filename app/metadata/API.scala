package metadata

object API {
 
    val v1methodList = List(

        ("GET",    "/api/v1/{TENANT_ALIAS}/code/{CODE}", "get_code", "Lookup a referral code"),
        ("POST",   "/api/v1/{TENANT_ALIAS}/accountsync", "account_sync", "Update an account "),

        ("GET",    "/api/v1/{TENANT_ALIAS}/reward/balance", "list_balances", "List reward balances"),
        ("POST",   "/api/v1/{TENANT_ALIAS}/credit/bulkredeem", "debit_balance", "Debit a reward balance"),
        
        ("GET",    "/api/v1/{TENANT_ALIAS}/reward", "list_rewards", "List an account's rewards"),
        ("POST",   "/api/v1/{TENANT_ALIAS}/credit/{ID}/redeem", "debit_reward", "Redeem a single reward"),

        ("GET",    "/api/v1/{TENANT_ALIAS}/discount/{CODE}", "get_coupon", "Lookup a discount code"),
        ("POST",   "/api/v1/{TENANT_ALIAS}/discount", "set_coupon", "Set a discount code"),
        ("GET",    "/api/v1/{TENANT_ALIAS}/account/{ACCOUNT_ID}/discount", "get_account_reward", "Lookup an account's discount"),

        ("POST",   "/api/v1/{TENANT_ALIAS}/subscription",       "create_webhook", "Create a webhook subscription"),
        ("DELETE", "/api/v1/{TENANT_ALIAS}/subscription/{URL}", "delete_webhook", "Delete a webhook subscription"),
        ("GET",    "/api/v1/{TENANT_ALIAS}/subscription",       "list_webhooks",  "List webhook subscriptions")

    );
    
    val discount = play.api.templates.Html("""<span class="label"><i class="fa fa-fw fa-dollar"></i> Discount</span>""");
    val freeTime = play.api.templates.Html("""<span class="label"><i class="fa fa-fw fa-calendar"></i> Free Time</span>""");
    val feature = play.api.templates.Html("""<span class="label"><i class="fa fa-fw fa-cogs"></i> Feature</span>""");
    val credit =  play.api.templates.Html("""<span class="label"><i class="fa fa-fw fa-bank"></i> Credit</span>""");

}