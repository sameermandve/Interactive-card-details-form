const form = document.querySelector("form");
const fullName = document.querySelector("#full-name");
const cardNo = document.querySelector("#card-no");
const expMonth = document.querySelector("#exp-month");
const expYear = document.querySelector("#exp-year");
const cvcNo = document.querySelector("#cvc-no");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const cardForm = document.querySelector("#card-form");
  const cardSuccess = document.querySelector("#card-success");
  const dismissBtn = document.querySelector("#dismiss-btn");

  validateCardInfo();
  if (validateCardInfo()) {
    cardForm.classList.add("form-hide");
    cardSuccess.classList.add("success-show");

    dismissBtn.addEventListener("click", () => {
      cardForm.classList.remove("form-hide");
      cardSuccess.classList.remove("success-show");
      form.reset();
    });
  }
});

const setError = (element, message) => {
  const inputControl = element;
  const parentControl = inputControl.parentElement;
  const errorMsg = parentControl.nextElementSibling;

  inputControl.style.borderColor = "hsl(0, 100%, 66%)";
  errorMsg.classList.add("msg-show");
  errorMsg.innerText = message;
};

const setSuccess = (element) => {
  const inputControl = element;
  const parentControl = inputControl.parentElement;
  const errorMsg = parentControl.nextElementSibling;

  inputControl.style.borderColor = "hsl(249, 99%, 64%)";
  errorMsg.classList.remove("msg-show");
  errorMsg.innerText = "";
};

const setDefault = (element) => {
  const inputControl = element;

  inputControl.style.borderColor = "hsl(270, 3%, 87%)";
};

const divideEqual = (e) => {
  let cardNoString = e;
  const first = document.querySelector("#first");
  const second = document.querySelector("#second");
  const third = document.querySelector("#third");
  const fourth = document.querySelector("#fourth");

  if ((cardNoString.length = 16)) {
    let firstFour = cardNoString.slice(0, 4);
    first.innerText = firstFour;

    let secondFour = cardNoString.slice(4, 8);
    second.innerText = secondFour;

    let thirdFour = cardNoString.slice(8, 12);
    third.innerText = thirdFour;

    let fourthFour = cardNoString.slice(12, 16);
    fourth.innerText = fourthFour;
  }
};

const validateCardInfo = () => {
  const fullNameValue = fullName.value.trim();
  const cardNoValue = cardNo.value.trim();
  const expMonthValue = expMonth.value.trim();
  const expYearValue = expYear.value.trim();
  const cvcNoValue = cvcNo.value.trim();

  let fullNamePreview = document.querySelector("#full-name-preview");
  let monthPreview = document.querySelector("#month");
  let yearPreview = document.querySelector("#year");
  let cvcNoPreview = document.querySelector("#cvc-preview");

  const date = new Date();
  let currentYear = date.getFullYear();

  let errorCount = 0;

  if (fullNameValue === "") {
    setError(fullName, "Can't be blank");
    errorCount += 1;
  } else {
    setSuccess(fullName);
    fullNamePreview.innerText = fullNameValue;
    setDefault(fullName);
  }

  if (cvcNoValue === "") {
    setError(cvcNo, "Can't be blank");
    errorCount += 1;
  } else if (cvcNoValue.length != 3) {
    setError(cvcNo, "CVC must contain 3 digits");
    cvcNoPreview.innerText = "123";
    errorCount += 1;
  } else {
    setSuccess(cvcNo);
    cvcNoPreview.innerText = cvcNoValue;
    setDefault(cvcNo);
  }

  if (cardNoValue === "") {
    setError(cardNo, "Can't be blank");
    errorCount += 1;
  } else if (cardNoValue.length != 16) {
    setError(cardNo, "It must contain 16 numbers");
    errorCount += 1;
  } else if (isNaN(cardNoValue)) {
    setError(cardNo, "Wrong format, numbers only");
    divideEqual(cardNoValue);
    errorCount += 1;
  } else {
    setSuccess(cardNo);
    divideEqual(cardNoValue);
    setDefault(cardNo);
  }

  if (expMonthValue === "") {
    setError(expMonth, "Can't be blank");
    errorCount += 1;
  } else if (expMonthValue < 1 || expMonthValue > 12) {
    setError(expMonth, "Wrong Date");
    errorCount += 1;
  } else {
    setSuccess(expMonth);
    monthPreview.innerText = expMonthValue;
    setDefault(expMonth);
  }

  if (expYearValue === "") {
    setError(expYear, "Can't be blank");
    errorCount += 1;
  } else if (expYearValue.length === 3 || expYearValue.length === 1) {
    setError(expYear, "Wrong Date");
    errorCount += 1;
  } else if (expYearValue.length > 4) {
    setError(expYear, "Wrong Date");
    errorCount += 1;
  } else if (expYearValue < currentYear) {
    setError(expYear, "Must be in future");
    errorCount += 1;
  } else {
    setSuccess(expYear);
    yearPreview.innerText = expYearValue;
    setDefault(expYear);
  }

  if (errorCount > 0) {
    return false;
  }
  return true;
};
