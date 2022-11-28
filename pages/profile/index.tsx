import { List, ListItem } from "@mui/material";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const style = {
  width: "100%",
  maxWidth: "100%",
  bgcolor: "background.paper",
};

export default function Profile() {
  const { t } = useTranslation("common");

  return (
    <List sx={style} aria-label="my-profile">
      <ListItem button>
        <ListItemText primary={t("invite")} />
      </ListItem>
      <ListItem button>
        <ListItemText primary={t("credits")} />
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemText primary={t("terms-of-service")} />
      </ListItem>
      <Divider light />
      <ListItem button>
        <ListItemText primary={t("contact-us")} />
      </ListItem>
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
