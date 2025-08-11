export const AbbottAppToEhrFormFields = [
  {
    type: "input",
    label: "OAuth URL",
    inputType: "text",
    name: "jwksUrl",
    validations: [
      {
        name: "required",
        validator: "required",
        message: "OAuth URL Required",
      },
    ],
  },
  {
    type: "input",
    label: "Sending Facility",
    inputType: "text",
    name: "sendingFacility",
    validations: [
      {
        name: "required",
        validator: "required",
        message: "Sending Facility Required",
      },
    ],
  },
  {
    type: "input",
    label: "Sending App",
    inputType: "text",
    name: "sendingApp",
    validations: [
      {
        name: "required",
        validator: "required",
        message: "Sending App Required",
      },
    ],
  },
  {
    type: "input",
    label: "Receiving Facility",
    inputType: "text",
    name: "receivingFacility",
    validations: [
      {
        name: "required",
        validator: "required",
        message: "Receiving Facility Required",
      },
    ],
  },
  {
    type: "input",
    label: "Receiving App",
    inputType: "text",
    name: "receivingApp",
    validations: [
      {
        name: "required",
        validator: "required",
        message: "Receiving App Required",
      },
    ],
  },
];
