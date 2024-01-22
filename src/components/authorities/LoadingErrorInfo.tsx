import React from "react";
import {ErrorDiv, LoadingInfo} from "./Authorities.styled";

interface LoadingErrorInfoProps {
    loading: boolean;
    error?: any;
}

export const LoadingErrorInfo: React.FC<LoadingErrorInfoProps> = ({ loading, error }) => (
    <>
        {loading && <LoadingInfo>Loading...</LoadingInfo>}
        {error && <ErrorDiv>Error: {error.message}</ErrorDiv>}
    </>
);
