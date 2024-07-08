//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

btn.addEventListener('click',downloadAndDisplayImages);


function downloadAndDisplayImages(){
    const promiseArray=images.map(downloadImage);
    
    Promise.all(promiseArray)
    //----------.then() from A solution using function displayImages
    .then(displayImages)
    //-------.then() from gpt-------------
    // .then((downloadedImages) => {
    //     // If all images are downloaded successfully, iterate over the downloaded images
    //     downloadedImages.forEach((img) => {
    //       // Append each image to the output div
    //       output.appendChild(img);
    //     });
    //   })
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

// this function is from A solution ; only needed if used .then() from A solution also
function displayImages(images){
    output.innerHTML="";
    // html should be -
    //<a href="" download=""> <img src="" alt=""> </a>
   // console.log("fromdisplayImages",images);
   images.forEach((img) => {
    const link = document.createElement("a");
    link.href = img.src;
    link.download = true;
    const imgElement = document.createElement("img");
    imgElement.src = img.src;
    imgElement.alt = "Downloaded Image";
    link.appendChild(imgElement);
    output.appendChild(link);
  });
}
