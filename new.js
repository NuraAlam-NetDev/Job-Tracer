let inerviewList = [];
let rejectedList = [];

let total = document.getElementById("total");
let interviewCount = document.getElementById("interview");
let rejectedCount = document.getElementById("rejected");

const allFilterbtn = document.getElementById('all-filter-btn');
const interviewFilterbtn = document.getElementById('interview-filter-btn');
const rejectedFilterbtn = document.getElementById('rejected-filter-btn');

const cardCount = document.getElementById("allCard");
const mainContainer = document.querySelector('main');

function Count() {
    const allCards = cardCount.querySelectorAll('.card');
    total.innerText = allCards.length;

    inerviewList = [];
    rejectedList = [];

    allCards.forEach(card => {
        const status = card.querySelector('.status').innerText;
        if(status === 'INTERVIEW') inerviewList.push(card);
        if(status === 'REJECTED') rejectedList.push(card);
    });

    interviewCount.innerText = inerviewList.length;
    rejectedCount.innerText = rejectedList.length;
}

// Button color toggle + filtering
function toggleStyle(id){
    allFilterbtn.classList.remove('bg-blue-500','text-white');
    interviewFilterbtn.classList.remove('bg-blue-500','text-white');
    rejectedFilterbtn.classList.remove('bg-blue-500','text-white');

    allFilterbtn.classList.add('bg-white','text-gray-500');
    interviewFilterbtn.classList.add('bg-white','text-gray-500');
    rejectedFilterbtn.classList.add('bg-white','text-gray-500');

    const selectedBtn = document.getElementById(id);
    selectedBtn.classList.remove('bg-white','text-gray-500');
    selectedBtn.classList.add('bg-blue-500','text-white');

    filterCards(id);
}

// Filter cards by status
function filterCards(id){
    const allCards = cardCount.querySelectorAll('.card');
    allCards.forEach(card => {
        const status = card.querySelector('.status').innerText;
        if(id === 'all-filter-btn'){
            card.style.display = 'block';
        } else if(id === 'interview-filter-btn' && status === 'INTERVIEW'){
            card.style.display = 'block';
        } else if(id === 'rejected-filter-btn' && status === 'REJECTED'){
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Main click listener for cards
mainContainer.addEventListener('click', function(event) {
    const card = event.target.closest('.card'); // nearest card
    if (!card) return;

    const status = card.querySelector('.status');

    if(event.target.classList.contains('int-btn')){
        status.innerText = 'INTERVIEW';
    }

    if(event.target.classList.contains('rej-btn')){
        status.innerText = 'REJECTED';
    }

    if(event.target.closest('.delet-btn')){
        card.remove();
    }

    Count();

    // Apply current filter after status change
    const activeBtn = document.querySelector('.bg-blue-500');
    if(activeBtn){
        filterCards(activeBtn.id);
    }
});

// Initial count
Count();