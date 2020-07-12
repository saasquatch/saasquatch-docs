import React, { useState } from "react";
import styled from "styled-components";
import { VersionContext, Version } from "components/useVersion";
import { Award, Global, Archive, Chevron } from "components/icons";

export const Personalisation = styled.div<{ open: boolean }>`
  width: 436px;
  height: ${({ open }) => (open ? "auto" : "36px")};

  position: absolute;
  /* padding: 8px 24px; */
  left: -24px;
  margin-top: 12px;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
  border-radius: 18px;

  cursor: pointer;
  outline: none;

  @media screen and (max-width: 1299px) {
    width: auto;
  }
`;

const Info = styled.div`
  padding-left: 24px;
  color: #888;
  font-size: 14px;
  width: 100%;

  @media screen and (max-width: 1299px) {
    display: none;
  }
`;

const Preview = styled.div`
  padding: 0 24px;
  line-height: 16px;
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & svg {
    height: 16px;
  }
`;

const ExpandIcon = styled.div`
  display: none;
  margin-left: 24px;

  @media (max-width: 1299px) {
    display: inline-block;
  }
`;

const OptionWrapper = styled.div`
  padding: 24px;
  padding-bottom: 0px;
  border-top: 1px solid #eaeaea;
  box-sizing: border-box;
  width: 100%;
`;

const ListIcon = styled.div<{ active: boolean }>`
  width: 15px;
  padding-right: 24px;

  & path {
    /* Overrides hover color from Option component */
    fill: ${({ active }) => active && "#FFA41D !important"};
  }
`;

const Option = styled.div`
  display: flex;
  padding-top: 4px;
  padding-bottom: 32px;

  &:hover ${ListIcon} svg path {
    fill: #a3a3a3;
  }
`;

const Name = styled.div`
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
  color: #575757;
  padding-bottom: 12px;
`;

const Description = styled.div`
  font-size: 12px;
  font-weight: normal;
  color: #575757;
  line-height: 14px;
`;

export const PersonalisationSelect = () => {
  const [open, setOpen] = useState(false);
  const {
    version,
    setVersion: setVersionInner,
  } = VersionContext.useContainer();

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
      ? "non-Classic programs"
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
            <Option onClick={() => setVersion("hybrid")}>
              <ListIcon active={version === "hybrid"}>
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
