import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// UI
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";

// Components
import { FormReasonActivityCancelation } from "./FormReasonActivityCancelation";
import { MessageView } from "components/Shared/MessageView/MessageView";
import { CommonComponentAccordion } from "components/Shared/Accordion/Accordion";
import Loading from "components/Shared/Loading/Loading";

//Imports
import { useSnackbar } from "notistack";

// HOCS
import ActionWithPermission from "hocs/ActionWithPermission";

//Utils
import { errorToast, mapErrors } from "utils/misc";

//Hooks
import useSearchable from "hooks/useSearchable";

// Service
import { getAllActivitiesReasons } from "services/Reservations/activitiesCancelationReason";

export const ListReasonBlock = ({ permissionsActions }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [fecthData, setFetchData] = useState(false);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);

  //Search
  const [term, setTerm] = useState("");
  const searchableData = useSearchable(data, term, (l) => [l.description]);

  const fetchListData = () => {
    setFetchData(true);
    getAllActivitiesReasons()
      .then(({ data }) => {
        setFetchData(false);
        if (data && data.status === "success") {
          setData(data.data);
        } else {
          if (data.status === "error") {
            enqueueSnackbar(mapErrors(data.data), errorToast);
          }
        }
      })
      .catch((err) => {
        enqueueSnackbar(mapErrors(err), errorToast);
      });
  };

  useEffect(() => {
    fetchListData();
  }, [load, enqueueSnackbar]);

  return (
    <div className="container">
      {fecthData && data.length === 0 ? (
        <Loading />
      ) : (
        <div className="row gx-3">
          <div className="col">
            <div className="row">
              <div className="col-8">
                <Typography variant="h4">
                  {t("Menu.Title.ActivitiesCancelation")}
                </Typography>
              </div>
              <div className="col d-flex justify-content-end">
                <TextField
                  variant="outlined"
                  onChange={({ target }) => setTerm(target.value)}
                  value={term}
                  label={t("Search.Placeholder")}
                />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col">
                <div className="row mt-3">
                  <div className="col">
                    <ActionWithPermission isValid={permissionsActions.create}>
                      <CommonComponentAccordion
                        color="primary"
                        expanded={expanded}
                        setExpanded={setExpanded}
                        title_no_data={t("Create.ActivitiesCancelation")}
                        form={
                          <FormReasonActivityCancelation
                            type="Nuevo"
                            setExpanded={setExpanded}
                            load={load}
                            setLoad={setLoad}
                            fetchListData={fetchListData}
                            permissionsActions={permissionsActions}
                          />
                        }
                      />
                    </ActionWithPermission>
                  </div>
                </div>
                {data.length === 0 ? (
                  <MessageView label="No hay Datos" />
                ) : (
                  <div className="row mt-3">
                    <div className="col">
                      {searchableData.map((row) => (
                        <CommonComponentAccordion
                          expanded={expanded}
                          setExpanded={setExpanded}
                          key={`${row.id}`}
                          data={row}
                          form={
                            <FormReasonActivityCancelation
                              type="Editar"
                              fetchListData={fetchListData}
                              defaultValue={row}
                              setExpanded={setExpanded}
                              load={load}
                              setLoad={setLoad}
                              permissionsActions={permissionsActions}
                            />
                          }
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListReasonBlock;
