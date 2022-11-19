import { Button, Stack } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import ModalBase from "../components/ModalBase";

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const { data, status } = useSession();
  const onClickCodeListOn = () => {
    setIsActive(true);
  };

  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      console.log("logined");
    }
  };

  const onClickModalOff = () => {
    setIsActive(false);
  };

  return (
    <div>
      <div>홈페이지</div>
      {data ? (
        <div>
          <div>{data?.user?.name}</div>
          <div>{data?.user?.email}</div>
        </div>
      ) : (
        <div>not logged in</div>
      )}

      <Button variant="contained" onClick={() => setIsActive(true)}>
        테스트 버튼
      </Button>
      <ModalBase active={isActive} closeEvent={onClickModalOff}>
        <Stack>
          {/* closeEvent={onClickModalOff} title="Welcome Back" */}
          <div>
            <Button
              onClick={() => signIn("CredentialsProvider")}
              color="primary"
            >
              Email Log in
            </Button>
            <Button onClick={() => signOut()} color="primary">
              Sign Out
            </Button>
          </div>
        </Stack>
      </ModalBase>
    </div>
  );
}
