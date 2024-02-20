import { createUseStyles } from "react-jss";
import { Country } from "../types";
import { countries } from "../model/countries";
import { ChangeEvent } from "react";

const useStyles = createUseStyles({
    label: {
        marginRight: '10px'
    },
    select: {
        padding: '5px',
        borderRadius: '10px'
    }
});

interface Props {
    onSelectCountry: (country: Country) => void;
}

export const CountryPicker = (props: Props) => {
    const classes = useStyles();
    const { onSelectCountry } = props;

    const onSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        onSelectCountry(e.target.value as Country);
    }

    return (
        <>
            <label htmlFor="countries" className={classes.label}>Select a country:</label>

            <select name="countries" id="country_picker" className={classes.select} onChange={onSelect}>
                {
                    countries.map((country, index) => 
                        <option key={index} value={country}>{country}</option>
                    )
                }
            </select>
        </>
    );
};