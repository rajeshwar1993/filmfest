const appState = {
  isLoggedIn: false,
  hasError: false
};

export const appReducer = (state = appState, action) => {
  let temp = { ...state };
  switch (action.type) {
    case "LOGIN":
      temp.isLoggedIn = action.data;
      return temp;

    case "LOGOUT":
      temp.isLoggedIn = false;
      return temp;

    case "SET_ERR":
      temp.hasError = action.data;
      return temp;

    case "CLEAR_ERR":
      temp.hasError = false;
      return temp;

    default:
      return temp;
  }
};

const entriesState = {
  entryDataLoading: false,
  entryItems: false
};

export const entriesReducer = (state = entriesState, action) => {
  let temp = { ...state };
  switch (action.type) {
    case "START_ENTRY_LOADING":
      temp.entryDataLoading = true;
      return temp;

    case "STOP_ENTRY_LOADING":
      temp.entryDataLoading = false;
      return temp;

    case "SET_ALL":
      temp.entryItems = action.data;
      return temp;

    case "CLEAR_ALL":
      temp.entryItems = [];
      return temp;

    default:
      return temp;
  }
};
