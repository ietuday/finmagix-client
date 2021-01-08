import React from "react";
import PersonalFinanceValidator from "../Components/validatorRules/PersonalFinanceValidatorRules";
import RentvsBuyValidator from "../Components/validatorRules/RentvsBuyValidatorRules";
import HouseInfoValidator from "../Components/validatorRules/HouseInfoValidator";
import FrmMortgageProgramValidator from "../Components/validatorRules/FrmMortgageProgramValidator";
import ArmMortgageProgramValidator from "../Components/validatorRules/ArmMortgageProgramValidator";
import Tax1YesValidator from "../Components/validatorRules/Tax1YesValidator";
import Tax1NoValidator from "../Components/validatorRules/Tax1NoValidator";
import Tax2Validator from "../Components/validatorRules/Tax2Validator";

export function updateValidators(validatorField, fieldName, value) {
  validatorField[fieldName].errors = [];
  validatorField[fieldName].state = value;
  validatorField[fieldName].valid = true;
  validatorField[fieldName].rules.forEach((rule) => {
    if (rule.test instanceof RegExp) {
      if (!rule.test.test(value)) {
        validatorField[fieldName].errors.push(rule.message);
        validatorField[fieldName].valid = false;
      }
    } else if (typeof rule.test === "function") {
      if (!rule.test(value)) {
        validatorField[fieldName].errors.push(rule.message);
        validatorField[fieldName].valid = false;
      }
    }
  });
}

export function resetValidators(validatorField) {
  Object.keys(validatorField).forEach((fieldName) => {
    validatorField[fieldName].errors = [];
    validatorField[fieldName].state = "";
    validatorField[fieldName].valid = false;
  });
}

export function displayValidationErrors(validatorField, fieldName) {
  const validator = validatorField[fieldName];
  const result = "";
  if (validator && !validator.valid) {
    const errors = validator.errors.map((info, index) => {
      return (
        <span className="error" key={index}>
          * {info}
        </span>
      );
    });

    return <div className="col s12 row">{errors}</div>;
  }
  return result;
}
export function isFormValid(type) {
  let status = true;
  if (type === "personal_finance") {
    Object.keys(PersonalFinanceValidator).forEach((field) => {
      if (!PersonalFinanceValidator[field].valid) {
        status = false;
      }
    });
  } else if (type === "house_info") {
    Object.keys(HouseInfoValidator).forEach((field) => {
      if (!HouseInfoValidator[field].valid) {
        status = false;
      }
    });
  } else if (type === "rent_vs_buy") {
    Object.keys(RentvsBuyValidator).forEach((field) => {
      if (!RentvsBuyValidator[field].valid) {
        status = false;
      }
    });
  } else if (type === "frm") {
    Object.keys(FrmMortgageProgramValidator).forEach((field) => {
      if (!FrmMortgageProgramValidator[field].valid) {
        status = false;
      }
    });
  } else if (type === "arm") {
    Object.keys(ArmMortgageProgramValidator).forEach((field) => {
      if (!ArmMortgageProgramValidator[field].valid) {
        status = false;
      }
    });
  } else if (type === "tax1Yes") {
    Object.keys(Tax1YesValidator).forEach((field) => {
      if (!Tax1YesValidator[field].valid) {
        status = false;
      }
    });
  }
  else if (type === "tax1No") {
    Object.keys(Tax1NoValidator).forEach((field) => {
      if (!Tax1NoValidator[field].valid) {
        status = false;
      }
    });
  } else if (type === "tax2") {
    Object.keys(Tax2Validator).forEach((field) => {
      if (!Tax2Validator[field].valid) {
        status = false;
      }
    });
  }
  return status;
}
