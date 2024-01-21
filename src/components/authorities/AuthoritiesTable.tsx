import React, {useState, useEffect} from "react";
import {AuthoritiesButtons} from "./AuthoritiesButtons";
import {Table} from "../../utils/global.styled";
import {getLocalAuthority} from "../../api/ratingsAPI";

const PAGE = {
    next: "next",
    previous: "previous",
}

export const AuthoritiesTable: React.FC = () => {
    const [error, setError] = useState<{ message: string; [key: string]: string }>();
    const [actualPage, setActualPage] = useState(1);

    useEffect(() => {
        return () => {
            getLocalAuthority(actualPage).then(
                (result) => {
                    console.log(result)
                },
                (error) => {
                    setError(error)
                }
            );
        };
    }, []);

    async function getToAnotherPage(anotherPage: any) {
        setActualPage(anotherPage === PAGE.next ? actualPage + 1 : actualPage - 1)
        return () => {
            getLocalAuthority(actualPage).then(
                (result) => {
                    console.log(result)
                },
                (error) => {
                    setError(error)
                }
            );
        };
    }

    function fillTbody() {
        return (
            <>
                <tr>
                    <td>5</td>
                    <td>50%</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>0%</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>0%</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>0%</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>20%</td>
                </tr>
                <tr>
                    <td>Exempt</td>
                    <td>30%</td>
                </tr>
            </>
        )
    }

    return (
        <>
            {error ? <div>Error: (error.message)</div> :
                <Table>
                    <h2>Local authority</h2>
                    <p>Authority name</p>
                    <table>
                        <thead>
                        <th>Rating</th>
                        <th>Percentage</th>
                        </thead>
                        <tbody>
                        {fillTbody()}
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
                    <AuthoritiesButtons/>
                </Table>
            }
        </>
    )
}
