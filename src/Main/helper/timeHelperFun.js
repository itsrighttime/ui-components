// timeHelper.js

export const calculateTimeLeft = (expirationDate) => {
  const now = new Date();
  const difference = expirationDate - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);

    let timeLeft = "";

    // Handle days
    if (days === 1) {
      timeLeft += "1 Day";
    } else if (days > 1) {
      timeLeft += `${days} Days`;
    }

    // Handle hours
    if (hours === 1) {
      timeLeft += timeLeft ? `, 1 Hr` : "1 Hr";
    } else if (hours > 1) {
      timeLeft += timeLeft ? `, ${hours} Hrs` : `${hours} Hrs`;
    }

    // Handle minutes
    if (minutes === 1) {
      timeLeft += timeLeft ? `, 1 Min` : "1 Min";
    } else if (minutes > 1) {
      timeLeft += timeLeft ? `, ${minutes} Min` : `${minutes} Min`;
    }

    // If no timeLeft, then it's very close to expiration
    return timeLeft || "Less than 1 minute";
  } else {
    return "Expired";
  }
};


// Function to parse date and time into a proper Date object
export const parseDateTime = (dateStr, timeStr) => {

  const [day, month, year] = dateStr.split('-');
  const [time, modifier] = timeStr.split(' '); // Split time from AM/PM
  let [hours, minutes] = time.split(':');


  if (modifier === 'PM' && hours !== '12') {
    hours = parseInt(hours, 10) + 12;
  }
  if (modifier === 'AM' && hours === '12') {
    hours = '00';
  }
  const tempDate = `${year}-${month}-${day}T${hours}:${minutes}:00`;
  const formattedDate = new Date(tempDate);
  return formattedDate;
};
