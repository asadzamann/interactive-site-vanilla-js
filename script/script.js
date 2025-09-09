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
        createA.innerHTML = `<a class="btn btn-ghost flex rounded-sm w-60 h-9 p-3 text-black justify-start font-normal ">${data.category_name}</a>`;
        displayCategories.append(createA);
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


const loadPlantDetails = async (id) => {
    const cartSection = document.getElementById('cartSection')
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    const response = await fetch(url);
    const details = await response.json();

    const plantDetails = details.plants;
    console.log(plantDetails.name);
    const createDiv = document.createElement('div');
    createDiv.innerHTML = `
         <div class="flex flex-row justify-around items-center bg-[#F0FDF4]">
              <div class="flex flex-col gap-1">
                <span class="font-semibold text-black text-sm">${plantDetails.name}</span>
                <span class="font-semibold text-gray-400 text-sm">৳${plantDetails.price} x 1</span> <!-- quantity issue -->
              </div>
              <button class="hover:bg-slate-200 h-1/2">
                <i class="fa-solid fa-xmark"></i> <!-- crossing issue -->
              </button>
            </div>`
    cartSection.append(createDiv);

}

// category
// :
// "Fruit Tree"
// description
// :
// "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals."
// id
// :
// 1
// image
// :
// "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg"
// name
// :
// "Mango Tree"
// price
// :
// 500