import React from 'react';
import styled from 'styled-components';
import { HashLink as Link } from "react-router-hash-link";

/* Wrapper Element */

export const ColumnGridWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin-left: -8px;
`

/* ColumnGridItem */

const ItemContainer = styled.div`
  flex: 33%;
  flex-grow: 1;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 3px rgba(0,0,0,0.25);
  width: 25%;
  max-width: 27%;
  @media screen and (max-width: 1250px) {
    flex: 50%;
    width: 42%;
    max-width: 42%;
  }
  @media screen and (max-width: 807px) {
    flex: 100%;
    width: 100%;
    max-width: 100%;
  }
  a:hover {
    text-decoration: none;
  }
  margin: 10px;
  color: #333;
  justify-items: center;
  img, i {
    margin-bottom: 10px;
  }
`
const Title = styled.h3`
  margin-top: -0.25em;
  text-align: center;
`
const DisplayIcon = styled.i`
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: 100px;
  color: #003b45;
`
const ReadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  button {
    transition: background-color 0.3s ease;
    margin-top: 1em;
    padding: 8px 12px;
    background-color: #00a176;
    color: white;
    border: none;
    border-radius: 4px;
  }
  button:hover {
    background-color: #007556;
  }
`

const ColumnGridItem = ({ title, image, icon, children, link }) => {
  return (
    <ItemContainer>
      {/* If title exists */}
      { typeof title !== 'undefined' &&
        <Title>{title}</Title>
      }

      {/* If image exists (make this clickable) */}
      { typeof image !== 'undefined' &&
        <Link to={link}>
          <img src={image} />
        </Link>
      }

      {/* If icon exists */}
      { typeof icon !== 'undefined' &&
        <Link to={link}>
          <DisplayIcon
            className={"icon fa fa-6 " + icon}
            aria-hidden="true"
          ></DisplayIcon>
        </Link>
      }

      {/* If description exists as 'props.children' */}
      { typeof children !== 'undefined' &&
        <div>{children}</div>
      }

      {/* If link exists' */}
      { typeof link !== 'undefined' &&
        <Link to={link}>
          <ReadMoreContainer>
            <button>Read more {/* about {integration.integrationName} */}</button>
          </ReadMoreContainer>
        </Link>
      }
    </ItemContainer>
  )
}

export default ColumnGridItem