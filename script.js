const accessKey = "VOXGJ9XwWh-z51DZPkpWasd6rZUc_irv_UMNa1hbGbg";  

const formEl = document.querySelector("form");  
const inputEl = document.getElementById("search-input");  
const searchResults = document.querySelector(".search-results");  
const showMore = document.getElementById("show-more-button");  

let inputData = "";  
let page = 1;  

async function searchImages() {  
    inputData = inputEl.value.trim(); // Ensure that input is trimmed  
    if (!inputData) {  
        console.error("Please enter a search term.");  
        return; // Exit if input is empty  
    }  
    
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;  
    
    try {  
        const response = await fetch(url);  
        if (!response.ok) {  
            throw new Error(`Error: ${response.status} ${response.statusText}`);  
        }  
        
        const data = await response.json();  
        const results = data.results;  
        
        if (page === 1) {  
            searchResults.innerHTML = ""; // Clear previous results  
        }  
        
        if (results.length === 0) {  
            searchResults.innerHTML = "<p>No results found.</p>";  
            showMore.style.display = "none"; // Hide show more button if no results  
            return;  
        }  
        
        results.forEach((result) => { // ForEach is more readable than map in this case  
            const imageWrapper = document.createElement('div');  
            imageWrapper.classList.add('search-result');  
            const image = document.createElement("img");  
            image.src = result.urls.small;  
            image.alt = result.alt_description || "Image"; // Fallback for alt description  

            const imageLink = document.createElement('a');  
            imageLink.href = result.links.html;  
            imageLink.target = "_blank";  
            imageLink.textContent = result.alt_description || "View Image"; // Fallback text  

            imageWrapper.appendChild(image);  
            imageWrapper.appendChild(imageLink);  
            searchResults.appendChild(imageWrapper);  
        });  
        
        page++; // Increment page for the next set of results  
        showMore.style.display = "block"; // Show the "Show More" button  
    } catch (error) {  
        console.error("Failed to fetch images:", error);  
    }  
}  

formEl.addEventListener("submit", (event) => {  
    event.preventDefault();  
    page = 1; // Reset to page 1 for new search  
    searchImages();  
});  

showMore.addEventListener("click", () => {  
    searchImages(); // Load more images  
});