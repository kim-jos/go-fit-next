import { Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getUserCredits } from "../../src/services/users.api";

export default function MyProfile({ userCredits }) {
  const { t } = useTranslation("common");

  return <Typography>보유 크레딧: {userCredits.curr_credits}</Typography>;
}

export async function getServerSideProps({ locale, params }) {
  const userCredits = await getUserCredits(params.id);

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      userCredits,
    },
  };
}
