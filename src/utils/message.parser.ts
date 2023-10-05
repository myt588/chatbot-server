type ParsedMessage = {
  name: string;
  platform: string;
  message: string;
};

export function parseMessage(input: string): ParsedMessage | null {
  const nameMatch1 = input.match(/message to ([\w\s]+)/);
  const nameMatch2 = input.match(/tell ([\w\s]+) on/);

  const platformMatch1 = input.match(/on (\w+)/);
  const platformMatch2 = input.match(/on (\w+) that/);

  const messageMatch1 = input.match(/saying that (.+)/);
  const messageMatch2 = input.match(/that (.+)/);
  const messageMatch3 = input.match(/on [\w\s]+ (.+)/); // New regex to capture the message after platform and name

  const name = nameMatch1 ? nameMatch1[1] : nameMatch2 ? nameMatch2[1] : null;
  const platform = platformMatch1
    ? platformMatch1[1]
    : platformMatch2
    ? platformMatch2[1]
    : null;
  const message = messageMatch1
    ? messageMatch1[1]
    : messageMatch2
    ? messageMatch2[1]
    : messageMatch3
    ? messageMatch3[1]
    : null;

  if (name && platform && message) {
    return {
      name: name.trim(), // Ensure there's no extra spaces in the name
      platform: platform,
      message: message,
    };
  }
  return null;
}

export const assembleMessage = (
  name: string,
  platform: string,
  message: string,
) => {
  return `${name} on ${platform} just said: ${message}`;
};
