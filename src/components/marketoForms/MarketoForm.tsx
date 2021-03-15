import React, { useEffect, useState } from "react";
import { MarketoFormStyleOverwrite, SuccessText } from "./styles";

declare global {
  interface Window {
    MktoForms2: {
      loadForm?: (
        url: string,
        munchkinId: string,
        formid: number,
        onSubmit?: (form: any) => void
      ) => void;
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
          1018,
          function (form) {
            // Add an onSuccess handler
            form.onSuccess(function (values, followUpUrl) {
              // Get the form's jQuery element and hide it
              form.getFormElem().hide();
              setSubmitted(true);
              // Return false to prevent the submission handler from taking the lead to the follow up url
              return false;
            });
          }
        );
        return;
      }
      appendScript(setScriptLoaded);
    }
  }, [scriptLoaded]);

  return { states: { submitted } };
};

export const MarketoForm = () => {
  const { states } = useMarketo();

  return (
    <>
      {states.submitted && (
        <SuccessText>
          Thank you for subscribing to our breaking changes email!
        </SuccessText>
      )}
      <MarketoFormStyleOverwrite id="mktoForm_1018"></MarketoFormStyleOverwrite>
    </>
  );
};
