package metadata


object API {
 
    val v1methodList = List(
        ("GET",    "/api/v1/{TENANT_ALIAS}/coupon/{CODE}", "get_coupon", "Lookup a referral code"),
        ("POST",    "/api/v1/{TENANT_ALIAS}/coupon", "set_coupon", "Set a referral code"),

        ("POST",    "/api/v1/{TENANT_ALIAS}/accountsync",             "account_sync", "Update an account"),
        ("GET",    "/api/v1/{TENANT_ALIAS}/account/{ACCOUNT_ID}/reward", "get_account_reward", "Lookup an account credit"),

        ("POST",   "/api/v1/{TENANT_ALIAS}/subscription",       "create_webhook", "Create a webhook subscription"),
        ("DELETE", "/api/v1/{TENANT_ALIAS}/subscription/{URL}", "delete_webhook", "Delete a webhook subscription"),
        ("GET",    "/api/v1/{TENANT_ALIAS}/subscription",       "list_webhooks",  "List webhook subscriptions")
    );
    
    val v2methodList = List(
        ("GET",    "/api/v2/{TENANT_ALIAS}/reward/balance", "list_balances", "List reward balances"),
        ("POST",   "/api/v2/{TENANT_ALIAS}/reward/bulkredeem", "debit_balance", "Debit a reward balance"),
        
        ("GET",    "/api/v2/{TENANT_ALIAS}/reward", "get_reward", "Lookup a single reward"),
        ("POST",   "/api/v2/{TENANT_ALIAS}/reward/{ID}/redeem", "debit_reward", "Redeem a single reward"),

        ("GET",    "/api/v2/{TENANT_ALIAS}/code/{CODE}", "get_code", "Lookup a referral code")
    );

}