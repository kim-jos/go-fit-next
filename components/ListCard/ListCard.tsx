import React from 'react';
import styles from './listCard.module.css';
import Link from "next/link";
import {ListCardWrapper, Name, Explain, PlaceImg} from "../../styles/component/listCard";

const ListCard = ({data, link}) => {
    console.log(data)
    return (
        <Link href={link}>
            <ListCardWrapper>
                <PlaceImg src={data.image} />
                <section>
                    <Name>{data.name}</Name>
                    <Explain>{data.exercise_type}</Explain>
                    <Explain>{data.distance}</Explain>
                    <Explain>{data.credits_required} 크레딧</Explain>
                </section>
                <figure>
                    <img src='/images/arrow.png' width={16} height={16}/>
                </figure>
            </ListCardWrapper>
        </Link>
    )
}

export default ListCard;