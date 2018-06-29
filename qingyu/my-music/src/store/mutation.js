
// 设置播放地址
export const setPlaySrc = (state,src)=>{
    state.playSrc = src;
}

// 设置当前歌曲信息
export const setCurSong = (state,song)=>{
    state.curSong = song;
}

// 设置播放状态
export const setPlayState = (state,status)=>{
    state.playState  = status;
}

// 设置歌曲列表
export const setPlayList = (state,song)=>{
   state.playList.push(song);
}

// 设置歌曲索引
export const setCurSongIndex= (state,i)=>{
   state.curSongIndex = i;
   }