export function pricingModule(e, inState, history) {
  let ret = { 'suggested': 0, 'subtotal': 0, 'shipping': 0, 'tax': 0, 'total': 0 };
  let margin = 0.15;
  e.gallons = parseFloat(e.gallons);
  if (!inState) {
    margin = margin + 0.02;
  }
  if (e.gallons > 1000) {
    margin = margin - 0.01;
  }
  if (history) {
    console.log('history');
    margin = margin - 0.01;
  }
  ret['suggested'] = (1.5 * (1+margin)).toFixed(4);
  ret['total'] = (e.gallons * ret['suggested']).toFixed(2);
  return ret
}
