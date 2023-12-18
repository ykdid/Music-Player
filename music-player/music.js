class Music {
  constructor(title, singer, img, file) {
    this.title = title;
    this.singer = singer;
    this.img = img;
    this.file = file;
  }
  getName() {
    return this.title;
  }
}

const musicList = [
  new Music("Four out of Five", "Arctic Monkeys", "jpg-1.jpg", "mp3-1.mp3"),
  new Music("Martyr of the Free Word", "Epica", "jpg-2.jpg", "mp3-2.mp3"),
  new Music("Soldier of Fortune", "Opeth", "jpg-3.jpg", "mp3-3.mp3"),
];
