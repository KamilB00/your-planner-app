const initialState = {
  day: "",
};

const addDays = (d, days) => {
  
  var date = new Date(Date.parse(d));
  date.setDate(date.getDate() + days);
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  const mo = new Intl.DateTimeFormat("en", { month: "numeric" }).format(date);
  const da = new Intl.DateTimeFormat("en", { day: "numeric" }).format(date);
  return `${ye}-${mo}-${da}`;
};

const date = (state = initialState, action) => {
  switch (action.type) {
    case "NEXT_DAY":
      return {
        ...state,
        day: addDays(state.day, 1),
      };

    case "PREVIOUS_DAY":
      return {
        ...state,
        day: addDays(state.day, -1),
      };
    case "SET_DAY":
      return {
        ...state,
        day: action.day,
      };

    default:
      return state;
  }
};

export default date;
