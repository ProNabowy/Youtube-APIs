let getRequst = function (playlistId) {

    fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=AIzaSyDMQXoZaumplmctEQjB-6uLtKNfR_J1vXU`)
        .then(reso => reso.json())
        .then(reso => {

            let data = reso.items;

            let owner = data[0].snippet.channelTitle;

            let dataLength = data.length;
            console.log(data)


            let typeList = `Play List Videos`;

            for (let i = 0; i < dataLength; i++) {

                let title = data[i].snippet.title;

                let videoId = `https://www.youtube.com/watch?v=${data[i].snippet.resourceId.videoId}`;

                let videoCount = `${data[i].snippet.position + 1}`;

                let img = data[i].snippet.thumbnails.standard.url;

                setDataToPage(videoId, img, title, videoCount);

            };

            channelOwner(owner , typeList , dataLength);

        }).catch(_ => {

            let playlist = `Hello, You're Write a not Valid PlayList  Id`;

            wrongId(playlist);

            // ==================================================> Call Funtion How To Get a Valid Id

            howToGetId();

        });
};

// Create Function To Get requst From Youtube Server To Show PlayLists Data

function playLists(channelId) {

    fetch(`https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${channelId}&maxResults=50&key=AIzaSyDMQXoZaumplmctEQjB-6uLtKNfR_J1vXU`)
        .then(reso => reso.json())
        .then(reso => {

            let data = reso.items;

            let owner = data[0].snippet.channelTitle;

            let dataLength = data.length;


            let typeList = `PlayLists`;

            for (let i = 0; i < data.length; i++) {
                let title = data[i].snippet.title;

                let playlistId = `https://www.youtube.com/playlist?list=${data[i].id}`;
            
                let playListCount = `${i + 1}`;
                let img = data[i].snippet.thumbnails.medium.url;;

                setDataToPage(playlistId, img, title, playListCount);

            };

            channelOwner(owner , typeList , dataLength);

        }).catch(_ => {
            
            // When user Write A not Valid ID
            
            let channel = `Hello, You're Write a not Valid Channel Id`;

            wrongId(channel);

        });
};
// Create Function To Get requst From Youtube Server To Show PlayLists Data

function lastVideos(channelID) {

    fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelID}&maxResults=50000&order=date&key=AIzaSyDMQXoZaumplmctEQjB-6uLtKNfR_J1vXU`)

    .then(res => res.json())

    .then(reso => {
        
        let data = reso.items;
        
        let totel = reso.pageInfo.totalResults;

        let owner = data[0].snippet.channelTitle;

        let dataLength = data.length;

        let typeList = `PlayLists`;

        for (let i = 0; i < data.length; i++) {
            let title = data[i].snippet.title;

            let videoId = `https://www.youtube.com/watch?v=${data[i].id.videoId}`;
        
            let playListCount = `${i + 1}`;
            let img = data[i].snippet.thumbnails.medium.url;;

            setDataToPage(videoId, img, title, playListCount);

        };

        channelOwner(owner , typeList , dataLength);

        countVideos(totel);
        
    })

};