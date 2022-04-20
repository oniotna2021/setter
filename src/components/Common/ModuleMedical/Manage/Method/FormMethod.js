import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

//hoc
import ActionWithPermission from "hocs/ActionWithPermission";

//UI
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

//Components
import { CommonComponentSimpleForm } from "components/Shared/SimpleForm/SimpleForm";
import { MethodForm } from "config/Forms/MedicalForms";
import MinButtonLoader from "components/Shared/MinButtonLoader/MinButtonLoader";

//Services
import {
  postMethod,
  putMethod,
  deleteMethod,
} from "services/MedicalSoftware/Method";

//Swal
import Swal from "sweetalert2";

//utils
import { successToast, errorToast, mapErrors } from "utils/misc";

export const FormMethod = ({
  type,
  defaultValue,
  setExpanded,
  load,
  setLoad,
  permissionsActions,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const { handleSubmit, control, reset } = useForm();
  const [loadingFetch, setLoadingFetch] = useState(false);

  const onSubmit = (value) => {
    if (type === "Nuevo" && !permissionsActions.create) {
      return;
    } else if (type !== "Nuevo" && !permissionsActions.edit) {
      return;
    }
    setLoadingFetch(true);
    const functionCall = type === "Nuevo" ? postMethod : putMethod;
    functionCall(value, defaultValue?.id)
      .then(({ data }) => {
        if (data && data.message && data.status === "success") {
          setExpanded(false);
          enqueueSnackbar(t("Message.SavedSuccess"), successToast);
          setLoad(!load);
          reset();
        } else {
          enqueueSnackbar(data.message, errorToast);
        }
        setLoadingFetch(false);
      })
      .catch((err) => {
        enqueueSnackbar(mapErrors(err), errorToast);
      });
  };

  const deleteForm = () => {
    Swal.fire({
      title: t("Message.AreYouSure"),
      text: t("Message.DontRevertThis"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("Message.YesDeleteIt"),
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMethod(defaultValue.id)
          .then((req) => {
            console.log(req);
            Swal.fire(
              t("Message.Eliminated"),
              t("Message.EliminatedSuccess"),
              "success"
            );
            setLoad(!load);
          })
          .catch((err) => {
            Swal.fire(t("Message.ErrorOcurred"), mapErrors(err), "error");
          });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {type !== "Nuevo" && (
        <div className="row justify-content-end mb-3">
          <ActionWithPermission isValid={permissionsActions.delete}>
            <div className="col-1">
              <IconButton
                color="primary"
                fullWidth
                variant="outlined"
                onClick={deleteForm}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </ActionWithPermission>
        </div>
      )}
      <div className="row align-items-end">
        <div className="col">
          <CommonComponentSimpleForm
            form={MethodForm}
            control={control}
            defaultValue={defaultValue}
          />
        </div>
        <ActionWithPermission
          isValid={
            type === "Nuevo"
              ? permissionsActions.create
              : permissionsActions.edit
          }
        >
          <div className="col-2">
            <MinButtonLoader text={t("Btn.save")} loader={loadingFetch} />
          </div>
        </ActionWithPermission>
      </div>
    </form>
  );
};