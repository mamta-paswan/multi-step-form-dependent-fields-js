document.addEventListener("DOMContentLoaded", function () {
  function getInputValue(selector) {
    const element = document.querySelector(selector);
    return element ? element.value || "" : "";
  }

  function getAllElement(selector) {
    return document.querySelectorAll(selector);
  }

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

  const businessType = document.getElementById("businessType");
  const turnover = document.getElementById("turnover");

  const vatRegisteredRadios = getAllElement("input[name='vat_registered']");
  const payrollRadios = getAllElement('input[name="payroll"]');

  const pensionRadios = getAllElement('input[name="pension_scheme"]');

  const selfAssessmentsblock = document.getElementById("self_assessments");
  const dormantblock = document.getElementById("dormant");
  const freeFormationblock = document.getElementById("free_formation");
  const payslipPayrollBlock = document.getElementById("payslip_payroll");
  const payslipPensionBlock = document.getElementById("paysli_pension");

  const mailForwardChecked = document.querySelector(
    'input[name="mail_forward"]'
  );
  const statementFilingServiceRadios = getAllElement(
    'input[name="statement_filing_service"]'
  );
  const secretarialServiceRadios = getAllElement(
    'input[name="secretarial_service"]'
  );

  const totalPayment = document.querySelector(".total");
  const errorMessage = document.querySelector(".error-message");
  const orderReviewTbody = document.querySelector("#order-review tbody");
  const additionalChargesTbody = document.querySelector(
    "#additional-charges tbody"
  );

  // Callback function to execute when mutations are observed
  const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
      console.log(mutation);
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "disabled"
      ) {
        total[mutation.target.dataset.charged_name] = 0;
        mutation.target.value = "";
        upadateTotalValue(total);
      }
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Later, you can stop observing
  // observer.disconnect();

  const chargedFields = getAllElement("[data-charged]");

  chargedFields.forEach((el) => {
    el.addEventListener("change", function (event) {
      let chargedValue = event.target.dataset.charged;
      const chargedName = event.target.dataset.charged_name;

      total[chargedName] = chargedValue; // -> 0 => disbled
      upadateTotalValue(total);
    });

    observer.observe(el, { attributes: true });
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

  let viewPayement;

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

  function updateIndicators() {
    const indicators = getAllElement("#step2-indicator");
    indicators.forEach((indicator) => {
      if (businessTypeVal == "Ltdcompany") {
        if (indicator.classList.contains("hide")) {
          indicator.classList.remove("hide");
        }
        indicator.nextElementSibling?.style.setProperty("--sepWidth", "30%");
      } else {
        indicator.classList.add("hide");
        indicator.nextElementSibling?.style.setProperty("--sepWidth", "40%");
      }
    });
  }

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
          input.setCustomValidity("");
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
      if (businessTypeVal == "Ltdcompany") {
        stepTwo.style.display = "block";
      } else {
        stepThree.style.display = "block";
      }
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  step3Prev.addEventListener("click", function (e) {
    e.preventDefault();
    stepThree.style.display = "none";
    if (businessTypeVal == "Ltdcompany") {
      stepTwo.style.display = "block";
    } else {
      stepOne.style.display = "block";
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    updateIndicators();
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
        payrollPayslipVal = payslipPayrollBlock.querySelector(
          "input[name='payslip_payroll']"
        ).value;
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
        ).value;
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
  function updateOrderReview() {
    const additionalRows = [];

    if (businessTypeVal) {
      additionalRows.push({
        label: "Type Of Business",
        value: businessTypeVal,
        charged: 0,
      });
    }

    if (freeFormationval) {
      additionalRows.push({
        label: "Free Formation",
        value: freeFormationval,
        charged: 0,
      });
    }

    if (dormantRadioVal) {
      additionalRows.push({
        label: "Dormanat",
        value: dormantRadioVal,
        charged: total.dormant,
      });
    }

    if (selfAssessmentsVal) {
      additionalRows.push({
        label: "Self Assessment",
        value: selfAssessmentsVal,
        charged: total.self_assessments,
      });
    }

    if (turnoverVal) {
      additionalRows.push({
        label: "Turnover",
        value: turnoverVal,
        charged: total.turnover,
      });
    }

    if (vatRegisteredVal) {
      additionalRows.push({
        label: "VAT Registered",
        value: vatRegisteredVal,
        charged: total.vat_registered,
      });
    }

    if (payrollVal) {
      additionalRows.push({
        label: "Payroll",
        value: payrollVal,
        charged: total.payroll,
      });
    }

    if (payrollPayslipVal) {
      additionalRows.push({
        label: "Payroll Payslip",
        value: payrollPayslipVal,
        charged: 0,
      });
    }

    if (pensionVal) {
      additionalRows.push({
        label: "Pension Scheme",
        value: pensionVal,
        charged: total.pension_scheme,
      });
    }

    if (pensionPayslipVal) {
      additionalRows.push({
        label: "Pension Payslip",
        value: pensionPayslipVal,
        charged: 0,
      });
    }

    if (mailForwardVal) {
      additionalRows.push({
        label: "Registered office and mail forwarding",
        value: mailForwardVal,
        charged: total.mail_forward,
      });
    }

    if (statementFilingVal) {
      additionalRows.push({
        label: "Statement filing service",
        value: statementFilingVal,
        charged: total.statement_filing_service,
      });
    }

    if (secretarialServiceVal) {
      additionalRows.push({
        label: "Secretarial service",
        value: secretarialServiceVal,
        chareged: total.sService,
      });
    }

    if (additionalChargesTbody && orderReviewTbody) {
      additionalChargesTbody.innerHTML = `
    <tr>
    <td width="10%"></td>
    <td width="45%" class="text-left txt-cap fw-500">Price excl. VAT</td>
    <td width="45%" class="text-left txt-cap">£${total.base}</td>
    </tr>
    ${additionalRows
      .map(
        (row) =>
          `<tr>
       <td width="10%"></td>
        <td width="45%" class="text-left txt-cap fw-500">${row.label}</td>
        <td width="45%" class="text-left txt-cap">${row.charged}</td>
        </tr>`
      )
      .join("")}
    <tr>
      
    <td width="10%"></td>
      <td width="45%"><h5 class="text-left txt-cap fw-500 mb-0">Total Charges</h5></td>
      <td width="45%"><h5 class="text-left txt-cap mb-0">£${viewPayement}</h5></td>
    </tr>
  `;
      orderReviewTbody.innerHTML = `
      <tr>
     <td width="10%"></td>
      <td width="45%" class="text-left txt-cap fw-500">Full Name</td>
      <td width="45%" class="text-left txt-cap">${getInputValue(
        'input[name="fullname"]'
      )}</td>
      </tr>
      <tr>
     <td width="10%"></td>
      <td width="45%" class="text-left txt-cap fw-500">Email Address</td>
      <td width="45%" class="text-left txt-cap">${getInputValue(
        'input[name="email"]'
      )}</td>
      </tr>
      <tr>
     <td width="10%"></td>
      <td width="45%" class="text-left txt-cap fw-500">Phone Number</td>
      <td width="45%" class="text-left txt-cap">${getInputValue(
        'input[name="countryCode"]'
      )}-${getInputValue('input[name="phone"]')}</td>
      </tr>
      ${additionalRows
        .map(
          (row) =>
            `<tr>
         <td width="10%"></td>
          <td width="45%" class="text-left txt-cap fw-500">${row.label}</td>
          <td width="45%" class="text-left txt-cap">${row.value}</td>
          </tr>`
        )
        .join("")}
    `;
    }
  }

  document.querySelectorAll("input, select").forEach((input) => {
    input.addEventListener("change", updateOrderReview);
  });
});
