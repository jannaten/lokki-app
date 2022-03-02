import { errorToast } from "../Components/Reusable-Components";

export function historyReplace(history, msg) {
  history.replace("/not-found");
  errorToast(msg);
}
