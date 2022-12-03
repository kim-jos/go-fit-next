import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { createChatGroup } from "../../src/services/chat.api";

// 운동 구하기
// 운동, 날짜, 운동 시간
// 그 시간에 예약한 사람 방안에 넣기

export default function CreateChatGroup() {
  const [groupTitle, setGroupTitle] = useState();

  const handleSubmit = (event) => {
    console.log(event.target.value);
  };

  const createChat = async () => {
    const groupChatInstance = { type: 1, class_id: 1, description: "asdf" };
    await createChatGroup(groupChatInstance);
  };

  return (
    <Box
      component="form"
      sx={{
        width: 500,
        maxWidth: "100%",
      }}
      noValidate
      autoComplete="off"
    >
      <Button variant="contained" onClick={() => createChat()}>
        Create Chat
      </Button>
      {/* <Formik
          initialValues={{ title: 'Enter Title' }}
          onSubmit={(event) => {
            console.log(event);
          }}
        >
      <TextField
        fullWidth
        label="fullWidth"
        id="fullWidth"
        value={groupTitle}
      />
      <TextField
        fullWidth
        label="fullWidth"
        id="fullWidth"
        value={groupTitle}
      />
      </Formik> */}
    </Box>
  );
}
