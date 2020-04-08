import React from "react";
import styled from "styled-components";
import Modal from "react-modal";

import { VersionContext, Version } from "./useVersion";

const Card = styled.div<{ active: boolean }>`
  border-radius: 5px;
  border: 1px solid #ccc;
  background: ${({ active }) => (active ? "green" : "#EEE")};
  cursor: pointer;
  padding: 20px;
  margin: 10px;
  width: 33%;
  box-sizing: border-box;
  &:hover{
      background: red;
  }
`;

const Cardtitle = styled.div`
  font-size: 16px;
  color: #000;
  font-weight: bold;
`;
const CardBody = styled.div`
  color: #333;
`;

const CardChoices = styled.div`
  display: flex;
`;

export default function VersionSwitcherModal() {
  const {
    version,
    setVersion:setVersionInner,
    modalIsOpen,
    openModal,
    closeModal,
  } = VersionContext.useContainer();
  const setVersion = (next:Version) => {
    setVersionInner(next);
    closeModal();
  }
  return (
    <Modal
      isOpen={modalIsOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      // style={customStyles}
      contentLabel="Change Personalization"
      style={{
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.5)'
        },
        content: {
          zIndex: 90000
        }
      }}
    >
      <h3>Personalization</h3>
      <p>Our documentation website is being personalized to show only relevant content for you.</p>
      <CardChoices>
        <Card
          onClick={() => setVersion("ga-only")}
          active={version === "ga-only"}
        >
          <Cardtitle>New Programs</Cardtitle>
          <CardBody>
            Useful for customers that have started using SaaSquatch since 2019.
            Hides our classic program documentation.
          </CardBody>
        </Card>
        <Card
          onClick={() => setVersion("classic-only")}
          active={version === "classic-only"}
        >
          <Cardtitle>Works With Classic</Cardtitle>
          <CardBody>
            Useful for customers that have started using SaaSquatch before 2019
            and are only running a referral program. Hides documentation that
            works with new referral and loyalty programs.
          </CardBody>
        </Card>
        <Card
          onClick={() => setVersion("hybrid")}
          active={version === "hybrid"}
        >
          <Cardtitle>Show Everything</Cardtitle>
          <CardBody>
            Shows all documentation. Useful for customers that have a program
            created before 2019, but are also running new loyalty, referral or
            partner programs.
          </CardBody>
        </Card>
      </CardChoices>
    </Modal>
    // <label htmlFor="filter">
    //   Change Filter:
    //   <select
    //     value={version}
    //     onChange={(e) => {
    //       return setVersion(e.currentTarget.value as Version);
    //     }}
    //   >
    //     <option value="ga-only">New Programs (Hide Classic)</option>
    //     <option value="classic-only">Works With Classic</option>
    //     <option value="hybrid">Show Everything</option>
    //   </select>
    // </label>
  );
}
