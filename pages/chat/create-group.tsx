import { Button } from "@mui/material";
import Box from "@mui/material/Box";

// 운동 구하기
// 운동, 날짜, 운동 시간
// 그 시간에 예약한 사람 방안에 넣기

export default function CreateChatGroup() {
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
      <Button variant="contained">Create Chat</Button>
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
