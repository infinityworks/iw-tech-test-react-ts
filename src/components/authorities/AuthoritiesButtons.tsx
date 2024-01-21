import React, {useState, useEffect} from "react";
import {PAGE} from "../../utils/constants";
import {Button, ButtonArea} from "./Authorities.styled";

type AuthoritiesButtonsProps = {
    getToAnotherPage: (page: string) => void;
};

export const AuthoritiesButtons: React.FC<AuthoritiesButtonsProps> = (props) => {
    return (
        <>
            <ButtonArea>
                <Button
                    style={{float: "left"}}
                    onClick={() => props.getToAnotherPage(PAGE.previous)}
                >
                    {PAGE.previous}
                </Button>
                <Button
                    style={{float: "right"}}
                    onClick={() => props.getToAnotherPage(PAGE.next)}
                >
                    {PAGE.next}
                </Button>
            </ButtonArea>
        </>
    )
}