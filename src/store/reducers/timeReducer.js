const init = {
  date: "",
  day: "",
  month: "",
  year: 0,
};

export default (state = init, action) => {
  switch (action.type) {
    case "SIMPAN_WAKTU":
      /*
        {
          date: " ... ",
          day: "",
          month: "",
          year: 0,
        }
      
      */
      return { ...state, date: action.payload.data };

    default:
      return state;
  }
};
