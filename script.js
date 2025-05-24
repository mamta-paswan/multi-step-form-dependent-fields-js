document.addEventListener("DOMContentLoaded", function () {
  function getInputValue(selector) {
    return document.querySelector(selector).value || "";
  }

  const businessType = document.getElementById("businessType");
  const turnover = document.getElementById("turnover");

  const vatRegisteredRadios = document.querySelectorAll(
    "input[name='vat_registered']"
  );
  const payrollRadios = document.querySelectorAll('input[name="payroll"]');

  const pensionRadios = document.querySelectorAll(
    'input[name="pension_scheme"]'
  );

  const selfAssessmentsblock = document.getElementById("self_assessments");
  const dormantblock = document.getElementById("dormant");
  const freeFormationblock = document.getElementById("free_formation");
  const payslipPayrollBlock = document.getElementById("payslip_payroll");
  const payslipPensionBlock = document.getElementById("paysli_pension");

  const mailForwardChecked = document.querySelector(
    'input[name="mail_forward"]'
  );
  const statementFilingServiceRadios = document.querySelectorAll(
    'input[name="statement_filing_service"]'
  );
  const secretarialServiceRadios = document.querySelectorAll(
    'input[name="secretarial_service"]'
  );

  const totalPayment = document.querySelector(".total");
  const orderReviewTbody = document.querySelector("#order-review tbody");
  const additionalChargesTbody = document.querySelector(
    "#additional-charges tbody"
  );

  const chargedFields = document.querySelectorAll("[data-charged]");

  chargedFields.forEach((el) => {
    el.addEventListener("change", function (event) {
      // console.log(total[event.target.dataset.charged_name]);
      total[event.target.dataset.charged_name] = event.target.dataset.charged;
      upadateTotalValue(total);
    });
  });

  const total = {
    base: 39.99,
    Tbus: 0,
    turnover: 0,
    vat_registered: 0,
    payroll: 0,
    pension_scheme: 0,
    self_assessments: 0,
    dormant: 0,
    mail_forward: 0,
    statement_filing_service: 0,
    sService: 0,
    fCheckbox: 0,
  };

  function upadateTotalValue() {
    viewPayement = Object.values(total)
      .reduce((p, a) => parseFloat(p) + parseFloat(a), 0)
      .toFixed(2);
    totalPayment.innerHTML = `Price: £${viewPayement} +VAT`;
  }

  // Initially show only Step 1
  stepOne.style.display = "block";
  stepTwo.style.display = "none";
  stepThree.style.display = "none";

  // Button selectors
  const step1Next = document.querySelector("#step1-next");
  const step2Prev = document.querySelector("#step2-prev");
  const step2Next = document.querySelector("#step2-next");
  const step3Prev = document.querySelector("#step3-prev");

  function validateStep(step) {
    const inputs = step.querySelectorAll("input, select");
    for (let input of inputs) {
      if (input.type == "tel") {
        var phoneNum = input.value.replace(/[^\d]/g, "");
        if (phoneNum.length < 10 || phoneNum.length > 10) {
          input.setCustomValidity(
            "Please enter a valid phone number (10 digits)."
          );
          input.reportValidity();
          return false;
        } else {
          input.setCustomValidity(""); // Reset custom validity
        }
      }
      if (!input.checkValidity() && input.checkVisibility()) {
        input.reportValidity();
        return false;
      }
    }
    return true;
  }

  step1Next.addEventListener("click", function (e) {
    e.preventDefault();
    if (validateStep(stepOne)) {
      stepOne.style.display = "none";
      stepTwo.style.display = "block";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  step2Next.addEventListener("click", function (e) {
    e.preventDefault();
    if (validateStep(stepTwo)) {
      stepTwo.style.display = "none";
      stepThree.style.display = "block";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  step2Prev.addEventListener("click", function (e) {
    e.preventDefault();
    stepTwo.style.display = "none";
    stepOne.style.display = "block";
  });

  step3Prev.addEventListener("click", function (e) {
    e.preventDefault();
    stepThree.style.display = "none";
    stepTwo.style.display = "block";
  });

  /* =========== Step 1 == */
  var businessTypeVal = "";
  var freeFormationval = "";
  var dormantRadioVal = "";
  var selfAssessmentsVal = "";

  var turnoverVal = "";
  var vatRegisteredVal = "";

  var payrollVal = "";
  var payrollPayslipVal = "";

  var pensionVal = "";
  var pensionPayslipVal = "";

  var mailForwardVal = "";
  var statementFilingVal = "";
  var secretarialServiceVal = "";

  // buisinessType dependency
  businessType.addEventListener("change", function () {
    businessTypeVal = this.value;
    if (businessTypeVal === "Partnership" || businessTypeVal === "Ltdcompany") {
      selfAssessmentsblock.classList.remove("hide");
      const input = selfAssessmentsblock.querySelector(
        'input[name="self_assessments"]'
      );
      selfAssessmentsVal = input.value;

      if (businessTypeVal === "Ltdcompany") {
        freeFormationblock.classList.remove("hide");
        dormantblock.classList.remove("hide");

        freeFormationCheckbox = document.querySelector(
          'input[name="free_formation"]'
        );
        freeFormationCheckbox.addEventListener("change", function () {
          freeFormationval = this.checked ? "Yes" : "No";
        });

        const dormantRadios = dormantblock.querySelectorAll(
          'input[name="dormant"]'
        );

        dormantRadios.forEach((radio) => {
          radio.addEventListener("change", function () {
            dormantRadioVal = this.value;
            if (dormantRadioVal === "yes") {
              turnover.disabled = true;

              vatRegisteredRadios.forEach((radio) => {
                radio.disabled = true;
              });

              pensionRadios.forEach((radio) => {
                radio.disabled = true;
              });

              payrollRadios.forEach((radio) => {
                radio.disabled = true;
              });
            } else {
              turnover.disabled = false;
              vatRegisteredRadios.forEach((radio) => {
                radio.disabled = false;
              });

              pensionRadios.forEach((radio) => {
                radio.disabled = false;
              });

              payrollRadios.forEach((radio) => {
                radio.disabled = false;
              });
            }
          });
        });
      } else {
        freeFormationblock.classList.add("hide");
        dormantblock.classList.add("hide");
      }
    } else {
      selfAssessmentsblock.classList.add("hide");
      freeFormationblock.classList.add("hide");
      dormantblock.classList.add("hide");
    }
  });

  // Turnover;
  turnover.addEventListener("change", function () {
    turnoverVal = this.value;
  });

  // vat;
  vatRegisteredRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      vatRegisteredVal = this.value;
    });
  });

  // Payroll dependency
  payrollRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      payrollVal = this.value;
      if (this.value === "yes") {
        payslipPayrollBlock.classList.remove("hide");
        PayrollPayslipVal = payslipPayrollBlock.querySelector(
          "input[name='payslip_payroll']"
        );
      } else {
        payslipPayrollBlock.classList.add("hide");
      }
    });
  });

  // Pension dependency
  pensionRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      pensionVal = this.value;
      if (pensionVal === "yes") {
        payslipPensionBlock.classList.remove("hide");
        pensionPayslipVal = payslipPensionBlock.querySelector(
          "input[name='paysli_pension']"
        );
      } else {
        payslipPensionBlock.classList.add("hide");
      }
    });
  });

  /* =========== Step 2 == */

  mailForwardChecked.addEventListener("change", function () {
    mailForwardVal = this.checked ? "Yes" : "No";
  });

  // statement
  statementFilingServiceRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      statementFilingVal = this.value ? "Yes" : "No";
    });
  });

  //  service
  secretarialServiceRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      secretarialServiceVal = this.value ? "Yes" : "No";
    });
  });

  /* =========== Step 3 == */

  const additionalRows = [];

  if (businessTypeVal) {
    additionalRows.push({
      label: "Type Of Business",
      value: businessTypeVal,
    });
  }

  if (freeFormationval) {
    additionalRows.push({
      label: "Free Formation",
      value: freeFormationval,
    });
  }

  if (dormantRadioVal) {
    additionalRows.push({
      label: "Dormanat",
      value: dormantRadioVal,
    });
  }

  if (selfAssessmentsVal) {
    additionalRows.push({
      label: "Self Assessment",
      value: selfAssessmentsVal,
    });
  }

  if (turnoverVal) {
    additionalRows.push({
      label: "Turnover",
      value: turnoverVal,
    });
  }

  if (vatRegisteredVal) {
    additionalRows.push({
      label: "VAT Registered",
      value: vatRegisteredVal,
    });
  }

  if (payrollVal) {
    additionalRows.push({
      label: "Payroll",
      value: payrollVal,
    });
  }

  if (payrollPayslipVal) {
    additionalRows.push({
      label: "Payroll Payslip",
      value: payrollPayslipVal,
    });
  }

  if (pensionVal) {
    additionalRows.push({
      label: "Pension Scheme",
      value: pensionVal,
    });
  }

  if (pensionPayslipVal) {
    additionalRows.push({
      label: "Pension Payslip",
      value: pensionPayslipVal,
    });
  }

  if (mailForwardVal) {
    additionalRows.push({
      label: "Registered office and mail forwarding",
      value: mailForwardVal,
    });
  }

  if (statementFilingVal) {
    additionalRows.push({
      label: "Statement filing service",
      value: statementFilingVal,
    });
  }

  if (secretarialServiceVal) {
    additionalRows.push({
      label: "Secretarial service",
      value: secretarialServiceVal,
    });
  }

  if (additionalChargesTbody && orderReviewTbody) {
    additionalChargesTbody.innerHTML = `
    <tr><td></td><td class="text-left">Price excl. VAT</td><td>£39.99</td></tr>
    ${additionalRows
      .map(
        (row) =>
          `<tr><td></td><td class="text-left">${row.label}</td><td>£${row.value}</td></tr>`
      )
      .join("")}
    <tr>
      <td></td>
      <td><h5 class="text-left mb-0">Total Charges</h5></td>
      <td><h5 class="mb-0">£${totalPayment}</h5></td>
    </tr>
  `;
    orderReviewTbody.innerHTML = `
      <tr><td></td><td class="text-left">Full Name</td><td>${getInputValue(
        'input[name="fullname"]'
      )}</td></tr>
      <tr><td></td><td class="text-left">Email Address</td><td>${getInputValue(
        'input[name="email"]'
      )}</td></tr>
      <tr><td></td><td class="text-left">Phone Number</td><td>${getInputValue(
        'input[name="countryCode"]'
      )}-${getInputValue('input[name="phone"]')}</td></tr>
      ${additionalRows
        .map(
          (row) =>
            `<tr><td></td><td class="text-left">${row.label}</td><td>${row.value}</td></tr>`
        )
        .join("")}
    `;
  }
});
