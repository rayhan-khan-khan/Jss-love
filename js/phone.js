const loadPhones = async (searchPhone, shadowAllData) => {
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
    console.log(phone);
    const divBox = document.createElement("div");
    divBox.classList = "card hover:shadow-purple-600 card-compact px-4 bg-base-100 shadow-xl";
    divBox.innerHTML = `
      <figure class="px-5 py-5"><img src="${phone.image}" alt="Shoes" /></figure>
      <div class="card-body">
        <h2 class="card-title text-center">${phone.phone_name}</h2>
        <p>${phone.slug}</p>
        <div class="card-actions ">
          <button class="btn btn-secondary w-full">Buy Now</button>
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

loadPhones();
