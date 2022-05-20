import styled from "styled-components";

/*To be used only to overwrite the css attached to the fields from the Marketo form*/
export const MarketoFormStyleOverwrite = styled.form`
  .mktoRequiredField {
    display: flex !important;
    flex-direction: row-reverse;
  }
  .mktoOffset {
    width: 0px !important;
  }
  .mktoGutter {
    width: 5px !important;
  }
  #ValidMsgEmail {
    margin-right: -37px;
  }
  .mktoError {
    right: 122px !important;
  }
  .mktoAsterix {
    margin-top: -5px;
  }
  .mktoTextField {
    border-radius: 4px !important;
    box-shadow: none !important;
  }
  .mktoEmailField {
    border-radius: 4px !important;
    box-shadow: none !important;
  }
  .mktoButtonWrap {
    margin-left: 0px !important;
  }
  .mktoButton {
    border-radius: 20px !important;
    min-width: 100px !important;
    padding: 3px 19px !important;
    background: var(--sq-action-primary) !important;
    border: 1px solid var(--sq-action-primary) !important;
    color: rgb(255, 255, 255) !important;
    font-weight: var(--sq-font-weight-semibold) !important;
    font-size: 13px !important;
    background-image: none !important;
    font-family: var(--sq-font-family-sans) !important;
  }
`;

export const SuccessText = styled.p`
  margin: 15px auto;
  padding-top: 10px;
  font-size: var(--sq-font-size-regular);
  color: var(--sq-text);
  max-width: 270px;
`;
