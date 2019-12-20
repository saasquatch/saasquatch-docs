import React from "react";
import { useRouteData } from "react-static";
import styled from "styled-components";
import PageHeader from "../../components/PageHeader";

const entry = {
  title: "Growth Automation Program Library",
  highlights:
    "A library of the available Growth Automation Programs by SaaSquatch.",
  slug: "program/library",
  sectionType: "successArticle",
  template: "pages/programLibrary.html"
};

export const Card = styled.div`
  box-sizing: border-box;
  max-width: 1200px;
  background-color: #fff;
  padding: 25px;
  border-radius: 3px;
  border: 2px solid #e2e2e2;
  box-shadow: none;
  margin-bottom: 30px;
`;

interface CH2Props {
  selected: boolean;
}

const CardContainer = styled.div`
  display: grid;
  flex-wrap: wrap;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  column-gap: 24px;
  row-gap: 24px;
`;

const ProgramCard = styled(Card)`
  max-height: 214px;
  min-height: 214px;
  margin-bottom: 0;
  padding: 0;
  position: relative;
`;

const PCButton = styled.a`
  position: absolute;
  bottom: 13px;
  text-align: center;
  width: 80%;
`;

const LibraryH3 = styled.h3`
  font-size: 16px;
  margin: 0 13px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 13px;
  height: 32px;
`;

const IconBorder = styled.div`
  position: relative;
  width: 35px;
  height: 35px;
  display: inline-block;
  margin-right: 0px;
  overflow: hidden;
  background: rgb(255, 255, 255);
  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(233, 233, 234);
  border-image: initial;
  text-align: center;
`;

const ProgramIcon = styled.span`
  font-size: 22px;
  color: #575757;
  width: 22px;
  height: 22px;
  color: rgb(143, 167, 187);
  margin-top: 3px;
`;

const P = styled.p``;

interface Props {
  id: string | undefined;
  icon: string | undefined;
  name: string;
  status?: string | undefined;
  type: string | undefined;
  isEditable: boolean;
}

const ProgramLibraryCardLabel = ({ icon, name, type }: Partial<Props>) => {
  return (
    <div style={{ padding: "15px" }}>
      <div style={{ display: "flex", minWidth: "100%" }}>
        <IconBorder>
          <ProgramIcon className={icon ? icon : "icon-sqh-Referral-Program"} />
        </IconBorder>
        <LibraryH3>{name}</LibraryH3>
      </div>
      <div style={{ paddingTop: "13px" }}>
        {type ? <P>{`${type}`}</P> : <P>Referral Program</P>}
      </div>
    </div>
  );
};

export default function render() {
  const { programs } = useRouteData();

  return (
    <>
      <PageHeader {...entry}>
        <CardContainer>
          {programs
            .filter(program => program.fields.globallyInstallable === true)
            .map(program => (
              <ProgramCard>
                <ProgramLibraryCardLabel
                  icon={program.fields.icon}
                  name={program.fields.name}
                  type={program.fields.summary}
                />

                <PCButton className="learnMoreLink" href={"/" + program.slug}>
                  Learn More.{" "}
                </PCButton>
              </ProgramCard>
            ))}
        </CardContainer>
      </PageHeader>
    </>
  );
}
