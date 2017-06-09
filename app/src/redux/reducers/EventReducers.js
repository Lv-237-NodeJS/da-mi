
export const eventsReducer = (state = [], action) => {
  switch (action.type) {

    case 'FETCH_EVENTS_SUCCESS':
      return action.events;
    default:
      return state;
  }
};

export const eventReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_EVENT_BY_ID_SUCCESS':
      return action.event;
    default:
      return state;
  }
};

// export default reducer(state => {
//   events:[],
//   fetching: false,
//   fetched: false,
//   error: null
// }, action){
//   switch (action.type) {
//     case "FETCH_EVENTS":{
//       return {...state, fetching: true}
//     }
//     case "FETCH_EVENTS_FULFILLED":{
//       return {
//               ...state,
//               fetching: false,
//               fetched: true,
//               events:action.payload
//               }
//     }
//      case "FETCH_EVENTS_REJECTED":{
//        return {
//                 ...state,
//                 fetching: false,
//                 error: action.payload
//               }
//      }

//   }
//   return state;
// }
