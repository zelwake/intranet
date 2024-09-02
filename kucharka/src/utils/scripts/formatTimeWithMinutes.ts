export function formatTimeWithMinutes(minutes: number) {
  let text = `${minutes} `;

  switch (minutes) {
    case 1:
      text += "minuta";
      break;
    case 2:
    case 3:
    case 4:
      text += "minuty";
      break;
    default:
      text += "minut";
      break;
  }

  return text;
}
