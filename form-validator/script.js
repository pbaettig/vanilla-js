const form = document.getElementById('form');

const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';

  const small = formControl.querySelector('small');
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// function validateNotEmpty(input) {
//   if (input.value == '') {
//     showError(input, `${getFieldName(input)} cannot be empty.`);
//     return;
//   }
//   showSuccess(input);
// }

// function validatePassword(input1, input2) {
//   if (input1.value == '') {
//     showError(input1, 'Password is required');
//   }
//   if (input2.value == '') {
//     showError(input2, 'Password is required');
//   }

//   if (input1.value == '' || input2.value == '') {
//     return;
//   }

//   const errorMessage = 'Passwords must match';
//   if (input1.value != input2.value) {
//     showError(input1, errorMessage);
//     showError(input2, errorMessage);
//     return;
//   }

//   showSuccess(input1);
//   showSuccess(input2);
// }

// function validateLength(input, minLength) {
//   if (input.value == '') {
//     validateNotEmpty(input);
//     return;
//   }

//   if (input.value.length < minLength) {
//     showError(
//       input,
//       `${getFieldName(input)} has to be at least ${minLength} characters long.`
//     );
//     return;
//   }

//   showSuccess(input);
// }

// function validateEmail(input) {
//   if (input.value == '') {
//     validateNotEmpty(input);
//     return;
//   }

//   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   if (!re.test(input.value.toLowerCase())) {
//     showError(input, 'Email address is not in the correct format.');
//     return;
//   }
//   showSuccess(input);
// }

function minLength(minLength, input) {
  if (input.value.length < minLength) {
    return {
      result: false,
      msg: `${getFieldName(
        input
      )} needs to be at least ${minLength} characters long.`
    };
  }

  return { result: true, msg: null };
}

function notEmpty(input) {
  if (input.value === '') {
    return { result: false, msg: `${getFieldName(input)} cannot be empty.` };
  }

  return { result: true, msg: null };
}

function isEmail(input) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(input.value.toLowerCase())) {
    return {
      result: false,
      msg: 'Email address is not in the correct format.'
    };
  }
  return { result: true, msg: null };
}

function isEqual(input2, input) {
  if (input.value != input2.value) {
    return {
      result: false,
      msg: 'Passwords do not match'
    };
  }
  return { result: true, msg: null };
}

function validate(input, validators) {
  var failure = false;
  for (v of validators) {
    var r = v(input);
    console.log(v, r);
    if (!r.result) {
      failure = true;
      console.log('failed');
      showError(input, r.msg);
      break;
    }
  }
  if (!failure) showSuccess(input);
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  validate(username, [notEmpty, minLength.bind(null, 6)]);
  validate(email, [notEmpty, isEmail]);
  validate(password, [notEmpty, minLength.bind(null, 8)]);
  validate(password2, [isEqual.bind(null, password)]);
});
