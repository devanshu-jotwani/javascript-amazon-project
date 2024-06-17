export default function isWeekend(day){
  if (day.format('dddd') === 'Saturday' || day.format('dddd')==='Sunday'){
    return true;
  }
  return false;
}