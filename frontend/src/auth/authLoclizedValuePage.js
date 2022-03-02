import { Default } from "../constant";
import { historyReplace } from "../utils/historyReplace";

export const localizedValuePageBasicUser = (
  findedCompanyId,
  history,
  orgId
) => {
  if (findedCompanyId !== Default) {
    if (findedCompanyId !== Number(orgId)) {
      historyReplace(history, "You're not authorized");
    }
  }
};

export const localizedValuePageRootUserProductNotFound = (
  findedCompanyId,
  findedProducts,
  history,
  proId
) => {
  if (findedCompanyId === Default) {
    const val = findedProducts.some((el) => el.id === Number(proId));
    if (val === false) {
      historyReplace(history, "Product doesn't exist");
    }
  }
};

export const localizedValuePageBasicUserProductNotFound = (
  findedCompanyId,
  findedProducts,
  history,
  proId
) => {
  if (findedCompanyId !== Default) {
    const val = findedProducts.some((el) => el.id === Number(proId));
    if (val === false) {
      historyReplace(history, "You're not authorized");
    }
  }
};
