export const dateToMDY = (date: string | Date | undefined | null): string => {
  if (!date) {
    return '';
  }

  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  return dateObj.toLocaleDateString('en-US', options);
};

export const dateToMDYH12M = (date: string | Date | undefined | null): string => {
  if (!date) {
    return '';
  }

  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  return dateObj.toLocaleString('en-US', options);
};
