import React from "react";
import { Operation } from "swagger-schema-official";
import { useApiData } from "../../containers/single/api";

export function Tags({ method }: { method: Operation }) {
  const { tagMap } = useApiData();
  return (
    <>
      {method.tags.map((tag: string) => (
        <span className="label" key={tag}>
          {tag}
        </span>
      ))}
    </>
  );
}
