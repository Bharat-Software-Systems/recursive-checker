const req_body = [];
const req_body_val = [];
const temp_body = [];
const temp_body_val = [];
const request_keys = [];
const template_keys = [];
const keyError = new Object();
const bodyError = new Object()
const msg = new Object();

const validate = function (object, flag) {
  Object.entries(object).forEach((val) => {
    if (flag === "request") {
      request_keys.push(val[0]);
    }
    if (flag === "template") {
      template_keys.push(val[0]);
    }
    if (typeof val[1] === "object") {
      return validate(val[1], flag);
    }
    if (flag === "request") {
      // if (!req_body.includes(val[0])) {
      req_body.push(val[0]);
      // }
      if (typeof val[1] === "object") {
        return validate(val[1], flag);
      } else {
        req_body_val.push(val[1]);
      }
    }
    if (flag === "template") {
      // if (!temp_body.includes(val[0])) {
      temp_body.push(val[0]);
      // }
      if (typeof val[1] === "object") {
        return validate(val[1], flag);
      } else {
        temp_body_val.push(val[1]);
      }
    }
  });
};

function checker (reqObject, tempObject) {
  validate(tempObject, "template");
  validate(reqObject, "request");
  console.log("printing request: ", req_body);
  console.log("printign request value: ", req_body_val);
  console.log("printing body: ", temp_body);
  console.log("printing body value: ", temp_body_val);
  console.log("printing request keys: ", request_keys);
  console.log("printing template keys: ", template_keys);

  template_keys.filter((val, index) => {
    // console.log("template keys: ", array[index]);
    // console.log("request keys: ", request_keys[index]);
    // console.log('printing template key',array.indexOf(val))
    // console.log('printing request key', request_keys.indexOf(val))
    // console.log(request_keys.indexOf(val))
    // console.log(request_keys[index] === val)
    // console.log('request keys: ',request_keys);
    if (
      !request_keys.includes(val) || request_keys[index] !== template_keys[index]
    ) {
      bodyError[
        template_keys[index]
      ] = `${template_keys[index]} field is required`;
    }
  });
  if (Object.keys(bodyError).length) {
    return bodyError;
  }
  temp_body_val.filter((val, index) => {
    if (typeof req_body_val[index] !== typeof val) {
      keyError[`${req_body[index]}`] = `${
        req_body[index]
      } field expectes ${typeof temp_body_val[
        index
      ]} but received ${typeof req_body_val[index]}`;
    }
    if (req_body_val[index] === "" || undefined || null) {
      keyError[
        `${req_body[index]}`
      ] = `${req_body[index]} field can not be empty`;
    }
  });
  if (!Object.keys(keyError).length && !Object.keys(bodyError).length) {
    (msg.status = true), (msg.message = "Success");
    return msg;
  }
  delete keyError.undefined;
  return keyError;
};

// request body
let obj1 = {
  name: "ritesh thakur",
  age: 23,
  role: {
    role_name: "software engineer",
    experience: 5,
  },
  profile: {
    address: "lead city",
  },
  arr: [
    {
      place: {
        full_name: "United Kingdom",
        short_name: {
          sh_name: "UK",
          name: 'ritesh'
        },
      },
      state: "England",
    },
  ],
  demoArr: {
    state: "UK",
  },
};

// temp body
let obj2 = {
  name: "john Doe",
  age: 23,
  role: {
    role_name: "software engineer",
    experience: 3,
  },
  profile: {
    address: "USA",
  },
  arr: [
    {
      place: {
        full_name: "United States Of America",
        short_name: {
          sh_name: "USA",
          name: "ritesh",
        },
      },
      state: "USA",
    },
  ],
  demoArr: {
    state: "USA",
  },
};

const result = checker(obj1, obj2);
console.log(result);

module.exports = checker;
