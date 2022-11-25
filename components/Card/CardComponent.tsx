import React from 'react';
import {JSXElement} from "@babel/types";
import styles from './card.module.css';
import Link from "next/link";

type ContentsType = {
    themeIcon: JSXElement | null,
    background: JSXElement | null;
    title: string;
    address: string;
    credit: number;
}

const CardComponent = ({contents, link}) => {
    return (
        <Link href={link}>
            <div className={styles.cardWrapper}>
                <figure className={styles.themeIcon}>
                    <img src={contents.themeIcon} alt='icon' />
                </figure>
                <span>{contents.title}</span>
                <span>{contents.address}</span>
            </div>
        </Link>
    )
}

export default CardComponent;