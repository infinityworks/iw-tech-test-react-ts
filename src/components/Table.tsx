import React, { ReactNode } from "react";

const headerStyle: { [key: string]: string | number } = {
  paddingBottom: "10px",
  textAlign: "left",
  fontSize: "20px",
};

export const Table: React.FC<Props> = ({ columns, children }) => {
  return (
    <table>
      {
        columns?.length && (
          <thead>
            <tr>
              {
                columns.map((columnName: string) => (
                  <th style={headerStyle}>{ columnName }</th>
                ))
              }
            </tr>
          </thead>
        )
      }

      <tbody>
        { children }
      </tbody>
    </table>
  );
};

interface Props {
  columns?: Array<string>;
  children?: ReactNode;
};
