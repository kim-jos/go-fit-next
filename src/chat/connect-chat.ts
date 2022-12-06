import SendbirdChat from "@sendbird/chat";
import { UserMessage, UserMessageCreateParams } from "@sendbird/chat/message";
import {
  OpenChannelCreateParams,
  OpenChannelModule,
  SendbirdOpenChat,
} from "@sendbird/chat/openChannel";
import { sendbirdKey } from "../utils/keys";

export const sendbird = SendbirdChat.init({
  appId: sendbirdKey,
  modules: [new OpenChannelModule()],
}) as SendbirdOpenChat;

export default async function ConnectChat(
  userId,
  params?: OpenChannelCreateParams
) {
  try {
    sendbird.connect(userId).then(async (user) => {
      const channel = await sendbird.openChannel.createChannel(params);
      await channel.enter();

      const chatParams: UserMessageCreateParams = {
        // UserMessageCreateParams can be imported from @sendbird/chat/message.
        message: "test message",
      };
      channel
        .sendUserMessage(chatParams)
        .onPending((message: UserMessage) => {
          console.log("chat pending jk");
          // The pending message for the message being sent has been created.
          // The pending message has the same reqId value as the corresponding failed/succeeded message.
        })
        .onFailed((err: Error, message: UserMessage) => {
          console.log("chat failed jk");
          // Handle error.
        })
        .onSucceeded((message: UserMessage) => {
          console.log("chat succeeded jk");
          // The message is successfully sent to the channel.
          // The current user can receive messages from other users through the onMessageReceived() method of an event handler.
        });
    });
  } catch (err) {
    throw new Error(err);
  }
}
