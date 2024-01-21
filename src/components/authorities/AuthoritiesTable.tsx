import React, {useState, useEffect} from "react";
import {AuthoritiesButtons} from "./AuthoritiesButtons";
import {Table} from "../../utils/global.styled";
import {getLocalAuthority, getRatingsInLocalAuthority} from "../../api/ratingsAPI";
import {EstablishmentsType, LocalAuthorityType} from "../../api/types";
import {ErrorDiv, TD} from "./Authorities.styled";
import {PAGE} from "../../utils/constants";

type RatingFH = {
    rate: number | string,
    count: number,
}

type RatingPercentageFH = {
    rate: number | string,
    percentage: number,
}

const FHRS = "FHRS";
const FHIS = "FHIS";

export const AuthoritiesTable: React.FC = () => {
    const [error, setError] = useState<any>();
    const [actualPage, setActualPage] = useState<number>(1);
    const [localAuthority, setLocalAuthority] = useState<LocalAuthorityType>();
    const [tBodyContent, setTbodyContent] = useState<RatingPercentageFH[]>([]);

    useEffect(() => {
        return () => {
            getLocalAuthority(actualPage).then(
                (result: LocalAuthorityType) => {
                    setLocalAuthority(result);
                },
                (error) => {
                    setError(error)
                }
            );
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ratingsFHRS = await Promise.all([
                    {rate: "5", count: await getStatistic("5", FHRS)},
                    {rate: "4", count: await getStatistic("4", FHRS)},
                    {rate: "3", count: await getStatistic("3", FHRS)},
                    {rate: "2", count: await getStatistic("2", FHRS)},
                    {rate: "1", count: await getStatistic("1", FHRS)},
                    {rate: "exempt", count: await getStatistic("0", FHRS)},
                ]);

                // todo zresetovať na nuly
                //todo FHIS
                const ratingsFHIS = await Promise.all([
                    {rate: "Pass and eat safe", count: await getStatistic("pass", FHIS)},
                    {rate: "Pass", count: await getStatistic("AwaitingInspection", FHIS)},
                    {rate: "Improvement required", count: await getStatistic("ImprovementRequired", FHIS)},
                ]);

                const percentageRating: RatingPercentageFH[] = calculatePercentageRating(ratingsFHRS);
                setTbodyContent(percentageRating);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [localAuthority]);

    async function getToAnotherPage(anotherPage: string) {
        let newPage = anotherPage === PAGE.next ? actualPage + 1 : actualPage - 1;
        if (newPage > 0) {
            setActualPage(newPage)
            getLocalAuthority(actualPage).then(
                (result: LocalAuthorityType) => {
                    setLocalAuthority(result);
                },
                (error) => {
                    setError(error)
                }
            );
        }
    }

    async function getStatistic(
        ratingKey: string,
        schemeTypeKey: string,
    ): Promise<number> {
        let totalCount = 0;
        const localAuthorityId = localAuthority?.authorities[0].LocalAuthorityId ?? -1;
        if (localAuthorityId > -1) {
            await getRatingsInLocalAuthority(
                //todo remove comment
                localAuthorityId,
                schemeTypeKey,
                ratingKey
            ).then(
                (result: EstablishmentsType) => {
                    totalCount = result.meta.totalCount;
                },
                (error) => {
                    setError(error)
                }
            );
        }
        return totalCount;
    }

    function calculatePercentageRating(ratings: RatingFH[]): RatingPercentageFH[] {
        const totalCount = ratings.reduce((sum, rating) => sum + rating.count, 0);
        const percentageByRating: RatingPercentageFH[] = ratings.map((rating) => ({
            rate: rating.rate,
            percentage: rating.count === 0 ? 0 : Math.round((rating.count / totalCount) * 100),
        }));
        return percentageByRating;
    }

    return (
        <>
            {error ? <ErrorDiv>Error: {error.message}</ErrorDiv> :
                <Table>
                    <h2>Local authority</h2>
                    <p>{localAuthority?.authorities[0].Name} ({localAuthority?.authorities[0].LocalAuthorityId})</p>
                    <table>
                        <thead>
                            <th key={0}>Rating</th>
                            <th key={1}>Percentage</th>
                        </thead>
                        <tbody>
                        {tBodyContent.map((rating: RatingPercentageFH, index: number) => (
                            <tr key={index}>
                                <TD key={index}>{rating.rate}</TD>
                                <TD key={index + 1}>{rating.percentage}%</TD>
                            </tr>
                        ))}

                        {/*<tr>*/}
                        {/*    <td>Pass and eat safe</td>*/}
                        {/*    <td>50%</td>*/}
                        {/*</tr>*/}
                        {/*<tr>*/}
                        {/*    <td>Pass</td>*/}
                        {/*    <td>15%</td>*/}
                        {/*</tr>*/}
                        {/*<tr>*/}
                        {/*    <td>Improvement Required</td>*/}
                        {/*    <td>35%</td>*/}
                        {/*</tr>*/}
                        </tbody>
                    </table>
                    <AuthoritiesButtons
                        getToAnotherPage={getToAnotherPage}
                    />
                </Table>
            }
        </>
    )
}
