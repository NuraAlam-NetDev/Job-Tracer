let inerviewList = [];
let rejectedList = []
let total = document.getElementById("total");
let interviewCount = document.getElementById("interview");
let rejectedCount = document.getElementById("rejected");

const allFilterbtn = document.getElementById('all-filter-btn');
const interviewFilterbtn = document.getElementById('interview-filter-btn');
const rejectedFilterbtn = document.getElementById('rejected-filter-btn');


const cardCount = document.getElementById("allCard");
// const mainContainer = document.querySelector('main')








function Count() {
    total.innerText = cardCount.children.length ;
    interviewCount.innerText = inerviewList.length;
    rejectedCount.innerText = rejectedList.length;

}
Count();
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

}

const mainContainer = document.querySelector('main');

mainContainer.addEventListener('click', function(event) {
    
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

//    const profilesExit = inerviewList.find(item=> item.profiles == details)

//    if (!profilesExit){
//     inerviewList.push(profiles)
//    }
//    console.log(inerviewList)
const profilesExist = inerviewList.find(item => item.company === profiles.company);

if (!profilesExist) {
    inerviewList.push(profiles);
}

console.log(inerviewList);
});


