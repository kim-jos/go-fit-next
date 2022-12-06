import { OpenChannel } from "@sendbird/chat/openChannel";
import { sendbird } from "./connect-chat";

export async function joinChat(channelUrl: string) {
  const channel: OpenChannel = await sendbird.openChannel.getChannel(
    channelUrl
  );
  await channel.enter();
}

export async function leaveChat(channelUrl: string) {
  const channel: OpenChannel = await sendbird.openChannel.getChannel(
    channelUrl
  );
  await channel.exit();
}
