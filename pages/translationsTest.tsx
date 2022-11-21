import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { getCurrUser } from "../src/services/users.api";

export default function Translations({ user }) {
  const { t } = useTranslation("common");

  return (
    <div>
      <p>{t("h1")}</p>
      <p>{t("change-locale", { what: user[0].name ? user[0].name : "hi" })}</p>
      <p>{t("to-second-page")}</p>
      <p>{t("error-with-status")}</p>
      <p>{t("error-without-status")}</p>
      <p>{t("title")}</p>
      <div>
        <Link href="/translationsTest" locale="en">
          <button>영어</button>
        </Link>
        <Link href="/translationsTest" locale="ko">
          <button>한국어</button>
        </Link>
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  console.log("locale of getStaticProps", locale);
  const user = await getCurrUser(2);
  console.log(user);

  return {
    props: {
      user,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
