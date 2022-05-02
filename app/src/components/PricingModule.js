import { firestore } from '../firebase';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

export async function pricingModule(e, startDate, cookies, inState, isQuote, setTitleMsg) {
  const db = firestore;
  const fuelQuoteRef = doc(db, 'FuelQuote', cookies.get('userid'));
  const snapshot2 = await getDoc(fuelQuoteRef).catch(e => {console.log(e)})
  const data2 = snapshot2.data();
  let history = data2.history.length ? true : false;

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
    margin = margin - 0.01;
  }
  ret['suggested'] = (1.5 * (1+margin)).toFixed(4);
  ret['total'] = (e.gallons * ret['suggested']).toFixed(2);

  if (isQuote) {
    setTitleMsg('');
  } else {
    const db = firestore;
    const fuelQuoteRef = doc(db, 'FuelQuote', cookies.get('userid'));
    await updateDoc(fuelQuoteRef, {
      history: arrayUnion({
        'gallons': e.gallons, 'address': e.address, 'startDate': startDate, 'suggested': ret.suggested,
        'total': ret.total, 'dateCreated': new Date().getTime()
      })
    });
    setTitleMsg('Order Placed');
  }
  return ret
}
