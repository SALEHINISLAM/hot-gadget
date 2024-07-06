//console.log('phone js');
const loadPhone= async(searchText='a',isShowAll)=>{
    const res =await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data=await res.json();
    //console.log(data.data);
    displayPhones(data.data, isShowAll);
}

const phoneContainer=document.getElementById('phone-container');

const displayPhones=(phones,isShowAll)=>{
    //clear phone container before adding cart
    phoneContainer.textContent='';
    //display show all btn
    const showAllContainer=document.getElementById('show-all-container');
    if(phones.length>12){
        showAllContainer.classList.remove('hidden');
    }else{
        showAllContainer.classList.add('hidden');
    }
    if(!isShowAll){
        phones=phones.slice(0,12);
    }
    //console.log(phones);
    phones.forEach(phone=>{
        //console.log(phone);
        //step-1
        const phoneCard=document.createElement('div');
        phoneCard.classList=`card bg-gray-100 w-full md:w-3/4 lg:w-96 shadow-xl px-4 pt-8 m-6`;
        phoneCard.innerHTML=`<figure class="p-3">
                      <img
                        src="${phone.image}"
                        alt="Shoes" />
                    </figure>
                    <div class="card-body flex flex-col items-center justify-center">
                      <h2 class="card-title font-bold text-2xl">${phone
                        .phone_name
                      }</h2>
                      <p class="text-lg text-center">There are many variations of passages of available, but the majority have suffered</p>
                      <h2 class="font-bold text-2xl">$999</h2>
                      <div class="card-actions justify-center">
                        <button class="btn btn-primary rounded-lg text-white" onclick="showDetail('${phone.slug}')">Show Details</button>
                      </div>
                    </div>`
        phoneContainer.appendChild(phoneCard);
    })

    //hide loading spinner
    toggleLoadingSpinner(false);
}

const handleSearch=(isShowAll)=>{
    //console.log('search handler');
    toggleLoadingSpinner(true);
    const searchField=document.getElementById('search-field');
    const searchText=searchField.value;
    console.log(searchText);
    loadPhone(searchText,isShowAll);
}

const toggleLoadingSpinner=(loading)=>{
    const loadingSpinner=document.getElementById('loading-spinner')
    if(loading){
        loadingSpinner.classList.remove('hidden');
    }else{
        loadingSpinner.classList.add('hidden');
    }
}

//handle show all
const showAll=()=>{
    handleSearch(true);
    const showAllBtn=document.getElementById('show-all');
    showAllBtn.innerText=`Show Less`;
    showAllBtn.addEventListener('click',function(){
        handleSearch(false);
        showAllBtn.innerText=`Show All`

    })
}
const loadDetails=async(id)=>{
    const response=await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const details=await response.json();
    showPhoneDetails(details.data);
}
const showDetail=(slug)=>{
    //console.log(slug);
    loadDetails(slug);
    //showPhoneDetails(slug);
}

const showPhoneDetails=(data)=>{
    console.log(data);
    document.getElementById('modal-img').innerHTML=`<img src="${data.image}"/>`
    document.getElementById('modal-title').innerText=data.name;
    document.getElementById('storage').innerText=data.mainFeatures.storage;
    document.getElementById('d-size').innerText=data.mainFeatures.displaySize;
    document.getElementById('chipset').innerText=data.mainFeatures.chipSet;
    document.getElementById('memory').innerText=data.mainFeatures.memory;
    document.getElementById('slug').innerText=data.slug;
    document.getElementById('r-date').innerText=data.releaseDate;
    document.getElementById('brand').innerText=data.brand;
    document.getElementById('gps').innerText=data.mainFeatures.sensors;
    show_details_modal.showModal();
}

loadPhone();