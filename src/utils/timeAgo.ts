export function timeAgo(timestamp: string | number | Date): string {
  const now = new Date();
  const past = new Date(timestamp);
  const secondsPast = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (secondsPast < 60) {
    return `${secondsPast} seconds ago`;
  } else if (secondsPast < 3600) {
    const minutes = Math.floor(secondsPast / 60);

    return `${minutes} minutes ago`;
  } else if (secondsPast < 86400) {
    const hours = Math.floor(secondsPast / 3600);

    return `${hours} hours ago`;
  } else if (secondsPast < 604800) {
    const days = Math.floor(secondsPast / 86400);

    return `${days} days ago`;
  } else if (secondsPast < 2592000) {
    const weeks = Math.floor(secondsPast / 604800);

    return `${weeks} weeks ago`;
  } else if (secondsPast < 31536000) {
    const months = Math.floor(secondsPast / 2592000);

    return `${months} months ago`;
  } else {
    const years = Math.floor(secondsPast / 31536000);

    return `${years} years ago`;
  }
}
