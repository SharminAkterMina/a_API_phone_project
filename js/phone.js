const loadData = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const data = await res.json();
    const phones = data.data;
    console.log(phones);
    displayOnUI(phones)
}


const displayOnUI = phones => {
    // 1. create a space where contents are stored. 
    const phonesContainer = document.getElementById('phone-container')
    
    
        phones.forEach(phone =>{
        console.log(phone)

        // 2. create a div (what are stored)
        const phoneCard = document.createElement('div')
        phoneCard.classList = 'card bg-gray-100 w-96  my-5';
        // 3. set innertext
        phoneCard.innerHTML =`
        <figure>
        <img
        src="${phone.image}"
        alt="Mobile Phone" />
        </figure>
        <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
        <button class="btn btn-primary">Buy Now</button>
        </div>
        </div>
        `

        // 4. appand child
        phonesContainer.appendChild(phoneCard)
    } )
} 


loadData();