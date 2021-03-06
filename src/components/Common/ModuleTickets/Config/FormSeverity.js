import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { Switch, TextField } from "@material-ui/core";
//Services
import {
  deleteTicketSeverity,
  postTicketSeverity,
  putTicketSeverity,
} from "services/Tickets/severity";
//utils
import { errorToast, mapErrors, successToast } from "utils/misc";

import ColorPalettePicker from "components/Shared/ColorPalettePicker/ColorPalettePicker";
import DeleteIcon from "@material-ui/icons/Delete";
//UI
import IconButton from "@material-ui/core/IconButton";
//Components
import MinButtonLoader from "components/Shared/MinButtonLoader/MinButtonLoader";
//Swal
import Swal from "sweetalert2";
// Data colors
import { colorsPalette } from "assets/colorsPalette";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";

const SwitchCustom = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
    marginRight: "25px!important",
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: theme.palette.text.secondary,
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.text.disabled}`,
    backgroundColor: theme.palette.text.disabled,
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});


export const FormSeverity = ({
  type,
  defaultValue,
  setExpanded,
  load,
  setLoad,
}) => {
  const { t } = useTranslation();
  const { handleSubmit, control, reset } = useForm();
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [valueSwitch, setValueSwitch] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (defaultValue) {
      setValueSwitch(defaultValue.active === 1 ? true : false);
    }
  }, [defaultValue]);

  const onSubmit = (value) => {
    value.active = valueSwitch === true ? 1 : 0;
    setLoadingFetch(true);
    const functionCall =
      type === "Nuevo" ? postTicketSeverity : putTicketSeverity;
    functionCall(type === "Nuevo" ? value : value, defaultValue?.uuid)
      .then(({ data }) => {
        if (data && data.message && data.status === "success") {
          enqueueSnackbar(data.message, successToast);
          setExpanded(false);
          reset();
        } else {
          enqueueSnackbar(data.message, errorToast);
        }
        setLoadingFetch(false);
        setLoad(!load);
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
        deleteTicketSeverity(defaultValue.uuid)
          .then((req) => {
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

  const handleChange = () => {
    setValueSwitch((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {type !== "Nuevo" && (
        <div className="row justify-content-end mb-3">
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
        </div>
      )}
      <div className="row m-0">
        <div className="col-11">
          <div className="row m-0">
            <div className="col-4">
              <Controller
                control={control}
                name="code"
                defaultValue={defaultValue?.code}
                render={({ field }) => (
                  <TextField {...field} variant="outlined" label="C??digo" />
                )}
              />
            </div>
            <div className="col-4">
              <Controller
                control={control}
                name="label"
                defaultValue={defaultValue?.label}
                render={({ field }) => (
                  <TextField {...field} variant="outlined" label="Nombre" />
                )}
              />
            </div>
            <div className="col-4">
              <Controller
                control={control}
                name="position"
                defaultValue={defaultValue?.position}
                render={({ field }) => (
                  <TextField {...field} variant="outlined" label="Posici??n" />
                )}
              />
            </div>
            <div className="col-12 mt-2">
              <Controller
                control={control}
                name="description"
                defaultValue={defaultValue?.description}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    label="Descripci??n"
                    multiline
                    rows={4}
                  />
                )}
              />
            </div>
            <div className="col-12 mt-2">
              <Controller
                control={control}
                defaultValue={defaultValue?.color ? defaultValue?.color : null}
                name="color"
                render={({ field }) => (
                  <>
                    <ColorPalettePicker
                      valueColor={field.value}
                      onChangeColor={field.onChange}
                      dataColors={colorsPalette}
                    />
                  </>
                )}
              />
            </div>
          </div>
        </div>
        <div className="col-1 p-0">
          <SwitchCustom
            checked={valueSwitch}
            name="active"
            onChange={handleChange}
          />
        </div>
        <div className="d-flex justify-content-end mt-2">
          <MinButtonLoader text={t("Btn.save")} loader={loadingFetch} />
        </div>
      </div>
    </form>
  );
};
