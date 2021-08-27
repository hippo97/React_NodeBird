import { createWrapper } from "next-redux-wrapper";
import {
  applyMiddleware,
  compose,
  createStore,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "../reducers";

const configureStore = () => {
  const middlewares = [];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares)) //배포용일때는 히스토리를 계속 삭제하고
      : composeWithDevTools(
          applyMiddleware(...middlewares)
        ); //개발용일때는 히스토리를 계속 트래킹할 수 있게
  const store = createStore(reducer, enhancer);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
