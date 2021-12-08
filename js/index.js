document.querySelector(".search-btn").addEventListener("click",function(){
    const inputValue = document.querySelector(".form-control").value;
    const searchResult = document.querySelector(".search-result"); 
    searchResult.style.display="block";
    searchResult.innerHTML="";
    Lyrics.innerHTML="";
    fetch(`https://api.lyrics.ovh/suggest/${inputValue}`)
    .then(response => response.json())
    .then(data => {
        for (let i=0; i<3; i++)
        {
            const getData = data.data[i];
            const gettitle = getData.title;
            const getArtist = getData.artist.name;
            searchResult.innerHTML+=`
            <div class="single-result row align-items-center my-3 p-3" data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="600">
            <div class="col-md-9">
                <h3 class="lyrics-name">${gettitle}</h3>
                <p class="author lead">Album by <span class="artist-name">${getArtist}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success" onclick="getLyrics('${gettitle}','${getArtist}')">Get Lyrics</button>
            </div>
            </div>
            `;
        }
    })
})


const Lyrics = document.querySelector(".single-lyrics");

function getLyrics(name,artist)
{
    fetch(`https://api.lyrics.ovh/v1/${artist}/${name}`)
    .then(response => response.json())
    .then(data => {
        if(data.lyrics==undefined)
        {
            Lyrics.innerHTML="Vai re ei gan er Lyrics nai";
        }
        else{
            Lyrics.innerHTML=data.lyrics;
        }
    })
}