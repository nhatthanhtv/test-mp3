const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const PlAYER_STORAGE_KEY = "TCN_PLAYER";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const headingsub = $("header h4");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist-main");
const ondurationTime = $(".header__progress-duration");
const currentTimeView = $(".header__progress-currentTime");
const volumeChange = $("#progress-volume");
const onTab = $(".sub-mobile-category__heading-icon");
const tabView = $(".sub-mobile-category");
const app = {
    volumeValue: 100,
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isTab: false,
    config: {},
    config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
    // songs: [
    //     {
    //         name: "Ai Chung Tình Được Mãi",
    //         singer: "Đinh Tùng Huy",
    //         path: "./assets/music/Ai Chung Tinh Duoc Mai - Dinh Tung Huy (1).mp3",
    //         image: "https://data.chiasenhac.com/data/cover/151/150118.jpg",
    //     },
    //     {
    //         name: "Vui lắm nha",
    //         singer: "Hương Ly",
    //         path: "./assets/music/Vui Lam Nha - Huong Ly_ Jombie.mp3",
    //         image: "https://data.chiasenhac.com/data/cover/153/152594.jpg",
    //     },
    //     {
    //         name: "Lưu số em đi",
    //         singer: "HUVA Remix",
    //         path: "./assets/music/Luu So Em Di HUVA Remix_ - Huynh Van_ Vu.mp3",
    //         image: "https://data.chiasenhac.com/data/cover/154/153664.jpg",
    //     },

    //     {
    //         name: "Giao quẻ",
    //         singer: "Hoàng Thùy Linh",
    //         path: "./assets/music/Gieo Que - Hoang Thuy Linh_ Den.m4a",
    //         image: "https://data.chiasenhac.com/data/cover/153/152195.jpg",
    //     },

    //     {
    //         name: "Señorita",
    //         singer: "S.Mendes & C.Cabello",
    //         path: "./assets/music/Senorita - Shawn Mendes_ Camila Cabello.mp3",
    //         image: "https://data.chiasenhac.com/data/cover/107/106207.jpg",
    //     },

    //     {
    //         name: "Stitches",
    //         singer: "Shawn Mendes",
    //         path: "./assets/music/Stitches - Shawn Mendes.mp3",
    //         image: "https://data.chiasenhac.com/data/cover/40/39771.jpg",
    //     },

    //     {
    //         name: "Không Trọn Vẹn Nữa",
    //         singer: "Châu Khải Phong",
    //         path: "./assets/music/Khong Tron Ven Nua - Chau Khai Phong_ AC.m4a",
    //         image: "https://data.chiasenhac.com/data/cover/153/152193.jpg",
    //     },

    //     {
    //         name: "Giữa Đại Lộ Đông Tây",
    //         singer: "Uyên Linh",
    //         path: "./assets/music/Giua Dai Lo Dong Tay - Uyen Linh.mp3",
    //         image: "https://data.chiasenhac.com/data/cover/139/138656.jpg",
    //     },

    //     {
    //         name: "Sài Đau Lòng Quá",
    //         singer: "Hứa Kim Tuyền",
    //         path: "./assets/music/Sai Gon Dau Long Qua - Hua Kim Tuyen_ Ho.mp3",
    //         image: "https://data.chiasenhac.com/data/cover/138/137965.jpg",
    //     },
    // ],
   
    listSongs: [],

    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    // rander: function () {
    //     const htmls = this.songs.map((song, index) => {
    //         return `
    //         <div class="col l-2-4 m-4 c-6 ">
    //                     <div class="song ${
    //                         index === this.currentIndex ? "active" : ""
    //                     } " data-index = "${index}">
    //                         <div class="thumb" style="background-image: url('${
    //                             song.image
    //                         }')"></div>
    //                         <h4 class="title">${song.name} </h4>
    //                         <div class="song-item-action song-item-icon-like--liked">
    //                             <!-- home-product-item-icon-like--liked -->
    //                             <span class="song-like active">
    //                                 <i class="song-icon-empty far fa-heart"></i>
    //                                 <i class="song-like-icon-fill fas fa-heart"></i>
    //                             </span>
    //                         </div>
    //                         <h3 class="author">
    //                             ${song.singer}
    //                         </h3>
    //                     </div>
    
    //                 </div>
    //         `;
    //     });
    //     playlist.innerHTML = htmls.join("");
    // },
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get() {
                this.setConfig("currentIndex", this.currentIndex);
                return this.songs[this.currentIndex];
            },
        });
    },

    // loadCurrentSong: function () {
    //     heading.textContent = this.currentSong.name;
    //     headingsub.textContent = this.currentSong.singer;
    //     cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    //     audio.src = this.currentSong.path;
    // },

    // Get list Song 
    getListSongs: function () {
        fetch('http://nhatthanh.online/api/getinfoplaylist?idlist=ZWZB969E')
            .then(res => res.json())
            .then(data => {
                this.listSongs = (data.data.song.items)
                this.render()
            })
    },

    render: function () {
       const html = this.listSongs.map((song, index) => {
            console.log(song);
            return `
            <div class="col l-2-4 m-4 c-6 ">
                                <div class="song ${
                                    index === this.currentIndex ? "active" : ""
                                } " data-index = "${index}">
                                    <div class="thumb" style="background-image: url('${
                                        song.thumbnailM
                                    }')"></div>
                                    <h4 class="title">${song.title} </h4>
                                    <div class="song-item-action song-item-icon-like--liked">
                                        <!-- home-product-item-icon-like--liked -->
                                        <span class="song-like active">
                                            <i class="song-icon-empty far fa-heart"></i>
                                            <i class="song-like-icon-fill fas fa-heart"></i>
                                        </span>
                                    </div>
                                    <h3 class="author">
                                        ${song.artistsNames}
                                    </h3>
                                </div>
            
                            </div>
            `
        })
        playlist.innerHTML = html.join("");


    },

    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
        this.currentIndex = this.config.currentIndex || this.currentIndex;
        // volumeChange.value = Number(this.config.volumeChange) || this.volumeValue;
        randomBtn.classList.toggle("active", this.isRandom);
        repeatBtn.classList.toggle("active", this.isRepeat);
    },

    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },

    preSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },

    playRandomSong: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
        audio.play();
        app.rander();
        app.scrollToActiveSong();
    },
    scrollToActiveSong: function () {
        setTimeout(() => {
            $(".song.active").scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }, 200);
    },

    handelEvents: function () {
        const cdThumbAnimate = cdThumb.animate(
            [{ transform: "rotate(360deg)" }],
            {
                duration: 10000, // 10 seconds
                iterations: Infinity,
            }
        );
        cdThumbAnimate.pause();

        playBtn.onclick = function () {
            console.log(123);
            if (app.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        };

        audio.onplay = function () {
            app.isPlaying = true;
            player.classList.add("playing");
            cdThumbAnimate.play();
        };

        audio.onpause = function () {
            app.isPlaying = false;
            player.classList.remove("playing");
            cdThumbAnimate.pause();
        };

        audio.onended = function () {
            if (app.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        };

        nextBtn.onclick = function () {
            if (app.isRandom) {
                app.playRandomSong();
            } else {
                app.nextSong();
                audio.play();
                app.rander();
                app.scrollToActiveSong();
            }
        };

        prevBtn.onclick = function () {
            if (app.isRandom) {
                app.playRandomSong();
            } else {
                app.preSong();
                audio.play();
                app.rander();
                app.scrollToActiveSong();
            }
        };

        randomBtn.onclick = function (e) {
            app.isRandom = !app.isRandom;
            app.setConfig("isRandom", app.isRandom);
            randomBtn.classList.toggle("active", app.isRandom);
        };

        repeatBtn.onclick = (e) => {
            app.isRepeat = !app.isRepeat;
            app.setConfig("isRepeat", app.isRepeat);
            repeatBtn.classList.toggle("active", app.isRepeat);
        };

        playlist.onclick = function (e) {
            const songNode = e.target.closest(".song");
            if (songNode || e.target.closest("song-item-action")) {
                if (songNode) {
                    app.currentIndex = Number(
                        songNode.getAttribute("data-index")
                    );

                    app.rander();
                    app.loadCurrentSong();
                    audio.play();
                } else if (e.target.closest("song-item-action")) {
                }
            }
        };

        audio.ontimeupdate = function () {
            if (audio.duration && checkOnmouseAndTouch) {
                ondurationTime.textContent =
                    Math.floor(audio.duration / 60) +
                    ":" +
                    "" +
                    Math.floor(audio.duration % 60);
                currentTimeView.textContent =
                    Math.floor(audio.currentTime / 60) +
                    ":" +
                    "" +
                    Math.floor(audio.currentTime % 60);
                const progressPercent = Math.floor(
                    (audio.currentTime / audio.duration) * 100
                );
                progress.value = progressPercent;
            }
        };

        // progress.onchange = (e => audio.currentTime = audio.duration /100 *e.target.value);
        let checkOnmouseAndTouch = true;
        progress.onmousedown = function () {
            checkOnmouseAndTouch = false;
        };

        progress.ontouchstart = function () {
            checkOnmouseAndTouch = false;
        };

        // Khi bài hát được tua
        progress.onchange = function (e) {
            const seekTime = (audio.duration / 100) * e.target.value;
            audio.currentTime = seekTime;

            checkOnmouseAndTouch = true;
        };
        volumeChange.onchange = function (e) {
            // volumeValue = e.target.value;
            // console.log(volumeValue)
            audio.volume = e.target.value / 100;
            // app.setConfig("volumeValue", app.volumeValue);
        };

        onTab.onclick = function (e) {
            if (app.isTab) {
                tabView.style.display = "none";
                app.isTab = false;
            } else {
                tabView.style.display = "block";

                app.isTab = true;
            }
        };
    },

    start: function () {
        this.getListSongs()
        this.loadConfig();
        this.defineProperties();
        this.handelEvents();
        // this.loadCurrentSong();
        
        // this.rander();
    },
};

app.start();
