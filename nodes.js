
// import song1 from "./headimages/barnes/4.mp3"
 
let song1 ="./headimages/barnes/1.mp3"
let song2 ="./headimages/barnes/2.mp3"
let song3 ="./headimages/barnes/3.mp3"
let song4 ="./headimages/barnes/4.mp3"
let song5 ="./headimages/barnes/5.mp3"
let song6 ="./headimages/barnes/6.mp3"
let song7 ="./headimages/barnes/7.mp3"
let song8 ="./headimages/barnes/8.mp3"
let song9 ="./headimages/barnes/9.mp3"
let song10 ="./headimages/barnes/10.mp3"
let song11 ="./headimages/barnes/11.mp3"
// let song12 ="./headimages/barnes/12.mp3"
let count=0;
let playing = false;

var nodes2 = [
    { 
      top:1,
      left:0,
      track:"",
      className: "dot trackplay1",
      songName: "01 intro (w rook1e)",
      title: song1,
  },
    { 
      top:2,
      left:0,
      track:"",
      className: "dot trackplay2",
      songName: "02 i still don't know who i am.",
      title: song2,
  },
    { 
      top:3,
      left:0,
      track:"",
      className: "dot trackplay3",
      songName: "03 in solitude i sometimes find solace",
      title: song3,
  },
    { 
      top:3,
      left:0,
      track:"",
      className: "dot trackplay4",
      songName: "04 i have love for everyone besides myself.",
      title: song4,
  },
    { 
      top:3,
      left:0,
      track:"",
      className: "dot trackplay5",
      songName: "05 the perks of being a wallflower",
      title: song5,
  },
    { 
      top:3,
      left:0,
      track:"",
      className: "dot trackplay6",
      songName: "06 joan of arc.",
      title: song6,
  },
    { 
      top:3,
      left:0,
      track:"",
      className: "dot trackplay7",
      songName: " 07 my friends.",
      title: song7,
  },
    { 
      top:3,
      left:0,
      track:"",
      className: "dot trackplay8",
      songName: "08 now, i see",
      title: song8,
  },
    { 
      top:3,
      left:0,
      track:"",
      className: "dot trackplay9",
      songName: "09 sleepy story.",
      title: song9,
  },
    { 
      top:3,
      left:0,
      track:"",
      className: "dot trackplay10",
      songName: "10 epilogue",
      title: song10,
  },
    { 
      top:3,
      left:0,
      track:"",
      className: "dot trackplay11",
      songName: "11 bonus ~ last summer",
      title: song11,
  },
]

    function init2() {

        nodes2.forEach((eachnode)=>{
            eachnode.top = Math.random()*(window.innerHeight-40);
            eachnode.left = Math.random()*(window.innerWidth-350);
            
            var songNode = document.createElement("DIV");
            var paragraph = document.createElement("P")
            paragraph.innerHTML = eachnode.songName;
            songNode.appendChild(paragraph)
            songNode.className = eachnode.className;
            songNode.style= "position:absolute;top:" + eachnode.top+"px; left: "+eachnode.left+ "px;"
            
            // console.log(songNode)
            document.getElementById("dits").appendChild(songNode)
        })
}

  init2();


  let smileyposition = {
    top:0,
    left:0,
  };

  let songpositions = [];
  let songToPlay = [];
  let playList =[];

        $(".dot").draggable();
        $("#smiley").draggable();


$( ".dot" ).droppable({
          tolerance: 'touch',
          drop: function( event, ui ) {

            populateList();


            $(this)
            .addClass( "droppedon" )
             
          smileyposition.top = parseInt($("#smiley").css("top"));
          smileyposition.left = parseInt($("#smiley").css("left"));
            
          nodes2.forEach((node) =>{
              if(node.top < (smileyposition.top +200) && node.top > (smileyposition.top-200)) {
                  if(node.left <(smileyposition.left +200) && node.left > (smileyposition.left -200)){
                      if(!songToPlay.includes(node.title)){
                          songToPlay.push(node.title);
                          if(!playList.includes(node.songName))playList.push(node.songName);
                      }

                  }
              }
          })
          

            let audio = new Audio();
            console.log(songToPlay, songToPlay[count])
                    if (playing == false) {
                        audio.src = songToPlay[count];

                        audio.play();
                        playing = true}

                audio.addEventListener('ended', function () {
                    count+=1;
                    audio.src = songToPlay[count];
                    audio.play();   
                }

)}});      


function populateList(){
    str = '';
    var str = '<ul>'
    
    playList.forEach(function(item) {
      str += '<li>'+ item + '</li>';
    }); 
    
    str += '</ul>';
    document.querySelector(".playlistContainer").innerHTML = str;

}

    
    // var audio = new Audio(),
    // i = 0;
    // audio.addEventListener('ended', function () {
        
    //       i = ++i < songToPlay.length ? i : 0;
    //       console.log(i)
    //       audio.src = songToPlay[i];
    //       audio.play();
    //   }, true);
    //   audio.volume = 0.3;
    //   audio.loop = false;
    //   audio.src = songToPlay[0];
    //   audio.play();

        //    $(".trackplay").trigger("play")
        //   console.log(nodes2);
        //   console.log(smileyposition);


