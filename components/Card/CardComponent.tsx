import React from 'react';
import {JSXElement} from "@babel/types";
import Link from "next/link";
import {CardWrapper, CardName,CardAddress } from '../../styles/component/card';

type ContentsType = {
    themeIcon: JSXElement | null,
    background: JSXElement | null;
    title: string;
    address: string;
    credit: number;
}

const CardComponent = ({data, contents, link}) => {
    return (
            <Link href={link}>
                <CardWrapper>
                    <CardName>{data.name}</CardName>
                    <CardAddress>{data.address}</CardAddress>
                </CardWrapper>
            </Link>
    )
}

export default CardComponent;