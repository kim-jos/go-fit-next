import { Button, Stack } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import ModalBase from "../components/Modal/Base";
import { SessionUser } from "../src/utils/session.type";

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const { data } = useSession();
  const user: SessionUser = data?.user;

  const onClickModalOff = () => {
    setIsActive(false);
  };

  return (
    <div className={"w-full flex flex-col justify-center"}>
      <div className={"text-xl mt-4 w-full text-center"}>홈페이지</div>
      <div className={"text-center"}>
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
      </div>
      <div className={"flex w-full justify-center"}>
        <button
          className={"bg-blue-500 rounded-lg px-3 py-1.5 text-white shadow-lg"}
          onClick={() => setIsActive(true)}
        >
          로그인
        </button>
      </div>
      <ModalBase active={isActive} closeEvent={onClickModalOff}>
        <Stack>
          {/* closeEvent={onClickModalOff} title="Welcome Back" */}
          <div>
            <Button
              onClick={() =>
                signIn("CredentialsProvider", {
                  callbackUrl: "/classes",
                })
              }
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
