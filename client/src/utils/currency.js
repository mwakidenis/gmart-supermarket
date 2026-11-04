const INR_TO_KSH_RATE = 1.4099;

export const convertInrToKsh = (amountInInr) => {
  const numericAmount = Number(amountInInr || 0);
  return numericAmount * INR_TO_KSH_RATE;
};

export const formatKshFromInr = (amountInInr) => {
  const amountInKsh = convertInrToKsh(amountInInr);
  return `KSh ${amountInKsh.toFixed(2)}`;
};
