import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Buttons from "../Buttons";
import { apiCall } from "../../Utils/Network";
import { successToast, errorToast } from "../Toast/index";
import "../../Pages/Payment/Steps/style.css";
import "../../Pages/Payment/Steps/addBankAccount.css";
import "../../Pages/Inventory_old_1/Components/modal.scoped.css";
import styled from "styled-components";

const Index = (props) => {
  const [dpError, setDPError] = useState(false);
  const [clientIdError, setClientIdError] = useState(false);
  const [boidError, setBOidError] = useState(false);
  const [dpid, setDpId] = useState("IN");
  const [boid, setBoId] = useState("");
  const [clientid, setClientid] = useState("");
  const [brokerName, setBrokerName] = useState("");
  const [depositoryName, setDepositoryname] = useState("NSDL");
  const [depository, setDepository] = useState(false);
  const [showDPID, setshowDPID] = useState(false);
  const [showBOID, setshowBOID] = useState(true);

  // console.log('clientid', clientid);

  useEffect(() => {
    callDmat();
  }, []);

  function hideDematModal(e) {
    props.hideDematModalCallBack();
  }

  const callDmat = async function() {
    let response = await apiCall("useronboarding/dmat", "GET", "", "");
    let responseJSON = await response.json();
    console.log("demat account details", responseJSON);
    setBrokerName(responseJSON.brokerName);
    setDpId(responseJSON.dpId);
    setClientid(responseJSON.clientId);
    setBoId(responseJSON.boId);
  };

  const updateDematAccount = async function(e) {
    e.preventDefault();
    if (boid.length !== 16 || clientid.length !== 8) {
      setBOidError(true);
      setClientIdError(true);
      return;
    } else {
      let requestBody = {
        dmatId: "",
        clientId: clientid,
        dpId: dpid,
        boId: boid,
        depositoryName: depositoryName,
        brokerName: brokerName,
      };
      let response = await apiCall(
        "useronboarding/dmat",
        "POST",
        requestBody,
        ""
      );
      let responseJSON = await response.json();
      if (response.status == 400) {
        let i = 0;
        const arrayerrormessages = responseJSON.details1;
      } else if (response.status != 200) {
        errorToast("Invalid", "Demat Account Not Updated...");
        return;
      } else if (response.status === 200) {
        successToast("Success", "Demat Account Updated");
        hideDematModal();
      }
    }
  };

  const handleChange = (e) => {
    setDepository({ value: e.target.value });
    setDepositoryname(e.target.value);
    if (depository.value == "CDSL") {
      setshowBOID(true);
      setshowDPID(false);
    } else {
      setshowBOID(false);
      setshowDPID(true);
    }
  };

  const dpIdHandler = (e) => {
    if (e.target.value.length > 8) {
      setDPError(true);
      return;
    } else {
      setDpId(e.target.value);
      setDPError(false);
    }
  };

  const clientIdHandler = (e) => {
    if (e.target.value.length > 8) {
      return;
    } else {
      setClientid(e.target.value);
    }
  };

  const boIdHandler = (e) => {
    if (e.target.value.length > 16) {
      return;
    } else {
      setBoId(e.target.value);
    }
  };

  return (
    <Container>
      <section className="addcompanyrequest" style={{ position: "relative" }}>
        <div className="addcompanyrequest_container  virtual_acc_modal_padding">
          <div>
            <h6
              className="font2 m-0 text-center py-2"
              style={{ fontFamily: "Montserrat" }}
            >
              Update Your Demat Account Details
            </h6>

            <AiOutlineClose
              className="closeBtnAddMoneyModal"
              onClick={hideDematModal}
            />
          </div>
          <div className="row">
            <div className="col-12 col-md-12">
              <form
                className="w-100 DepositoryTab-form"
                onSubmit={(e) => e.preventDefault()}
              >
                <label className="Trade_ready_step_3_Label my-2 text-small">
                  Broker Name
                </label>
                <input
                  type="text"
                  className="p-2 Trade_ready_step_3_selectbox"
                  name="brokername"
                  onChange={(e) => setBrokerName(e.target.value)}
                  value={brokerName}
                />
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <label className="Trade_ready_step_3_Label my-2 text-small">
                      Depository Name
                    </label>
                  </div>
                </div>

                <select
                  className="p-2 Trade_ready_step_3_selectbox"
                  aria-label="Default select example"
                  value={depositoryName}
                  onChange={handleChange}
                >
                  <option value="NSDL">NSDL</option>
                  <option value="CDSL">CDSL</option>
                </select>
                {depositoryName == "NSDL" ? (
                  <>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <label className="m-0 my-2 text-small">DP ID*</label>
                      </div>
                    </div>
                    <input
                      type="text"
                      className="p-2 Trade_ready_step_3_selectbox"
                      name="dpid"
                      onChange={dpIdHandler}
                      value={dpid}
                      style={dpError ? { border: "1px solid #FF4D4F" } : {}}
                      // onChange={(e) => { setDpId(e.target.value) }}
                    />
                    {dpError ? (
                      <p
                        className="m-0 mt-1"
                        style={{
                          fontSize: "12px",
                          fontWeight: "500",
                          color: "#FF4D4F",
                        }}
                      >
                        DP ID must starts with "IN" and 8 digits long
                      </p>
                    ) : (
                      ""
                    )}
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <label className="m-0 my-2 text-small">
                          Client ID*
                        </label>
                      </div>
                    </div>
                    <input
                      type="number"
                      className="p-2 Trade_ready_step_3_selectbox"
                      name="dpid"
                      value={clientid}
                      onChange={clientIdHandler}
                      style={
                        clientIdError ? { border: "1px solid #FF4D4F" } : {}
                      }
                    />
                    {clientIdError ? (
                      <p
                        className="m-0 mt-1"
                        style={{
                          fontSize: "12px",
                          fontWeight: "500",
                          color: "#FF4D4F",
                        }}
                      >
                        Client ID must be 8 digits long
                      </p>
                    ) : (
                      ""
                    )}
                    <div className="col md-12 col-12 p-0 mt-4">
                      <div className="row">
                        <div className="col-md-6 col-12 mb-2">
                          <Buttons.SecondaryButton
                            value="Cancel"
                            style={{ width: "100%" }}
                            onClick={hideDematModal}
                          />
                        </div>
                        <div className="col-md-6 col-12">
                          {!(
                            brokerName !== "" &&
                            dpid.includes("IN") &&
                            clientid !== ""
                          ) ? (
                            <Buttons.InactiveButton
                              value="Update"
                              style={{ width: "100%" }}
                            />
                          ) : (
                            <Buttons.PrimaryButton
                              value="Update"
                              style={{ width: "100%" }}
                              onClick={updateDematAccount}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                {depositoryName == "CDSL" ? (
                  <>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <label className="m-0 my-2 text-small">BO ID*</label>
                      </div>
                    </div>
                    <input
                      type="number"
                      className="p-2 Trade_ready_step_3_selectbox"
                      name="boid"
                      value={boid}
                      onChange={boIdHandler}
                      style={boidError ? { border: "1px solid #FF4D4F" } : {}}
                    />
                    {boidError ? (
                      <p
                        className="m-0 mt-1"
                        style={{
                          fontSize: "12px",
                          fontWeight: "500",
                          color: "#FF4D4F",
                        }}
                      >
                        BoID ID must be 16 digits long
                      </p>
                    ) : (
                      ""
                    )}
                    <div className="col md-12 col-12 p-0 mt-4">
                      <div className="row">
                        <div className="col-md-6 col-12 mb-2">
                          <Buttons.SecondaryButton
                            value="Cancel"
                            style={{ width: "100%" }}
                            onClick={hideDematModal}
                          />
                        </div>
                        <div className="col-md-6 col-12">
                          {brokerName === "" || boid.length <= 15 ? (
                            <Buttons.InactiveButton
                              value="Update"
                              style={{ width: "100%" }}
                            />
                          ) : (
                            <Buttons.PrimaryButton
                              value="Update"
                              style={{ width: "100%" }}
                              onClick={updateDematAccount}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

const Container = styled.div`
  max-width: 600px;
  width: 500px;
  @media (max-width: 600px) {
    width: 400px;
  }
  @media (max-width: 450px) {
    width: 300px;
  }
  @media (max-width: 350px) {
    width: 250px;
  }
`;
export default Index;
