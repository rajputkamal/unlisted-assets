import React, { useState } from 'react'

const AddMoney = () => {
    const [addMoneyNewModal, setAddMoneyNewModal] = useState(false);
  const [UPIModal, setUPIModal] = useState(false);
  const [maxAmountError, setMaxAmountError] = useState(false);
  const [enteredAmount, setEnteredAmount] = useState('₹')
  const [moneyRadioBtn, setMoneyRadioBtn] = useState('upi')


    const moneyHandler = (e) => {
        setMoneyRadioBtn(e.target.value)
       
      }
    
      const onContinueHandler = async (e) => {
        e.preventDefault()
        setAddMoneyNewModal(false)
        if(moneyRadioBtn === 'upi'){
    
          await createOrderAddMoney();
          await getQRCodeAddMoney();
          setUPIModal(true)
        }else {
          setaddMonetTowallet(true)
        }
    }

  return (
    <>
    <Dialog
          open={addMoneyNewModal}
          onClose={() => setAddMoneyNewModal(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="addcompanyrequest" style={{ position: "relative" }}>
            <div className="addcompanyrequest_container virtual_acc_modal_padding">
              <div className="virtual-account-created-padding">
                <h5>Add Money to Your Virtual Account</h5>

                <p className="text-small mb-2">Please choose your reference</p>
                <FormControl className='mb-4 mt-4 ml-2 gap-2'>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="upi"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                  className="gap-2"
                    value='upi'
                    onChange={moneyHandler}
                    control={
                      <Radio
                        sx={{ fontSize: "2rem", color: "#721B65"}}
                        color="secondary"
                      />
                    }
                    label="Add Money via UPI"
                  />
                  
                  <FormControlLabel
                    value='bankTransfer'
                    onChange={moneyHandler}
                    control={
                      <Radio
                        sx={{ fontSize: "2rem", color: "#721B65" }}
                        color="secondary"
                      />
                    }
                    label="Add Money via Bank Transfer"
                  />
                </RadioGroup>
              </FormControl>
                {/* <div className="radios">
                  <div className="d-flex mb-4 mt-4">
                    <RadioButtonCheckedIcon
                      sx={{ fontSize: "2rem", color: "#721B65" }}
                    />
                    <p className="text-small mb-1 ml-1">Add Money via UPI</p>
                  </div>
                  <div className="d-flex">
                    <RadioButtonUncheckedIcon
                      sx={{ fontSize: "2rem", color: "#721B65" }}
                    />
                   
                  </div>
                </div> */}
                <AiOutlineClose
                 className="closeBtnAddMoneyModal"
                  onClick={() => setAddMoneyNewModal(false)}
                />
              </div>
              

              <div className="row addcompanyrequest_buttonContainer mt-3 d-flex justify-content-end">
                <div className="col-md-5 col-12">
                  <Buttons.PrimaryButton
                    value="Continue"
                    style={{ width: "100%" }}
                    onClick = {onContinueHandler}
                  />
                </div>
              </div>
            </div>
          </div>
        </Dialog>
    
    
    </>
  )
}

export default AddMoney