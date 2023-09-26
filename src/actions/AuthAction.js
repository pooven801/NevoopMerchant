import * as ActionTypes from "./ActionTypes";
import * as Services from "@services";
import { Alert } from "react-native";
const onExecuted = (type, data) => {
  return {
    type,
    data
  };
};

export const authentication = (params, callback) => async (dispatch) => {
  if (params == null) {
    setTimeout(() => {
      let data = {
        success: false,
        data: null
      };
      dispatch(onExecuted(ActionTypes.LOGIN, data));
      if (typeof callback === "function") {
        callback({ success: false });
      }
    }, 100);
    return { success: true, message: "Logged out" };
  } else {
    let results = await Services.login(params);
    console.log("results", results);
    if (results.success) {
      setTimeout(() => {
        let data = {
          success: true,
          data: results.data
        };
        dispatch(onExecuted(ActionTypes.LOGIN, data));
      }, 1000);
      return results;
    } else if (results.success == false) {
      return results;
    }
  }
};
