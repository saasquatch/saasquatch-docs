import { getBreadcrumb, isBlank, Search, useSearch } from "@saasquatch/squatch-search";
import { SearchProps } from "@saasquatch/squatch-search/dist/components/Search/Search";
import React, { useEffect } from "react";
import styled from "styled-components";

import Meta from "../components/Meta";

const Hero = styled.div`
  background: transparent;
  padding: 0;
  text-align: center;
`;

const Logo = styled.img`
  width: 260px;
  display: block;
  margin: 0 auto;
  margin-top: 53px;
`;

const Sublogo = styled.img`
  max-width: 250px;
`;

export default function render() {
  useEffect(() => {
    // Old old old redirects baced on anchors
    if (document) legacyAnchors();
  });
  const searchProps: SearchProps = {
    onGetBreadcrumbs: getBreadcrumb,
    onIsBlank: isBlank,
    useSearch: useSearch()
  }
  return (
    <>
    <Meta title={null} />
    <Hero className="hero-unit">
      <Logo src="/assets/images/saasquatch-logo-centered-no-slogan-RGB-300dpi.png" />
      <Sublogo src="/assets/images/helpcenter.png" />
      <p></p>
      <p style={{ marginTop: "40px" }}>
        We're commited to helping you plan, implement, and manage effective,
        engaging, and profitable referral and loyalty programs. Search below or
        choose a help center section on your left to get started.{" "}
      </p>

      <div>
        <Search {...searchProps}/>
      </div>
    </Hero>
    </>
  );
}

function legacyAnchors() {
  // This javascript redirects the anchor tags from www.referralsaasquatch.com/documentation to the new docs.referralsaasquatch.com formats
  // Closure-wrapped for security.
  var anchorMap = {
    "how-it-works": "/how-it-works",
    braintree: "/developer/braintree",
    recurly: "/developer/recurly",
    stripe: "/developer/stripe",
    zuora: "/developer/zuora",
    "app-integration": "/app-integration",
    "squatchjs-init": "/squatchjs#init",
    "squatchjs-autofill": "/squatchjs#autofill",
    "squatchjs-open": "/squatchjs#open",
    "squatchjs-close": "/squatchjs#close",
    "bestpractice-buttons": "/bestpractices/buttons",
    "bestpractice-speed": "/bestpractices/speed",
    general: "/faq",
    pricing: "/faq/pricing"
  };
  /*
        Best practice for extracting hashes:
        http://stackoverflow.com/a/10076097/151365
        */
  var hash = window.location.hash.substring(1);
  if (hash) {
    /*
        Best practice for javascript redirects:
        http://stackoverflow.com/a/506004/151365
        */
    hash = hash.toLowerCase();
    window.location.replace(anchorMap[hash]);
  }
}
