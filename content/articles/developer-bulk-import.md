---
title: Bulk Imports
slug: /developer/bulk-import
sectionType: guide
template: hasTableOfContents.html
date: 2023-08-09
robotsTag:
  - FOLLOW
---

### Bulk Import Options

Import jobs can be started from within the Admin Portal, via SaaSquatch’s SFTP integration, or by using the SaaSquatch API directly.

### File-based bulk imports via the admin portal
Bulk imports can be started from within the SaaSquatch Admin Portal. To get started, go to **Analytics > Reports**, then select **Import**.

For full instructions on the file-based bulk import process, see our guides on:
- [Bulk User Import](/guides/user-import)
- [Bulk User Delete Import](/guides/bulk-user-delete)
- [Bulk Event Import](/guides/event-import/)
- [Bulk Reward Redemption Import](/guides/bulk-reward-redemption)

### Bulk imports via SFTP integration

Bulk imports can be performed via the SaaSquatch SFTP integration. See our guide on the [SFTP integration here](/integrations/sftp) for instructions on:
- Enabling and authenticating the integration
- Generating an SSH key
- Connecting to the SFTP server
- Uploading import files and checking their status

### Bulk imports via API

To start a bulk import job, there are three API requests to be performed. 
- Uploading the import file
- Validating the import file
- Starting the import job

#### Uploading the import file

The `/export/upload` endpoint accepts a file upload in two different ways, either with `multipart/form-data` encoding or as a raw file upload.

Example Request:
```
curl -X POST 'https://app.referralsaasquatch.com/api/v1/{tenant_alias}/export/upload' \
        -u :{tenant_api_key} \
        --form 'file=@my_file.csv'
```
When the file is successfully uploaded, a `fileRef` will be returned. The `fileRef` will be used in the next two API requests.

Example Response:
```
{
    “fileRef”: “imports/test_akdq8a9wyvzba/userEvents_63323378e1edcd44b03eed9a.jsonl”
}
```

#### Validating the import file

Before starting your import job, you can use the `validateJobInput` GraphQL mutation to validate the import file before attempting to start the import job.
There are two inputs required, the `fileRef` from step 1, and the job `type`. 
These are the 4 job types available:

- Import Users: `MUTATION/USER`
- Delete Users: `MUTATION/DELETE_USER`
- Import User Events: `MUTATION/USER_EVENT`
- Redeem Reward Balances: `MUTATION/REDEEMABLE_REWARD_BALANCE`

Example:
```
curl -X POST https://app.referralsaasquatch.com/api/v1/{tenant_alias}/graphql 
    -u :{tenant_api_key}
    -H "Content-Type: application/json" 
    -d '{
    "operationName":"validate",
    "variables": {
        "jobInput": {
            "fileRef":"{file_ref}",
            "type":"{job_type}"
        }
    },
    "query": "query validate($jobInput: JobInput!) {validateJobCreation(jobInput: $jobInput) { errors }}"
}'
```

If there are any errors found in the import file, they will be returned as an array in `errors`. If `errors` is empty, then the same `fileRef` can be used to start an import job in step 3.

Example Response: 
```
{
    "data": {
        "validateJobCreation": {
            "errors": []
        }
    }
}
```

#### Starting the import job

To start the import job, use the `createJob` GraphQL mutation. Provide the `fileRef` and job `type` used in step 2

Example:
```
curl -X POST https://app.referralsaasquatch.com/api/v1/{tenant_alias}/graphql 
    -u :{tenant_api_key}
    -H "Content-Type: application/json" 
    -d '{
    "variables":{
        "jobInput": {
            "type":"{job_type}",
            "outputFormat":"CSV",
            "fileRef":"{file_ref}"
        }
    },
    "query":"mutation ($jobInput: JobInput!) { createJob(jobInput: $jobInput) {id type requester dateCreated}}"
}'
```

The `id` returned by the mutation can be used to query the status of the job

Example Response:
```
{
    "data": {
        "createJob": {
            "id": "633b1cf34efc053cb50a3f6d",
            "type": "MUTATION/USER_EVENT",
            "requester": "API",
            "dateCreated": 1664818419661
        }
    }
}
```

Check the status of the import job

To check the status of the import job, you can use the `job` GraphQL query and provide the job `id` returned in step 3.

Example:
```
curl -X POST https://app.referralsaasquatch.com/api/v1/{tenant_alias}/graphql 
    -u :{tenant_api_key}
    -H "Content-Type: application/json" 
    -d '{
    "variables": {
        "id": "{job_id}"
    },
    "query": "query ($id: ID!) { job(id: $id) { status stats { recordsProcessed }}}"
}'
```

Example Response:
```
{
    "data": {
        "job": {
            "status": "COMPLETED",
            "stats": {
                "recordsProcessed": 22
            }
        }
    }
}
```
