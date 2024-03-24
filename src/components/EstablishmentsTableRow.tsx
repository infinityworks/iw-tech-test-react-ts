import styles from '../styles/EstablishmentsTableRow.module.css';
import {Link } from 'react-router-dom';
export const EstablishmentsTableRow: React.FC<{
  establishment: { [key: string]: string } | null | undefined;
}> = ({ establishment }) => {
  return (
      <tr >
        <td className={styles.tableRow}><Link to={`/detail/${establishment?.FHRSID}`} className={styles.link}>{establishment?.BusinessName}</Link></td>
        <td className={styles.tableRow}>{establishment?.RatingValue}</td>
      </tr>
  );
};
