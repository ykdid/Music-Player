class musicPlayer {
  constructor(musicList) {
    this.musicList = musicList;
    this.index = 0;
  }

  getMusic() {
    return this.musicList[this.index];
  }
  next() {
    if (this.index + 1 < this.musicList.length) this.index++;
    else {
      this.index = 0;
    }
  }
  previous() {
    if (this.index != 0) this.index--;
    else {
      this.index = this.musicList.length - 1;
    }
  }
}
