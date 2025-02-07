import { Cmd, Loop, liftState, loop } from 'redux-loop';
import { compose } from 'redux';
import { Actions, FetchCatsRequest } from './types/actions.type';
import { Picture } from './types/picture.type';
import fakeData from './fake-datas.json';
import { none, Option, some } from 'fp-ts/lib/Option';
import { cmdFetch } from './commands';

export type State = {
  counter: number,
  pictures: Picture[];
  // selectedPicture: Picture | null; 
  selectedPicture: Option<Picture>;
  loading: boolean; 
  error: string | null; 
} // TODO : Update this type !

export const defaultState = {
  counter: 3,
  pictures: fakeData.slice(0, 3),
  // selectedPicture: null,
  selectedPicture: none,
  loading: false,
  error: null,
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

  export const selectPicture = (picture: Picture): Actions => ({
    type: 'SELECT_PICTURE',
    // payload: picture,
    payload: some(picture),
  });
  
  export const closeModal = (): CloseModal => ({
    type: 'CLOSE_MODAL',
  });
  
export const reducer = (state: State | undefined, action: Actions): State | Loop<State> => {
  if (!state) return defaultState; // mandatory by redux
  switch (action.type) {
    case 'INCREMENT':
      const newCounter = Math.min(state.counter + 1, 20);
      return loop(
        { ...state, counter: newCounter, loading: true },
        Cmd.action({
          type: "FETCH_CATS_REQUEST",
          method: "GET",
          path: `https://pixabay.com/api/?key=48690032-35edadbfc7e5286b066811191&per_page=${newCounter}&q=cat`,
        } as FetchCatsRequest)
      );
    case 'DECREMENT':
      if (state.counter > 3) {
        const newCounter = state.counter - 1
        return loop(
          { ...state, counter: newCounter, loading: true },
          Cmd.action({
            type: "FETCH_CATS_REQUEST",
            method: "GET",
            path: `https://pixabay.com/api/?key=48690032-35edadbfc7e5286b066811191&per_page=${newCounter}&q=cat`,
          } as FetchCatsRequest)
        );
      }
      return state;
    case 'SELECT_PICTURE':
      return { ...state, selectedPicture: action.payload,
      };
    case 'CLOSE_MODAL':
      return { ...state, selectedPicture: none, 
      };
    case 'FETCH_CATS_REQUEST':
      return loop( { ...state, loading: true, error: null }, cmdFetch(action) 
      );
    case 'FETCH_CATS_COMMIT':
      return { ...state, 
        pictures: action.payload.map((pic: any) => ({
          previewFormat: pic.previewURL, 
          webFormat: pic.webformatURL, 
          largeFormat: pic.largeImageURL, 
          author: pic.user, 
        })),
        loading: false  };
    case 'FETCH_CATS_ROLLBACK':
      return { ...state, error: (action.error as Error).message, loading: false };
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
export const getSelectedPicture = (state: State): Option<Picture> => {
  return state.selectedPicture;
};

export default compose(liftState, reducer);