import './style.css';

const form = document.querySelector('.main-form');
const total = document.querySelector('.outcomes__total-sum');
const list = document.querySelector('.outcomes__list');
const today = document.querySelector('.main-form__input--checkbox');
const date = document.querySelector('.main-form__input--data');
const name = document.querySelector('.main-form__input--name');
const category = document.querySelector('.main-form__input--category');
const sum = document.querySelector('.main-form__input--sum');
const categorySelect = document.querySelector('.report-filters__select-category')
const reloadBtn = document.getElementById('reload');

let outcomes = [];
const addtoList = function () {
  let newOutcome = { };
  newOutcome.title = name.value;
  newOutcome.date = date.value;
  newOutcome.category = category.value;
  newOutcome.sum = Number(sum.value);

  outcomes.push(newOutcome)
}
const displayList = function () {
  list.innerHTML = "";

  outcomes.forEach(function (item,i) {

    const newItem = document.createElement('li');
    newItem.classList.add('outcomes__list-item');
    newItem.setAttribute('id', i)
    newItem.innerHTML = `
     <div class="outcomes__row outcome">
     <div class="outcome__date"> ${item.date} </div>
     <div class="outcome__name">${item.title}</div>
     <div class="outcome__category">${item.category}</div>
     <div class="outcome__price">${item.sum}</div>
     <div class="outcome__delete">
     <button class="outcome__delete-btn btn" type="button">🗑️</button>
     </div>
     </li>
   `;

    list.insertAdjacentElement('afterbegin', newItem);

  })
}
const setDate = function () {

  if (today.checked) {

    const now = new Date();
    let day = now.getDate().toString().padStart(2, '0')
    let month = (now.getMonth() + 1).toString().padStart(2, '0');
    let year = now.getFullYear().toString();

    return year + '-' + month + '-' + day;
  } else
  { return date.value }
}
const calcTotalSum = function(arr) {
  const totalSum = arr.reduce((acc, currentValue) => acc + currentValue.sum, 0)
  total.textContent = totalSum;
}
const calcCategorySum = function(arr, cat) {
  const categorySum = arr.filter(item => item.category === cat).reduce((acc, currentValue) => acc + currentValue.sum, 0)
  document.getElementById(cat).textContent = categorySum;

  return categorySum;
}



form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  date.value = setDate();
  if (Number(sum.value) > 0) {
    addtoList();
    displayList();
    calcTotalSum(outcomes)
    calcCategorySum(outcomes, category.value)

  }
  else
    alert('ошибка')
})
document.addEventListener('click', ({ target }) => {
  if (target.matches('.outcome__delete-btn')) {
    const rowId = Number(target.closest('li').getAttribute('id'))
    const rowCat = target.closest('li').querySelector('.outcome__category').textContent;

    outcomes.splice(rowId, 1)
    displayList()
    calcTotalSum(outcomes)
    calcCategorySum(outcomes, rowCat)

  }
})
date.addEventListener('change', () => {
  today.checked = false;
})

const currentCategorySum = function (category){
  return calcCategorySum(outcomes, category);
}


let arrSum = [200, 100, 400];
const ctx = document.getElementById('myChart');
let data = {
  labels: [
    'Еда',
    'Транспорт',
    'Жилье'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: arrSum,
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};
let Chart1 = new Chart(ctx, {
  type: 'doughnut',
  data: data,
});
const updateChart = function () {

  arrSum.splice(0,1,currentCategorySum('Еда'))
  arrSum.splice(1,1,currentCategorySum('Транспорт'))
  arrSum.splice(2,1,currentCategorySum('Жилье'))

  Chart1.update();
}

//to do. Придумать как показывать по дате

categorySelect.addEventListener('submit', (e) => {
  e.preventDefault();
})



