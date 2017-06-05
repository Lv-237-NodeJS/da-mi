const CREATE_ITEM = 'CREATE_ITEM';

const initialState = [];

export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ITEM:
      return [...state, Object.assign({}, action.item)];
    default:
      return state;
  }
}
