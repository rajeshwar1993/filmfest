import { db } from "../fire";

const entriesDB = db.collection("entries");

export const login = data => {
  return {
    type: "LOGIN",
    data
  };
};

export const logout = data => {
  return {
    type: "LOGIN",
    data
  };
};

export const set_err = data => {
  return {
    type: "SET_ERR",
    data
  };
};

export const clear_err = data => {
  return {
    type: "CLEAR_ERR",
    data
  };
};

export const set_all_entries = data => {
  return {
    type: "SET_ALL",
    data
  };
};

export const update_entry = data => {
  return {
    type: "UPDATE",
    data
  };
};

export const clear_all_entries = data => {
  return {
    type: "CLEAR_ALL",
    data
  };
};

export const start_entry_loading = data => {
  return {
    type: "START_ENTRY_LOADING",
    data
  };
};

export const stop_entry_loading = data => {
  return {
    type: "STOP_ENTRY_LOADING",
    data
  };
};

export const fetch_all_entries = () => {
  return dispatch => {
    entriesDB
      .orderBy("ts")
      .get()
      .then(snap => {
        let entries = [];
        if (!snap.empty) {
          snap.forEach(d => {
            entries.push({
              id: d.id,
              ...d.data()
            });
          });
        }
        dispatch(set_all_entries(entries));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const update_entry_db = (id, data) => {
  return dispatch => {
    entriesDB
      .doc(id)
      .update({
        ...data
      })
      .then(() => {
        dispatch(update_entry({ id, data }));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
