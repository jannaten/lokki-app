import React from "react";
import { XLg } from "react-bootstrap-icons";

import toast, { Toaster, ToastBar } from "react-hot-toast";

export default function ToastButton() {
  return (
    <Toaster>
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== "loading" && (
                <XLg
                  size={15}
                  style={{ cursor: "pointer" }}
                  onClick={() => toast.dismiss(t.id)}
                />
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}
