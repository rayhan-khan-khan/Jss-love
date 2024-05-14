const loadPhones = async (searchPhone='13', shadowAllData) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`);
  const data = await res.json();
  const phones = data.data;
  console.log(shadowAllData);
  displayPhones(phones, shadowAllData);
};

const displayPhones = (phones, shadowAllData) => {
  const mainContainer = document.getElementById("div-container");
  mainContainer.textContent = "";
// condition show alldata 
const showAllBtn = document.getElementById('show-all-btn');
 if (phones.length > 12) {
    showAllBtn.classList.remove('hidden')
 }else{
    showAllBtn.classList.add('hidden')
 }
  if (!shadowAllData) {
    phones = phones.slice(0, 5);
  }
  phones.forEach((phone) => {
    // console.log(phone);
    const divBox = document.createElement("div");
    divBox.classList = "card hover:shadow-purple-600 card-compact px-4 bg-base-100 shadow-xl";
    divBox.innerHTML = `
      <figure class="px-5 py-5"><img src="${phone.image}" alt="Shoes" /></figure>
      <div class="card-body">
        <h2 class="card-title text-center">${phone.phone_name}</h2>
       
        <div class="card-actions ">
          <button onclick="handleShowDetails('${phone.slug}'); show_details_modal.showModal()" class="btn btn-secondary w-full">Show Details</button>
        </div>
      </div>
      `;
    mainContainer.appendChild(divBox);
  });
  handleHiddenbtn(false)
};

const handelSearchBtn = (shadowAllData) => {
  const inputField = document.getElementById("input-field");
  const value = inputField.value;
//   console.log(value);
  handleHiddenbtn(true)
  loadPhones(value, shadowAllData);
};

const handelShowAll = () =>{
    handelSearchBtn(true)
}

const handleHiddenbtn = (isLoading)=>{
  const hiddenButton = document.getElementById('hidden-btn');
  if (isLoading) {
    hiddenButton.classList.remove('hidden')
  }
  else{
    hiddenButton.classList.add('hidden')
  }
}

const handleShowDetails = async (id) =>{
  console.log('details', id);
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json();
  const phone = data.data;
  // console.log(phone);
  handlePhoneDetails(phone)
}

const handlePhoneDetails = (phone) =>{
  console.log(phone);
  const showNameDetails = document.getElementById('show-deteils-phone');
  showNameDetails.innerText = phone.name;

  const showDetailsContainer = document.getElementById('show-deteails-container');
  showDetailsContainer.innerHTML = `
  <img class='text-center p-5 mx-auto' src="${phone.image}" alt="">
  <h2 class='text-xl font-semibold'>storage: ${phone?.mainFeatures?.storage}</h2>
  <p class='text-gray-600 '>DisplaySize: ${phone.mainFeatures.displaySize}</p>
  <p class='text-gray-600 '>chipSet: ${phone.mainFeatures.chipSet}</p>
  <p class='text-gray-600 '>memory: ${phone.mainFeatures.memory}</p>
  <p class='text-gray-600 '>releaseDate: ${phone.releaseDate}</p>
  <p class='text-black text-xl'>slug: ${phone.slug}</p>
  <p class='text-xl text-pink-600'><span>GPS: </span>${phone?.others?.GPS}</p>
  `
}

loadPhones();
