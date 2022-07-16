// =============================================================== Selector Elements

const input = document.querySelector("input");

const submit = document.querySelectorAll("input")[1];

const submitTwo = document.querySelectorAll("input")[2];

const submitThree = document.querySelectorAll("input")[3];

const result = document.querySelector(".results");

let randomColor = 0;

// ==================================================> Create Function To Get requst From Youtube Server to get PlayList Videos

function getRequst(typeCheck , check) {

    fetch(typeCheck)

    .then(resolved => resolved.json())

    .then(resolved => {
        
        let data = resolved.items;

        let owner = data[0].snippet.channelTitle;

        let totel;
        if(check === "three") totel = resolved.pageInfo.totalResults;

        console.log(`%cHello, Channel Id is %c${data[0].snippet.channelId}` , `color:${'hsl(' + randomColor + ', 100% , 50%)'}; font-size:30px;" ` , `color:black; font-size:30px;`);
        
        let dataLength = data.length;
        
        let typeList;  // Changed
        if(check === "one") typeList  = `Play List Videos`;
        if(check === "two") typeList  = `PlayLists`;
        if(check === "three") typeList  = `Channel Videos`;

        
        for (let i = 0; i < dataLength; i++) {
            let title = data[i].snippet.title; 

            let Id;  // Changed
            if(check === "one") Id = `https://www.youtube.com/watch?v=${data[i].snippet.resourceId.videoId}`;

            if(check === "two") Id = `https://www.youtube.com/playlist?list=${data[i].id}`;

            if(check === "three") Id = `https://www.youtube.com/watch?v=${data[i].id.videoId}`;

            let videoCount = `${i + 1}`;

            let img = data[i].snippet.thumbnails.high.url;

            setDataToPage(Id, img, title, videoCount);

        };

        channelOwner(owner , typeList , dataLength);

        if(check === "three") countVideos(totel);
        
    })
    .catch(_ => {

        let playlist;  // Changed
        if(check === "one") playlist = `Hello, You're Write a not Valid PlayList  Id`;

        if(check === "two") playlist = `Hello, You're Write a not Valid Channel Id`;

        if(check === "three") playlist = `Hello, You're Write a not Valid Channel Id`;
        
        wrongId(playlist);

    })

};


// ==================================================> Calling Funtion When user Click On Button

