---
title: Participant Deletion
slug: features/participant-deletion
sectionType: successArticle
template: hasTableOfContents.html
date: 2023-10-30
seoDescription: Learn about deleting a participant from your SaaSquatch project.
---

> **Important**: Participant deletion is an **irreversible, permanent action** that impacts all share links, referrals, events, and analytics connected to the deleted participant.  Make sure that you are comfortable with all the potential system effects before deleting participants. If you have questions, reach out to our [Support team](saasquatch-support@impact.com). 

Our deletion functionality is fully compliant with the requirements for user deletion as outlined by GDPR. When you delete participants, our system will delete within 30 days all personally-identifiable information (PII) that has been stored for those participants within our system and its subprocessors. You can retrieve a full list of the PII stored for a specific participant using the [Lookup Using PII](/api/methods/#get_user_pii) API method.

## System effects
When you delete a participant, **all PII, rewards, and events** associated with them are also deleted. It may take several hours for the deletion to be reflected in the portal. 

There are additional knock-on effects to share links, referrals, and analytics associated with the participant. 

### Share links
When a participant is deleted, all of their PII (including their referral code) is deleted as well. Share links work differently—the share link itself is not deleted, but its association with a specific participant is removed. The deleted participant’s share links will no longer attribute a referral, but will still allow newly-referred participants to visit your program’s landing page. 

### Referrals
If deleted participants have made referrals or been referred themselves, then the referral history displayed in other participants’ widgets or microsites will change. In these cases, the referral still counts for rewards purposes, but visually the referral will be shown as having come from an anonymous participant.

### Analytics
The analytics on both the **Overview** and the **Program Analytics** pages are changed when you delete a participant. 

- **Overview** page: All statistics except for *converted referrals* will be adjusted within 48-72 hours.

- **Program Analytics** page: The statistics for unique visitors, active referrers, and referred visitors are affected by participant deletion. These values will be adjusted within 48-72 hours. Successful referrers, referred users, and referred conversions are *not* impacted by participant deletion and will remain the same. 

### Admin Portal
Deleted participants no longer appear on the **Participants** page. If the deleted participant was part of a referral, then the referral table on the other participant’s profile will show that a referral exists, but that it was from a deleted participant. If a reward had been given as part of the referral, then the rewards table similarly indicates that the referral is linked to a deleted participant.

## Deletion options

### Do not track
*Do Not Track* is a configuration option during participant deletion. If selected, the deleted participant cannot be re-registered in our system. Any attempts to recreate the participant will fail. 

### Preserve empty accounts
Preserving empty accounts is a configuration option that you can use when deleting participants in bulk, via REST API, or via GraphQL. To preserve empty accounts, include the `preserveEmptyAccount` field with your deletion file or call. 

## Deletion methods
Participants can be deleted via the API, individually inside the Admin Portal, or in bulk in the Admin Portal.

### Delete participants using the API
The SaaSquatch REST API provides two methods to delete participants:
1. [Delete an account](/api/methods/#open_delete_account). Use this method to delete an account, and all the individual participants on it.
2. [Delete a participant](/api/methods/#open_delete_user). Use this method to delete a participant on an account without deleting the account itself.

### Delete participant individually
1. Go to the **Participants** page and find the participant you want to delete.
2. Select their name to open their participant profile.
3. Select the **Delete** button below their name. 
4. Choose whether to add the participant to the *Do Not Track* list. 
5. Select the final delete button if you are sure you want to delete the participant. 

### Delete participants in bulk
Refer to our guide to [deleting participants in bulk](/guides/bulk-user-delete).