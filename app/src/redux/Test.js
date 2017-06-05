export default function itemReducer(state = [], action) {
  switch (action.type) {
    case 'CREATE_ITEM':
      return [...state, Object.assign({}, action.item)];
    default:
      return state;
  }
}