function toClickButton(btn, value ) {

    btn.addEventListener("click", function (e) {

        document.querySelectorAll(".onwer").forEach(owner => owner.remove());

        // document.querySelectorAll(".full-videos").forEach(div => div.remove());

        random();
        
        result.innerHTML = "";
        
        e.preventDefault();
        
        let inputValue = input.value;
        let one = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${inputValue}&maxResults=50&key=AIzaSyDiauR-jrYX3SMehcWK-vf7ae7l-opZQjU`;
        let two = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${inputValue}&maxResults=50&key=AIzaSyDiauR-jrYX3SMehcWK-vf7ae7l-opZQjU`;
        let three = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${inputValue}&maxResults=50&order=date&key=AIzaSyDiauR-jrYX3SMehcWK-vf7ae7l-opZQjU`;
        if(value == "one") getRequst(one , "one");
        
        if(value == "two") getRequst(two , "two");
        
        if(value == "three") getRequst(three , "three");

        // Set Button Style

        btn.style.cssText += `background-color: ${'hsl(' + randomColor + ', 100% , 50%)'}`;

    });
};

// Create function To Get Random Color

function random() {
    randomColor += 9;
    requestAnimationFrame(random);
}

toClickButton(submit , "one");

toClickButton(submitTwo , "two");

toClickButton(submitThree , "three");

// ==================================================> Create Funtion to Set Data To Page

function setDataToPage(href, imgSrc, HTML, numberVideo) {

    // ==================================================> Create Main Div To Add It to page

    const div = document.createElement("div");

    div.classList = "video-list";

    // ==================================================> Create A Link To Set Video At it

    let a = document.createElement("a");

    a.classList = "video";

    a.href = href;

    a.setAttribute("target", "_blank")

    // ==================================================> Create img To Set it to body

    let img = document.createElement("img");

    img.src = imgSrc;

    img.classList.add("img");

    // ==================================================> append img to Link

    a.appendChild(img)

    // ==================================================> append Link To Main Div

    div.append(a);

    // ==================================================> Create Title

    const h2 = document.createElement("div");

    h2.classList = "title";

    h2.innerHTML = HTML;

    // ==================================================> append h2 To Main Div

    div.appendChild(h2);

    // Create Count Div 

    const divCount = document.createElement("div");

    divCount.classList = "count";

    // ==================================================> append divCount To Main Div

    div.appendChild(divCount);


    // ==================================================> Create Span To Knwo Count Of this Video

    const spanCount = document.createElement("span");

    spanCount.classList = "video-number";

    spanCount.innerHTML = `Number OF Video Is #${numberVideo}`;

    // ==================================================> append SpanCount To divCount

    divCount.appendChild(spanCount);

    // ==================================================> append Main Div to Result Div

    result.appendChild(div);

};

// ==================================================> Create Funtion To Get Erorr when User Type a wrong Id

function wrongId(selectId) {

    let h2 = document.createElement("h2");

    h2.classList.add("wrong-id");

    h2.innerHTML = selectId;

    // ==================================================> append h2 For Result

    result.prepend(h2);

};

// ==================================================> Create Function To Know User How Get PlayList Id

function howToGetId() {

    let video = document.createElement("video");

    // ==================================================> Create source to Set type and browsers support

    let source = document.createElement("source");

    source.src = "./Videos/Ho To Get name.mp4";
    
    source.type = "video/mp4" || "video/WebM" || "video/Ogg";

    video.setAttribute("poster" , "./Videos/vs.png");
    // Set Attr when user hover on video

    result.addEventListener("mousemove" , function(e) {
        if(e.offsetX <= video.offsetWidth && e.offsetY <= video.offsetHeight) {
            video.setAttribute("controls" , "");

        }else {
            video.removeAttribute("controls");
        };
    });
    
    // ==================================================> append source to video
    
    video.appendChild(source);

    // ==================================================> Create A defult Message If Browser Does not support video tag
    
    video.append("Your Broswer Does'not Support Video Tag");

    // ==================================================> Create Span

    const span = document.createElement("span");

    span.innerHTML = "Wtach To Know How To Get PlayList Id";

    span.classList = "caption";

    // ==================================================> append span and video to result

    result.append(span);
    result.append(video);

};
howToGetId();

// Create Funtion To Set Owner Channel and Count Of Videos or playlists

function channelOwner(ownerChannel , type , count) {

    let div = document.createElement("div");

    div.classList = "onwer";

    // Create Span To set Owner 

    let span = document.createElement("span");

    let ownerCh = document.createElement("span");

    ownerCh.classList = "owner-name";

    ownerCh.style.cssText += `color: ${'hsl(' + randomColor + ', 100% , 50%)'}`;

    ownerCh.innerHTML = ownerChannel;
    
    span.innerHTML = `Owner Channel Is `;
    
    span.append(ownerCh);

    // append span to div

    div.append(span);

    // Create another Span to set play list count or playList Videos

    let countSpan = document.createElement("span");

    countSpan.innerHTML = `The ${type} are `;

    let countColor = document.createElement("span");

    countColor.classList = "count-video";

    countColor.innerHTML = count;

    countColor.style.cssText += `color: ${'hsl(' + randomColor + ', 100% , 50%)'}`;

    countSpan.append(countColor)

    // append spancount to div

    div.append(countSpan);

    // Set Div After Form

    document.querySelector("form").after(div);

}

// Function To Set Count Of Videos
function countVideos(count) {

    let div = document.createElement("div");

    div.classList = "full-videos";

    
    div.innerHTML = `Count Video Channel ${count}`;

    // append div after form

    document.querySelector("form").after(div);

};


//Channel to test

// UCSNkfKl4cU-55Nm-ovsvOHQ
// PLDoPjvoNmBAy1l-2A21ng3gxEyocruT0t
