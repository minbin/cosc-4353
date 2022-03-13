export function pricingModule(e) {
  let ret = { 'suggested': 0, 'subtotal': 0, 'shipping': 0, 'tax': 0, 'total': 0 };
  ret['suggested'] = 10;
  ret['subtotal'] = ret['suggested'] * e.gallons;
  ret['shipping'] = 20
  ret['tax'] = ret['subtotal'] * 0.08
  ret['total'] = ret['subtotal'] + ret['shipping'] + ret['tax']

  ret['suggested'] = ret['suggested'].toFixed(2)
  ret['subtotal'] = ret['subtotal'].toFixed(2)
  ret['shipping'] = ret['shipping'].toFixed(2)
  ret['tax'] = ret['tax'].toFixed(2)
  ret['total'] = ret['total'].toFixed(2)
  return ret
}
