import { List, ListItem } from "@mui/material";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { SessionUser } from "../../src/utils/session.type";

const style = {
  width: "100%",
  maxWidth: "100%",
  bgcolor: "background.paper",
};

export default function Profile({}) {
  const { data } = useSession();
  const user: SessionUser = data?.user;
  const { t } = useTranslation("common");

  return (
    <List sx={style} aria-label="my-profile">
      <Link href={`/reservations/${user?.user_id}`}>
        <ListItem button>
          <ListItemText primary={t("reservation")} />
        </ListItem>
      </Link>
      <Link href={`/profile/${user?.user_id}`}>
        <ListItem button>
          <ListItemText primary={t("credits")} />
        </ListItem>
      </Link>
      <ListItem button>
        <ListItemText primary={t("invite")} />
      </ListItem>
      <Divider light />

      <Divider light />
      <ListItem button>
        <ListItemText primary={t("terms-of-service")} />
      </ListItem>
      <Divider light />
      <ListItem button>
        <ListItemText primary={t("contact-us")} />
      </ListItem>
      <Divider light />
    </List>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
