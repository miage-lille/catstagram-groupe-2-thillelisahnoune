import { Loop, liftState } from 'redux-loop';
import { compose } from 'redux';
import { Actions } from './types/actions.type';
import { Picture } from './types/picture.type';
import fakeData from './fake-datas.json';

export type State = {
  counter: number,
  pictures: Picture[];
  selectedPicture: Picture | null; 
} // TODO : Update this type !

export const defaultState = {
  counter: 3,
  pictures: fakeData.slice(0, 3),
  selectedPicture: null,
} // TODO : Update this value !

type Increment = { type: 'INCREMENT' };
type Decrement = { type: 'DECREMENT' };
type SelectPicture = { type: 'SELECT_PICTURE'; payload: Picture };
type CloseModal = { type: 'CLOSE_MODAL' };

 export const increment = (): Increment => {
    return { type: 'INCREMENT' };
  };
  
 export const decrement = (): Decrement => {
    return { type: 'DECREMENT' };
  };

  export const selectPicture = (picture: Picture): SelectPicture => ({
    type: 'SELECT_PICTURE',
    payload: picture,
  });
  
  export const closeModal = (): CloseModal => ({
    type: 'CLOSE_MODAL',
  });
  
export const reducer = (state: State | undefined, action: Actions): State | Loop<State> => {
  if (!state) return defaultState; // mandatory by redux
  switch (action.type) {
    case 'INCREMENT':
      const newCounter = state.counter + 1;
      return { ...state, counter: newCounter, pictures: fakeData.slice(0, newCounter),};
    case 'DECREMENT':
      if (state.counter > 3) {
        const newCounter = state.counter - 1
        return { ...state, counter: newCounter, pictures: fakeData.slice(0, newCounter), };
      }
      return state;
    case 'SELECT_PICTURE':
      return { ...state, selectedPicture: action.payload,
      };
    case 'CLOSE_MODAL':
      return { ...state, selectedPicture: null, 
      };
    case 'FETCH_CATS_REQUEST':
      throw 'Not Implemented';
    case 'FETCH_CATS_COMMIT':
      throw 'Not Implemented';
    case 'FETCH_CATS_ROLLBACK':
      throw 'Not Implemented';
      default:
        return state;
  }
};

export const counterSelector = (state: State) => {
  return state.counter;
};
export const picturesSelector = (state: State) => {
  return state.pictures;
};
export const getSelectedPicture = (state: State) => {
  return state.selectedPicture;
};

export default compose(liftState, reducer);