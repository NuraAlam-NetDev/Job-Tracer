let total = document.getElementById("total");
let interviewCount = document.getElementById("interview");
let rejectedCount = document.getElementById("rejected");
const cardCount = document.getElementById("cards");
const maincontainer = document.querySelector('main')
console.log(maincontainer);
const allFilterbtn = document.getElementById('all-filter-btn');
allFilterbtn.addEventListener('click', function (){
    alert("promt")
})
const interviewFilterbtn = document.getElementById('interview-filter-btn');
interviewFilterbtn.addEventListener('click', function (){
    alert("promtinterview")
})
const rejectedFilterbtn = document.getElementById('rejected-filter-btn');
rejectedFilterbtn.addEventListener('click', function (){
    alert("promtrejected")
})
let inerviewList = [];
let rejectedList = [];

function Count() {
    total.innerText = cardCount.children.length ;
    interviewCount.innerText = inerviewList.length;
    rejectedCount.innerText = rejectedList.length;

}
Count();