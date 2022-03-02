import { Default } from "../constant";
import { historyReplace } from "../utils/historyReplace";

export const productListPageBasicUserAuth = (
  findedCompanyId,
  history,
  orgId
) => {
  if (findedCompanyId !== Default) {
    if (findedCompanyId !== Number(orgId)) {
      historyReplace(history, "You are not authorized");
    }
  }
};

export const productListPageRootUserAuth = (totalCompany, history, orgId) => {
  const val = totalCompany.some((el) => el.id === Number(orgId));
  if (val === false) {
    historyReplace(history, "Organization doesn't exists");
  }
};
