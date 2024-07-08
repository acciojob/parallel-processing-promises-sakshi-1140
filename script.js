//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

btn.addEventListener('click',downloadAndDisplayImages);

//edit this not completed
function downloadAndDisplayImages(){
    const promiseArray=images.map(downloadImage);
    //in .then used gpt method, try with A solution also.
    Promise.all(promiseArray)
    .then((downloadedImages) => {
        // If all images are downloaded successfully, iterate over the downloaded images
        downloadedImages.forEach((img) => {
          // Append each image to the output div
          output.appendChild(img);
        });
      })
    .catch((error) => {
        // If any image fails to download, catch the error
        console.error(error); // Log the error to the console
        // Create a paragraph element to display the error message
        const errorMessage = document.createElement("p");
        // Set the text content of the paragraph element to the error message
        errorMessage.textContent = error.message;
        // Append the error message paragraph to the output div
        output.appendChild(errorMessage);
      });
}

function downloadImage(image){
 return  new Promise((resolve, reject) => {
    // Create a new Image object
    const img = new Image();
    // Set the source of the Image object to the URL from the image object
    img.src = image.url;
    // Define the onload handler, which resolves the promise when the image loads successfully
    img.onload = () => resolve(img);
    // Define the onerror handler, which rejects the promise if there's an error loading the image
    img.onerror = () => reject(new Error(`Failed to load image's URL: ${image.url}`));
  });
}

// this function is from A solution not needed now.
function displayImages(img){
    output.innerHTML="";
    // html should be -
    //<a 
}