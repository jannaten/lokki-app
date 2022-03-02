import { initState } from "./authorized-user.state";
import { authorizedUserTypes as TYPES } from "./authorized-user.types";

const authorizedUserRedcuer = (state = initState, action) => {
  switch (action.type) {
    case TYPES.REQUEST_AUTHORIZED_USER_PENDING:
      return { ...state, isAuthorizedUserPending: true };
    case TYPES.REQUEST_AUTHORIZED_USER_SUCCESS:
      return {
        ...state,
        isAuthorizedUserPending: false,
        authenticatedUser: action.payload,
        findedCompanyId: action.payload.organizationIds[0],
      };
    case TYPES.REQUEST_AUTHORIZED_USER_FAILD:
      return {
        ...state,
        isAuthorizedUserPending: true,
        authenticatedUser: {},
        findedCompanyId: null,
      };
    default:
      return state;
  }
};

export default authorizedUserRedcuer;
