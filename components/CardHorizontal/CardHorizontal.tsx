import { JSXElement } from "@babel/types";
import Link from "next/link";
import styles from "./card.module.css";

type ContentsType = {
  themeIcon: JSXElement | null;
  background: JSXElement | null;
  title: string;
  address: string;
  credit: number;
};

const CardHorizontal = ({ contents, link }) => {
  return (
    <Link href={link}>
      <div className={styles.cardWrapper}>
        <figure className={styles.themeIcon}>
          {/* <img src={contents.themeIcon} alt="icon" /> */}
        </figure>
        <span>{contents.name}</span>
        <div>{contents.description}</div>
        <div>{contents.credits_required}</div>
      </div>
    </Link>
  );
};

export default CardHorizontal;
