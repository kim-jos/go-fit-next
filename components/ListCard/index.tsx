import React from 'react';
import ListCard from './ListCard';
import styles from './listCard.module.css';
import {Classes} from "../../src/utils/database/database.entities";
import {ListTitle, ListWrapper} from '../../styles/component/listCard';

const index = ({gyms}) => {
    return (
        <div>
            {/*<ListTitle>Popular List</ListTitle>*/}
            <ListWrapper>
                {
                    gyms.map((gym: Classes, idx) => {
                        return(
                            <ListCard data={gym} link={`/classes/${encodeURIComponent(gym.id)}`} key={idx}/>
                        )
                    })
                }
            </ListWrapper>
        </div>
    )
}

export default index;