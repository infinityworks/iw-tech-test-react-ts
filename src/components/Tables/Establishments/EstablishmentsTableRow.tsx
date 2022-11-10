import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Checkbox from "../../Checkbox/checkbox";
import { Establishment } from "../../../types/Establishment";
import { ATRIBUTE_TYPES } from "../../../types/enum";

const styledValues = {
  fontSize: "20px",
};

const styledClickableValues = {
  fontSize: "20px",
  cursor: "pointer",
};

const styledCheckBoxes = {
  display: "flex",
  justifyContent: "center",
};

interface Props {
  establishment: Establishment;
  headerAttr: { BusinessName: string; RatingValue: string; Favorite: string };
  setState: void;
  state: any;
  handleChange: (isFavorite: boolean, i: number) => void;
  indexRow: number;
}

export const EstablishmentsTableRow = ({
  establishment,
  headerAttr,
  handleChange,
  indexRow,
}: Props) => {
  let navigate = useNavigate();
  const [defaulteEstablishment] = useState(establishment);

  const handleNavigate = (e: any) => {
    if (e !== undefined) {
      const id = e.target.getAttribute("id");
      if (id != null) navigate(`/detail/${id}`);
    }
  };

  return (
    <tr key={indexRow}>
      {defaulteEstablishment !== undefined && defaulteEstablishment !== null
        ? Object.keys(headerAttr).map((attr: string, index: number) => {
            switch (attr) {
              case ATRIBUTE_TYPES.BUSINESS_NAME:
                return (
                  <td
                    id={defaulteEstablishment.FHRSID.toString()}
                    onClick={handleNavigate}
                    key={index}
                    style={styledClickableValues}
                  >
                    {defaulteEstablishment[attr]}
                  </td>
                );
              case ATRIBUTE_TYPES.RATING_VALUE:
                return (
                  <td key={index} style={styledValues}>
                    {defaulteEstablishment[attr]}
                  </td>
                );
              case ATRIBUTE_TYPES.FAVORITE:
                return (
                  <td key={index} style={styledCheckBoxes}>
                    <Checkbox
                      onChange={(event) => handleChange(event, indexRow)}
                      value={defaulteEstablishment.isFavorite}
                    />
                  </td>
                );
              default:
                return null;
            }
          })
        : null}
    </tr>
  );
};
