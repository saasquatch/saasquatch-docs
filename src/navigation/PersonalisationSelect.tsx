import React, { useState } from "react";
import styled from "styled-components";
import { VersionContext, Version } from "components/useVersion";
import { Award, Global, Archive, Chevron } from "components/icons";

export const Personalisation = styled.div<{ open: boolean }>`
  width: 436px;
  height: ${({ open }) => (open ? "auto" : "36px")};

  position: absolute;
  /* padding: var(--sq-spacing-x-small) var(--sq-spacing-x-large); */
  left: -24px;
  margin-top: var(--sq-spacing-small);
  background: var(--sq-surface);
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
  border-radius: 18px;

  cursor: pointer;
  outline: none;
  z-index: 999;

  @media screen and (max-width: 1299px) {
    width: auto;
  }

  @media screen and (max-width: 978px) {
    top: -56px;
    left: 0;
  }
`;

const Info = styled.div`
  padding-left: var(--sq-spacing-x-large);
  color: #888;
  font-size: var(--sq-font-size-regular);
  width: 100%;

  @media screen and (max-width: 1299px) {
    display: none;
  }
`;

const Preview = styled.div`
  padding: 0 var(--sq-spacing-x-large);
  line-height: var(--sq-line-height-caption);
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & svg {
    height: 16px;
  }
`;

const ExpandIcon = styled.div`
  margin-left: var(--sq-spacing-x-large);

  @media (max-width: 1299px) {
    display: inline-block;
  }
`;

const OptionWrapper = styled.div`
  padding: var(--sq-spacing-x-large);
  padding-bottom: 0px;
  border-top: 1px solid #eaeaea;
  box-sizing: border-box;
  width: 100%;
`;

const ListIcon = styled.div<{ active: boolean }>`
  width: 15px;
  padding-right: var(--sq-spacing-x-large);

  & path {
    /* Overrides hover color from Option component */
    fill: ${({ active }) => active && "#FFA41D !important"};
  }
`;

const Option = styled.div`
  display: flex;
  padding-top: var(--sq-spacing-xx-small);
  padding-bottom: var(--sq-spacing-xx-large);

  &:hover ${ListIcon} svg path {
    fill: #a3a3a3;
  }
`;

const Name = styled.div`
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-caption);
  font-weight: 500;
  color: var(--sq-text);
  padding-bottom: var(--sq-spacing-small);
`;

const Description = styled.div`
  font-size: var(--sq-spacing-small);
  font-weight: var(--sq-font-weight-regular);
  color: var(--sq-text);
  line-height: 14px;
`;

export const PersonalisationSelect = () => {
  const [open, setOpen] = useState(false);
  const { version, setVersion: setVersionInner } =
    VersionContext.useContainer();

  const setVersion = (version: Version) => {
    setVersionInner(version);
    setOpen(false);
  };

  const OptionIcon = (props: IconProps = {}) => {
    return version === "classic-only" ? (
      <Archive {...props} />
    ) : version === "ga-only" ? (
      <Award {...props} />
    ) : (
      <Global {...props} />
    );
  };

  const headerText =
    version === "classic-only"
      ? "Classic programs"
      : version === "ga-only"
      ? "new programs"
      : "all programs";

  return (
    <div style={{ position: "relative" }}>
      <Personalisation open={open} tabIndex={0} onBlur={() => setOpen(false)}>
        <Preview onClick={() => setOpen((o) => !o)}>
          <OptionIcon fill="#a3a3a3" />
          <Info>
            {open
              ? "Select a personalisation option"
              : `Docs are being personalised for ${headerText}`}
          </Info>
          {!open ? (
            <ExpandIcon>
              <Chevron direction="down" />
            </ExpandIcon>
          ) : (
            <Chevron />
          )}
        </Preview>
        {open && (
          <OptionWrapper>
            <Option onClick={() => setVersion("ga-only")}>
              <ListIcon active={version === "ga-only"}>
                <Award />
              </ListIcon>
              <div>
                <Name>New Programs</Name>
                <Description>
                  Useful for customers that have started using SaaSquatch since
                  2019. Hides our classic program documentation.
                </Description>
              </div>
            </Option>
            <Option onClick={() => setVersion("classic-only")}>
              <ListIcon active={version === "classic-only"}>
                <Archive />
              </ListIcon>
              <div>
                <Name>Works with Classic</Name>
                <Description>
                  Useful for customers that have started using SaaSquatch before
                  2019 and are only running a referral program. Hides
                  documentation that works with new referral and loyalty
                  programs.
                </Description>
              </div>
            </Option>
            <Option onClick={() => setVersion("everything")}>
              <ListIcon active={version === "everything"}>
                <Global />
              </ListIcon>
              <div>
                <Name>Show Everything</Name>
                <Description>
                  Shows all documentation. Useful for customers that have a
                  program created before 2019, but are also running new loyalty,
                  referral or partner programs.
                </Description>
              </div>
            </Option>
          </OptionWrapper>
        )}
      </Personalisation>
    </div>
  );
};
