import { EstablishmentDetail } from '../../api/ratingsAPI';
import { Table } from "../../components/Table";
import { EstablishmentDetailRow } from "./EstablishmentDetailRow";

type EstablishmentCardProps = {
  establishment: EstablishmentDetail
};

const headerStyle: { [key: string]: string | number } = {
  textAlign: "center"
};

export const EstablishmentDetailCard = ({ establishment }: EstablishmentCardProps) => {
  const dataToRender = [
    {
      label: 'Address 1',
      key: 'AddressLine1'
    }, {
      label: 'Address 2',
      key: 'AddressLine2'
    }, {
      label: 'Address 3',
      key: 'AddressLine4'
    }, {
      label: 'Address 4',
      key: 'AddressLine4'
    }, {
      label: 'Rating Value',
      key: 'RatingValue'
    }, {
      label: 'Rating Date',
      key: 'RatingDate'
    }
  ];

  return (
    <>
      <h1 style={headerStyle}>{ establishment.BusinessName }</h1>

      <Table>
        {
          dataToRender.map(dataLine => (
            <EstablishmentDetailRow
              key={dataLine.key}
              label={dataLine.label}
              value={establishment[dataLine.key as keyof EstablishmentDetail]}
            />
          ))
        }
      </Table>
    </>
  )
};
