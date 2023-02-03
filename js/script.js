const form = document.getElementById("cardForm");
const stage1 = document.getElementById('stage1');
const formName = document.getElementById("InputName1");
const nameError = document.getElementById("errorName");
const email = document.getElementById("InputEmail1");
const emailError = document.getElementById("errorEmail");
const phone = document.getElementById("InputPhone1");
const phoneError = document.getElementById("errorPhone");
const stage2 = document.getElementById("stage2");
const plan = document.getElementById("plan");
const currentPlan = document.querySelectorAll("#chosenPlan");
const toggle = document.getElementById('switch');
const monthly = document.querySelectorAll('.monthly');
const yearly = document.querySelectorAll('.yearly');
const checkBtn = document.querySelectorAll('#flexCheckDefault');
const btnBack = document.getElementById('backBtn');
const btnNext = document.getElementById('nextBtn');
const steps = document.getElementsByClassName('step');
const sideBar = document.getElementsByClassName('sidebarLi');
const yearlyStage3 = document.querySelectorAll('.yearlyStage3');
const monthlyStage3 = document.querySelectorAll('.monthlyStage3');
const confirm = document.getElementById('confirmBtn');
const allPlans = document.querySelectorAll('#chosnPlan');
const totalPriceText = document.querySelector('#totalPrice');
const storage = document.querySelectorAll('#storage');
const stage4 = document.getElementById('stage4');
const thankYou = document.getElementById('thankYou');
const btns = document.querySelector('.mainButtons');


 let currentStep = 0;

 let planType = "Arcade";
 let planPrice = 9;
 let planLenght = 1;


validateForm();


function nextStep() {
btnNext.addEventListener('click', (event) => {
  event.preventDefault();

  steps[currentStep].classList.add('hidden');
  sideBar[currentStep].classList.remove('activeSidebar');


  // show next step
  steps[currentStep + 1].classList.remove('hidden');
  sideBar[currentStep + 1].classList.add('activeSidebar');
  currentStep += 1;

  updateStatusDisplay();
  
});
}

btnBack.addEventListener('click', (event) => {
  event.preventDefault();
  goBack();
})

  // Hide current step
  function goBack() {

  steps[currentStep].classList.add('hidden');
  sideBar[currentStep].classList.remove('activeSidebar');

  // Show pervious step

  steps[currentStep -1].classList.remove('hidden');
  sideBar[currentStep - 1].classList.add('activeSidebar');
  currentStep -= 1;

  updateStatusDisplay();
};

function changePlan() {

  steps[currentStep].classList.add('hidden');
  sideBar[currentStep].classList.remove('activeSidebar');

  steps[currentStep - 2].classList.remove('hidden');
  sideBar[currentStep - 2].classList.add('activeSidebar');

  currentStep -= 2;
}

function updateStatusDisplay() {
  if (currentStep === sideBar.length -1) {
    btnNext.classList.add('hidden');
    btnBack.classList.remove('hidden');
    validateForm();
  } else if (currentStep == 0) {
    btnNext.classList.remove('hidden');
    btnBack.classList.add('hidden');
  } else {
    btnNext.classList.remove('hidden');
    btnBack.classList.remove('hidden');
  }
  if (currentStep == 3){
    stepFour();
    confirm.classList.remove('hidden');
  } else {
    confirm.classList.add('hidden');
  }
}

function validateForm()  {
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if(formName.value == ''){
    nameError.textContent = 'This field is required';
    formName.classList.add('error');
  }

  if(email.value == ''){
    emailError.textContent = 'This field is required';
    email.classList.add('error');
  }

  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
if(!email.value.match(validRegex)){
  emailError.textContent = 'Email is not valid';
  email.classList.add('error');
}

if(phone.value == ''){
  phoneError.textContent = 'This field is required';
  phone.classList.add('error');
}

 if(formName.value != '' && email.value != '' && phone.value != '' ) {
  nextStep();
 }
});
}


//  phone.addEventListener('input', () => {
//    let phoneReplace = phone.value;
//    const newphone  = phoneReplace.replace(/\D/g, '')
//    .replace(/^(\+\d{2})(\d{3})(\d{3})(\d{3})$/, "$1 $2 $3 $4");
//     console.log(newphone);
//   });


