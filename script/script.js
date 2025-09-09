const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
}
loadCategories();

const displayCategories = (datas) => {
    const displayCategories = document.getElementById('categories');
    for (let data of datas) {
        const createA = document.createElement('a');
        createA.innerHTML = `<a onclick="loadCategoryPlants(${data.id})" class="btn btn-ghost flex rounded-sm w-60 h-9 p-3 text-black justify-start font-normal ">${data.category_name}</a>`;
        displayCategories.append(createA);
    }
}

const loadCategoryPlants = (id) => {
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) =>res.json())
    .then((data) => displayCategoryPlants(data.plants))
}
const displayCategoryPlants = (datas) => {
    const displayAllPlants = document.getElementById('allPlants')
    displayAllPlants.innerHTML = "";
    for (let data of datas) {
        const createDiv = document.createElement('div');
        createDiv.innerHTML = `
        <div class="card bg-base-100 shadow-sm">
            <figure>
              <img class="w-full h-40 object-cover"
                src="${data.image}" alt="images" />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${data.name}</h2>
              <p class="text-left max-w-md font-semibold text-[#505b6f]">${data.description}</p>
              <div class="card-actions justify-end">
                <!-- fruit tree and 500 taka  -->
                 <div class="flex justify-between w-full my-1">
                  <div class="badge badge-soft badge-success text-green-800">${data.category}</div>
                  <span class="font-semibold">৳${data.price}</span>
                 </div>
                <button onclick="loadPlantDetails(${data.id})"class="btn btn-primary w-full bg-[#15803D] border-none text-white shadow-none rounded-3xl">Add to Cart</button>
              </div>
            </div>
          </div>
        `
        displayAllPlants.append(createDiv)
    }
}

const loadAllPlants = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
        .then((response) => response.json())
        .then((data) => displayAllPlants(data.plants))
}

loadAllPlants();

displayAllPlants = (datas) => {
    const displayAllPlants = document.getElementById('allPlants')
    displayAllPlants.innerHTML = "";
    for (let data of datas) {
        const createDiv = document.createElement('div');
        createDiv.innerHTML = `
        <div class="card bg-base-100 shadow-sm">
            <figure>
              <img class="w-full h-40 object-cover"
                src="${data.image}" alt="images" />
            </figure>
            <div class="card-body">
              <h2 onclick="showPlantDetails(${data.id})" class="btn btn-ghost card-title">${data.name}</h2>
              <p class="text-left max-w-md font-semibold text-[#505b6f]">${data.description}</p>
              <div class="card-actions justify-end">
                <!-- fruit tree and 500 taka  -->
                 <div class="flex justify-between w-full my-1">
                  <div class="badge badge-soft badge-success text-green-800">${data.category}</div>
                  <span class="font-semibold">৳${data.price}</span>
                 </div>
                <button onclick="loadPlantDetails(${data.id})"class="btn btn-primary w-full bg-[#15803D] border-none text-white shadow-none rounded-3xl">Add to Cart</button>
              </div>
            </div>
          </div>
        `
        displayAllPlants.append(createDiv)
    }
}

const showPlantDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    const response = await fetch(url);
    const details = await response.json();

    const plantDetails = details.plants;

    document.getElementById("my_modal_1").showModal();
   const modalContent = document.getElementById("modalContent"); 
   modalContent.innerHTML = "";
   const createDiv = document.createElement('div')
   createDiv.innerHTML= `
    <div class="modal-box relative bg-[url(${plantDetails.image})] bg-cover bg-center">
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent rounded-lg"></div>
    <div class="relative z-10"> 
    <h3 class="text-lg font-bold text-white">${plantDetails.name}</h3>
    <p class="py-4 text-white">${plantDetails.description}</p>
    <p class="py-4 text-white">Category: ${plantDetails.category}</p>
    <p class="py-4 text-white">Price: ${plantDetails.price} Taka</p>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
     </div>

    `
  modalContent.append(createDiv);

}

const loadPlantDetails = async (id) => {
    const cartSection = document.getElementById('cartSection')
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    const response = await fetch(url);
    const details = await response.json();

    const plantDetails = details.plants;
    const createDiv = document.createElement('div');
    createDiv.innerHTML = `
         <div class="flex flex-row justify-around items-center bg-[#F0FDF4]">
              <div class="flex flex-col gap-1 p-3">
                <span class="font-semibold text-black text-sm">${plantDetails.name}</span>
                <span class="font-semibold text-gray-400 text-sm">৳${plantDetails.price} x 1</span> <!-- quantity issue -->
              </div>
              <button class="hover:bg-slate-200 h-1/2">
                <i class="fa-solid fa-xmark"></i> <!-- crossing issue -->
              </button>
            </div>`
    cartSection.append(createDiv);

}

const loadPlantsByCategories = () => {

}