import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";

export default function Translations() {
  const { t } = useTranslation("common");

  return (
    <div>
      <p>{t("fitness")}</p>
      <p>{t("reservation")}</p>
      <p>{t("membership")}</p>
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
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
