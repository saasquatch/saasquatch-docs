import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    MktoForms2: {
      loadForm?: (url: string, munchkinId: string, formid: number) => void;
    };
  }
}

function appendScript(setScriptLoaded) {
  if (window.MktoForms2) return setScriptLoaded(true);

  const script = document.createElement("script");
  script.src = "//info.saasquatch.com/js/forms2/js/forms2.min.js";
  script.onload = () => (window.MktoForms2 ? setScriptLoaded(true) : null);
  document.body.appendChild(script);
}

const useMarketo = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      if (scriptLoaded) {
        window.MktoForms2.loadForm(
          "//info.saasquatch.com",
          "162-BJJ-156",
          1018
        );
        return;
      }
      appendScript(setScriptLoaded);
    }
  }, [scriptLoaded, submitted]);

  return { states: { submitted }, callbacks: { setSubmitted } };
};

export const MarketoForm = () => {
  const { states, callbacks } = useMarketo();

  return (
    <>
      {/*Would be nice to have some sort of indication of submit*/}
      {/*Not sure if this is handled my marketo or not */}
      {states.submitted && <p>Thanks for subscribing to breaking changes!</p>}
      <form id="mktoForm_1018">
        {/* <button onClick={() => callbacks.setSubmitted(true)}>My Submit</button> */}
      </form>
    </>
  );
};
