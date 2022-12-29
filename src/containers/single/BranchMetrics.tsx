import React from "react";
import { useRouteData } from "react-static";

import TocFrame from "../../components/TocFrame";
import { Properties } from "../../components/Properties";

const branchFields = {
  "title": "The SaaSquatch integration with Branch Metrics includes these fields as `data` in referral branch deep links.\n",
  "type": "object",
  "properties": {
    "sq_id": {
      "type": "string",
      "description": "The Referrer's user ID. This allows you to look up the user in your own system."
    },
    "sq_accountId": {
      "type": "string",
      "description": "The Referrer's account ID. This allows you to look up group or company info. See [Shared vs. Solo accounts](/shared-vs-solo-accounts/)"
    },
    "sq_firstName": {
      "type": "string",
      "description": "The Referrer's first name."
    },
    "sq_lastName": {
      "type": "string",
      "description": "The Referrer's last name."
    },
    "sq_imageUrl": {
      "type": "string",
      "description": "The Referrer's profile image URL. Note that unlike the user's `imageUrl` that is used other places in SaaSquatch, like via API, in theme context and in Squatch.js, if this field is set to `null` it won't actually be `null`.\nInstead, when set to `null` it is instead replaced by a gravatar link that's automatically generated based upon a hash for the Referrer user's email address\nfor when we do not have an image URL for that user. If you want to detect for null images instead you should look for if it's gravatar, or not use this field and look up the value in your\nuser database, or something else.\n"
    },
    "sq_referralCode": {
      "type": "string",
      "description": "The Referrer's referral code. This is necessary to [attribute the referral](/success/core-topics/#attribution)."
    },
    "sq_amount": {
      "type": "string",
      "description": "The amount of the Referred User's reward. This is sort of like the reward fields returned from the [lookup referral code API call](/api/methods/#get_code)\nfor explaining a reward but it's different and uses a custom mapping of fields described in the table below to map from this abstract field (that's not available\nin the API) to other stored or calculated fields for rewards that can be looked up directly via the API, or the fields used in `programDetails` of theme context\nor the fields in squatch.js, or other places where rewards are used. Use this convenient mapping table:\n\n  - For rewards of type `TIME_CREDIT` and `CREDIT` this field is equal to the reward field called `credit`\n  - For rewards of type `PCT_DISCOUNT` this field is equal to the reward field called `discountPercent`\n  - For rewards of type `FEATURE` this field is equal to the reward field called `quantity`\n  - For rewards of type `GIFTCODE` this field is empty\n"
    },
    "sq_unit": {
      "type": "string",
      "description": "The unit of the Referred User's reward. For example, in a 10% off referral program this would be `PERCENT`"
    },
    "sq_type": {
      "type": "string",
      "description": "The type of the Referred User's reward. One of: `PCT_DISCOUNT`, `TIME_CREDIT`, `FEATURE`, `CREDIT`, `GIFTCODE`"
    }
  }
}

export default () => {
  const { entry }: any = useRouteData();

  return (
    <TocFrame entry={entry}>
      <Properties schema={branchFields} />
    </TocFrame>
  );
};
