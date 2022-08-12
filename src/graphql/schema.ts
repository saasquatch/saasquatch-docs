export const schemaText = `
directive @hidden on SCALAR | OBJECT | FIELD_DEFINITION | ARGUMENT_DEFINITION | INTERFACE | UNION | ENUM | ENUM_VALUE | INPUT_OBJECT | INPUT_FIELD_DEFINITION
directive @category(category: String!) on FIELD_DEFINITION
directive @schema(url: String!) on FIELD_DEFINITION | ARGUMENT_DEFINITION

"""
A GraphQL query string
"""
scalar GraphQLQueryString
# An ISO 8601 formatted string duration. e.g. "P3Y6M4DT12H30M5S"
scalar IsoDuration
# An ISO 8601 interval. e.g. "2007-03-01T13:00:00Z/2008-05-11T15:30:00Z"
scalar IsoInterval
scalar JobType
# A JSON schema
scalar JsonSchema
# A JSONata expression
scalar JSONata
# A 64-bit integer
scalar Long
# A unique ID for a predefined reward. e.g. "p/program1/r/reward1" or "r/reward2"
scalar PredefinedRewardType
# The id of RewardUnitSettings. e.g. "USD" or "CASH/USD"
scalar RewardUnitSettingsId
# An ISO 3166-1 Alpha-2 country code. e.g. "CA" for Canada and "ES" for Spain
scalar RSCountryCode
# A 3-letter ISO 4217 currency code
scalar RSCurrencyCode
# A timestamp expressed as the number of milliseconds since epoch.
scalar RSDate
# An abitrary JSON node
scalar RSJsonNode
# An ISO 639-1 language code. e.g. "en" for English and "fr" for French
scalar RSLanguageCode
# A language-country locale pair separated by an underscore. e.g. "en_US"
scalar RSLocale
# A relative timeframe string based on relative time. e.g. "last_7_days" or "this_year"
scalar RSRelativeTimeframe
# A shallow JSON object
scalar RSShallowMap
scalar SegmentKey
scalar SegmentOperation
# A unique ID for a TranslatableAsset. e.g. "p/program1/r/reward1" or "w/widget1"
scalar TranslatableAssetId
# A unique ID for a TranslationInstance. e.g. "p/program1/r/reward1/en_CA" or "w/widget1/es_ES"
scalar TranslationInstanceId
# The type of a webhook. e.g. "user.created" or "reward.created"
scalar WebhookType
# Operation for adding/deleting WebhookTypes. e.g. "user.created" or "~reward.created"
scalar WebhookTypeOperation
# A unique ID for a widget type. e.g. "p/program1/w/widget1" or "w/widget2"
scalar WidgetType

# The operations under Query are operation that are side-effect free.
type Query {
  # The mathematic identity function. Useful for returning input variables.
  identityFunction(value: RSJsonNode): RSJsonNode @hidden
  """
  Lookup a user by its id and accountId
  """
  user(
    """The user's account id"""
    accountId: String!, 
    """The user's id"""
    id: String!): User @category(category: "Users")
  """
  List all the users in a tenant.
   - Can be filtered
   - Is paginated
  """
  users(
    filter: UserFilterInput
    # A very inefficient query string. This should be treated as deprecated.
    query: String
    timeZone: String
    timeZoneOffset: Int
    limit: Int! = 20
    offset: Int! = 0
    sortBy: [RSSortByInput!]
  ): UserList @category(category: "Users")
  # Lookup a single Account based on ID.
  account(accountId: String!): PaymentAccount
  # Preview a user creation
  previewUserCreation(
    previewUserCreationInput: PreviewUserCreationInput!
  ): PreviewUserCreationResult!
  # Lookup a reward by id
  reward(id: ID!): FlatReward
  # Lookup a list of rewards
  rewards(
    filter: RewardFilterInput
    timeZone: String
    timeZoneOffset: Int
    limit: Int! = 20
    offset: Int! = 0
    sortBy: [RSSortByInput!]
  ): FlatRewardList!
  # Lookup a referral by id
  referral(id: ID!): Referral
  """
  List all the referrals in a tenant.
   - Can be filtered
   - Is paginated
  """
  referrals(
    filter: ReferralFilterInput
    timeZone: String
    timeZoneOffset: Int
    limit: Int! = 20
    offset: Int! = 0
    sortBy: [RSSortByInput!]
  ): ReferralList
  # Get information for current tenant
  tenant: Tenant
  # Details of the current portal project in scope.
  portalProject: PortalProject
  activeProgramTrigger: ProgramTrigger @deprecated(reason: "Internal field")
  activeUser: User @deprecated(reason: "Internal field")
  activeFormSubmissionRecord: FormSubmissionRecord
    @deprecated(reason: "Internal field")
  activeFormInitialDataResult: FormInitialDataResult!
    @deprecated(reason: "Internal field")
  activeFormValidationResult: FormValidationResult!
    @deprecated(reason: "Internal field")
  # Get Maxmind geo data for an IP address
  geoData(ip: String!): RSJsonNode
  # Generate a set of unique SaaSquach IDs for use with rewards, referrals and the Program Engine.
  ids(length: Int!): [ID!]!
  jwks: RSJsonNode!
  dateTime(epochMilli: RSDate, timeZone: String! = "UTC"): ZonedDateTime!
  # Lookup the details for a currency
  currency(currencyCode: RSCurrencyCode!): RSCurrency
  # Lookup all the currencies supported by the system
  currencies(limit: Int! = 20, offset: Int! = 0): RSCurrencyList!
  # Lookup the details of a country
  country(countryCode: RSCountryCode!): RSCountry
  # Lookup all the countries supported by the system
  countries(limit: Int! = 20, offset: Int! = 0): RSCountryList!
  # Lookup the details of a language
  language(languageCode: RSLanguageCode!): RSLanguage
  # Lookup all the languages supported by the system
  languages(limit: Int! = 20, offset: Int! = 0): RSLanguageList!
  """
  List all programs installed in the current tenant.
   - Is paginated
   - Can be filtered
  """
  programs(
    filter: ProgramFilterInput
    timeZone: String
    timeZoneOffset: Int
    limit: Int! = 20
    offset: Int! = 0
  ): ProgramList!
  # Lookup an individual program
  program(id: ID!): Program
  # Get all the program templates installable for the current tenant
  programTemplates: [ProgramTemplate!]!
  """
  Get the JWT token for an integration.
  Used in the SaaSquatch portal for providing authentication to the integrations connected to an account.
  """
  integrationToken(
    # The human readable name of the integration
    name: String!
    # The optional integration service or clientId
    service: String
  ): String!
  """
  List the custom codes
   - Is paginated
   - Can be filtered by their use
  """
  customCodes(
    predefinedRewardType: PredefinedRewardType!
    used: Boolean! = false
    limit: Int! = 20
    offset: Int! = 0
  ): CustomCodeList
  """
  List all of the integrations that can be enabled in a tenant, and details about their connection status.
   - Is paginated
  """
  integrations(
    type: IntegrationType
    limit: Int! = 20
    offset: Int! = 0
  ): TenantIntegrationList!
  integration(service: String!): TenantIntegration
  # Get the first 100 TranslatableAssets
  translatableAssets: [TranslatableAsset!]!
    @deprecated(reason: "Use TranslatableAssetList instead.")
  """
  Look up all the translatable assets in a Tenant.
  Useful for internationalization (i18n). This returns a node about things that can be translated,
  and for each can query the Graph connections to retrieve the translated copies for each language.
  """
  translatableAssetList(
    limit: Int! = 20
    offset: Int! = 0
  ): TranslatableAssetList!
  # Look up an individual translation of a translatable asset.
  translationInstance(id: TranslationInstanceId!): TranslationInstance
  """
  List all the import, export and batch jobs in the tenant.
  Useful for seeing if there are any long-running jobs still active.
   - Is paginated
   - Can be filtered
  """
  jobs(
    filter: JobFilterInput
    timeZone: String
    timeZoneOffset: Int
    limit: Int! = 20
    offset: Int! = 0
  ): JobList!
  """
  Lookup an individual import, export or batch job given it's ID.
  Useful for integrations and data synchronization proceses to poll for the status of a job.
  Can also use the \`job.completed\` webhook.
  """
  job(id: ID!): Job
  jobToken(id: ID!): JobToken!
  """
  Lookup a single segment.
  Useful for seeing if a segment is in use, details about it, and showing the segment
  metadata in the user interface.
  """
  segment(key: SegmentKey!): Segment
  """
  List all segments
  Useful for seeing which segments are in use, and details about their use.
   - Is paginated
  """
  segments(limit: Int! = 20, offset: Int! = 0): SegmentList!
  """
  List of all user metrics.
  Useful for seeing which custom fields are being automatically calculated.
   - Is paginated
  """
  userMetrics(limit: Int! = 20, offset: Int! = 0): UserMetricList!
  """
  List of all custom fields
  Useful for seeing which custom fields are currently in use, details about them, and showing that in the user interface.
   - Is paginated
  """
  customFields(limit: Int! = 20, offset: Int! = 0): CustomFieldList!
  """
  Same as mutation->logUserEvent, but it doesn't apply the side effects,
  and it returns all the side effects as a preview.
  - Useful for confirming that programs are configured as desired.
  - Useful for pre-validating data to be submitted before manually submitting data.
  """
  previewUserEvent(userEventInput: UserEventInput!): UserEventResult!
  # Given a User ID and Account Id, generates a non-reversible hash for GDPR opt-out tracking.
  calculateUserDoNotTrackIdentifierHash(
    id: String!
    accountId: String!
  ): String!
  # List all users that are in the Do Not Track list, by their hashed non-reversible identifiers.
  userDoNotTrackIdentifiers(
    limit: Int! = 20
    offset: Int! = 0
  ): UserDoNotTrackIdentifierList!
  """
  List all emails sent, queued or attempted by a program.
  Useful for auditing if emails were sent, their status.
   - Is paginated
   - Can be filtered
  """
  programEmailTransactions(
    filter: ProgramEmailTransactionFilterInput
    timeZone: String
    timeZoneOffset: Int
    limit: Int! = 20
    offset: Int! = 0
    sortBy: [RSSortByInput!]
  ): ProgramEmailTransactionList!
  """
  List all event types
  Useful for checking which event types are currently in use, and details about those events.
   - Is paginated
  """
  userEvents(
    # Only one field can be filtered here
    filter: UserEventDataFilterInput
    limit: Int! = 20
    offset: Int! = 0
    sortBy: [RSSortByInput!]
  ): UserEventDataList!
  # List all the event keys that have been seen by this tenant
  userEventKeys(limit: Int! = 20, offset: Int! = 0): UserEventKeyList!
  userEventFieldsSchema(key: String!): JsonSchema
    @deprecated(reason: "Internal field")
  """
  Preview the moderation a set of graph nodes.
  Useful for fraud management, this lets you preview the side-effects of canceling
  a set of referrals, rewards, user events or any other graph node.

   - Is paginated
   - Can be filtered
  """
  moderateGraphNodes(
    graphNodeType: GraphNodeType!
    # Can be RewardFilterInput, ProgramEmailTransactionFilterInput,
    # ReferralFilterInput, or UserEventDataFilterInput depending on the type
    filter: RSJsonNode!
    timeZone: String
    timeZoneOffset: Int
    limit: Int! = 20
    offset: Int! = 0
    moderationInput: ModerationInput!
  ): GraphNodeModerationResultList!
  """
  Lookup webhook history.
  Useful for auditing webhook delivery failures.
  Note that we only keep track of webhooks for 30 days.
  """
  webhooks(
    filter: WebhookFilterInput
    timeZone: String
    timeZoneOffset: Int
    limit: Int! = 20
    offset: Int! = 0
  ): WebhookList!
  """
  Lists all the URLs that are currently subscribed to receive events via webhooks
  Useful for managing integrations and their connections. Note that integrations can also
  use managed webhooks to ensure the webhook exists as long as the integration is enabled.
  """
  webhookSubscriptions(
    limit: Int! = 20
    offset: Int! = 0
  ): WebhookSubscriptionList!
  """
  Lookup one RewardUnitSettings by id.
  Useful for seeing details about a type of reward in use.
  """
  rewardUnitSettings(id: RewardUnitSettingsId!): RewardUnitSettings
  """
  List all Reward Unit settings.
  Useful for seeing which reward units are in use, details about them, and to show that in the user interface.
  """
  rewardUnitSettingsList(
    limit: Int! = 20
    offset: Int! = 0
  ): RewardUnitSettingsList!
  analyticsKey: String! @deprecated(reason: "Internal field.")
  # Lookup one GlobalRewardConfig by key
  globalRewardConfig(key: String!): GlobalRewardConfig
  # Lookup all the GlobalRewardConfigs
  globalRewardConfigs(
    limit: Int! = 20
    offset: Int! = 0
  ): GlobalRewardConfigList!
  # Lookup all the IsPredefinedRewards
  predefinedRewards(limit: Int! = 20, offset: Int! = 0): IsPredefinedRewardList!
  # Lookup a link code
  linkCode(linkCode: String!): LinkCode
  # Lookup a referral code
  referralCode(referralCode: String!): ReferralCode
  # Check whether the system will block an email
  isBlockedEmail(email: String!): IsBlockedEmailResult!
  # Lookup a form by key
  form(key: String!): Form
  # Lookup all the forms
  forms(limit: Int! = 20, offset: Int! = 0, sortBy: [RSSortByInput!]): FormList!
  # Validate form data against a form
  validateForm(formValidationInput: FormValidationInput!): FormValidationResult!
  # Preview the form meta of a potentially unsaved form
  formMetaPreview(formInput: FormInput!): FormMeta!
  # Lookup a single form submission record by id
  formSubmissionRecord(id: ID!): FormSubmissionRecord
  # Lookup form submission records for this tenant
  formSubmissionRecords(
    filter: FormSubmissionRecordFilterInput
    sortBy: [RSSortByInput!]
    timeZone: String
    timeZoneOffset: Int
    limit: Int! = 20
    offset: Int! = 0
  ): FormSubmissionRecordList!
  # Lookup a GlobalEmailConfig by key
  globalEmailConfig(key: String!): GlobalEmailConfig
  # Lookup all the GlobalEmailConfigs
  globalEmailConfigs(
    limit: Int! = 20
    offset: Int! = 0
    sortBy: [RSSortByInput!]
  ): GlobalEmailConfigList!
  # Lookup a GlobalWidgetConfig by key
  globalWidgetConfig(key: String!): GlobalWidgetConfig
  # Lookup all the GlobalWidgetConfigs
  globalWidgetConfigs(
    limit: Int! = 20
    offset: Int! = 0
    sortBy: [RSSortByInput!]
  ): GlobalWidgetConfigList!
  # Render a widget
  renderWidget(
    user: UserIdInput
    widgetType: WidgetType
    engagementMedium: UserEngagementMedium
    locale: RSLocale
  ): WidgetResponse!
  # Format the pretty value of an arbitrary reward unit
  formatRewardPrettyValue(
    # The value of the rewrad to format
    value: Int!
    # The unit of the reward to format
    unit: String!
    # The locale to use for formatting
    locale: RSLocale
    # The type of the formatting
    formatType: RewardValueFormatType! = UNIT_FORMATTED
  ): String!
  # Get the user leaderboard by type
  userLeaderboard(
    # The type of the user leaderboard. Built-in types include topStartedReferrers,
    # topConvertedReferrers, and topPointEarners.
    type: String!
    # The filter for this user leaderboard
    filter: UserLeaderboardFilterInput
  ): UserLeaderboard!
  # Access all the user leaderboard types
  userLeaderboards: UserLeaderboards!
  # Validate a JobInput
  validateJobCreation(jobInput: JobInput!): ValidateJobCreationResult!
  managedIdentitySession: ManagedIdentitySessionResult
  # Get the microsite hosting config
  micrositeHostingConfig: MicrositeHostingConfig!
  # Get the managed identity config
  managedIdentityConfig: ManagedIdentityConfig!
  # Lookup a microsite layout config by key
  micrositeLayoutConfig(key: String!): MicrositeLayoutConfig
  # List microsite layout configs
  micrositeLayoutConfigs(
    limit: Int! = 20
    offset: Int! = 0
  ): MicrositeLayoutConfigList!
  # Lookup a microsite page config by key
  micrositePageConfig(key: String!): MicrositePageConfig
  # List microsite page configs
  micrositePageConfigs(
    limit: Int! = 20
    offset: Int! = 0
  ): MicrositePageConfigList!
  """
  Renders a microsite page by its URL path. The rendered result contains the HTML for the page
  as well as the HTML for all of the templates that it depends on.

  The returned HTML is translated into the given locale (if translations exist).
  """
  renderMicrositePage(
    urlPath: String!
    locale: RSLocale
  ): RenderMicrositePageResult!
  # Get a microsite template by its key
  micrositeTemplate(key: String!): MicrositeTemplate
  # List microsite templates
  micrositeTemplates(limit: Int! = 20, offset: Int! = 0): MicrositeTemplateList!
  """
  Details about the subject currently accessing the API.
  See the \`Viewer\` type for more details.
  """
  viewer: Viewer
}

type Mutation {
  # Creates a new program from a Program Template ID
  createProgram(id: ID, name: String!, programTemplateId: String!): Program! @category(category: "Programs")
  # Updates an existing program by id
  updateProgram(programInput: ProgramInput!): Program
  updateProgramId(id: ID!, newId: ID!): Program
  deleteProgram(id: String!): ProgramDeleteResult!
  # Create a user. If the user already exists, this mutation will cause an error.
  createUser(userInput: UserInput!): User!
  # Create a user or update the user if the user already exists.
  upsertUser(userInput: UserInput!): User!
  # Batched version of upsertUser. It allows a maximum of 100 UserInputs.
  upsertUsers(userInputs: [UserInput!]!): [UserUpsertResult!]!
  # Classic only. Creates an anonymous cookie user that can be upgraded to a regular
  createCookieUser(userInput: UserInput!): User!
    @deprecated(reason: "The cookie no longer works in most browsers.")
  """
  Sends a preview of either a program email (if programId is specified) or a global email.

  The placeholders in the template will not be replaced with resolved values as no context
  is speficied, however this can be used to ensure that the general layout of an email looks
  correct in email clients.
  """
  sendPreviewEmail(
    programId: String
    emailKey: String!
    values: RSJsonNode
    toAddress: String!
    locale: String
  ): Boolean! @deprecated(reason: "Internal field.")
  updateTenant(tenantInput: TenantInput!): Tenant!
  updateTenantSettings(
    tenantSettingsInput: TenantSettingsInput!
  ): TenantSettings!
  testProgramSchedule(epochMilli: Long): [RSJsonNode!]!
  # Bulk custom code uploading for fueltank rewards
  addCustomCodes(data: CustomCodesInput!): CustomCodeInsertResult!
  upsertCustomCodes(data: CustomCodesInput!): CustomCodeUpsertResult!
  deleteCustomCodes(
    data: CustomCodesInput!
    createdBefore: RSDate
  ): CustomCodeDeleteResult!
  upsertTranslationInstance(
    translationInstanceInput: TranslationInstanceInput!
  ): TranslationInstance!
  deleteTranslationInstance(
    id: TranslationInstanceId!
  ): TranslationInstanceDeleteResult!
  createJob(jobInput: JobInput!): Job!
  deleteJob(id: ID!): JobDeleteResult!
  upsertSegment(segmentInput: SegmentInput!): Segment!
  upsertUserMetric(userMetricInput: UserMetricInput!): UserMetric!
  deleteUserMetric(customFieldKey: String!): UserMetricDeleteResult!
  logUserEvent(userEventInput: UserEventInput!): UserEventResult!
  # Bulk version of logUserEvent
  logUserEvents(userEventInputs: [UserEventInput!]!): [BulkUserEventResult!]!
  blockUser(accountId: String!, id: String!): UserBlockingResult!
  unblockUser(accountId: String!, id: String!): UserBlockingResult!
  deleteUser(
    accountId: String!
    id: String!
    doNotTrack: Boolean! = false
    # Whether the account should be preserved if there are no users left
    preserveEmptyAccount: Boolean! = true
  ): Boolean!
  deleteAccount(accountId: String!, doNotTrack: Boolean! = false): Boolean!
  deleteUserDoNotTrackIdentifier(
    id: String!
    accountId: String!
  ): UserDoNotTrackIdentifierDeleteResult!
  createReward(
    # https://docs.referralsaasquatch.com/api/methods/#create_reward
    rewardInput: RSJsonNode
    # The key for the GlobalRewardConfig to create this reward from
    globalRewardKey: String
    userId: String!
    accountId: String!
    # The optional initial RewardStatus
    status: RewardStatus
  ): FlatReward!
  updateRewardStatus(id: ID!, status: RewardStatus!): FlatReward!
  # Fully or partially redeem a credit reward
  redeemRewardCredit(
    # The reward id to redeem
    id: ID!
    # Additional options for redeeming the reward
    redeemCreditInput: RedeemCreditInput!
  ): RedeemCreditResult!
  # Redeem one or multiple rewards of the given value for a user
  redeemUserCredit(
    userId: String!
    accountId: String!
    # Additional options for redeeming the reward
    redeemCreditInput: RedeemCreditInput!
  ): RedeemCreditResult!
  # Exchange a set amount of credit for another reward
  exchangeReward(
    exchangeRewardInput: ExchangeRewardInput!
  ): ExchangeRewardResult!
  updateProgramEmailTransactionStatus(
    id: ID!
    status: EmailTransactionStatus!
  ): ProgramEmailTransaction!
  deleteProgramEmailTransaction(id: ID!): ProgramEmailTransactionDeleteResult!
  createUserAnalyticsEvent(eventMeta: UserAnalyticsEvent!): Boolean!
  moderateGraphNodes(
    graphNodeType: GraphNodeType!
    # Can be RewardFilterInput, ProgramEmailTransactionFilterInput,
    # ReferralFilterInput, or UserEventDataFilterInput depending on the type
    filter: RSJsonNode!
    timeZone: String
    timeZoneOffset: Int
    limit: Int! = 20
    offset: Int! = 0
    moderationInput: ModerationInput!
  ): GraphNodeModerationResultList!
  updatePortalProject(portalProjectInput: PortalProjectInput!): PortalProject!
  # Create or update a tenant integration
  upsertIntegration(
    integrationInput: TenantIntegrationInput!
  ): TenantIntegration
  deleteIntegration(service: String!): TenantIntegrationDeleteResult!
  # Patch the config of a TenantIntegration
  patchIntegrationConfig(
    service: String!
    # JSON Patch format (http://jsonpatch.com/)
    configPatch: RSJsonNode!
  ): TenantIntegration!
  # Subscribes a URL to receive events via webhooks
  upsertWebhookSubscription(
    webhookSubscriptionInput: WebhookSubscriptionInput!
  ): WebhookSubscription!
  # Removes a URL from receiving events via webhooks
  deleteWebhookSubscription(
    endpointUrl: String!
  ): WebhookSubscriptionDeleteResult!
  # Sends a test event to the specified webhook
  testWebhookSubscription(endpointUrl: String!): TestWebhookSubscriptionResult!
  # Upsert external metadata for a reward
  upsertRewardMeta(rewardMetaInput: RewardMetaInput!): FlatReward!
  # Upsert a RewardUnitSettings
  upsertRewardUnitSettings(
    rewardUnitSettingsInput: RewardUnitSettingsInput!
  ): RewardUnitSettings!
  # Delete a RewardUnitSettings
  deleteRewardUnitSettings(
    id: RewardUnitSettingsId!
  ): RewardUnitSettingsDeleteResult!
  # Clear the current tenant data if it's a test tenant
  deleteTestTenantData: Boolean!
  # Set this tenant to hide classic or not
  setHideClassic(hideClassic: Boolean!): Boolean!
    @deprecated(reason: "Internal field.")
  # Upsert a GlobalRewardConfig
  upsertGlobalRewardConfig(
    globalRewardConfigInput: GlobalRewardConfigInput!
  ): GlobalRewardConfig!
  # Delete a GlobalRewardConfig
  deleteGlobalRewardConfig(key: String!): GlobalRewardConfigDeleteResult!
  # Insert a new share link code
  addShareLinkCode(
    addShareLinkCodeInput: AddShareLinkCodeInput!
  ): AddShareLinkCodeResult!
  # Delete a link code
  deleteLinkCode(linkCode: String!): LinkCodeDeleteResult!
  # Make a share link code primary for its referral code
  makeShareLinkCodePrimaryForReferralCode(
    linkCode: String!
  ): MakeShareLinkCodePrimaryResult!
  # Make a share link code primary for its program
  makeShareLinkCodePrimaryForProgram(
    linkCode: String!
  ): MakeShareLinkCodePrimaryResult!
  # Insert a new referral code
  addReferralCode(
    addReferralCodeInput: AddReferralCodeInput!
  ): AddReferralCodeResult!
  # Delete a referral code
  deleteReferralCode(referralCode: String!): ReferralCodeDeleteResult!
  # Make a referral code primary for its program
  makeReferralCodePrimaryForProgram(
    referralCode: String!
  ): MakeReferralCodePrimaryResult!
  # Edit a share link code
  editShareLinkCode(
    editShareLinkCodeInput: EditShareLinkCodeInput!
  ): EditShareLinkCodeResult!
  # Edit a referral code
  editReferralCode(
    editReferralCodeInput: EditReferralCodeInput!
  ): EditReferralCodeResult!
  # Create a form
  createForm(formInput: FormInput!): Form!
  # Update a form
  updateForm(formInput: FormInput!): Form!
  # Delete a form by key. A form with more than 1000 submissions cannot be deleted.
  deleteForm(key: String!): FormDeleteResult!
  # Submit a form
  submitForm(formSubmissionInput: FormSubmissionInput!): FormSubmissionResult!
  # Delete a FormSubmissionRecord by id
  deleteFormSubmissionRecord(id: ID!): FormSubmissionRecordDeleteResult!
  # Create a GlobalEmailConfig
  createGlobalEmailConfig(
    globalEmailConfigInput: GlobalEmailConfigInput!
  ): GlobalEmailConfig!
  # Update a GlobalEmailConfig
  updateGlobalEmailConfig(
    globalEmailConfigInput: GlobalEmailConfigInput!
  ): GlobalEmailConfig!
  # Delete a GlobalEmailConfig by key
  deleteGlobalEmailConfig(key: String!): GlobalEmailConfigDeleteResult!
  # Create a GlobalWidgetConfig
  createGlobalWidgetConfig(
    globalWidgetConfigInput: GlobalWidgetConfigInput!
  ): GlobalWidgetConfig!
  # Update a GlobalWidgetConfig
  updateGlobalWidgetConfig(
    globalWidgetConfigInput: GlobalWidgetConfigInput!
  ): GlobalWidgetConfig!
  # Delete a GlobalWidgetConfig by key
  deleteGlobalWidgetConfig(key: String!): GlobalWidgetConfigDeleteResult!
  # Queue a global email for sending
  queueGlobalEmail(
    queueGlobalEmailInput: QueueGlobalEmailInput!
  ): ProgramEmailTransaction!
  # Registers a user with managed identity, given an email and password
  registerManagedIdentityWithEmailAndPassword(
    registerManagedIdentityWithEmailAndPasswordInput: RegisterManagedIdentityWithEmailAndPasswordInput!
  ): ManagedIdentityAuthenticationResult!
    @deprecated(reason: "Use registration forms instead.")
  # Authenticate a user with managed identity, given an email and password
  authenticateManagedIdentityWithEmailAndPassword(
    authenticateManagedIdentityWithEmailAndPasswordInput: AuthenticateManagedIdentityWithEmailAndPasswordInput!
  ): ManagedIdentityAuthenticationResult!
  # Change a user's managed identity password
  changeManagedIdentityPassword(
    changeManagedIdentityPasswordInput: ChangeManagedIdentityPasswordInput!
  ): ManagedIdentitySuccessResult!
  """
  Request a new email verification email for a given identity.

  If no managed identity exists with the given email, or that identity is already verified,
  no email will be sent.
  """
  requestManagedIdentityVerificationEmail(
    requestManagedIdentityVerificationEmailInput: RequestManagedIdentityEmailInput!
  ): ManagedIdentitySuccessResult!
  # Verify a managed identity email address with an out-of-band (OOB) code
  verifyManagedIdentityEmail(
    verifyManagedIdentityEmailInput: VerifyManagedIdentityEmailInput!
  ): ManagedIdentitySuccessResult!
  """
  Request a password reset email for a given identity.

  If no managed identity exists with the given email, no email will be sent.
  """
  requestManagedIdentityPasswordResetEmail(
    requestManagedIdentityPasswordResetEmailInput: RequestManagedIdentityEmailInput!
  ): ManagedIdentitySuccessResult!
  # Verify a managed identity password reset out-of-band (OOB) code
  verifyManagedIdentityPasswordResetCode(
    verifyManagedIdentityPasswordResetCodeInput: VerifyManagedIdentityPasswordResetCodeInput!
  ): ManagedIdentitySuccessResult!
  # Change the password of a managed identity, given a new password and an out-of-band (OOB) code
  resetManagedIdentityPassword(
    resetManagedIdentityPasswordInput: ResetManagedIdentityPasswordInput!
  ): ManagedIdentityAuthenticationResult!
  # Set the current tenant's microsite hosting config
  setMicrositeHostingConfig(
    # Schema defined at https://fast.ssqt.io/npm/@saasquatch/schema/json/HostedPortalConfig.schema.json
    config: RSJsonNode!
      @schema(
        url: "https://fast.ssqt.io/npm/@saasquatch/schema/json/HostedPortalConfig.schema.json"
      )
  ): MicrositeHostingConfig!
  # Set the current tenant's managed identity config
  setManagedIdentityConfig(
    # Schema defined at https://fast.ssqt.io/npm/@saasquatch/schema/json/ManagedIdentityConfig.schema.json
    config: RSJsonNode!
  ): ManagedIdentityConfig!
  """
  Create a new microsite layout config
   - The provided key must uniquely identify the new layout config
   - The parentKey (if provided) must refer to an existing layout config
  """
  createMicrositeLayoutConfig(
    micrositeLayoutConfigInput: MicrositeLayoutConfigInput!
  ): MicrositeLayoutConfig!
  # Update a microsite layout config
  updateMicrositeLayoutConfig(
    micrositeLayoutConfigInput: MicrositeLayoutConfigInput!
  ): MicrositeLayoutConfig!
  # Delete a microsite layout config
  deleteMicrositeLayoutConfig(key: String!): MicrositeLayoutConfigDeleteResult!
  """
  Create a new microsite page config
   - The provided key must uniquely identify the new page config
   - The provided urlPath must be unique amongst all pages
  """
  createMicrositePageConfig(
    micrositePageConfigInput: MicrositePageConfigInput!
  ): MicrositePageConfig!
  # Update a microsite page config
  updateMicrositePageConfig(
    micrositePageConfigInput: MicrositePageConfigInput!
  ): MicrositePageConfig!
  # Delete a microsite page config
  deleteMicrositePageConfig(key: String!): MicrositePageConfigDeleteResult!
  """
  Auto setup a microsite, creating all of the components required for the given template.

  Requirements:
   - Microsite hosting has never been enabled
   - Managed identity has never been enabled
   - That none of the forms, emails, layouts, or pages that would be created by the template
     already exist
  """
  autoSetupMicrosite(templateKey: String!): AutoSetupMicrositeResult!
  # Destroy all microsite components from any microsite template. Useful for testing.
  destroyMicrosite: Boolean! @deprecated(reason: "Internal field.")
}

# User ID input that identifies a user
input UserIdInput {
  # User ID
  id: String!
  # Account ID
  accountId: String!
}

# A SaaSquatch form
type Form {
  # The form key
  key: String!
  # The human readable name of the form
  name: String
  # The type of the form
  type: FormType!
  # The JSON schema used for validating form data
  schema: JsonSchema
  # The date this form was created. This field is auto generated.
  dateCreated: RSDate!
  # The date this form was last modified. This field is auto generated.
  dateModified: RSDate
  # The JSONata expression that produces the initial data
  initialDataTransformer: JSONata
  # The JSONata expression that checks if this form is enabled
  isEnabledPredicate: JSONata
  # Email addresses to receive successful form submission notifications
  successNotificationEmails: [String!]!
  # Email addresses to receive failed form submission notifications
  failureNotificationEmails: [String!]!
  # Segment operations to apply to a user for successful form submissions
  successSegments: [SegmentOperation!]!
  # Segment operations to apply to a user for failed form submissions
  failureSegments: [SegmentOperation!]!
  # Detailed information of successSegments
  successSegmentsDetails: [SegmentOperationDetails!]!
  # Detailed information of failureSegments
  failureSegmentsDetails: [SegmentOperationDetails!]!
  # The meta of this form
  meta: FormMeta!
  # Get the initial data of this form in the current context
  initialData(
    # Optional user identifier
    user: UserIdInput
  ): FormInitialDataResult!
  # Get the integration specific config for a service
  integrationConfig(service: String!): RSJsonNode
  # Get all the integration specific configs of this form
  integrationConfigs: [FormIntegrationConfig!]!
  # The global level config
  globalConfig: RSJsonNode!
  # Whether anonymous submissions without identified users are allowed
  allowAnonymousSubmissions: Boolean!
}

# Input of submitForm
input FormSubmissionInput {
  # The form key
  key: String!
  # The form data to submit
  formData: RSJsonNode!
  # Optional user identifier
  user: UserIdInput
}

# Input of validateForm
input FormValidationInput {
  # The form key
  key: String!
  # The form data to submit
  formData: RSJsonNode!
  # Optional user identifier
  user: UserIdInput
}

# The result of the form initial data request
type FormInitialDataResult {
  # The initial data result
  initialData: RSJsonNode
  # Whether this form is enabled in the current context
  isEnabled: Boolean!
  # The optional error message for why a form is disabled
  isEnabledErrorMessage: String
  # The results from individual form handlers
  results: [FormHandlerInitialDataResultResponse!]!
  # The form for this initial data result
  form: Form!
}

# The response of a form handler initial data request
union FormHandlerInitialDataResultResponse =
    FormHandlerInitialDataResult
  | FormHandlerError

# The single result from a form handler of an initial data request
type FormHandlerInitialDataResult {
  # The input data for initial data of this form handler
  inputData: RSJsonNode
  # The form handler
  formHandler: FormHandler
}

# A form handler
type FormHandler {
  # The name of this form handler
  name: String
  # The endpoint URL of this form handler
  endpointUrl: String!
  # The integration that manages this form handler
  integration: TenantIntegration
  # The namespace of this FormHandler.
  # It should match the namespace of its integration, if there is one.
  namespace: String!
  # Get the meta for a form key
  meta(key: String!): FormHandlerMetaResponse!
}

# The meta information of a form
type FormMeta {
  # The meta for individual form handlers
  formHandlerMeta: [FormHandlerMetaResponse!]!
  # The JSON schema of the input data for initial data
  inputDataSchema: JsonSchema!
}

# The response of a form handler meta request
union FormHandlerMetaResponse = FormHandlerMeta | FormHandlerError

# Meta result from a form handler
type FormHandlerMeta {
  # The actions this form handler is supposed to perform
  actions: [FormHandlerMetaAction!]!
  # The input data this form handler is supposed to provide
  inputData: [FormHandlerMetaInputDataInfo!]!
  # The schema of the input data provided by this form handler
  inputDataSchema: JsonSchema!
  # The form handler
  formHandler: FormHandler
}

# The form handler action metadata
type FormHandlerMetaAction {
  # The action name
  name: String!
  # Optional description
  description: String
}

# The form handler input data metadata
type FormHandlerMetaInputDataInfo {
  # The input data field name
  name: String!
  # Optional description
  description: String
}

# Pagination list for Form
type FormList {
  data: [Form!]!
  count: Int!
  totalCount: Long!
}

# Result for deleteForm
type FormDeleteResult {
  deletedCount: Long!
}

# Integration specific config for a form
type FormIntegrationConfig {
  # The integration service
  service: String!
  # The config JSON
  config: RSJsonNode
  # The integration corresponding to the service
  integration: TenantIntegration
}

# Input for a SaaSquatch form
input FormInput {
  # The form key
  key: String!
  # The human readable name of the form
  name: String
  # The type of the form
  type: FormType
  # The JSON schema used for validating form data
  schema: JsonSchema
  # The JSONata expression that produces the initial data
  initialDataTransformer: JSONata
  # The JSONata expression that checks if this form is enabled
  isEnabledPredicate: JSONata
  # Email addresses to receive successful form submission notifications
  successNotificationEmails: [String!]
  # Email addresses to receive failed form submission notifications
  failureNotificationEmails: [String!]
  # Segment operations to apply to a user for successful form submissions
  successSegments: [SegmentOperation!]
  # Segment operations to apply to a user for failed form submissions
  failureSegments: [SegmentOperation!]
  # All the integration configs of this form
  integrationConfigs: [FormIntegrationConfigInput!]
  # The global level config
  globalConfig: RSJsonNode
  # Whether anonymous submissions without identified users are allowed. False by default.
  allowAnonymousSubmissions: Boolean
}

enum FormType {
  """A custom form with a user-specified schema"""
  CUSTOM
  """A registration form to be used with microsite registration"""
  REGISTRATION
}

# Input for FormIntegrationConfig
input FormIntegrationConfigInput {
  # The integration service
  service: String!
  # The JSON config
  config: RSJsonNode
}

# Unified error type from a form handler
type FormHandlerError {
  # The form handler
  formHandler: FormHandler
  # The type of this error
  errorType: FormHandlerErrorType!
  # The human readable error message
  error: String
  # The error code defined by the form handler
  errorCode: String
}

# The type of a form handler error
enum FormHandlerErrorType {
  # The form handler cannot be connected
  CONNECTION_ERROR
  # The form handler can be connected, but returns unexpected status codes
  UNEXPECTED_STATUS_CODE
  # The form handler returns with invalid response format
  INVALID_RESPONSE
  # The form handler returns a valid error
  DOWNSTREAM_ERROR
}

# Result of a form submission
type FormSubmissionResult {
  # Whether this submission is valid
  success: Boolean!
  # Individual results from form handlers
  results: [FormHandlerSubmissionResponse!]!
  # The resulting form submission record
  formSubmissionRecord: FormSubmissionRecord
}

# Result of a form submission
type FormValidationResult {
  # Whether this validation is valid
  valid: Boolean!
  # Individual results from form handlers
  results: [FormHandlerValidationResponse!]!
}

# The response of a form handler submission request
union FormHandlerSubmissionResponse =
    FormHandlerSubmissionResult
  | FormHandlerError

# Submission result from a form handler
type FormHandlerSubmissionResult {
  # The form handler
  formHandler: FormHandler
  # The JSON result from the form handler
  result: RSJsonNode!
}

# The response of a form handler validation request
union FormHandlerValidationResponse =
    FormHandlerValidationResult
  | FormHandlerError

# Validation result from a form handler
type FormHandlerValidationResult {
  # The form handler
  formHandler: FormHandler
  # The JSON result from the form handler
  result: RSJsonNode!
}

# A record for a form submission
type FormSubmissionRecord {
  """Randomly generated unique ID"""
  id: ID!
  """The key of the form that did the submission"""
  formKey: String!
  """The schema of the form at the time of the submission"""
  schema: JsonSchema
  """Email addresses to receive successful form submission notifications at the time of submission"""
  successNotificationEmails: [String!]!
  """Email addresses to receive failed form submission notifications at the time of submission"""
  failureNotificationEmails: [String!]!
  """Segment operations to apply to a user for successful form submissions at the time of submission"""
  successSegments: [SegmentOperation!]!
  # Segment operations to apply to a user for failed form submissions at the time of submission
  failureSegments: [SegmentOperation!]!
  # The effective logical segment operations that were actually applied for this submission
  effectiveSegments: [SegmentOperation!]!
  # Detailed information of successSegments
  successSegmentsDetails: [SegmentOperationDetails!]!
  # Detailed information of failureSegments
  failureSegmentsDetails: [SegmentOperationDetails!]!
  # Detailed information of effectiveSegments
  effectiveSegmentsDetails: [SegmentOperationDetails!]!
  # The form data
  formData: RSJsonNode
  # The user that submitted the form
  user: User
  # The date the form was submitted
  dateSubmitted: RSDate!
  # Whether the submission was successful
  success: Boolean!
  # Submission results
  results: [FormSubmissionRecordResponse!]!
  # Access log information about this form submission
  updatedBy: RSUpdatedBy
  # The form that did the submission
  form: Form
}

# Pagination list for FormSubmissionRecord
type FormSubmissionRecordList {
  data: [FormSubmissionRecord!]!
  count: Int!
}

# Result for deleteFormSubmissionRecord
type FormSubmissionRecordDeleteResult {
  deletedCount: Long!
}

# The recorded response in a FormSubmissionRecord
union FormSubmissionRecordResponse =
    FormSubmissionRecordResult
  | FormSubmissionRecordError

# The submission result of a form stored in FormSubmissionRecord
type FormSubmissionRecordResult {
  # The form handler that generated this result
  formHandler: FormHandler
  # The result received from the form handler
  result: RSJsonNode!
}

# The submission error result of a form stored in FormSubmissionRecord
type FormSubmissionRecordError {
  # The form handler that generated this result
  formHandler: FormHandler
  # The type of this error
  errorType: FormHandlerErrorType!
  # The error message
  error: String
  # The error code defined by the form handler
  errorCode: String
}

# Filter type for FormSubmissionRecord
input FormSubmissionRecordFilterInput {
  id_eq: ID
  formKey_eq: String
  dateSubmitted_gte: RSDate
  dateSubmitted_lt: RSDate
  dateSubmitted_timeframe: RSRelativeTimeframe
  dateSubmitted_interval: IsoInterval
  success_eq: Boolean
}

input EditReferralCodeInput {
  # The existing referral code to be edited
  existingReferralCode: String!
  # The new referral code
  newReferralCode: String!
  # Whether the existing referral code should be replaced/deleted. false by default.
  deleteExisting: Boolean
  # Whether the share links associated with the existing referral code should be
  # transferred to the new referral code. false by default.
  transferShareLinks: Boolean
}

type EditReferralCodeResult {
  referralCode: ReferralCode!
}

input EditShareLinkCodeInput {
  # The existing share link code to be edited
  existingLinkCode: String!
  # The new share link code
  newLinkCode: String!
  # Whether the existing share link code should be replaced/deleted. false by default.
  deleteExisting: Boolean
}

type EditShareLinkCodeResult {
  linkCode: ShareLinkCode!
}

type LinkCodeDeleteResult {
  deletedCount: Long!
}

type MakeShareLinkCodePrimaryResult {
  # The new primary share link code
  linkCode: ShareLinkCode!
  # The previous primary share link code if one exists
  previousPrimary: ShareLinkCode
}

input AddShareLinkCodeInput {
  linkCode: String!
  referralCode: String
  userId: String!
  accountId: String!
  programId: ID!
  # Whether the added share link should be set as the primary for the referral code.
  # false by default.
  makeShareLinkCodePrimaryForReferralCode: Boolean
}

# A link code for a share link or message link
interface LinkCode {
  linkCode: String!
  # The link this link code represents in the default custom short domain, if available.
  shortUrl(
    shareMedium: ReferralShareMedium! = UNKNOWN
    engagementMedium: UserEngagementMedium! = UNKNOWN
  ): String!
  # The link domains this link code can be used with
  supportedLinkDomains: [LinkDomain!]!
}

# A link code for a share link
type ShareLinkCode implements LinkCode {
  linkCode: String!
  shortUrl(
    shareMedium: ReferralShareMedium! = UNKNOWN
    engagementMedium: UserEngagementMedium! = UNKNOWN
  ): String!
  supportedLinkDomains: [LinkDomain!]!
  referralCode: ReferralCode
  user: User
  program: Program
  # Whether this link code is the primary for its referral code
  isPrimaryForReferralCode: Boolean!
  # Whether this link code is the primary for its program
  isPrimaryForProgram: Boolean!
  # Whether this link code is a manually created vanity code
  isVanity: Boolean!
}

# A link code for a message link
type MessageLinkCode implements LinkCode {
  linkCode: String!
  shortUrl(
    shareMedium: ReferralShareMedium! = UNKNOWN
    engagementMedium: UserEngagementMedium! = UNKNOWN
  ): String!
  supportedLinkDomains: [LinkDomain!]!
  user: User
  program: Program
}

# A link code for a fallback URL
type FallbackLinkCode implements LinkCode {
  linkCode: String!
  shortUrl(
    shareMedium: ReferralShareMedium! = UNKNOWN
    engagementMedium: UserEngagementMedium! = UNKNOWN
  ): String!
  supportedLinkDomains: [LinkDomain!]!
}

# A link code for a classic widget preview URL
type PreviewLinkCode implements LinkCode {
  linkCode: String!
  shortUrl(
    shareMedium: ReferralShareMedium! = UNKNOWN
    engagementMedium: UserEngagementMedium! = UNKNOWN
  ): String!
  supportedLinkDomains: [LinkDomain!]!
}

# A link code for a generic shortened URL
type ShortenedUrlLinkCode implements LinkCode {
  linkCode: String!
  shortUrl(
    shareMedium: ReferralShareMedium! = UNKNOWN
    engagementMedium: UserEngagementMedium! = UNKNOWN
  ): String!
  supportedLinkDomains: [LinkDomain!]!
  # The destination url for this link code
  destinationUrl: String!
}

type ShareLinkCodeList {
  data: [ShareLinkCode!]!
  count: Int!
  totalCount: Long
}

type AddShareLinkCodeResult {
  linkCode: ShareLinkCode!
}

# A referral code
type ReferralCode {
  # The referral code string
  code: String!
  # Whether this referral code is the primary for its program
  isPrimaryForProgram: Boolean!
  # The program for this code
  program: Program
  # The user for this code
  user: User
  # The share link codes associated with this referral code
  shareLinkCodes(limit: Int! = 20, offset: Int! = 0): ShareLinkCodeList!
}

type ReferralCodeList {
  data: [ReferralCode!]!
  count: Int!
  totalCount: Long
}

type ReferralCodeDeleteResult {
  deletedCount: Long!
}

type MakeReferralCodePrimaryResult {
  # The new primary referral code
  referralCode: ReferralCode!
  # The previous primary referral code, if one exists
  previousPrimary: ReferralCode
}

input AddReferralCodeInput {
  referralCode: String!
  programId: ID!
  userId: String!
  accountId: String!
  # Whether the added referral code should be set as the primary for the program.
  # false by default.
  makeReferralCodePrimaryForProgram: Boolean
}

type AddReferralCodeResult {
  referralCode: ReferralCode!
}

# A custom domain for links, e.g. "example.com"
type LinkDomain {
  host: String!
  scheme: String!
}

input RewardMetaInput {
  rewardId: ID!
  status: RewardMetaStatus!
  message: String
  internalMessage: String
  integrationService: String
  customMeta: RSJsonNode
}

enum RSSortOrder {
  ASC
  DESC
}

input RSSortByInput {
  field: String!
  order: RSSortOrder!
}

type ZonedDateTime {
  offset: String!
  zone: String!
  year: Int!
  monthValue: Int!
  month: Month!
  dayOfMonth: Int!
  dayOfYear: Int!
  dayOfWeek: DayOfWeek!
  hour: Int!
  minute: Int!
  second: Int!
  nano: Int!
  epochMilli: RSDate!
}

enum Month {
  JANUARY
  FEBRUARY
  MARCH
  APRIL
  MAY
  JUNE
  JULY
  AUGUST
  SEPTEMBER
  OCTOBER
  NOVEMBER
  DECEMBER
}

enum DayOfWeek {
  MONDAY
  TUESDAY
  WEDNESDAY
  THURSDAY
  FRIDAY
  SATURDAY
  SUNDAY
}

# Static information about currencies. See: https://www.geoips.com/en/resources/currencies
type RSCurrency {
  # 3-letter ISO standard currency code e.g. "USD" or "GBP"
  currencyCode: RSCurrencyCode!
  # Human-readable currency name e.g. "US Dollars" or "Euro"
  displayName(locale: RSLocale): String!
  # The display name for the default locale of this currency.
  localizedDisplayName: String!
  # The symbol of this currency for the specified locale.
  # For example, for the US Dollar, the symbol is "$" if the specified locale is the US,
  # while for other locales it may be "US$".
  # If no symbol can be determined, the ISO 4217 currency code is returned.
  symbol(locale: RSLocale): String!
  # The symbol for the default locale of this currency.
  # Note that the result may be incorrect for non-circulating currencies.
  localizedSymbol: String!
  # The ISO 4217 numeric code of this currency.
  numericCode: Int!
  # The default number of fraction digits used with this currency.
  # For example, the default number of fraction digits for the Euro is 2,
  # while for Libyan Dinar it's 3.
  fractionDigits: Int!
  # Human-readable non-plural name of the factional unit. e.g. "Cent" See:
  # https://www.geoips.com/en/resources/currencies
  fractionalUnit: String
  # An integer representing the fractional unit to basic unit conversion. Usually 100.
  numberToBasic: Int!
  format(
    number: Float!
    locale: RSLocale
    formatType: RewardValueFormatType! = UNIT_FORMATTED
  ): String!
  formatFractionalUnit(
    number: Float!
    locale: RSLocale
    formatType: RewardValueFormatType! = UNIT_FORMATTED
  ): String!
}

type RSCurrencyList {
  data: [RSCurrency!]!
  count: Int!
  totalCount: Long!
}

# Static information about a country
type RSCountry {
  # The ISO 3166-1 Alpha-2 country code
  countryCode: RSCountryCode!
  # Human-readable country name e.g. "Canada"
  displayName(locale: RSLocale): String!
  # The default locale of this country in the system
  defaultLocale: RSLocale
}

# Pagination list for RSCountry
type RSCountryList {
  data: [RSCountry!]!
  count: Int!
  totalCount: Long!
}

# Static information about a language
type RSLanguage {
  # The ISO 639-1 language code
  languageCode: RSLanguageCode!
  # Human-readable language name, e.g. "Spanish"
  displayName(locale: RSLocale): String!
}

# Pagination list for RSLanguage
type RSLanguageList {
  data: [RSLanguage!]!
  count: Int!
  totalCount: Long!
}

type RewardUnit {
  key: String!
  name: String!
  currency: RSCurrency
}

# Settings for a reward unit
type RewardUnitSettings implements TranslatableAsset {
  id: RewardUnitSettingsId!
  config: RSJsonNode!
  translationInfo: TranslationInfo!
}

# A list of RewardUnitSettings
type RewardUnitSettingsList {
  data: [RewardUnitSettings!]!
  count: Int!
  totalCount: Long!
}

type RewardUnitSettingsDeleteResult {
  deletedCount: Long!
}

input RewardUnitSettingsInput {
  id: RewardUnitSettingsId!
  config: RSJsonNode!
}

interface Viewer {
  permissions: [String!]!
}

interface GraphNodeData {
  id: ID!
  moderationPreview(
    moderationInput: ModerationInput!
  ): GraphNodeModerationPreviewList!
}

enum GraphNodeType {
  REWARD
  PROGRAM_EMAIL
  REFERRAL
  USER_EVENT
}

type GraphNode {
  data: GraphNodeData
  parent: GraphNodeData
  depth: Int!
}

input ModerationInput {
  # The moderation action, can be "APPROVE" or "DENY"
  action: String!
  # The max depth of side effects
  maxDepth: Int!
  # graph lookup size limit.
  # Default to 20 for query, and 1000 for moderation.
  limit: Int
  # graph lookup offset.
  # Default to 0.
  offset: Int
  # Graph nodes must meet this condition to be moderated.
  # Graph nodes that don't meet this condition will still show up in the result,
  # but the action will be NOTHING.
  actionPredicate: ModerationActionPredicateInput
}

input ModerationActionPredicateInput {
  programId_eq: ID
}

type ModerationInputView {
  action: String!
  maxDepth: Int!
  limit: Int
  offset: Int
}

type GraphNodeList {
  data: [GraphNode!]!
  count: Int!
  totalCount: Long!
}

type GraphNodeModerationPreview {
  data: GraphNodeData
  parent: GraphNodeData
  depth: Int
  action: String
  description: String
}

type GraphNodeModerationPreviewList {
  data: [GraphNodeModerationPreview!]!
  count: Int!
  totalCount: Long!
}

type GraphNodeModerationResult {
  data: GraphNodeData
  moderationResults: GraphNodeModerationPreviewList
}

type GraphNodeModerationResultList {
  data: [GraphNodeModerationResult!]!
  count: Int!
  # totalCount is null for USER_EVENT
  totalCount: Long
}

interface ProgramTrigger {
  id: ID!
  type: ProgramTriggerType!
  time: RSDate!
  user: User
}

type AfterUserCreatedOrUpdatedTrigger implements ProgramTrigger {
  id: ID!
  type: ProgramTriggerType!
  time: RSDate!
  user: User
  previous: User
  events: [UserEventData!]!
}

type ScheduledProgramTrigger implements ProgramTrigger {
  id: ID!
  type: ProgramTriggerType!
  time: RSDate!
  user: User
  scheduleKey: String
}

type RewardScheduledProgramTrigger implements ProgramTrigger {
  id: ID!
  type: ProgramTriggerType!
  time: RSDate!
  user: User
  reward: FlatReward
  scheduleKey: String
}

type ReferralProgramTrigger implements ProgramTrigger {
  id: ID!
  type: ProgramTriggerType!
  time: RSDate!
  user: User
  referral: Referral!
  referralEventType: ReferralEventType!
}

type AfterUserEventProcessedTrigger implements ProgramTrigger {
  id: ID!
  type: ProgramTriggerType!
  time: RSDate!
  user: User
  events: [UserEventData!]!
}

enum ProgramTriggerType {
  AFTER_USER_CREATED_OR_UPDATED
  SCHEDULED
  REWARD_SCHEDULED
  REFERRAL
  AFTER_USER_EVENT_PROCESSED
}

enum ReferralEventType {
  STARTED
  MODERATION_ACTION_APPLIED
  AUTOMODERATION_COMPLETE
}

enum GAProgramType {
  ACQUISITION
  LOYALTY
  RETENTION
}

type ProgramTransaction {
  id: ID!
  mutations: [ProgramMutation!]!
  analytics: [ProgramAnalyticsData!]!
  program: Program
}

union ProgramMutation =
    ProgramCreateRewardMutation
  | ProgramSendEmailMutation
  | ProgramModerateGraphNodesMutation
  | ProgramExchangeRewardMutation

type ProgramCreateRewardMutation {
  key: String
  rewardConfig: ProgramRewardConfig
  template: ProgramRewardTemplate
  user: User
  rewardSource: RewardSourceType
}

type ProgramSendEmailMutation {
  key: String
  emailConfig: ProgramEmailConfig
  template: ProgramEmailTemplate
  user: User
  status: EmailTransactionStatus
}

type ProgramModerateGraphNodesMutation {
  graphNodeType: GraphNodeType
  moderationInput: ModerationInputView
  moderationPreview: GraphNodeModerationResultList
}

type ProgramExchangeRewardMutation {
  user: User
  redeemCreditInput: RedeemCreditInputType
  rewardInput: RSJsonNode
  globalRewardKey: String
  status: RewardStatus
  repeat: Boolean!
}

union ProgramAnalyticsData =
    ProgramEvaluatedAnalyticsData
  | ProgramGoalAnalyticsData

type ProgramEvaluatedAnalyticsData {
  user: User
  timestamp: RSDate
  analyticsKey: String
  analyticsDedupeId: String
  programType: GAProgramType
}

type ProgramGoalAnalyticsData {
  user: User
  timestamp: RSDate
  analyticsKey: String
  analyticsDedupeId: String
  programType: GAProgramType
}

union UserUpsertResult = User | ApiError

type ApiError {
  message: String!
  statusCode: Int!
  rsCode: String
}

type User implements Viewer {
  id: String!
  accountId: String!
  firstName: String
  lastName: String
  lastInitial: String
  account: PaymentAccount!
  referralCode(programId: ID): String
  referralCodes: RSShallowMap!
  imageUrl: String
  email: String
  cookieId: String
  paymentProviderId: String
  # The locale of this user
  locale: RSLocale
  # The country code of the user
  countryCode: RSCountryCode
  # Whether this user can be referred
  referable: Boolean
  # key value pair
  customFields: RSJsonNode
  firstSeenIP: String
  lastSeenIP: String
  firstSeenIPLocation: LatLon
  lastSeenIPLocation: LatLon
  # Maxmind geo data
  firstSeenGeoData: RSJsonNode
  # Maxmind geo data
  lastSeenGeoData: RSJsonNode
  firstSeenUserAgent: String
  lastSeenUserAgent: String
  dateCreated: RSDate
  dateBlocked: RSDate
  emailHash: String
  referralSource: String @deprecated
  # Legacy share links format.
  # https://docs.referralsaasquatch.com/api/methods/#get_sharelinks
  incompleteShareLinks: RSJsonNode
    @deprecated(reason: "Use shareLinks instead.")
  # https://docs.referralsaasquatch.com/api/methods/#get_shareurls
  shareLinks(
    programId: ID
    shareMedium: ReferralShareMedium
    engagementMedium: UserEngagementMedium
    shareMediums: [ReferralShareMedium!]! = []
    engagementMediums: [UserEngagementMedium!] = []
  ): RSJsonNode
  # Share links for up to 10 active programs
  programShareLinks(
    shareMediums: [ReferralShareMedium!]! = [UNKNOWN]
    engagementMediums: [UserEngagementMedium!] = [UNKNOWN]
  ): RSJsonNode
  shareLink(
    programId: ID
    shareMedium: ReferralShareMedium! = UNKNOWN
    engagementMedium: UserEngagementMedium! = UNKNOWN
    # Whether the URL parameters of the resulting link should be removed
    useCleanLink: Boolean! = false
  ): String
  messageLink(
    programId: ID
    shareMedium: ReferralShareMedium! = UNKNOWN
    engagementMedium: UserEngagementMedium! = UNKNOWN
  ): String
  shareLinkOpenGraph(programId: ID): RSJsonNode
  messageLinkOpenGraph(programId: ID): RSJsonNode
  referredBy: UserReferredByInfo
    @deprecated(reason: "Use referredByReferral instead.")
  referredByReferral(programId: ID): Referral
  referredByReferrals: [Referral!]!
  # All the referral codes this user is referred by
  referredByCodes: [String!]!
  rewards(
    filter: RewardFilterInput
    timeZone: String
    timeZoneOffset: Int
    limit: Int! = 20
    offset: Int! = 0
    sortBy: [RSSortByInput!]
  ): FlatRewardList!
  # Get all the RewardRedemptionTransactions for this user
  rewardRedemptionTransactions(
    limit: Int! = 20
    offset: Int! = 0
  ): RewardRedemptionTransactionList!
  # https://docs.referralsaasquatch.com/api/methods/#list_balances
  rewardBalances(
    rewardType: RewardType
    programId: ID
    locale: RSLocale
  ): RSJsonNode @deprecated(reason: "Use rewardBalanceDetails instead")
  rewardBalanceDetails(
    filter: RewardBalanceFilterInput
    programId: ID
    locale: RSLocale
  ): [RewardBalance!]!
  referrals(
    filter: ReferralFilterInput
    timeZone: String
    timeZoneOffset: Int
    limit: Int! = 20
    offset: Int! = 0
  ): ReferralList!
  # Render a widget for this user
  widget(
    widgetType: WidgetType
    engagementMedium: UserEngagementMedium
    locale: RSLocale
  ): WidgetResponse!
  segments: [SegmentKey!]!
  fraudFlags: [FraudFlag!]!
  stats: UserStats
  userEvents(
    # Only dateTriggered field can be filtered for purchase and refund events.
    # Nothing can be filtered for other events.
    filter: UserEventDataFilterInput
    limit: Int! = 20
    offset: Int! = 0
    sortBy: [RSSortByInput!]
  ): UserEventDataList!
  programEmailTransactions(
    filter: ProgramEmailTransactionFilterInput
    timeZone: String
    timeZoneOffset: Int
    limit: Int! = 20
    offset: Int! = 0
    sortBy: [RSSortByInput!]
  ): ProgramEmailTransactionList!
  # Get all the share link codes for this user
  shareLinkCodes(limit: Int! = 20, offset: Int! = 0): ShareLinkCodeList!
  # Get all the referral codes for this user
  referralCodeList(limit: Int! = 20, offset: Int! = 0): ReferralCodeList!
  # Lookup form submission records for this user
  formSubmissionRecords(
    filter: FormSubmissionRecordFilterInput
    sortBy: [RSSortByInput!]
    timeZone: String
    timeZoneOffset: Int
    limit: Int! = 20
    offset: Int! = 0
  ): FormSubmissionRecordList!
  # User localization information
  localization: UserLocalization!
  # The program goals this user has achieved
  programGoals: [ProgramGoal!]!
  # The US taxable values by year
  usTaxableValues: [AnnualTaxableValue!]!
  # The total pending US taxable value of all time
  totalPendingUsTaxableValue: TotalPendingTaxableValue!
  # The date this user submitted the US tax form
  dateUsTaxFormSubmitted: RSDate
  # Whether US tax compliance is enforced for this user
  enforceUsTaxCompliance: Boolean!
  # The rank of this user in a leaderboard, if available
  leaderboardRank(
    # The type of the user leaderboard. Can be topStartedReferrers or topConvertedReferrers.
    type: String!
    # The filter for this user leaderboard
    filter: UserLeaderboardFilterInput
  ): LeaderboardRank
  # Access this user's ranks in all user leaderboards
  leaderboardRanks: UserLeaderboardRanks!
  # Get all the reward exchanges visible to this user
  visibleRewardExchangeItems(
    limit: Int! = 20
    offset: Int! = 0
  ): VisibleRewardExchangeItemList!
  # The managed identity information for this user, if available
  managedIdentity: ManagedIdentityResult
  permissions: [String!]!
}

type UserStats {
  # The last time this user's stats was last refreshed
  dateModified: RSDate
  # The number of times this user's share links have been clicked across all programs
  traffic: Int
  # The number of referrals this user has made across all programs
  referrals: Int
  # The number of converted referrals this user has made across all programs
  conversions: Int
  # The number of program goals this user has achieved across all programs
  goals: Int
  # The number of rewards this user has earned across all programs
  rewards: Int
  # The number of times this user has loaded a widget across all programs
  widgetLoads: Int
  # The estimated amount of revenue in USD this user has purchased
  revenue: Float
  # The estimated amount of program revenue in USD this user has generated
  generatedRevenue: Float
  # The estimated amount of referred revenue in USD this user has influenced
  referredRevenue: Float
}

# User localization information
type UserLocalization {
  # The user's locale. If the user does not have a locale, it's inferred based on its countryCode.
  locale: RSLocale
  # The language of the user based on its locale. If the user does not have a locale,
  # it's inferred based on its countryCode.
  language: RSLanguage
  # The country of the user based on its countryCode. If the user does not have a
  # countryCode, it's inferred based on its locale.
  country: RSCountry
}

# The taxable value for a year
type AnnualTaxableValue {
  # The tax year
  year: Int!
  # The taxable value
  value: Int!
  # The number of rewards
  count: Int!
}

# The total pending taxable values of all time
type TotalPendingTaxableValue {
  # The taxable value
  value: Int!
  # The number of rewards
  count: Int!
}

type PaymentAccount {
  id: String!
  dateCreated: RSDate
  dateModified: RSDate
  users(limit: Int! = 20, offset: Int! = 0): UserList!
}

type WidgetResponse {
  template: String!
  jsOptions: RSJsonNode
  user: User
  # The config of this widget, if available
  widgetConfig: WidgetConfig
}

type LatLon {
  lat: Float!
  lon: Float!
}

enum ReferralShareMedium {
  FACEBOOK
  TWITTER
  EMAIL
  DIRECT
  LINKEDIN
  SMS
  FBMESSENGER
  WHATSAPP
  LINEMESSENGER
  PINTEREST
  REMINDER
  UNKNOWN
}

enum UserEngagementMedium {
  NOCONTENT
  EMBED
  HOSTED
  MOBILE
  POPUP
  DEMO_EMBED
  DEMO
  EMPTY
  EMAIL
  UNKNOWN
}

type FlatRewardList {
  data: [FlatReward!]!
  count: Int!
  totalCount: Long!
}

# A transaction of a single reward redemption or a bulk reward redemption
type RewardRedemptionTransaction {
  # The redemption ID
  id: ID!
  # The amount of redeemed credit
  creditRedeemed: Int!
  # Pretty value of redeemed credit
  prettyRedeemedCredit(
    locale: RSLocale
    formatType: RewardValueFormatType! = UNIT_FORMATTED
  ): String
  # The unit redeemed
  unit: String
  # The date of the redemption
  dateRedeemed: RSDate!
  # Rewards that have been redeemed for this redemption
  redeemedRewards(limit: Int! = 20, offset: Int! = 0): FlatRewardList!
  # Rewards that have been exchanged for this redemption
  exchangedRewards(limit: Int! = 20, offset: Int! = 0): FlatRewardList!
}

type RewardRedemptionTransactionList {
  data: [RewardRedemptionTransaction!]!
  count: Int!
  totalCount: Long!
}

type UserReferredByInfo {
  isConverted: Boolean
  code: String
  newlyReferred: Boolean
  referredReward: RSJsonNode
}

type UserList {
  data: [User]!
  count: Int!
  totalCount: Long!
}

input RewardFilterInput {
  AND: [RewardFilterInput!]
  OR: [RewardFilterInput!]
  id_eq: ID
  id_in: [ID!]
  type_eq: RewardType
  type_in: [RewardType!]
  # only applies to credit rewards
  unit_eq: String
  # only applies to credit rewards
  unit_in: [String!]
  # only applies to credit rewards
  unit_ne: String
  # only applies to credit rewards
  unit_nin: [String!]
  dateCreated_gte: RSDate
  dateCreated_lt: RSDate
  dateCreated_timeframe: RSRelativeTimeframe
  dateCreated_interval: IsoInterval
  dateGiven_gte: RSDate
  dateGiven_lt: RSDate
  dateGiven_timeframe: RSRelativeTimeframe
  dateGiven_interval: IsoInterval
  dateGiven_exists: Boolean
  dateExpires_gte: RSDate
  dateExpires_lt: RSDate
  dateExpires_timeframe: RSRelativeTimeframe
  dateExpires_interval: IsoInterval
  dateExpires_exists: Boolean
  dateCancelled_gte: RSDate
  dateCancelled_lt: RSDate
  dateCancelled_timeframe: RSRelativeTimeframe
  dateCancelled_interval: IsoInterval
  dateCancelled_exists: Boolean
  dateScheduledFor_gte: RSDate
  dateScheduledFor_lt: RSDate
  dateScheduledFor_timeframe: RSRelativeTimeframe
  dateScheduledFor_interval: IsoInterval
  dateScheduledFor_exists: Boolean
  dateRedeemed_gte: RSDate
  dateRedeemed_lt: RSDate
  dateRedeemed_timeframe: RSRelativeTimeframe
  dateRedeemed_interval: IsoInterval
  dateRedeemed_exists: Boolean
  dateModified_gte: RSDate
  dateModified_lt: RSDate
  dateModified_timeframe: RSRelativeTimeframe
  dateModified_interval: IsoInterval
  rewardSource_eq: RewardSourceType
  rewardSource_in: [RewardSourceType!]
  userId_eq: String
  accountId_eq: String
  programId_eq: ID
  programId_in: [ID!]
  programId_exists: Boolean
  programRewardKey_eq: String
  programRewardKey_in: [String!]
  programRewardKey_exists: Boolean
  globalRewardKey_eq: String
  globalRewardKey_in: [String!]
  globalRewardKey_exists: Boolean
  referralId_eq: ID
  # statuses contains
  statuses_eq: RewardStatusFilterInput
  # statuses does not contain
  statuses_ne: RewardStatusFilterInput
  # statuses contains any
  statuses_in: [RewardStatusFilterInput!]
  # statuses contains all
  statuses_all: [RewardStatusFilterInput!]
  # statuses contains none
  statuses_nin: [RewardStatusFilterInput!]
}

# Input for RewardStatus filter
input RewardStatusFilterInput {
  # The status
  status: RewardStatus!
  # At a specific point in time
  at: RSDate
}

input RewardBalanceFilterInput {
  type_eq: RewardType
  unit_eq: String
  unit_in: [String!]
  unitType_eq: String
  currency_eq: RSCurrencyCode
}

type FlatReward implements GraphNodeData {
  id: ID!
  # The type of reward
  type: RewardType!
  # The value of the reward
  value: Int!
  # A human-readable formatted string value based on the reward's unit
  prettyValue(
    locale: RSLocale
    formatType: RewardValueFormatType! = UNIT_FORMATTED
  ): String!
  availableValue(
    # For getting the available value at a specific point in time
    at: RSDate
  ): Int!
  prettyAvailableValue(
    locale: RSLocale
    formatType: RewardValueFormatType! = UNIT_FORMATTED
    # For getting the available value at a specific point in time
    at: RSDate
  ): String!
  # The unit represented by the value of this reward
  unit: String!
  # The detailed information about the reward unit
  rewardUnit: RewardUnit!
  # The displayable name for the reward
  name: String
  # The date the reward was created
  dateCreated: RSDate
  # The date the reward is scheduled to be given
  dateScheduledFor: RSDate
  # The date the reward was given
  dateGiven: RSDate
  # The date the reward expires (null if it doesn't expire)
  dateExpires: RSDate
  # The date the reward was cancelled
  dateCancelled: RSDate
  # The date the reward was fully redeemed
  dateRedeemed: RSDate
  # The date the reward was last modified
  dateModified: RSDate
  # The source of the reward (i.e. by friend referral, manual, etc)
  rewardSource: RewardSourceType
  # The fuel tank code associated with the reward if this is fuel tank reward
  fuelTankCode: String
  # The fuel tank type associated with the reward if this is a fuel tank reward
  fuelTankType: FuelTankType
  # The currency the reward was associated with if applicable (gift cards are associated with a currency)
  currency: RSCurrencyCode
  cancellable: Boolean!
  redeemable: Boolean!
  # External metadata set by integrations or third-parties
  meta: RewardMeta
  # The id of the program that created this reward
  programId: String
  # The corresponding reward key in the program that created this reward
  programRewardKey: String
  # The corresponding reward key in the GlobalRewardConfig that created this reward
  globalRewardKey: String
  # The program that created this reward
  program: Program
  # The user this reward belongs to
  user: User
  integrationId: ID @deprecated(reason: "Use integration instead.")
  # The integration that's used to fulfill this reward
  integration: TenantIntegration
  description: String
  assignedCredit: Int
  redeemedCredit(
    # For getting the redeemed credit at a specific point in time
    at: RSDate
  ): Int
  prettyAssignedCredit(
    locale: RSLocale
    formatType: RewardValueFormatType! = UNIT_FORMATTED
  ): String
  prettyRedeemedCredit(
    locale: RSLocale
    formatType: RewardValueFormatType! = UNIT_FORMATTED
    # For getting the redeemed credit at a specific point in time
    at: RSDate
  ): String
  # The id of the referral that caused this reward
  referralId: ID
  # The referral that caused this reward
  referral: Referral
  # The user event that caused this reward
  userEvent: UserEventData
  statuses(
    # For getting the statuses at a specific point in time
    at: RSDate
  ): [RewardStatus!]!
  # All the RewardRedemptionTransactions where this reward has been redeemed
  rewardRedemptionTransactions(
    limit: Int! = 20
    offset: Int! = 0
  ): RewardRedemptionTransactionList!
  # The RewardRedemptionTransaction that exchanged for this reward
  exchangedRewardRedemptionTransaction: RewardRedemptionTransaction
  moderationPreview(
    moderationInput: ModerationInput!
  ): GraphNodeModerationPreviewList!
  # Get all the reasons this reward is pending
  pendingReasons: [RewardPendingReason!]!
  # The date this reward went to pending because of US tax reasons
  datePendingForUsTax: RSDate
  # The date this reward went to pending because of an unhandled error
  datePendingForUnhandledError: RSDate
  # The US taxable value of this reward
  usTaxableValue(
    # For getting the US taxable value at a specific point in time
    at: RSDate
  ): Int!
}

# External metadata for a reward intended to be used by external integrations
type RewardMeta {
  status: RewardMetaStatus!
  # A message displayed in the portal and widgets, often used by integrations
  # (e.g. Credit Applied in Stripe)
  message: String
  # A message that's only shown in the portal for tracking notes on the reward
  # reason. Note: end users could still potentially find this.
  internalMessage: String
  integration: TenantIntegration
  dateModified: RSDate
  customMeta: RSJsonNode
}

enum RewardMetaStatus {
  SUCCESS
  WARN
  ERROR
}

enum RewardValueFormatType {
  # Formatted number only
  NUMBER_FORMATTED
  # Formatted integer only with rounding
  INTEGER_FORMATTED
  # Full currency format with number and currency code
  UNIT_FORMATTED
  NUMBER_UNFORMATTED
  INTEGER_UNFORMATTED
}

# The reason a reward is pending
enum RewardPendingReason {
  # The reward is pending because it was scheduled
  SCHEDULED
  # The reward is pending due to an unhandled error
  UNHANDLED_ERROR
  # The reward is pending due to US tax reasons
  US_TAX
}

interface RewardBalance {
  type: RewardType!
  unit: String!
  rewardUnit: RewardUnit!
  availableValue: Int!
  prettyAvailableValue(
    formatType: RewardValueFormatType! = UNIT_FORMATTED
  ): String!
}

type CreditRewardBalance implements RewardBalance {
  type: RewardType!
  unit: String!
  rewardUnit: RewardUnit!
  availableValue: Int!
  prettyAvailableValue(
    formatType: RewardValueFormatType! = UNIT_FORMATTED
  ): String!
  count: Int!
  totalPendingCredit: Int!
  totalAssignedCredit: Int!
  totalRedeemedCredit: Int!
  totalExpiredCredit: Int!
  totalCancelledCredit: Int!
  prettyPendingCredit(
    formatType: RewardValueFormatType! = UNIT_FORMATTED
  ): String!
  prettyAssignedCredit(
    formatType: RewardValueFormatType! = UNIT_FORMATTED
  ): String!
  prettyRedeemedCredit(
    formatType: RewardValueFormatType! = UNIT_FORMATTED
  ): String!
  prettyExpiredCredit(
    formatType: RewardValueFormatType! = UNIT_FORMATTED
  ): String!
  prettyCancelledCredit(
    formatType: RewardValueFormatType! = UNIT_FORMATTED
  ): String!
}

type DiscountPercentRewardBalance implements RewardBalance {
  type: RewardType!
  unit: String!
  rewardUnit: RewardUnit!
  availableValue: Int!
  prettyAvailableValue(
    formatType: RewardValueFormatType! = UNIT_FORMATTED
  ): String!
  totalDiscountPercent: Int!
  referredDiscountPercent: Int!
  referrerDiscountPercent: Int!
}

type FuelTankRewardBalance implements RewardBalance {
  type: RewardType!
  unit: String!
  rewardUnit: RewardUnit!
  availableValue: Int!
  prettyAvailableValue(
    formatType: RewardValueFormatType! = UNIT_FORMATTED
  ): String!
  totalFuelTankCodes: Int!
}

type IntegrationRewardBalance implements RewardBalance {
  type: RewardType!
  unit: String!
  rewardUnit: RewardUnit!
  availableValue: Int!
  prettyAvailableValue(
    formatType: RewardValueFormatType! = UNIT_FORMATTED
  ): String!
  # Shallow map of string to integer
  unitBalances: RSShallowMap!
}

enum RewardStatus {
  PENDING
  CANCELLED
  EXPIRED
  REDEEMED
  AVAILABLE
}

enum RewardType {
  PCT_DISCOUNT
  CREDIT
  FUELTANK
  INTEGRATION
}

enum RewardSourceType {
  # This source type designates a reward that was given to a user (A) for their friend (B)
  # signing up.
  FRIEND_SIGNUP
  # This source type designates a reward that was given to a user for signing up by referral
  REFERRED
  # This source type designates a reward that was manually added to a user via portal or API
  MANUAL
  PROGRAM @deprecated(reason: "use AUTOMATED instead")
  ACTIVATION
  ACQUISITION
  RETENTION
  REACTIVATION
  # Reward given by a program
  AUTOMATED
}

enum FuelTankType {
  PCT_DISCOUNT
  CREDIT
}

# The input for redeeming credit
input RedeemCreditInput {
  # The amount to redeem
  amount: Int!
  # The unit to redeem
  unit: String!
}

# A type matching RedeemCreditInput used as a return type
type RedeemCreditInputType {
  # The amount to redeem
  amount: Int!
  # The unit to redeem
  unit: String!
  # The pretty value of the credit to redeem
  prettyValue(
    locale: RSLocale
    formatType: RewardValueFormatType! = UNIT_FORMATTED
  ): String!
}

# The result for redeeming credit
type RedeemCreditResult {
  # The unit redeemed
  unit: String!
  # The amount of redeemed credit
  creditRedeemed: Int!
  # The amount of available credit
  creditAvailable: Int!
}

# Input for a reward exchange
input ExchangeRewardInput {
  userId: String!
  accountId: String!
  redeemCreditInput: RedeemCreditInput!
  # https://docs.referralsaasquatch.com/api/methods/#create_reward
  rewardInput: RSJsonNode
  # The key for the GlobalRewardConfig to create this reward from. When this is present
  globalRewardKey: String
  # The optional initial RewardStatus
  status: RewardStatus
}

# Result for a reward exchange
type ExchangeRewardResult {
  # The RewardRedemptionTransaction related to this reward exchange
  rewardRedemptionTransaction: RewardRedemptionTransaction!
  # The created reward
  reward: FlatReward!
}

type Referral implements GraphNodeData {
  # Id of this referral
  id: ID!
  # Id of the corresponding program (non-legacy referrals)
  programId: ID
  program: Program
  # public meta available on this referral
  publicMeta: RSJsonNode @deprecated(reason: "Always returns null.")
  # private meta available on this referral
  privateMeta: RSJsonNode @deprecated(reason: "Always returns null.")
  referredUser: User
  referrerUser: User
  # The reward earned for this referral by the referred user
  referredReward: FlatReward @deprecated(reason: "Use rewards instead.")
  # The reward earned for this referral by the referrer
  referrerReward: FlatReward @deprecated(reason: "Use rewards instead.")
  # The overall moderation status for the referral
  moderationStatus: ReferralModerationStatus
  # The moderation status of the referred user
  referredModerationStatus: ReferralSideModerationStatus
  # The moderation status of the referrer user
  referrerModerationStatus: ReferralSideModerationStatus
  # The date the referral was made
  dateReferralStarted: RSDate
  # The date the referral converted to paid
  dateReferralPaid: RSDate
  # The date the referred user stopped payment
  dateReferralEnded: RSDate
  # The last date the referral was moderated
  dateModerated: RSDate
  dateUserModified: RSDate
  dateFraudChecksCompleted: RSDate @deprecated(reason: "Internal field.")
  dateConverted: RSDate
  dateModified: RSDate
  fraudSignals: RSJsonNode @deprecated(reason: "Use fraudFlags instead.")
  fraudFlags: [FraudFlag!]!
  # True if this referral is exempt from fraud moderation
  isFraudExempt: Boolean!
  # The referral code used for this referral
  referralCodeUsed: String
  # The share link used for this referral
  shareLinkUsed: String
  rewards(filter: RewardFilterInput): [FlatReward!]!
  childNodes(
    maxDepth: Int! = 5
    # graph lookup size limit
    limit: Int! = 20
    # graph lookup offset
    offset: Int! = 0
  ): GraphNodeList!
  moderationPreview(
    moderationInput: ModerationInput!
  ): GraphNodeModerationPreviewList!
  # Program goals of the referred user for the current program
  referredProgramGoals: [ProgramGoal!]!
  # Program goals of the referrer user for the current program
  referrerProgramGoals: [ProgramGoal!]!
}

type ReferralList {
  data: [Referral!]!
  count: Int!
  totalCount: Long!
}

type FraudFlag {
  type: FraudType!
  message: String!
}

enum FraudType {
  IP
  EMAIL
  NAME
  RATE
  DAILY_REFERRAL_REWARD_LIMIT
  TEMP_EMAIL
  BLOCKED_USER
  BLOCKED_IP
}

enum ReferralModerationStatus {
  PENDING
  ACTIONED
}

enum ReferralSideModerationStatus {
  PENDING
  APPROVED
  DENIED
}

type PortalUser implements Viewer {
  identity: ID!
  # The type of this PortalUser
  type: PortalUserType!
  email: String
  portalProjects: [PortalProject!]!
  tenants: [Tenant!]!
  permissions: [String!]!
  internalReferralProgram: InternalReferralProgramInfo!
    @deprecated(reason: "Internal field.")
}

# The type of a PortalUser
enum PortalUserType {
  # A PortalUser that has not signed up yet
  PENDING
  # A PortalUser authenticated with OAuth
  OAUTH
  # A PortalUser authenticated with SSO
  SSO
  # A PortalUser authenticated with a password
  PASSWORD
  # A PortalUser that is not human
  MACHINE
}

type Tenant implements Viewer {
  tenantAlias: ID!
  isLiveMode: Boolean!
  emailAddress: String
  dateCreated: RSDate
  rateLimitMultiplier: Float
  settings: TenantSettings
  theme: TenantTheme
  clockOffsetMillis: Long
  clockOffsetDuration: IsoDuration
  permissions: [String!]!
}

input ReferralFilterInput {
  AND: [ReferralFilterInput!]
  OR: [ReferralFilterInput!]
  id_eq: ID
  id_in: [ID!]
  programId_eq: ID
  programId_in: [ID!]
  programId_exists: Boolean
  dateReferralStarted_gte: RSDate
  dateReferralStarted_lt: RSDate
  dateReferralStarted_timeframe: RSRelativeTimeframe
  dateReferralStarted_interval: IsoInterval
  dateReferralPaid_gte: RSDate
  dateReferralPaid_lt: RSDate
  dateReferralPaid_timeframe: RSRelativeTimeframe
  dateReferralPaid_exists: Boolean
  dateReferralEnded_gte: RSDate
  dateReferralEnded_lt: RSDate
  dateReferralEnded_timeframe: RSRelativeTimeframe
  dateReferralEnded_exists: Boolean
  dateConverted_gte: RSDate
  dateConverted_lt: RSDate
  dateConverted_timeframe: RSRelativeTimeframe
  dateConverted_interval: IsoInterval
  dateConverted_exists: Boolean
  dateModerated_gte: RSDate
  dateModerated_lt: RSDate
  dateModerated_timeframe: RSRelativeTimeframe
  dateModerated_exists: Boolean
  dateModified_gte: RSDate
  dateModified_lt: RSDate
  dateModified_timeframe: RSRelativeTimeframe
  referredModerationStatus_eq: ReferralSideModerationStatus
  referredModerationStatus_in: [ReferralSideModerationStatus!]
  referrerModerationStatus_eq: ReferralSideModerationStatus
  referrerModerationStatus_in: [ReferralSideModerationStatus!]
  moderationStatus_eq: ReferralModerationStatus
  moderationStatus_in: [ReferralModerationStatus!]
}

type TenantSettings {
  signupPage: String
  companyName: String
  hasUtmOnSignupPage: Boolean
  referredAutoApprove: Boolean
  referrerAutoApprove: Boolean
  suspectedFraudModerationState: SuspectedFraudModerationState
  potentialFraudNotificationFrequency: String
  fraudCheckSettings: FraudCheckSettings
  fraudRateLimit: Int
  fraudRateLimitPeriodSeconds: Int @deprecated
  dailyReferralRewardLimit: Int
  rewardSettings: RSJsonNode
  allowReferralInvites: Boolean @deprecated
  multiProgramEnabled: Boolean
  # The custom short domain host, e.g. "example.com"
  customShortDomain: String @deprecated
  # The active custom link domain for short links
  primaryLinkDomain: LinkDomain
  # The backup custom link domains for short links
  secondaryLinkDomains: [LinkDomain!]!
  """
  If true, the referralCodes field will create new referral codes for user and set them as
  primary even if the user already has referral codes. Otherwise, the referralCodes field
  will only attempt to create one referral code per program when one doesn't already exist.
  """
  allowReferralCodeEditOnUserUpsert: Boolean
  # Whether enforcing US tax compliance is enabled
  enforceUsTaxCompliance: EnforceTaxComplianceOption
  # The permission strings for this TenantSettings
  permissions: [String!]!
}

# Option of enforcing tax compliance
enum EnforceTaxComplianceOption {
  # Tax compliance is enforced for no users
  NONE
  # Tax compliance is enforced for users with the explicit matching countryCode
  EXPLICIT_COUNTRY_CODE
  """
  Tax compliance is enforced for users with the explicit matching countryCode
  and users without a country code but a locale with the matching countryCode
  """
  IMPLIED_COUNTRY_CODE
  # Tax compliance is enforced for all users
  ALL
}

enum SuspectedFraudModerationState {
  DENY
  PENDING
  IGNORE
}

type FraudCheckSettings {
  ipCheckEnabled: Boolean
  nameCheckEnabled: Boolean
  emailCheckEnabled: Boolean
  rateCheckEnabled: Boolean
  tempMailCheckEnabled: Boolean
  customEmailDomainBlacklist: [String!]
  dailyReferralRewardLimitEnabled: Boolean
}

type TenantTheme implements TranslatableAsset {
  id: ID!
  variables(locale: String): RSJsonNode # be less strict about locale
  variablesSchema: RSJsonNode
  themeConfig: ThemeConfig
  translationInfo: TranslationInfo!
}

type ThemeConfig {
  vcs: GitConfig
  themeAssetVersion: String
  templateFileNames: [String!]
}

type GitConfig {
  repositoryUrl: String
  branch: String
  username: String
  password: String
}

type UserBlockingResult {
  user: User
}

input TenantInput {
  clockOffsetMillis: Long
  clockOffsetDuration: IsoDuration
}

input TenantSettingsInput {
  companyName: String
  multiProgramEnabled: Boolean
  allowReferralCodeEditOnUserUpsert: Boolean
}

input UserInput {
  id: String
  accountId: String
  firstName: String
  lastName: String
  # Deprecated. Ignored field. Use lastName instead.
  lastInitial: String
  referralCode: String
  referralCodes: RSShallowMap
  """
  Optionally create vanity links.
  Example:
  shareLinks: {
    program1: "https://example.com/foobar"
  }
  """
  shareLinks: RSShallowMap
  imageUrl: String
  email: String
  # Deprecated. Ignored field.
  cookieId: String
  paymentProviderId: String
  locale: RSLocale
  # The country code of the user
  countryCode: RSCountryCode
  # Deprecated. Use referredByCodes instead.
  referredBy: RSJsonNode
  # All the referral codes this user is referred by
  referredByCodes: [String!]
  # The Base64URL encoded attribution cookie values.
  cookies: String
  # Whether this user can be referred
  referable: Boolean
  # The user's custom fields
  customFields: RSJsonNode
  # The segment operations to be applied to this user
  segments: [SegmentOperation!]
  # The date a user is created. Useful for creating historic users.
  dateCreated: RSDate
  # Historical program goals to be imported for a user
  programGoals: [ProgramGoalInput!]
  # The date this user submitted the US tax form
  dateUsTaxFormSubmitted: RSDate
}

# filter to find only relevant users to trigger a program with
input UserFilterInput {
  AND: [UserFilterInput!]
  OR: [UserFilterInput!]
  id_eq: String
  accountId_eq: String
  firstName_eq: String
  lastName_eq: String
  email_eq: String
  email_exists: Boolean
  locale_eq: RSLocale
  locale_in: [RSLocale!]
  firstSeenIP_eq: String
  lastSeenIP_eq: String
  dateBlocked_exists: Boolean
  customFields: RSJsonNode
  # contains
  segments_eq: String
  # does not contain
  segments_ne: String
  # contains any
  segments_in: [String!]
  # contains all
  segments_all: [String!]
  # contains none
  segments_nin: [String!]
  fraudFlags_exists: Boolean
  fraudFlags_all: [FraudType!]
}

# Result of a user creation preview
type PreviewUserCreationResult {
  # All the program transactions resulted in the user creation
  programTransactions: [ProgramTransaction!]!
  # All the rewards that would be earned by the created user
  rewards: [RewardPreview!]!
}

# Input for a user creation preview
input PreviewUserCreationInput {
  # The locale of this user
  locale: RSLocale
  # The country code of the user
  countryCode: RSCountryCode
  # All the referral codes this user is referred by
  referredByCodes: [String!]
  # The Base64URL encoded attribution cookie values.
  cookies: String
  # The user's custom fields
  customFields: RSJsonNode
  # The segment operations to be applied to this user
  segments: [SegmentOperation!]
  # Whether this user can be referred
  referable: Boolean
}

# Minimal information of a previewed reward
type RewardPreview {
  # The type of reward
  type: RewardType!
  # The value of the reward
  value: Int!
  # A human-readable formatted string value based on the reward's unit
  prettyValue(
    locale: RSLocale
    formatType: RewardValueFormatType! = UNIT_FORMATTED
  ): String!
  # The unit represented by the value of this reward
  unit: String!
  # The detailed information about the reward unit
  rewardUnit: RewardUnit!
  # The source of the reward (i.e. by friend referral, manual, etc)
  rewardSource: RewardSourceType
  # The id of the program that created this reward
  programId: String
  # The corresponding reward key in the program that created this reward
  programRewardKey: String
  # The date the reward is scheduled to be given
  dateScheduledFor: RSDate
  # The date the reward expires (null if it doesn't expire)
  dateExpires: RSDate
}

type PersistedEvent {
  meta: RSJsonNode
  blob: RSJsonNode
}

type PersistedEventList {
  data: [PersistedEvent!]!
  count: Int!
  totalCount: Long!
}

# A program installed in a tenant based on a program template
type Program {
  id: ID!
  name: String!
  status: ProgramStatus!
  # Program template ID
  templateId: ID!
  # Program template with introspection
  template: ProgramTemplate!
  rawTemplate: ProgramTemplate! @deprecated(reason: "Internal field.")
  # Preview a program introspection with unsaved rules
  introspectionPreview(
    introspectionPreviewInput: ProgramIntrospectionPreviewInput!
  ): ProgramTemplate!
  emails: [ProgramEmailConfig!]
  email(key: String!): ProgramEmailConfig
  rewards: [ProgramRewardConfig!]
  reward(key: String!): ProgramRewardConfig
  widgets: [ProgramWidgetConfig!]
  widget(key: String!): ProgramWidgetConfig
  sharing: ProgramSharingConfig
  # An instance of the values in the Program Template's rules schema
  rules: RSJsonNode
  analytics: RSJsonNode
  dateCreated: RSDate!
  lastActivatedDate: RSDate
  taskState(key: String! = "default"): ProgramTaskState
  taskStates: [ProgramTaskState!]
  rewardsGiven(
    filter: RewardFilterInput
    timeZone: String
    timeZoneOffset: Int
    limit: Int! = 20
    offset: Int! = 0
  ): FlatRewardList!
  referrals(
    filter: ReferralFilterInput
    timeZone: String
    timeZoneOffset: Int
    limit: Int! = 20
    offset: Int! = 0
    sortBy: [RSSortByInput!]
  ): ReferralList
  transactionEvents(
    createdAfter: RSDate
    createdBefore: RSDate
    metaFilter: RSJsonNode
    limit: Int! = 20
    offset: Int! = 0
  ): PersistedEventList @deprecated
  # Get the first 100 TranslatableAssets for this program
  translatableAssets: [TranslatableAsset!]!
    @deprecated(reason: "Use translatableAssetList instead.")
  # Get all the TranslatableAssets for this Program
  translatableAssetList(
    limit: Int! = 20
    offset: Int! = 0
  ): TranslatableAssetList!
  programEmailTransactions(
    filter: ProgramEmailTransactionFilterInput
    timeZone: String
    timeZoneOffset: Int
    limit: Int! = 20
    offset: Int! = 0
    sortBy: [RSSortByInput!]
  ): ProgramEmailTransactionList!
  validation(key: String!): ProgramValidationResult
  validations: [ProgramValidationResult!]
  # Get the JSON schema for program trigger variables
  programTriggerVariablesSchema: ProgramTriggerVariablesSchema!
}

# Wrapper type for requesting the trigger variables schema for different trigger types
type ProgramTriggerVariablesSchema {
  afterUserCreatedOrUpdated: JsonSchema
  # scheduled: JsonSchema
  # rewardScheduled: JsonSchema
  referral: JsonSchema
  afterUserEventProcessed(userEventKey: String!): JsonSchema
}

enum ProgramStatus {
  LIVE
  PAUSED
  ARCHIVED
}

type ProgramList {
  data: [Program!]
  count: Int!
  totalCount: Long!
}

type ProgramDeleteResult {
  deletedCount: Long!
}

# A type of email sent by a program. e.g. "VIP Reward Limit Reached Email"
type ProgramEmailTemplate {
  key: String! @hidden
  name: String!
  description: String!
  defaults: RSJsonNode!
}

# Config values for a program email type
type ProgramEmailConfig implements TranslatableAsset {
  key: String!
  enabled: Boolean!
  values: RSJsonNode!
  # be less strict about locale
  preview(values: RSJsonNode, locale: String): EmailPreview!
  translationInfo: TranslationInfo!
}

# Config values for a global email type
type GlobalEmailConfig implements TranslatableAsset {
  key: String!
  values: RSJsonNode!
  # Whether this GlobalEmailConfig can be deleted
  canDelete: Boolean!
  # Whether this GlobalEmailConfig is used by the US tax notification email
  usedByUsTaxNotificationEmail: Boolean!
  # Whether this GlobalEmailConfig is used by managed identity reset password email
  usedByManagedIdentityResetPasswordEmail: Boolean!
  # Whether this GlobalEmailConfig is used by managed identity verify email
  usedByManagedIdentityVerifyEmail: Boolean!
  # Translation details of this email
  translationInfo: TranslationInfo!
}

# Input for GlobalEmailConfig
input GlobalEmailConfigInput {
  key: String!
  values: RSJsonNode!
}

type GlobalEmailConfigList {
  data: [GlobalEmailConfig!]!
  count: Int!
  totalCount: Long!
}

type GlobalEmailConfigDeleteResult {
  deletedCount: Long!
}

# Input for queueing a global email
input QueueGlobalEmailInput {
  # Global email key
  key: String!
  # The recipient user
  user: UserIdInput!
  # The GraphQL request for generating the rendering context
  contextGraphQLRequest: GraphQLRequestInput
}

# A GraphQL request
type GraphQLRequest {
  # The GraphQL query string
  query: GraphQLQueryString!
  # The GraphQL query variables
  variables: RSJsonNode
  # The operation name
  operationName: String
}

# Input for a GraphQL request
input GraphQLRequestInput {
  # The GraphQL query string
  query: GraphQLQueryString!
  # The GraphQL query variables
  variables: RSJsonNode
  # The operation name
  operationName: String
}

# Config values for a widget
interface WidgetConfig {
  # The config value
  values: RSJsonNode!
}

# Config values for a program widget type
type ProgramWidgetConfig implements TranslatableAsset & WidgetConfig {
  key: String!
  # The config value
  values: RSJsonNode!
  widgetType: WidgetType!
  translationInfo: TranslationInfo!
}

# Config values for a global widget type
type GlobalWidgetConfig implements TranslatableAsset & WidgetConfig {
  key: String!
  values: RSJsonNode!
  # Translation details of this widget
  translationInfo: TranslationInfo!
}

# Input for GlobalWidgetConfig
input GlobalWidgetConfigInput {
  key: String!
  values: RSJsonNode!
}

type GlobalWidgetConfigList {
  data: [GlobalWidgetConfig!]!
  count: Int!
  totalCount: Long!
}

type GlobalWidgetConfigDeleteResult {
  deletedCount: Long!
}

type ProgramSharingConfig {
  redirectUrl: ProgramRedirectUrlConfig
  linkConfig: ProgramLinkConfig
}

type ProgramRedirectUrlConfig {
  url: String!
  fallbackUrl: String!
  # Expiry duration for referral code cookies
  cookieExpiryDuration: IsoDuration!
  rules: RSJsonNode
}

type ProgramLinkConfig implements TranslatableAsset {
  messaging: ProgramMessagingConfig!
  translationInfo: TranslationInfo!
}

type ProgramMessagingConfig {
  messages: [ProgramMessageConfig!]
  messageLinkOpenGraph: ProgramOpenGraphMetaConfig
  shareLinkOpenGraph: ProgramOpenGraphMetaConfig
}

type ProgramMessageConfig {
  shareMedium: ReferralShareMedium!
  config: RSJsonNode
}

type ProgramOpenGraphMetaConfig {
  title: String
  description: String
  image: String
  source: ProgramOpenGraphSource
}

enum ProgramOpenGraphSource {
  HOSTED
  LANDING_PAGE
}

type EmailPreview {
  headers: RSJsonNode
  body: String
}

type ProgramTaskState {
  key: String!
  invocationNumber: Long!
  status: ScheduledTaskStatus!
}

enum ScheduledTaskStatus {
  RUNNING
  IDLE
}

type ProgramValidationResult {
  key: String!
  results: [ProgramRequirementValidationResult!]
  requirement: ProgramRequirement
}

type ProgramRequirementValidationResult {
  status: ProgramRequirementValidationStatus!
  message: String!
  # An optional longer description of the validation result with instructions to fix it, if applicable
  longDescription: String
}

enum ProgramRequirementValidationStatus {
  SUCCESS
  WARN
  ERROR
}

type ProgramTemplate {
  # A unique global ID for this program
  id: String!
  # A human friendly name of the program
  name: String!
  summary: String!
  longDescription: String!
  installGuide: String
  # An external link to the docs refererence for this program's install guide
  installGuideUrl: String
  # A list of email types sent by this program template
  emails: [ProgramEmailTemplate!]
  # A list of named reward types
  rewards: [ProgramRewardTemplate!]
  # A list of widgets used by this program template
  widgets: [ProgramWidgetTemplate!]
  # A JSON schema describing how a program should be configured
  rules: RSJsonNode
  # A JSON UI schema describing how the rules form should look
  rulesUISchema: RSJsonNode
  # A webtask.io / Auth0 Extend URL to call to execute the code
  url: String
  # A url pointing to the program logo
  logo: String
  # Program attribution settings if the program supports attribution
  sharing: ProgramTemplateSharingSettings
  requirements: [ProgramRequirement!]
  # Script for migrating program rules
  rulesMigrationScript: String
  # The template of program goals provided by this program
  goals: [ProgramGoalTemplate!]
}

type ProgramTemplateSharingSettings {
  # Whether attribution is enabled or not
  enabled: Boolean!
}

type ProgramRewardTemplate {
  key: String
  name: String!
  description: String!
  isDynamic: Boolean!
}

type ProgramWidgetTemplate {
  key: String
  name: String!
  description: String!
  defaults: RSJsonNode!
}

# Template for ProgramGoal
type ProgramGoalTemplate {
  # The goal ID
  goalId: String!
  # The human readable name
  name: String
}

# Input for program introspection preview
input ProgramIntrospectionPreviewInput {
  rules: RSJsonNode!
}

# Interface type for either a ProgramRewardConfig or a GlobalRewardConfig
interface IsPredefinedReward {
  # Unique global ID for predefined rewards
  predefinedRewardType: PredefinedRewardType!
}

# Config for a program reward
type ProgramRewardConfig implements IsPredefinedReward & TranslatableAsset {
  key: String!
  # The key for the linked GlobalRewardConfig
  globalRewardKey: String
  # The linked GlobalRewardConfig
  globalRewardConfig: GlobalRewardConfig
  name: String
  description: String
  rewardType: RewardType
  amount: Int
  unit: String
  currency: RSCurrencyCode
  monthsDiscountIsValid: Int
    @deprecated(reason: "Use validityDuration instead.")
  # The duration between reward creation and reward expiry
  validityDuration: IsoDuration
  # The duration between reward creation and reward given
  pendingDuration: IsoDuration
  fuelTankType: FuelTankType
  integrationId: ID @deprecated(reason: "Use integration instead")
  integration: TenantIntegration
  # Integration specific configuration (i.e. external gift card identifiers)
  integrationSettings: RSJsonNode
  translationInfo: TranslationInfo!
  # Unique global ID for predefined rewards
  predefinedRewardType: PredefinedRewardType!
  # The custom codes used for FUELTANK rewards
  customCodes(
    used: Boolean! = false
    limit: Int! = 20
    offset: Int! = 0
  ): CustomCodeList!
  prettyValue(
    locale: RSLocale
    formatType: RewardValueFormatType! = UNIT_FORMATTED
  ): String!
}

# Config for a global reward
type GlobalRewardConfig implements IsPredefinedReward {
  key: String!
  name: String
  description: String
  rewardType: RewardType
  amount: Int
  unit: String
  currency: RSCurrencyCode
  # The duration between reward creation and reward expiry
  validityDuration: IsoDuration
  # The duration between reward creation and reward given
  pendingDuration: IsoDuration
  fuelTankType: FuelTankType
  integration: TenantIntegration
  # Integration specific configuration (i.e. external gift card identifiers)
  integrationSettings: RSJsonNode
  # Unique global ID for predefined rewards
  predefinedRewardType: PredefinedRewardType!
  # The custom codes used for FUELTANK rewards
  customCodes(
    used: Boolean! = false
    limit: Int! = 20
    offset: Int! = 0
  ): CustomCodeList!
  prettyValue(
    locale: RSLocale
    formatType: RewardValueFormatType! = UNIT_FORMATTED
  ): String!
}

type GlobalRewardConfigList {
  data: [GlobalRewardConfig!]!
  count: Int!
  totalCount: Long!
}

type GlobalRewardConfigDeleteResult {
  deletedCount: Long!
}

type IsPredefinedRewardList {
  data: [IsPredefinedReward!]!
  count: Int!
  totalCount: Long!
}

type ProgramRequirement {
  key: String!
  name: String
  description: String
  longDescription: String
  query: String @deprecated(reason: "Internal field.")
  queryVariables: RSJsonNode @deprecated(reason: "Internal field.")
}

type ProgramEmailTransaction implements GraphNodeData {
  id: ID!
  programId: ID
  # Program that generated the email
  program: Program
  # Program email key
  key: String @deprecated(reason: "Use programEmailKey instead")
  # Program email key
  programEmailKey: String
  # Global email key
  globalEmailKey: String
  # User receiving the email
  user: User!
  # Program generated context query for email rendering
  query: String! @deprecated(reason: "Use contextGraphQLRequest instead")
  queryVariables: RSJsonNode!
    @deprecated(reason: "Use contextGraphQLRequest instead")
  # The GraphQL request for generating the rendering context
  contextGraphQLRequest: GraphQLRequest
  # Date the transaction was created
  dateCreated: RSDate!
  # Date the transaction was queued
  dateQueued: RSDate
  # Date the email was sent
  dateSent: RSDate
  status: EmailTransactionStatus!
  rewardId: ID
  reward: FlatReward
  moderationPreview(
    moderationInput: ModerationInput!
  ): GraphNodeModerationPreviewList!
}

enum EmailTransactionStatus {
  PENDING
  QUEUED
  SENT
  FAILED
}

type ProgramEmailTransactionList {
  data: [ProgramEmailTransaction!]!
  count: Int!
  totalCount: Long!
}

type ProgramEmailTransactionDeleteResult {
  deletedCount: Long!
}

input ProgramEmailTransactionFilterInput {
  AND: [ProgramEmailTransactionFilterInput!]
  OR: [ProgramEmailTransactionFilterInput!]
  id_eq: ID
  id_in: [ID!]
  programId_eq: ID
  programId_exists: Boolean
  # Deprecated. Use programEmailKey_eq instead.
  key_eq: String
  # Deprecated. Use globalEmailKey_eq instead.
  key_in: [String!]
  programEmailKey_eq: String
  programEmailKey_in: [String!]
  globalEmailKey_eq: String
  globalEmailKey_in: [String!]
  dateCreated_gte: RSDate
  dateCreated_lt: RSDate
  dateCreated_timeframe: RSRelativeTimeframe
  dateQueued_gte: RSDate
  dateQueued_lt: RSDate
  dateQueued_timeframe: RSRelativeTimeframe
  dateSent_gte: RSDate
  dateSent_lt: RSDate
  dateSent_timeframe: RSRelativeTimeframe
  status_eq: EmailTransactionStatus
  status_in: [EmailTransactionStatus!]
}

type TenantIntegration {
  id: ID! @deprecated(reason: "use service instead")
  service: String!
  name: String!
  type: IntegrationType
  enabled: Boolean!
  config: RSJsonNode
  # The form handler managed by this integration
  formHandler: FormHandler
  # The namespace of this integration
  namespace: String
}

enum IntegrationType {
  LINK_GENERATOR
  EMAIL_DELIVERY
  REWARD_PROVIDER
}

type TenantIntegrationList {
  data: [TenantIntegration!]!
  count: Int!
  totalCount: Long!
}

type TenantIntegrationDeleteResult {
  deletedCount: Long!
}

input TenantIntegrationInput {
  service: String!
  enabled: Boolean
  config: RSJsonNode
}

# A webhook with its payload
type Webhook {
  id: ID!
  type: WebhookType!
  dateCreated: RSDate!
  data: RSJsonNode
  # Get the delivery attempt logs for this webhook
  subscriptionLog(
    limit: Int! = 20
    offset: Int! = 0
  ): WebhookSubscriptionLogList!
}

# Delivery attempt logs for one WebhookSubscription
type WebhookSubscriptionLog {
  # The url of the endpoint that receives events
  endpointUrl: String!
  subscription: WebhookSubscription
  # The list of HTTP request attempts to this webhook subscription
  attempts(limit: Int! = 20, offset: Int! = 0): WebhookDeliveryAttemptList!
}

# A list of WebhookSubscriptionLogs
type WebhookSubscriptionLogList {
  data: [WebhookSubscriptionLog!]!
  count: Int!
  totalCount: Long!
}

# The result of one HTTP request attempt to a webhook subscription
type WebhookDeliveryAttempt {
  # The date this attempt was made
  dateAttempted: RSDate!
  # The status received from the endpoint. Null if we weren't able to connect.
  status: Int
}

# A list of WebhookDeliveryAttempts
type WebhookDeliveryAttemptList {
  data: [WebhookDeliveryAttempt!]!
  count: Int!
  totalCount: Long!
}

# A list of Webhooks
type WebhookList {
  data: [Webhook!]!
  count: Int!
  totalCount: Long!
}

# A webhook subscription to an endpoint
type WebhookSubscription {
  # The url of the endpoint that receives events
  endpointUrl: String!
  # Display name
  name: String
  source: WebhookSubscriptionSourceType!
  webhookTypes: [WebhookType!]!
  # The status of this webhook subscription
  status: WebhookSubscriptionStatus!
  integration: TenantIntegration
}

# The status of a WebhookSubscription
type WebhookSubscriptionStatus {
  # The type of this status
  type: WebhookSubscriptionStatusType!
  # The message of this status
  message: String
}

# The type of a WebhookSubscriptionStatus
enum WebhookSubscriptionStatusType {
  ENABLED
  DISABLED
}

# The source that created a WebhookSubscription
enum WebhookSubscriptionSourceType {
  # Created through the portal or API
  MANUAL
  # Managed by an integration
  INTEGRATION
}

# A list of WebhookSubscriptions
type WebhookSubscriptionList {
  data: [WebhookSubscription!]!
  count: Int!
  totalCount: Long!
}

type WebhookSubscriptionDeleteResult {
  deletedCount: Long!
}

input WebhookSubscriptionInput {
  # The url of the endpoint that receives events
  endpointUrl: String!
  # Optional name of the endpoint that receives events
  name: String
  # Operations for adding/deleting WebhookTypes for this WebhookSubscription
  webhookTypes: [WebhookTypeOperation!]
}

input WebhookFilterInput {
  AND: [WebhookFilterInput!]
  OR: [WebhookFilterInput!]
  id_eq: ID
  type_eq: WebhookType
  dateCreated_gte: RSDate
  dateCreated_lt: RSDate
  dateCreated_timeframe: RSRelativeTimeframe
}

type TestWebhookSubscriptionResult {
  subscription: WebhookSubscription!
}

# Codes used for FUELTANK rewards
type CustomCode {
  code: String!
  dateUploaded: RSDate
  # The date when a custom code was allocated to someone,
  # not necessarily when it was redeemed.
  dateUsed: RSDate
  predefinedRewardType: PredefinedRewardType!
  reward: FlatReward
}

type CustomCodeList {
  data: [CustomCode!]!
  count: Int!
  totalCount: Long!
}

input CustomCodesInput {
  # See IsPredefinedReward
  predefinedRewardType: PredefinedRewardType!
  codes: [String!]!
}

type RejectedCustomCode {
  code: String
  rejectReason: String
}

type CustomCodeInsertResult {
  rejectedCodes: [RejectedCustomCode!]!
  numCodesRejected: Int!
  numCodesAccepted: Int!
}

type CustomCodeUpsertResult {
  rejectedCodes: [RejectedCustomCode!]!
  numCodesRejected: Int!
  numCodesInserted: Int!
  numCodesUpdated: Int!
}

type CustomCodeDeleteResult {
  deletedCount: Long!
}

input ProgramFilterInput {
  AND: [ProgramFilterInput!]
  OR: [ProgramFilterInput!]
  id_eq: ID
  id_in: [ID!]
  name_eq: String
  name_in: [String!]
  status_eq: ProgramStatus
  status_ne: ProgramStatus
  status_in: [ProgramStatus!]
  dateCreated_gte: RSDate
  dateCreated_lt: RSDate
  dateCreated_timeframe: RSRelativeTimeframe
  referralsEnabled: Boolean
}

input ProgramInput {
  id: ID!
  name: String
  status: ProgramStatus
  emails: [ProgramEmailConfigInput!]
  rewards: [ProgramRewardConfigInput!]
  widgets: [ProgramWidgetConfigInput!]
  sharing: ProgramSharingConfigInput
  # An instance of the values in the Program Template's rules schema
  rules: RSJsonNode
  analytics: RSJsonNode
  # Deprecated. Use taskStates instead.
  taskState: ProgramTaskStateInput
  taskStates: [ProgramTaskStateInput!]
}

input ProgramEmailConfigInput {
  key: String
  enabled: Boolean!
  values: RSJsonNode!
}

# Input type for ProgramRewardConfig
input ProgramRewardConfigInput {
  key: String!
  # The key for GlobalRewardConfig to be linked. When this field is present, all of the
  # other fields must be null.
  globalRewardKey: String
  name: String
  description: String
  rewardType: RewardType
  amount: Int
  unit: String
  # Deprecated. Use unit with an ISO currency code instead.
  currency: String
  # Deprecated. Use validityDuration instead.
  monthsDiscountIsValid: Int
  validityDuration: IsoDuration
  pendingDuration: IsoDuration
  fuelTankType: FuelTankType
  integrationId: ID
  integrationSettings: RSJsonNode
}

# Input type for GlobalRewardConfig
input GlobalRewardConfigInput {
  key: String!
  name: String
  description: String
  rewardType: RewardType!
  amount: Int
  unit: String
  validityDuration: IsoDuration
  pendingDuration: IsoDuration
  fuelTankType: FuelTankType
  integrationId: ID
  integrationSettings: RSJsonNode
}

input ProgramWidgetConfigInput {
  key: String!
  values: RSJsonNode!
}

input ProgramSharingConfigInput {
  redirectUrl: ProgramRedirectUrlConfigInput
  linkConfig: ProgramLinkConfigInput
}

input ProgramRedirectUrlConfigInput {
  url: String!
  fallbackUrl: String
  # Expiry duration for referral code cookies
  cookieExpiryDuration: IsoDuration
  rules: RSJsonNode
}

input ProgramLinkConfigInput {
  messaging: RSJsonNode
}

input ProgramTaskStateInput {
  key: String!
  invocationNumber: Long!
  status: ScheduledTaskStatus!
}

interface TranslatableAsset {
  translationInfo: TranslationInfo!
}

type TranslatableAssetList {
  data: [TranslatableAsset!]!
  count: Int!
  totalCount: Long!
}

# Information of a TranslatableAsset
type TranslationInfo {
  # The unique ID of this TranslatableAsset
  id: TranslatableAssetId!
  # The TranslatableAsset itself
  translatableAsset: TranslatableAsset!
  # The program this TranslatableAsset is attached to, if available
  program: Program
  # The program ID this TranslatableAsset is attached to, if available
  programId: ID
  # The key of this TranslatableAsset
  translatableAssetKey: String
  # The original untranslated content
  content: RSJsonNode
  # All the translations
  translations: [TranslationInstance!]!
  # All the translated locales
  locales: [RSLocale!]!
}

# A translation of a TranslatableAsset
type TranslationInstance {
  # The unique ID of this TranslationInstance
  id: TranslationInstanceId!
  # The program this TranslationInstance is attached to, if available
  program: Program
  # The program ID this TranslationInstance is attached to, if available
  programId: ID
  # The key of the TranslatableAsset
  translatableAssetKey: String
  # The locale of the translation
  locale: RSLocale!
  # The translated content
  content: RSJsonNode!
  dateCreated: RSDate
  dateModified: RSDate
}

type TranslationInstanceDeleteResult {
  deletedCount: Long!
}

input TranslationInstanceInput {
  id: TranslationInstanceId!
  content: RSJsonNode!
}

type Job {
  id: ID!
  type: JobType!
  name: String
  requester: String
  dateCreated: RSDate
  dateCompleted: RSDate
  outputFormat: DataFileFormat
  dateExpires: RSDate
  status: JobStatus!
  mailtoEmail: String
  downloadUrl(publicLink: Boolean! = false): String
  downloadErrorUrl(publicLink: Boolean! = false): String
  downloadFileRefUrl(publicLink: Boolean! = false): String
  params: RSJsonNode
  fileRef: String
  stats: JobStats
}

type JobList {
  data: [Job!]!
  count: Int!
  totalCount: Long!
}

type JobStats {
  recordsProcessed: Long!
  errors: Long!
}

enum DataFileFormat {
  CSV
  XLSX
  JSONL
}

type JobToken {
  token: String
}

enum JobStatus {
  PENDING
  ABORTED
  COMPLETED
}

type JobDeleteResult {
  deletedCount: Long!
}

input JobInput {
  type: JobType!
  name: String
  requester: String
  outputFormat: DataFileFormat
  mailtoEmail: String
  fileRef: String
  params: RSJsonNode
}

input JobFilterInput {
  AND: [JobFilterInput!]
  OR: [JobFilterInput!]

  id_eq: ID
  id_in: [ID!]
  type_eq: JobType
  type_ne: JobType
  dateCreated_gte: RSDate
  dateCreated_lt: RSDate
  dateCreated_timeframe: RSRelativeTimeframe
  dateCompleted_gte: RSDate
  dateCompleted_lt: RSDate
  dateCompleted_timeframe: RSRelativeTimeframe
  status_eq: JobStatus
  status_ne: JobStatus
  status_in: [JobStatus!]
}

# Result of validateJobCreation
type ValidateJobCreationResult {
  # A list of errors. Empty when the input is valid.
  errors: [String!]!
}

type Segment {
  key: SegmentKey!
  name: String
  status: SegmentStatus
  dateCreated: RSDate
  dateModified: RSDate
  participantsCount: Long!
}

enum SegmentStatus {
  ACTIVE
  ARCHIVED
}

type SegmentList {
  data: [Segment!]!
  count: Int!
  totalCount: Long!
}

input SegmentInput {
  key: SegmentKey!
  name: String
  status: SegmentStatus
}

# Detailed information of a segment operation
type SegmentOperationDetails {
  # The raw SegmentOperation string
  segmentOperation: SegmentOperation!
  # The type of this segment operation
  type: SegmentOperationType!
  # The segment inside the segment operation
  segment: Segment
}

# The type of a segment operation
enum SegmentOperationType {
  # Add a segment
  ADD
  # Delete a segment
  DELETE
  # Clear all segments
  CLEAR
}

input UserEventInput {
  userId: String!
  accountId: String!
  events: [UserEventDataInput!]
}

input UserEventDataInput {
  # Deprecated. This field is ignored.
  id: ID
  key: String!
  fields: RSJsonNode
  dateTriggered: RSDate
}

# Result of a bulk user event request
union BulkUserEventResult = UserEventResult | ApiError

type UserEventResult {
  userId: String!
  accountId: String!
  user: User
  events: [UserEventData!]!
  programTransactions: [ProgramTransaction!]
}

type UserEventData implements GraphNodeData {
  id: ID!
  userId: String!
  accountId: String!
  key: String!
  fields: RSJsonNode
  dateTriggered: RSDate
  dateReceived: RSDate
  dateProcessed: RSDate
  updatedBy: RSUpdatedBy
  moderationPreview(
    moderationInput: ModerationInput!
  ): GraphNodeModerationPreviewList!
}

type UserEventDataList {
  data: [UserEventData!]!
  count: Int!
}

input UserEventDataFilterInput {
  key: String
  id_eq: ID
  dateTriggered_gte: RSDate
  dateTriggered_lt: RSDate
  dateReceived_gte: RSDate
  dateReceived_lt: RSDate
  dateProcessed_gte: RSDate
  dateProcessed_lt: RSDate
  userId_eq: String
  accountId_eq: String
  fields: RSJsonNode
}

type UserEventKeyList {
  data: [String!]!
  count: Int!
  totalCount: Long!
}

input UserMetricInput {
  customFieldKey: String!
  name: String
  aggregateId: ID
  aggregateRules: RSJsonNode
  userEventKey: String
  dateTriggeredWindow: IsoInterval
  fieldsFilters: [GenericFieldFilterInput!]
  """
  An JSONata expression to filter events, the provided context is defined in
  https://fast.ssqt.io/npm/@saasquatch/schema/json/UserMetricJSONataFilterContext.schema.json
  """
  filter: JSONata
}

type UserAggregate {
  id: String!
  name: String!
  # JSON schema
  rules: RSJsonNode
}

type UserMetric {
  customFieldKey: String!
  customField: CustomField!
  name: String!
  aggregate: UserAggregate!
  aggregateRules: RSJsonNode
  userEvent: UserEventMeta!
  dateTriggeredWindow: IsoInterval
  fieldsFilters: [GenericFieldFilter!]
  filter: JSONata
}

type UserMetricList {
  data: [UserMetric!]!
  count: Int!
  totalCount: Long!
}

type UserMetricDeleteResult {
  deletedCount: Long!
}

type UserEventMeta {
  key: String!
  name: String
  fields: [String!]!
}

type CustomField {
  key: String!
  name: String
  schema: JsonSchema
}

type CustomFieldList {
  data: [CustomField!]!
  count: Int!
  totalCount: Long!
}

# Statistical information of a program goal
type ProgramGoal {
  # The program goal ID
  goalId: String!
  # The program ID this goal ID is for
  programId: ID
  # The program this goal ID is for
  program: Program
  # The number of times this goal has been achieved
  count: Int!
  # The date this goal was achieved for the first time
  firstDate: RSDate!
  # The date this goal was achieved for the last time
  lastDate: RSDate!
  # The number of conversions
  conversionCount: Int!
  # The template for this program goal
  template: ProgramGoalTemplate!
}

# Input for importing program goals
input ProgramGoalInput {
  # The program goal ID
  goalId: String!
  # The program ID this goal ID is for
  programId: ID!
  # The number of times this goal has been achieved
  count: Int!
  # The date this goal was achieved for the first time
  firstDate: RSDate!
  # The date this goal was achieved for the last time
  lastDate: RSDate!
  # The number of conversions
  conversionCount: Int!
}

# Access log on who performed an action
type RSUpdatedBy {
  # The subject that initiated the action (on behalf of the executor)
  initiator: RSSubject
  # The subject that executed the action
  executor: RSSubject
}

type RSSubject {
  subjectType: RSSubjectType!
  subjectId: String!
  email: String
  user: User
  integration: TenantIntegration
}

enum RSSubjectType {
  PORTAL_USER
  DEFAULT_MACHINE
  INTEGRATION
  ADMIN
  USER
}

type UserDoNotTrackIdentifier {
  hash: String!
  dateCreated: RSDate!
}

type UserDoNotTrackIdentifierList {
  data: [UserDoNotTrackIdentifier!]!
  count: Int!
  totalCount: Long!
}

type UserDoNotTrackIdentifierDeleteResult {
  deletedCount: Long!
}

input UserAnalyticsEvent {
  # user identifier
  id: String!
  # account identifier
  accountId: String!
  # program associated with this analytics event - required (default to 'classic')
  programId: ID!
  # the type of analytic to fire
  type: UserAnalyticsEventType!
  # event metat data that will be included along with the analytic and validated via user analytic json schema
  meta: RSJsonNode!
}

enum UserAnalyticsEventType {
  USER_REFERRAL_PROGRAM_LOADED_EVENT
  USER_REFERRAL_PROGRAM_ENGAGEMENT_EVENT
}

type GenericFieldFilter {
  field: String
  operator: GenericFieldFilterOperator!
  value: RSJsonNode!
}

input GenericFieldFilterInput {
  field: String
  operator: GenericFieldFilterOperator!
  value: RSJsonNode!
}

enum GenericFieldFilterOperator {
  eq
  gt
  gte
  lt
  lte
  exists
  or
}

type PortalProject {
  id: ID!
  name: String
  liveTenant: Tenant
  testTenant: Tenant
}

input PortalProjectInput {
  name: String
}

# The result for checking whether an email is blocked
type IsBlockedEmailResult {
  # Whether the email is blocked
  isBlocked: Boolean!
  # The reason why the email is blocked, if available
  reason: BlockedEmailReason
}

# Reason for a blocked email
enum BlockedEmailReason {
  # Email is blocked because it's in the static disposable email domains list
  DISPOSABLE_EMAIL_DOMAINS
  # Email is blocked because it's in the custom email domains list
  CUSTOM_EMAIL_DOMAINS
}

# Type for accessing all available user leaderboards
type UserLeaderboards {
  # Leaderboard based on the number of rewards
  rewardCount(filter: RewardLeaderboardFilterInput): UserLeaderboard!
  # Leaderboard based on the sum of reward values.
  # Note that the reward values are naively summed regardless of the units.
  rewardValueSum(filter: RewardLeaderboardFilterInput): UserLeaderboard!
  # Leaderboard based on the sum of reward values of a single unit.
  # Note that the reward values are naively summed regardless of the units.
  singleUnitRewardValueSum(
    unit: String!
    filter: RewardLeaderboardFilterInput
  ): UserLeaderboard!
  # Leaderboard based on the number of referrals
  referralCount(filter: ReferralLeaderboardFilterInput): UserLeaderboard!
}

# User leaderboard information
type UserLeaderboard {
  # The top rows of this leaderboard
  rows(limit: Int! = 10): [UserLeaderboardRow!]!
  # The date this leaderboard was last updated
  dateModified: RSDate
}

# One row of a leaderboard
type UserLeaderboardRow {
  # The value of this row, e.g. the number of referrals
  value: Long!
  # The formatted value, which may be the reward unit prettyValue
  textValue(locale: RSLocale): String
  # The first name of the user
  firstName: String
  # The last initial of the user
  lastInitial: String
  # The rank of this row in the leaderboard
  rank: LeaderboardRank!
}

# The filter for a leaderboard
input UserLeaderboardFilterInput {
  programId_eq: ID
  # The interval of this leaderboard
  interval: IsoInterval
}

# The filter for the reward leaderboard
input RewardLeaderboardFilterInput {
  programId_eq: ID
  programId_in: [ID!]
  programId_exists: Boolean
  type_eq: RewardType
  type_in: [RewardType!]
  dateCreated_interval: IsoInterval
  dateGiven_interval: IsoInterval
  dateGiven_exists: Boolean
  unit_eq: String
  unit_in: [String!]
  rewardSource_eq: RewardSourceType
  rewardSource_in: [RewardSourceType!]
  # statuses contains
  statuses_eq: RewardStatusFilterInput
  # statuses does not contain
  statuses_ne: RewardStatusFilterInput
  # statuses contains any
  statuses_in: [RewardStatusFilterInput!]
  # statuses contains all
  statuses_all: [RewardStatusFilterInput!]
  # statuses contains none
  statuses_nin: [RewardStatusFilterInput!]
}

# The filter for referral leaderboards
input ReferralLeaderboardFilterInput {
  programId_eq: ID
  programId_in: [ID!]
  programId_exists: Boolean
  dateReferralStarted_interval: IsoInterval
  dateConverted_interval: IsoInterval
  dateConverted_exists: Boolean
}

# Type for accessing all available user leaderboard ranks
type UserLeaderboardRanks {
  # Leaderboard based on the number of rewards
  rewardCount(filter: RewardLeaderboardFilterInput): LeaderboardRank
  # Leaderboard based on the sum of reward values.
  # Note that the reward values are naively summed regardless of the units.
  rewardValueSum(filter: RewardLeaderboardFilterInput): LeaderboardRank
  # Leaderboard based on the sum of reward values of a single unit.
  # Note that the reward values are naively summed regardless of the units.
  singleUnitRewardValueSum(
    unit: String!
    filter: RewardLeaderboardFilterInput
  ): LeaderboardRank
  # Leaderboard based on the number of referrals
  referralCount(filter: ReferralLeaderboardFilterInput): LeaderboardRank
}

"""
A rank in a leaderboard.
For more information about the difference between rank, denseRank, and rowNumber,
see: https://codingsight.com/similarities-and-differences-among-rank-dense_rank-and-row_number-functions/
"""
type LeaderboardRank {
  # The value of the corresponding leaderboard row, e.g. the number of referrals
  value: Long!
  # The formatted value of the corresponding leaderboard row, which may be the reward unit prettyValue
  textValue(locale: RSLocale): String
  # The rank of the row within the leaderboard with possible gaps between values
  rank: Long!
  # The rank of the row within the leaderboard without possible gaps between values
  denseRank: Long!
  # The row number of the row within the leaderboard
  rowNumber: Long!
}

# Internal type not intended for public use
type InternalReferralProgramInfo {
  tenantAlias: String!
  userToken: String!
}

# A rule that permits users to exchange certain rewards
type RewardExchangeRule implements TranslatableAsset {
  # The unique key of this RewardExchangeRule
  key: String!
  # The human readable name
  name: String
  # The long description
  description: String
  # The URL of the thumbnail
  imageUrl: String
  # The arbitrary list order
  listOrder: Int!
  # Translation info of this RewardExchangeRule
  translationInfo: TranslationInfo!
}

# The type of a RewardExchangeRule
enum RewardExchangeRuleType {
  # A reward exchange where the destination is a fixed global reward
  FIXED_GLOBAL_REWARD
  # A reward exchange where the destination is a global reward with a value override
  VARIABLE_GLOBAL_REWARD
  # A reward exchange where the destination is a dynamic CREDIT reward
  VARIABLE_CREDIT_REWARD
  # A reward exchange where the destination is a list of fixed global rewards
  STEPPED_FIXED_GLOBAL_REWARD
}

# A reward exchanges that is visible to a user
type VisibleRewardExchangeItem {
  # The unique key of the corresponding RewardExchangeRule
  key: String!
  # The human readable name
  name: String
  # The long description
  description: String
  # The URL of the thumbnail
  imageUrl: String
  # The type of this RewardExchangeRule
  ruleType: RewardExchangeRuleType!
  # Whether this reward exchange is available to this user
  available: Boolean!
  """
  The machine readable code of the reason of this reward exchange being unavailable
  Possibilities are INSUFFICIENT_REDEEMABLE_CREDIT, US_TAX, and AVAILABILITY_PREDICATE.
  If the availabilityPredicate of the corresponding RewardExchangeRule returns a
  non-null string, then that will be returned here.
  """
  unavailableReasonCode: String
  # The unit of the reward being redeemed
  sourceUnit: String
  # The value of the reward being redeemed for fixed exchanges
  sourceValue: Int
  # Formatted sourceValue
  prettySourceValue(
    # The locale to use for formatting
    locale: RSLocale
    # The type of the formatting
    formatType: RewardValueFormatType! = UNIT_FORMATTED
  ): String
  # The min value of the reward being redeemed for variable exchanges
  sourceMinValue: Int
  # Formatted sourceMinValue
  prettySourceMinValue(
    # The locale to use for formatting
    locale: RSLocale
    # The type of the formatting
    formatType: RewardValueFormatType! = UNIT_FORMATTED
  ): String
  # The max value of the reward being redeemed for variable exchanges
  sourceMaxValue: Int
  # Formatted sourceMaxValue
  prettySourceMaxValue(
    # The locale to use for formatting
    locale: RSLocale
    # The type of the formatting
    formatType: RewardValueFormatType! = UNIT_FORMATTED
  ): String
  # The min value of the destination reward for variable exchanges
  destinationMinValue: Int
  # Formatted destinationMinValue
  prettyDestinationMinValue(
    # The locale to use for formatting
    locale: RSLocale
    # The type of the formatting
    formatType: RewardValueFormatType! = UNIT_FORMATTED
  ): String
  # The max value of the destination reward for variable exchanges
  destinationMaxValue: Int
  # Formatted destinationMaxValue
  prettyDestinationMaxValue(
    # The locale to use for formatting
    locale: RSLocale
    # The type of the formatting
    formatType: RewardValueFormatType! = UNIT_FORMATTED
  ): String
  # The key of the destination global reward, applicable to FIXED_GLOBAL_REWARD
  # and VARIABLE_GLOBAL_REWARD
  globalRewardKey: String
  # The unit of the destination reward, applicable to VARIABLE_CREDIT_REWARD
  destinationUnit: String
  # The steps of this reward exchange, if applicable. If this reward exchange has
  # over 1000 steps, then only the first 1000 will be returned.
  steps: [VisibleRewardExchangeItemStep!]!
}

# A step of a visible reward exchange
type VisibleRewardExchangeItemStep {
  # The value of the reward being redeemed
  sourceValue: Int!
  # Formatted sourceValue
  prettySourceValue(
    # The locale to use for formatting
    locale: RSLocale
    # The type of the formatting
    formatType: RewardValueFormatType! = UNIT_FORMATTED
  ): String
  # The value of the destination reward
  destinationValue: Int
  # Formatted destinationValue
  prettyDestinationValue(
    # The locale to use for formatting
    locale: RSLocale
    # The type of the formatting
    formatType: RewardValueFormatType! = UNIT_FORMATTED
  ): String
  # The key of the destination global reward, applicable to STEPPED_FIXED_GLOBAL_REWARD.
  globalRewardKey: String
  # The rewardInput for exchanging a reward with this step's override destination value,
  # applicable to VARIABLE_GLOBAL_REWARD
  rewardInput: RSJsonNode
  # Whether this step is available to the current user
  available: Boolean!
  """
  The machine readable code of the reason of this step being unavailable.
  Possibilities are INSUFFICIENT_REDEEMABLE_CREDIT and US_TAX.
  """
  unavailableReasonCode: String
}

type VisibleRewardExchangeItemList {
  data: [VisibleRewardExchangeItem!]!
  count: Int!
  totalCount: Long!
}

type ManagedIdentityAuthenticationResult {
  # A JWT session token for the user
  token: String!
  # The user's email address
  email: String
  # Whether the user has verified their email address
  emailVerified: Boolean
  # Additional session data used by managed identity session handlers
  sessionData: RSJsonNode
}

type ManagedIdentitySessionResult {
  # The user's email address
  email: String
  # Whether the user has verified their email address
  emailVerified: Boolean
  # Additional session data used by managed identity session handlers
  sessionData: RSJsonNode
}

type ManagedIdentitySuccessResult {
  success: Boolean!
}

input RegisterManagedIdentityWithEmailAndPasswordInput {
  # The user's email address
  email: String!
  # The new password for the user
  password: String!
  # Additional data provided by the form
  formData: RSJsonNode
  # The URL path to redirect the user to after registration, defaults to /verifyEmail
  redirectPath: String
}

input AuthenticateManagedIdentityWithEmailAndPasswordInput {
  # The user's email address
  email: String!
  # The user's password
  password: String!
}

input ChangeManagedIdentityPasswordInput {
  # The new password for the user
  password: String!
}

input RequestManagedIdentityEmailInput {
  # The user's email address
  email: String!
  urlParams: RSJsonNode
  # defaults to /verifyEmail and /resetPassword
  redirectPath: String
}

input VerifyManagedIdentityEmailInput {
  # The out-of-band (OOB) code for the email verification
  oobCode: String!
}

input VerifyManagedIdentityPasswordResetCodeInput {
  # The out-of-band (OOB) code for the password reset
  oobCode: String!
}

input ResetManagedIdentityPasswordInput {
  # The user's new password
  password: String!
  # The out-of-band (OOB) code for the password reset
  oobCode: String!
}

type ManagedIdentityResult {
  # Whether or not the user is disabled: true for disabled; false for enabled
  disabled: Boolean!
  # The user's display name
  displayName: String!
  # The user's primary email
  email: String!
  # Whether or not the user's primary email is verified
  emailVerified: Boolean!
  # The user's uid
  uid: String!
  # The date the user was created
  dateCreated: RSDate!
  # The time at which the user was last active (ID token refreshed).
  # Returns null if the user was never active.
  dateLastRefreshed: RSDate
  # The date the user last signed in
  dateLastSignedIn: RSDate
}

type MicrositeLayoutConfig implements TranslatableAsset {
  # The unique key of this MicrositeLayoutConfig
  key: String!
  # The human readable name
  name: String
  # The key of the parent MicrositeLayoutConfig, if there is one.
  parentKey: String
  # The date this MicrositeLayoutConfig was created. This field is auto generated.
  dateCreated: RSDate!
  # The date this MicrositeLayoutConfig was last modified. This field is auto generated.
  dateModified: RSDate
  # The config values JSON.
  # Schema defined at https://fast.ssqt.io/npm/@saasquatch/schema/json/microsite/MicrositeLayoutConfigValues.schema.json
  values: RSJsonNode!
  # The ancestry layouts of this layout
  layoutAncestry: [MicrositeLayoutConfig!]!
  # Whether this MicrositeLayoutConfig can be deleted
  canDelete: Boolean!
  # Get all the MicrositeLayoutConfigs that have this MicrositeLayoutConfig as the parent
  usedByMicrositeLayoutConfigs: [MicrositeLayoutConfig!]!
  # Get all the MicrositePageConfigs that have this MicrositeLayoutConfig as the parent
  usedByMicrositePageConfigs: [MicrositePageConfig!]!
  translationInfo: TranslationInfo!
}

input MicrositeLayoutConfigInput {
  # The unique key of this MicrositeLayoutConfig
  key: String!
  # The human readable name
  name: String
  # The key of the parent MicrositeLayoutConfig
  parentKey: String
  # The config values JSON.
  # Schema defined at https://fast.ssqt.io/npm/@saasquatch/schema/json/microsite/MicrositeLayoutConfigValues.schema.json
  values: RSJsonNode
}

enum MicrositePageAllowedUsersOption {
  # Users who have logged in and verified their email address
  VERIFIED
  # Users who have logged in, but haven't yet verified their email address
  UNVERIFIED
  # Users who are not logged in
  PUBLIC
}

type MicrositePageConfig implements TranslatableAsset {
  # The unique key of this MicrositePageConfig
  key: String!
  # The key of the corresponding MicrositeLayoutConfig
  layoutKey: String
  # The URL path this page should be served under (must be unique for each page)
  urlPath: String!
  # The URL path to redirect users who are not of the type allowedUsers
  disallowedUrlPath: String
  # The users who are allowed to view this page
  allowedUsers: MicrositePageAllowedUsersOption!
  # The date this MicrositePageConfig was created. This field is auto generated.
  dateCreated: RSDate!
  # The date this MicrositePageConfig was last modified. This field is auto generated.
  dateModified: RSDate
  # The config values JSON.
  # Schema defined at https://fast.ssqt.io/npm/@saasquatch/schema/json/microsite/MicrositePageConfigValues.schema.json
  values: RSJsonNode!
  # The ancestry layouts of this page
  layoutAncestry: [MicrositeLayoutConfig!]!
  # Whether this MicrositePageConfig can be deleted
  canDelete: Boolean!
  # Whether this MicrositePageConfig is used as the 404 not found page
  usedAsNotFound: Boolean!
  translationInfo: TranslationInfo!
}

input MicrositePageConfigInput {
  # The unique key of this MicrositePageConfig
  key: String!
  # The key of the corresponding MicrositeLayoutConfig
  layoutKey: String
  # The URL path this page should be served under
  urlPath: String
  # The URL path to redirect users who are not of the type allowedUsers
  disallowedUrlPath: String
  # The users who are allowed to view this page
  allowedUsers: MicrositePageAllowedUsersOption
  # The config values JSON.
  # Schema defined at https://fast.ssqt.io/npm/@saasquatch/schema/json/microsite/MicrositePageConfigValues.schema.json
  values: RSJsonNode
}

type MicrositeLayoutConfigList {
  data: [MicrositeLayoutConfig!]!
  count: Int!
  totalCount: Long!
}

type MicrositePageConfigList {
  data: [MicrositePageConfig!]!
  count: Int!
  totalCount: Long!
}

type MicrositeLayoutConfigDeleteResult {
  deletedCount: Int!
}

type MicrositePageConfigDeleteResult {
  deletedCount: Int!
}

type RenderMicrositePageResult {
  # The (potentially translated) microsite page config
  micrositePageConfig: MicrositePageConfig!
  # The list of (potentially translated) microsite layout configs forming the layout ancestry
  # of the page
  micrositeLayoutConfigs: [MicrositeLayoutConfig!]!
}

type AutoSetupMicrositeResult {
  success: Boolean!
}

type MicrositeTemplate {
  # The unique key of this microsite template
  key: String!
  # The human readable name
  name: String!
  # The human readable long description
  description: String!
  """
  Determine whether a microsite can be automatically setup for the given microsite template.

  This checks ensures that:
   - Microsite hosting has never been enabled, see MicrositeHostingConfig.isModified
   - Managed identity has never been enabled, see ManagedIdentityConfig.isModified
   - That none of the forms, emails, layouts, or pages that would be created by the template already exist
  """
  canAutoSetup: Boolean!
  # All the GlobalEmailConfigs defined by this template that already exist, disallowing auto setup
  existingGlobalEmailConfigs: [GlobalEmailConfig!]!
  # All the Forms defined by this template that already exist, disallowing auto setup
  existingForms: [Form!]!
  # All the MicrositeLayoutConfigs defined by this template that already exist, disallowing auto setup
  existingMicrositeLayoutConfigs: [MicrositeLayoutConfig!]!
  # All the MicrositePageConfigs defined by this template that already exist, disallowing auto setup
  existingMicrositePageConfigs: [MicrositePageConfig!]!
}

type MicrositeTemplateList {
  data: [MicrositeTemplate!]!
  count: Int!
  totalCount: Long!
}

type MicrositeHostingConfig {
  # The default (auto-generated) domain for the microsite
  defaultDomain: String!
  # Wether the microsite is based on a single global widget (legacy) or pages/layouts
  isSingleGlobalWidget: Boolean!
  # Whether this MicrositeHostingConfig has been modified
  isModified: Boolean!
  # Schema defined at https://fast.ssqt.io/npm/@saasquatch/schema/json/HostedPortalConfig.schema.json
  config: RSJsonNode!
}

type ManagedIdentityConfig {
  # Whether this ManagedIdentityConfig has been modified
  isModified: Boolean!
  # Schema defined at https://fast.ssqt.io/npm/@saasquatch/schema/json/ManagedIdentityConfig.schema.json
  config: RSJsonNode!
}

schema {
  query: Query
  mutation: Mutation
}
`;
