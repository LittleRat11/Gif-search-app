let apiKey = `4zp9LsM6suWFqDqxKWvE7gU6NjE3BKMF`;
let submitBtn = document.getElementById("submit-btn");

let generateGif = () => {
    //display loader until gif load
    let loader = document.querySelector(".loader");
    loader.style.display = "block";
    // document.querySelector(".wrapper").style.display = "none";

    //Get search value (default => laugh)
    let gifName = document.getElementById("search-box").value;
    //We need 10 gifs to be displayed in result
    let gifCount = 10;
    //API URL =
    let finalURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${gifName}&limit=${gifCount}&offset=0&rating=g&lang=en`;
    document.querySelector(".wrapper").innerHTML = "";

    //Make a call to API
    fetch(finalURL)
        .then((resp) => resp.json())
        .then((info) => {
            console.log(info.data)
                //All gifs
            let gifsData = info.data;
            gifsData.forEach((gif) => {
                //Generate cards for every gif
                let container = document.createElement("div");
                container.classList.add("container");
                let iframe = document.createElement("img");

                iframe.setAttribute("src", gif.images.downsized_medium.url);

                loader.style.display = "none";
                document.querySelector(".wrapper").style.display = "grid";

                container.append(iframe);

                //Copy link button
                let copyBtn = document.createElement("button");
                copyBtn.innerText = "Copy Link";
                copyBtn.onclick = () => {
                    //Append the obtained ID to default URL
                    let copyLink = `https://media4.giphy.com/media/${gif.id}/giphy.mp4`;
                    //Copy text inside the text field
                    navigator.clipboard
                        .writeText(copyLink)
                        .then(() => {
                            alert("GIF copied to clipboard");
                        })
                        .catch(() => {
                            //if navigator is not supported
                            alert("GIF copied to clipboard");
                            //create temporary input
                            let hiddenInput = document.createElement("input");
                            hiddenInput.setAttribute("type", "text");
                            document.body.appendChild(hiddenInput);
                            hiddenInput.value = copyLink;
                            //Select input
                            hiddenInput.select();
                            //Copy the value
                            document.execCommand("copy");
                            //remove the input
                            document.body.removeChild(hiddenInput);
                        });
                };
                container.append(copyBtn);
                document.querySelector(".wrapper").append(container);
            });
        });

};

//Generate Gifs on screen load or when user clicks on submit
submitBtn.addEventListener("click", generateGif);
window.addEventListener("load", generateGif);