currentPlan.forEach((allPlan) => {
allPlan.addEventListener('click', (el) => {
  el.preventDefault();
  currentPlan.forEach((secondOption) => {
    secondOption.classList.remove('activePlan');
    document.getElementsByClassName('planPrice').innerHTML = document.getElementsByClassName('.monthly');
  });
  
    el.target.closest('#chosenPlan').classList.toggle("activePlan");
    if (document.querySelector('.yearly').classList.contains('hidden')) {
      planLenght = 1;
    } else if (document.querySelector('.monthly').classList.contains('hidden')) {
      planLenght = 10;
    }

    planType = el.currentTarget.getAttribute("data-plan");
    planPrice = el.currentTarget.getAttribute('data-add-price');
  //stepFour();
});
});


checkBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.currentTarget.parentElement.classList.toggle('activePlan');
   // stepFour();
  });
});

function stepFour() {

  let totalPrice;
  allPlans.forEach((add) => {
    if (add.classList.contains('activePlan')){
      planType = add.getAttribute("data-plan");
      if (totalPrice) {
        totalPrice = totalPrice + parseInt(add.getAttribute("data-add-price")) * planLenght;
      } else {
        totalPrice = parseInt(add.getAttribute("data-add-price")) * planLenght;
      }
    
   

  add.addEventListener("click", (event) => {
    planType = event.currentTarget.getAttribute("data-plan");
    planPrice = event.currentTarget.getAttribute("data-plan-price");
    stepFour();
  });
    }
  });
   
  checkBtn.forEach((e) => {
    if (e.parentElement.classList.contains('activePlan')) {
      if (totalPrice){
        totalPrice = totalPrice + parseInt(e.getAttribute("data-add-price")) * planLenght;
    }else{
        totalPrice = parseInt(e.getAttribute("data-add-price")) * planLenght;
    }
      let newAddOn = document.createElement('ul');
      newAddOn.classList.add("add");
      newAddOn.innerHTML = `
      <li class="sub-text">${e.getAttribute("data-add")}</li>
      <li class="sub-text2">+$${e.getAttribute("data-add-price") * planLenght}/<span class="unite">mo</span></li>
      `;
    const mainPlanDiv = document.querySelector('.mainPlanDetails');
  
    mainPlanDiv.appendChild(newAddOn);
  
    
    }
  });

    document.querySelector('.planName').innerHTML = planType + " (<span class='monthlyYearly'></span>)";

    document.querySelector('.planPrice').innerHTML = "$" +  planPrice * planLenght + "/<span class='unite'>mo</span>";

    if (totalPrice) {
      totalPrice = totalPrice + planPrice * planLenght;
    } else {
      totalPrice = planPrice * planLenght;
    }

    console.log(totalPrice);

    document.querySelector('#totalPrice').innerHTML = "Total (per <span class='perMonthlyYearly'></span>)";
    document.querySelector('.totalPricePrice').innerHTML = "+$" + totalPrice + "/<span class='unite'>mo</span>";
    ;

    const unite = document.querySelectorAll('.unite');
    const monthlyYearly = document.querySelector('.monthlyYearly');
    const perMonthlyYearly = document.querySelector('.perMonthlyYearly');

    if (planLenght == 1) {
      unite.forEach((united) => {
        united.innerHTML = "mo";
      });
      monthlyYearly.innerHTML = "Monthly";
      perMonthlyYearly.innerHTML = "month";
    } else if (planLenght == 10) {
      unite.forEach((united) => {
        united.innerHTML = "yr";
      });
    
     monthlyYearly.innerHTML = "Yearly";
     perMonthlyYearly.innerHTML = "year";
    }

  }

  toggle.addEventListener('change', (el) => {
    el.preventDefault();
      if (el.target.checked){
        monthly.forEach((e) => {
          e.classList.add('hidden');
          
      });
  
      monthlyStage3.forEach((e) => {
        e.classList.add('hidden');
      })
          for (const year of yearly) {
            year.classList.remove('hidden');
          
          }
  
          for (const yearStage3 of yearlyStage3){
            yearStage3.classList.remove('hidden');
          }
  
  
        } else {

          yearly.forEach((e)=> {
            e.classList.add('hidden');
            
        });
  
        yearlyStage3.forEach((e) => {
          e.classList.add('hidden');
        })
  
            for (const month of monthly) {
              month.classList.remove('hidden');
            }
  
            for (const monthStage3 of monthlyStage3)
            monthStage3.classList.remove('hidden');
        }
  });
  
 

  confirm.addEventListener("click", () => {
    stage4.classList.add('hidden');
    thankYou.classList.remove('hidden');
    confirm.classList.add('hidden');
    btnBack.classList.add('hidden');
  });
