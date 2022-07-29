import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./user";
import { saveStateToLocalStorage, loadStateFromLocalStorage } from "./localStorage";

const statePersistor = store => next => action => {
    next(action);
    saveStateToLocalStorage(store.getState());
};

export default configureStore({
    preloadedState: loadStateFromLocalStorage(),
    reducer: {
        user: userReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(statePersistor)
});