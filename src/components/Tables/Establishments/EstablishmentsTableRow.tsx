import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Checkbox from "../../Checkbox/checkbox";

const styledValues: { [key: string]: string | number } = {
  fontSize: "20px",
};

const styledClickableValues: { [key: string]: string | number } = {
  fontSize: "20px",
  cursor: "pointer",
};

const styledCheckBoxes: { [key: string]: string | number } = {
  display: "flex",
  justifyContent: "center",
};

interface Props {
  establishment: { [key: string]: any } | null | undefined;
  headerAttr: { BusinessName: string; RatingValue: string; Favorite: string };
  setState: any;
  state: any;
  handleChange: any;
  indexRow: number;
}

export const EstablishmentsTableRow: React.FC<Props> = ({
  establishment,
  headerAttr,
  handleChange,
  indexRow,
}) => {
  let navigate = useNavigate();
  const [defaulteEstablishment] = useState(establishment);

  const handleNavigate = (e: any) => {
    if (e !== undefined) {
      const id = e.target.getAttribute("id");
      if (id != null) navigate(`/detail/${id}`);
    }
  };

  return (
    <tr>
      {Object.keys(headerAttr).map((attr: string, index: number) => {
        if (
          defaulteEstablishment !== undefined &&
          defaulteEstablishment !== null
        ) {
          switch (attr) {
            case "BusinessName":
              return (
                <td
                  id={defaulteEstablishment.FHRSID}
                  onClick={handleNavigate}
                  key={index}
                  style={styledClickableValues}
                >
                  {defaulteEstablishment[attr]}
                </td>
              );
            case "RatingValue":
              return (
                <td key={index} style={styledValues}>
                  {defaulteEstablishment[attr]}
                </td>
              );
            case "Favorite":
              return (
                <td key={index} style={styledCheckBoxes}>
                  <Checkbox
                    defaulteEstablishment={defaulteEstablishment}
                    onChange={handleChange}
                    indexRow={indexRow}
                  />
                </td>
              );
            default:
              return null;
          }
        } else return null;
      })}
    </tr>
  );
};
