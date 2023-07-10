import { visibleCardsNumbers } from './const';

export const getVisualProps = (width) => {
  let point = 0;

  if (width > 1006) {
    point = 1280;
  } else if (width > 646) {
    point = 768;
  } else {
    point = 480;
  }

  return visibleCardsNumbers[point];
};


