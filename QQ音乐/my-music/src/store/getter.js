
//获取播放地址
export const getPlaySrc = (state)=>{
        return state.playSrc;
}

//获取当前歌曲信息
export const getCurSong = (state)=>{
        return state.curSong;
}

//获取播放状态
export const getPlayState = (state)=>{
        return state.playState;
}

//获取歌曲列表
export const getPlayList = (state)=>{
        return state.playList;
}

//获取歌曲索引
export const getCurSongIndex = (state)=>{
        return state.curSongIndex;
}