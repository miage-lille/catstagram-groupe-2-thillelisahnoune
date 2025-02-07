import { Cmd } from 'redux-loop';
import { fetchCatsCommit, fetchCatsRollback } from './actions';
import { FetchCatsRequest } from './types/actions.type';

export const cmdFetch = (action: FetchCatsRequest) =>
  Cmd.run(
    () => {
      return fetch(action.path, {
        method: action.method,
      }).then(checkStatus)
      .then(response => response.json())
      .then(data => {
        console.log("🌍 API Response:", data); 
        if (!data.hits) throw new Error("Aucune image trouvée !");
        return data.hits; 
      });
    },
    {
      successActionCreator: (payload)=> fetchCatsCommit(payload), // (equals to (payload) => fetchCatsCommit(payload))
      failActionCreator: (error: unknown)=>fetchCatsRollback(error instanceof Error ? error: new Error(String(error))), // (equals to (error) => fetchCatsCommit(error))
    },
  );

const checkStatus = (response: Response) => {
  if (response.ok) return response;
  throw new Error(response.statusText);
};
