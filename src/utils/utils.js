export const slice = (price, slice) => Math.floor(price / slice);

export const getPriceWithType = (order, offer) => {
  if (offer.type === 'percentage') {
    return order * 0.01 * offer.value;
  }
  if (offer.type === 'minus') {
    return offer.value;
  }
  if (offer.type === 'slice') {
    return slice(order, offer.sliceValue) * offer.value;
  }
};
