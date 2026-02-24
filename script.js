let inerviewList = [];
let rejectedList = []
let total = document.getElementById("total");
let interviewCount = document.getElementById("interview");
let rejectedCount = document.getElementById("rejected");

const allFilterbtn = document.getElementById('all-filter-btn');
const interviewFilterbtn = document.getElementById('interview-filter-btn');
const rejectedFilterbtn = document.getElementById('rejected-filter-btn');


const cardCount = document.getElementById("allCard");
const mainContainer = document.querySelector('main');









function Count() {
    total.innerText = cardCount.children.length ;
    interviewCount.innerText = inerviewList.length;
    rejectedCount.innerText = rejectedList.length;

}
Count();


function toggleStyle(id){

  // Button reset
  allFilterbtn.classList.remove('bg-blue-500','text-white');
  interviewFilterbtn.classList.remove('bg-blue-500','text-white');
  rejectedFilterbtn.classList.remove('bg-blue-500','text-white');

  allFilterbtn.classList.add('bg-white','text-gray-500');
  interviewFilterbtn.classList.add('bg-white','text-gray-500');
  rejectedFilterbtn.classList.add('bg-white','text-gray-500');

  document.getElementById(id)
    .classList.remove('bg-white','text-gray-500');

  document.getElementById(id)
    .classList.add('bg-blue-500','text-white');

  
  cardCount.classList.add('hidden');
  interviewSection.classList.add('hidden');
  rejSection.classList.add('hidden');

 
  if(id === 'all-filter-btn'){
      cardCount.classList.remove('hidden');
  }

  if(id === 'interview-filter-btn'){
      interviewSection.classList.remove('hidden');
  }

  if(id === 'rejected-filter-btn'){
      rejSection.classList.remove('hidden');
  }
}



mainContainer.addEventListener('click', function(event) {
    
    
    console.log(event.target.classList.contains('int-btn'));


    if (event.target.classList.contains('int-btn')){
        const companyDetails = event.target.closest('.profile');
    if (!companyDetails) return; 

    
    const details = companyDetails.querySelectorAll('p');

    
    const profiles = {
        company: details[0]?.innerText || '',
        role: details[1]?.innerText || '',
        locationSalary: details[2]?.innerText || '',
        status: details[3]?.innerText || '',
        description:details[4]?.innerText || ''
    };


const profilesExist = inerviewList.find(item => item.company === profiles.company);
 const parentNode = event.target.closest('.profile').querySelector('.status').innerText = ' Interview'
if (!profilesExist) {
    inerviewList.push(profiles);
}
renderInterview()
    }
});
const interviewSection = document.getElementById('interview-Section');
const rejSection = document.getElementById('rejected-Section');

function renderInterview(){
    interviewSection.innerHTML = '';

    for(let inTview of inerviewList){

        let div = document.createElement('div');
        div.className = 'bg-white shadow rounded p-4 mb-4';

        div.innerHTML = `
         <div class= "flex justify-between">
            <div class="space-y-2 ">
                <p class="font-semibold">${inTview.company}</p>
                <p class="text-gray-500">${inTview.role}</p>
                <p class="text-gray-500">${inTview.locationSalary}</p>

                <p class="status bg-green-100 text-green-600 px-4 py-1 inline-block rounded text-sm">
                    INTERVIEW
                </p>

                <p class="text-gray-700">${inTview.description}</p>
                
            </div>
            <div>
              <button class="delet-btn flex justify-between">
                <i class="fa-solid fa-trash-can text-gray-500"></i>
              </button>
            </div>
            </div>
        `;

        interviewSection.appendChild(div);
    }

    Count();
}


mainContainer.addEventListener('click', function(event) {
    
    if (event.target.classList.contains('rej-btn')) {
        const companyDetails = event.target.closest('.profile');
        if (!companyDetails) return;

        const details = companyDetails.querySelectorAll('p');

        const profiles = {
            company: details[0]?.innerText || '',
            role: details[1]?.innerText || '',
            locationSalary: details[2]?.innerText || '',
            status: details[3]?.innerText || '',
            description: details[4]?.innerText || ''
        };

       
        const profilesExist = rejectedList.find(item => item.company === profiles.company);

       
        companyDetails.querySelector('.status').innerText = 'Rejected';

        if (!profilesExist) {
            rejectedList.push(profiles);
        }

        renderRejected();
    }
});
function renderRejected(){
    rejSection.innerHTML = '';

    for(let reJected of rejectedList){
        let div = document.createElement('div');
        div.className = 'bg-white shadow rounded p-4 mb-4';

        div.innerHTML = `
        <div class="flex justify-between">
            <div class="space-y-2">
                <p class="font-semibold">${reJected.company}</p>
                <p class="text-gray-500">${reJected.role}</p>
                <p class="text-gray-500">${reJected.locationSalary}</p>

                <p class="status bg-red-100 text-red-600 px-4 py-1 inline-block rounded text-sm">
                    REJECTED
                </p>

                <p class="text-gray-700">${reJected.description}</p>
                
            </div>
            <div>
              <button class="delet-btn flex justify-between">
                <i class="fa-solid fa-trash-can text-gray-500"></i>
              </button>
            </div>
            </div>
        `;

        rejSection.appendChild(div);
    }

    Count();
}




mainContainer.addEventListener('click', function (event) {

    const deleteBtn = event.target.closest('.delet-btn');
    if (!deleteBtn) return;

   
    const interviewParent = deleteBtn.closest('#interview-Section');
    const rejectedParent = deleteBtn.closest('#rejected-Section');

    
    if (interviewParent) {

        const selectedCard = deleteBtn.closest('div.bg-white');
        const companyName = selectedCard.querySelector('p').innerText;

        inerviewList = inerviewList.filter(
            item => item.company !== companyName
        );

        renderInterview();
        return;
    }

    
    if (rejectedParent) {

        const selectCard = deleteBtn.closest('div.bg-white');
        const companyName = selectCard.querySelector('p').innerText;

        rejectedList = rejectedList.filter(
            item => item.company !== companyName
        );

        renderRejected();
        return;
    }

   
    const allCard = deleteBtn.closest('.card');
    if (allCard) {
        allCard.remove();
        Count();
    }

});
