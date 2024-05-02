export function timeAgo(dateString: number) {
  const now = new Date();
  const date = new Date(now.getTime() - dateString * 1000);
  const timeDifference = now.getTime() - date.getTime();

  const minutes = Math.floor(timeDifference / (1000 * 60));
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
  } else if (hours < 24) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  } else if (days < 30) {
    return `${days} ${days === 1 ? 'day' : 'days'}`;
  } else {
    return 'more than a 30 days';
  }
}
