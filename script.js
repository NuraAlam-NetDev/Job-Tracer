let interviewList = [];
let rejectedList = [];

const total = document.getElementById("total");
const interviewCount = document.getElementById("interview");
const rejectedCount = document.getElementById("rejected");

const allFilterbtn = document.getElementById('all-filter-btn');
const interviewFilterbtn = document.getElementById('interview-filter-btn');
const rejectedFilterbtn = document.getElementById('rejected-filter-btn');

const cardCount = document.getElementById("allCard");
const mainContainer = document.querySelector('main');
const jobsCounter = document.getElementById('job-count');

const interviewSection = document.getElementById('interview-Section');
const rejSection = document.getElementById('rejected-Section');


function updateCount(){
    total.innerText = cardCount.children.length; // All cards
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
}


function toggleStyle(id){
    allFilterbtn.classList.remove('bg-blue-500','text-white');
    interviewFilterbtn.classList.remove('bg-blue-500','text-white');
    rejectedFilterbtn.classList.remove('bg-blue-500','text-white');

    allFilterbtn.classList.add('bg-white','text-gray-500');
    interviewFilterbtn.classList.add('bg-white','text-gray-500');
    rejectedFilterbtn.classList.add('bg-white','text-gray-500');

    document.getElementById(id).classList.remove('bg-white','text-gray-500');
    document.getElementById(id).classList.add('bg-blue-500','text-white');

    cardCount.classList.add('hidden');
    interviewSection.classList.add('hidden');
    rejSection.classList.add('hidden');

    if(id==='all-filter-btn') cardCount.classList.remove('hidden');
    if(id==='interview-filter-btn') interviewSection.classList.remove('hidden');
    if(id==='rejected-filter-btn') rejSection.classList.remove('hidden');

    if(id==='all-filter-btn') jobCount(cardCount);
    if(id==='interview-filter-btn') jobCount(interviewSection);
    if(id==='rejected-filter-btn') jobCount(rejSection);
}


mainContainer.addEventListener('click', function(e){
    const target = e.target;
    const card = target.closest('.card');
    if(!card) return;

    const profile = card.querySelector('.profile');
    const details = profile.querySelectorAll('p');
    const data = {
        company: details[0].innerText,
        role: details[1].innerText,
        locationSalary: details[2].innerText,
        description: details[4].innerText
    };

    
    if(target.classList.contains('int-btn')){
        profile.querySelector('.status').innerText = 'INTERVIEW';
        profile.querySelector('.status').className = 'status bg-green-100 text-green-600 px-4 py-1 inline-block rounded text-sm';
        data.status = 'INTERVIEW';

       
        rejectedList = rejectedList.filter(i => i.company !== data.company);

       
        if(!interviewList.find(i=>i.company===data.company)){
            interviewList.push(data);
        }

        renderInterview();
        renderRejected();
        updateCount();
        return;
    }

    
    if(target.classList.contains('rej-btn')){
        profile.querySelector('.status').innerText = 'REJECTED';
        profile.querySelector('.status').className = 'status bg-red-100 text-red-600 px-4 py-1 inline-block rounded text-sm';
        data.status = 'REJECTED';

       
        interviewList = interviewList.filter(i => i.company !== data.company);

        
        if(!rejectedList.find(i=>i.company===data.company)){
            rejectedList.push(data);
        }

        renderInterview();
        renderRejected();
        updateCount();
        return;
    }

    
    const deleteBtn = target.closest('.delet-btn');
    if(deleteBtn){
        const companyName = deleteBtn.closest('div.bg-white').querySelector('p').innerText;

        
        if(deleteBtn.closest('#allCard')){
            card.remove();
            interviewList = interviewList.filter(i=>i.company!==companyName);
            rejectedList = rejectedList.filter(i=>i.company!==companyName);
            renderInterview();
            renderRejected();
        }

      
        else if(deleteBtn.closest('#interview-Section')){
            interviewList = interviewList.filter(i=>i.company!==companyName);
            renderInterview();
        }

       
        else if(deleteBtn.closest('#rejected-Section')){
            rejectedList = rejectedList.filter(i=>i.company!==companyName);
            renderRejected();
        }

        updateCount();
        return;
    }
});


function renderInterview(){
    interviewSection.innerHTML = '';
    interviewList.forEach(i=>{
        const div = document.createElement('div');
        div.className='bg-white shadow rounded p-4 mb-4';
        div.innerHTML=`
            <div class="flex justify-between">
                <div class="space-y-2">
                    <p class="font-semibold">${i.company}</p>
                    <p class="text-gray-500">${i.role}</p>
                    <p class="text-gray-500">${i.locationSalary}</p>
                    <p class="status bg-green-100 text-green-600 px-4 py-1 inline-block rounded text-sm">INTERVIEW</p>
                    <p class="text-gray-700">${i.description}</p>
                </div>
                <div>
                    <button class="delet-btn flex justify-between"><i class="fa-solid fa-trash-can text-gray-500"></i></button>
                </div>
            </div>`;
        interviewSection.appendChild(div);
    });
    jobCount(interviewSection);
}

function renderRejected(){
    rejSection.innerHTML='';
    rejectedList.forEach(i=>{
        const div=document.createElement('div');
        div.className='bg-white shadow rounded p-4 mb-4';
        div.innerHTML=`
            <div class="flex justify-between">
                <div class="space-y-2">
                    <p class="font-semibold">${i.company}</p>
                    <p class="text-gray-500">${i.role}</p>
                    <p class="text-gray-500">${i.locationSalary}</p>
                    <p class="status bg-red-100 text-red-600 px-4 py-1 inline-block rounded text-sm">REJECTED</p>
                    <p class="text-gray-700">${i.description}</p>
                </div>
                <div>
                    <button class="delet-btn flex justify-between"><i class="fa-solid fa-trash-can text-gray-500"></i></button>
                </div>
            </div>`;
        rejSection.appendChild(div);
    });
    jobCount(rejSection);
}


function jobCount(section){
    const cards = section.querySelectorAll('.card');
    jobsCounter.innerHTML = `${cards.length} <span>jobs</span>`;
}
updateCount();