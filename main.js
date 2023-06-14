import './style.css';

//
// const ctx = document.getElementById('myChart');
// const data = {
//   labels: [
//     'Red',
//     'Blue',
//     'Yellow'
//   ],
//   datasets: [{
//     label: 'My First Dataset',
//     data: [300, 50, 100],
//     backgroundColor: [
//       'rgb(255, 99, 132)',
//       'rgb(54, 162, 235)',
//       'rgb(255, 205, 86)'
//     ],
//     hoverOffset: 4
//   }]
// };
//
// new Chart(ctx, {
//   type: 'doughnut',
//   data: data,
// });

const form = document.querySelector('.main-form');
// const total = document.querySelector('.outcomes__total-sum');
const list = document.querySelector('.outcomes__list');
const date = document.querySelector('.main-form__input--data');
const name = document.querySelector('.main-form__input--name');
const category = document.querySelector('.main-form__input--category');
const sum = document.querySelector('.main-form__input--sum');

let outcomes = [];
const addtoList = function () {
  let newOutcome = { };
  newOutcome.title = name.value;
  newOutcome.date = date.value;
  newOutcome.category = category.value;
  newOutcome.sum = sum.value;

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

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addtoList();
  displayList();
})

document.addEventListener('click', ({ target }) => {
  if (target.matches('.outcome__delete-btn')) {
    const rowId = Number(target.closest('li').getAttribute('id'))
    outcomes.splice(rowId, 1)
    displayList()
  }
})










