import React, { useEffect, useState } from "react";
import { MarketoFormStyleOverwrite, SuccessText } from "./styles";

declare global {
  interface Window {
    MktoForms2?: {
      loadForm?: (
        url: string,
        munchkinId: string,
        formid: number,
        onSubmit?: (form: Form) => void
      ) => void;
    };
  }
}

interface FormElement {
  hide: () => void;
}
interface Form {
  onSuccess: (inputFunction: () => void) => boolean;
  getFormElem: () => FormElement;
}

interface FormProps {
  url: string;
  munchkinId: string;
  formId: number;
  successText: string;
}

const useMarketoForm = (props: FormProps) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { url, munchkinId, formId } = props;

  function appendScript() {
    if (window.MktoForms2) return setScriptLoaded(true);

    const script = document.createElement("script");
    script.src = "//info.saasquatch.com/js/forms2/js/forms2.min.js";
    script.onload = () => (window.MktoForms2 ? setScriptLoaded(true) : null);
    document.body.appendChild(script);
  }

  useEffect(() => {
    if (typeof window !== undefined) {
      if (scriptLoaded) {
        window.MktoForms2.loadForm(url, munchkinId, formId, function (form) {
          // Add an onSuccess handler
          form.onSuccess(function () {
            // Get the form's jQuery element and hide it
            form.getFormElem().hide();
            setSubmitted(true);
            // Return false to prevent the submission handler from taking the lead to the follow up url
            return false;
          });
        });
        return;
      }
      appendScript();
    }
  }, [scriptLoaded]);

  return { states: { submitted } };
};

export const MarketoForm = (props: FormProps) => {
  const { states } = useMarketoForm(props);

  return states.submitted ? (
    <SuccessText>
      {props.successText}
    </SuccessText>
  ) : (
    <MarketoFormStyleOverwrite
      id={`mktoForm_${props.formId}`}
    ></MarketoFormStyleOverwrite>
  );
};
