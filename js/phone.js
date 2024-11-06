const loadData = async(searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    console.log(phones);
    displayOnUI(phones,isShowAll)  
}

loadData(); 

const displayOnUI = (phones,isShowAll) => {
    // 1. create a space where contents are stored. 
    const phonesContainer = document.getElementById('phone-container')
    phonesContainer.textContent = ' '  //to clear the UI repeatedly

    console.log('the total length of phones', phones.length)  //to find the total number of elements
    const showAllPhones = document.getElementById('show-all-phones')
    if (phones.length>12 && !isShowAll){
        showAllPhones.classList.remove('hidden')
    }
    else{
        showAllPhones.classList.add('hidden')
    }

    if(!isShowAll){
        phones = phones.slice(0, 6)
    }

    
        phones.forEach(phone =>{
        console.log(phone)
        
        // 2. create a div (what are stored)
        const phoneCard = document.createElement('div')
        phoneCard.classList = 'card bg-gray-100 p-3';
        // 3. set innertext
        phoneCard.innerHTML =`
        <figure>
        <img
        src="${phone.image}"
        alt="Mobile Phone" />
        </figure>
        <div class="card-body">
        <h2 class="card-title justify-center">${phone.phone_name}</h2>
        <p>There are many variations of passages of available, but the majority have suffered</p>
        <div class="card-actions justify-center">
        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">SHOW DETAILS</button>
        </div>
        </div>
        `

        // 4. append child
        phonesContainer.appendChild(phoneCard)
    } )
    toggleLoadingSpinner(false)
} 


// loadData();


// handle search button 
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value 
    console.log(searchText);
    loadData(searchText, isShowAll)

}

// loading spinner process
const toggleLoadingSpinner =(isLoading) =>{
    const loadingSpinner =document.getElementById('loading-spinnar');
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden')
    }
}

// show all phone details using modal
const handleShowDetails = async(id) =>{
       console.log('sadaf', id);
    //    data load for individual phone id
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phones = data.data;
    displayPhoneDetailsOnModal(phones)
 }

//  display modal with phone details
const displayPhoneDetailsOnModal = (phones) =>{
    const phoneName = document.getElementById('modal_phone_name')
    phoneName.innerText =phones.name;
    const showModalDetails =document.getElementById('show-modal-details')
    showModalDetails.innerHTML=`
    <img
        src="${phones.image}"
        alt="Mobile Phone" class=" bg-gray-200 text-center "/>
        <p> <span>Storage:</span> ${phones?.mainFeatures?.storage} </p>
        <p> <span>Memory:</span> ${phones?.mainFeatures?.memory} </p>
        <p> <span>Display Size:</span> ${phones?.mainFeatures?.displaySize} </p>
        

    `
    show_details_modal.showModal()
    console.log(phones);

}

const showAllButton = () =>{
    handleSearch(true)

}