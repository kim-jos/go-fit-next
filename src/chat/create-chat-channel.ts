import { OpenChannelCreateParams } from "@sendbird/chat/openChannel";
import { sendbird } from "./connect-chat";

export default async function createChatChannel(
  params: OpenChannelCreateParams
) {
  await sendbird.openChannel.createChannel(params);
}
