import { Button, Stack } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import ModalBase from "../components/Modal/Base";
import { SessionUser } from "../src/utils/session.type";

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const { data } = useSession();
  const user: SessionUser = data?.user;

  const onClickModalOff = () => {
    setIsActive(false);
  };

  return (
    <>
      <div>홈페이지</div>
      {data ? (
        <div>
          <div>{user?.name}</div>
          <div>{user?.email}</div>
          {`${user.id}`}
          {`${user.accessToken}`}
          <div></div>
          {`${user?.user_id}`}
        </div>
      ) : (
        <div>not logged in</div>
      )}

      <Button variant="contained" onClick={() => setIsActive(true)}>
        로그인
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
    </>
  );
}
