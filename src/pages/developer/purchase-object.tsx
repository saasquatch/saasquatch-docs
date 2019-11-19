import React from "react";

import { Properties } from "../../components/Properties";

//@ts-ignore
import PurchaseEvent from "@saasquatch/schema/json/PurchaseEventFields.schema.json";

// ---
// title: Growth Automation Purchase Event
// highlights: Details about the SaaSquatch User Purchase Event.
// slug: developer/purchase-object
// sectionType: successArticle
// template: pages/purchaseObject.html
// ---

/**
 *
 * 
{% import "../macros/swaggerMacros.html" as swaggerMacros %}
*/

export default function render() {
  return (
    <>
      <p>
        The SaaSquatch system is configured to accept being sent a wide range of{" "}
        <a href="/growth/ga-mechanisms/#user-events">event data</a> about
        actions users take within your product. This event information will
        power the programs within your SaaSquatch project, and can be used to{" "}
        <a href="/growth/ga-mechanisms/#program-rules">trigger</a> sending
        emails and providing rewards.
      </p>

      <p>
        Events can be sent to SaaSquatch through our{" "}
        <a href="/api/methods/#trackEvent">REST API</a> or squatch.js Javascript
        Library.
      </p>

      <p>
        The `puchase` event is a reserved user event type within the SaaSquatch
        system, and requires information to be sent to SaaSquatch in a defined
        format. This format is as follows:
      </p>

      <h4>Fields</h4>
      <div>
        <Properties schema={PurchaseEvent.proprerties} />
      </div>
    </>
  );
}
