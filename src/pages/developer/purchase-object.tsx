import React, { useState, useEffect } from "react";
import $RefParser from "json-schema-ref-parser";

import PurchaseEventRaw from "@saasquatch/schema/json/PurchaseEventFields.schema.json";

import { Properties } from "../../components/Properties";
import PageHeader from "../../components/PageHeader";

const entry = {
  title: "User Purchase & Refund Event",
  highlights: "Details about the SaaSquatch User Purchase Event.",
  slug: "developer/purchase-object",
  sectionType: "successArticle",
  template: "pages/purchaseObject.html",
};

export default function render() {
  const PurchaseEvent = useSchema(PurchaseEventRaw);
  return (
    <PageHeader {...entry}>
      <>
        <p>
          SaaSquatch can accept user{" "}
          <a href="/growth/ga-mechanisms/#user-events">event data</a> sent from
          your app. User event data can be set to{" "}
          <a href="/growth/ga-mechanisms/#program-rules">trigger</a> goals and
          send transactional emails.
        </p>

        <p>
          You can send events to SaaSquatch through our{" "}
          <a href="/api/methods/#trackEvent">REST API</a> or{" "}
          <a href="/developer/squatchjs/">squatch.js Javascript Library</a>.
        </p>

        <p>
          <strong>Note:</strong> Events older than 2 years are not accessible
          via API or visible on the Participants page in the Admin Portal.
          However, you can continue to access historical data by running an{" "}
          <a href="/running-programs/creating-an-event-export-report">
            event export report
          </a>
          .
        </p>

        <p>
          The <code>purchase</code> and <code>refund</code> events are reserved user events. This
          requires the data of these events to be sent in a defined format using
          the fields below.
        </p>

        <h4>Fields</h4>
        <div>{PurchaseEvent && <Properties schema={PurchaseEvent} />}</div>
      </>
    </PageHeader>
  );
}

/**
 * Parses a JSON schema, dereferneces $ref entries
 *
 * @param schema schema to dereference
 */
function useSchema(schema) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    let parser = new $RefParser();
    parser
      .dereference(schema, {
        resolve: {
          file: false,
        },
      })
      .then(setValue);
  }, schema);
  return value;
}
