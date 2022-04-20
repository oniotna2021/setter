import Styled from "@emotion/styled"

export const Container = Styled.table`
    border-spacing: 0px;
    border-collapse: 0;
    & th{
        font-size: 10px;
        color: #3C3C3B
        font-weight: 500;
        padding-bottom: 10px;
    }
`;

export const TableBody = Styled.tbody`
    & td{
        border: solid 0.7px #F3F3F3;
        width: 100px;
        height: 100px;
        margin: 0;
        padding: 0;
        z-inex: 0;
    }

    & td:first-child{
        border-left: solid 0.7px white;
        font-size: .7rem;
        color: black;
        width: 80px;
        height: 90px;
    }

    & td:hover{
        background-color: rgba(60, 60, 59, .2);
        cursor: pointer;
    }

    & td:hover:first-child{
        background-color: white;
        cursor: auto;
    }
`;
