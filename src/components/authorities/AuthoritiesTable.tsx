import React, {useState, useEffect} from "react";
import {AuthoritiesButtons} from "./AuthoritiesButtons";
import {Table} from "../../utils/global.styled";
import {getAuthoritySchemeType, getLocalAuthority, getRatingsInLocalAuthority} from "../../api/ratingsAPI";
import {EstablishmentsType, LocalAuthorityType} from "../../api/types";
import {TD} from "./Authorities.styled";
import {PAGE, FHRS, FHIS} from "../../utils/constants";
import {RatingFH, RatingPercentageFH} from "./Authorities.types";
import {LoadingErrorInfo} from "./LoadingErrorInfo";
import {calculatePercentageRating} from "./Authorities.helper";

export const AuthoritiesTable: React.FC = () => {
    const [error, setError] = useState<any>();
    const [actualPage, setActualPage] = useState<number>(1);
    const [localAuthority, setLocalAuthority] = useState<LocalAuthorityType>();
    const [tBodyContent, setTbodyContent] = useState<RatingPercentageFH[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await getLocalAuthority(actualPage);
                setLocalAuthority(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        const timeout = setTimeout(() => {
            fetchData();
        }, 10);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                let rating: RatingFH[] = [];
                const localAuthorityId = localAuthority?.authorities[0].LocalAuthorityId ?? -1;

                if (localAuthorityId > -1) {
                    if (await isAuthorityEnteredSchemeType(localAuthorityId, FHRS)) {
                        rating = await getFHRSrating(localAuthorityId);

                    } else {
                        rating = await getFHISrating(localAuthorityId);
                    }

                    if (rating.length > 0) {
                        const percentageRating: RatingPercentageFH[] = calculatePercentageRating(rating);
                        setTbodyContent(percentageRating);
                    }
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [localAuthority]);

    async function getFHRSrating(localAuthorityId: number): Promise<RatingFH[]> {
        return await Promise.all([
            {rate: "5", count: await getStatistic("5", FHRS, localAuthorityId)},
            {rate: "4", count: await getStatistic("4", FHRS, localAuthorityId)},
            {rate: "3", count: await getStatistic("3", FHRS, localAuthorityId)},
            {rate: "2", count: await getStatistic("2", FHRS, localAuthorityId)},
            {rate: "1", count: await getStatistic("1", FHRS, localAuthorityId)},
            {rate: "exempt", count: await getStatistic("0", FHRS, localAuthorityId)},
        ]);
    }

    async function getFHISrating(localAuthorityId: number): Promise<RatingFH[]> {
        return await Promise.all([
            {rate: "Pass and eat safe", count: await getStatistic("pass", FHIS, localAuthorityId)},
            {rate: "Pass", count: await getStatistic("AwaitingInspection", FHIS, localAuthorityId)},
            {
                rate: "Improvement required",
                count: await getStatistic("ImprovementRequired", FHIS, localAuthorityId)
            },
        ]);
    }

    async function isAuthorityEnteredSchemeType(
        localAuthorityId: number,
        schemeType: string
    ): Promise<boolean> {
        const result = await getAuthoritySchemeType(localAuthorityId, schemeType);
        return result.meta.totalCount > 0;
    }

    async function getToAnotherPage(anotherPage: string) {
        let newPage = anotherPage === PAGE.next ? actualPage + 1 : actualPage - 1;
        if (newPage >= 0) {
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
        localAuthorityId: number,
    ): Promise<number> {
        let totalCount = 0;
        await getRatingsInLocalAuthority(
            localAuthorityId,//197 FHIS, 296 FHRS,
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

        return totalCount;
    }

    const renderTableContent = (): JSX.Element => {
        return (
            <table>
                <thead>
                <tr>
                    <th key={0}>Rating</th>
                    <th key={1}>Percentage</th>
                </tr>
                </thead>
                <tbody>
                {tBodyContent.map((rating: RatingPercentageFH, index: number) => (
                    <tr key={index}>
                        <TD key={index}>{rating.rate}</TD>
                        <TD key={index + 1}>{rating.percentage}%</TD>
                    </tr>
                ))}
                </tbody>
            </table>
        )
    }

    return (
        <>
            <LoadingErrorInfo loading={loading} error={error}/>
            {!loading && !error && (
                <Table>
                    <h2>Local authority</h2>
                    <p>{localAuthority?.authorities[0].Name} (id-{localAuthority?.authorities[0].LocalAuthorityId})</p>
                    {renderTableContent()}
                    <AuthoritiesButtons
                        getToAnotherPage={getToAnotherPage}
                    />
                </Table>
            )}
        </>
    )
}
