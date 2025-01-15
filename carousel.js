class Jocarousel {
  constructor(el) {
    this.el = el;
    this.carouselData = [
      { 'id': '1', 'src': 'developer/P1.jpg' },
      { 'id': '2', 'src': 'developer/P2.jpg' },
      { 'id': '3', 'src': 'developer/P3.jpg' },
      { 'id': '4', 'src': 'developer/P4.jpg' },
      { 'id': '5', 'src': 'developer/P5.jpg' },
      { 'id': '6', 'src': 'developer/P6.jpg' },
      { 'id': '7', 'src': 'developer/P7.jpg' },
      { 'id': '8', 'src': 'developer/P8.jpg' },
      { 'id': '9', 'src': 'developer/P9.jpg' },
      { 'id': '10', 'src': 'developer/P10.jpg' },
      { 'id': '11', 'src': 'developer/P11.jpg' },
      { 'id': '12', 'src': 'developer/P12.jpg' },
    ];
    this.carouselInView = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    this.carouselContainer = null;
    this.carouselPlayState = null;
  }

  mounted() {
    this.setupCarousel();
    this.startAutoSlide();
  }

  setupCarousel() {
    const container = document.createElement('div');
    container.className = 'newjocarousel-container';
    this.el.append(container);

    this.carouselData.forEach((item, index) => {
      const carouselItem = document.createElement('img');
      carouselItem.className = `jocarousel-item jocarousel-item-${index + 1}`;
      carouselItem.src = item.src;
      carouselItem.setAttribute('loading', 'lazy');
      carouselItem.setAttribute('data-index', `${index + 1}`);
      container.append(carouselItem);
    });

    this.carouselContainer = container;
  }

  startAutoSlide() {
    this.carouselPlayState = setInterval(() => this.next(), 1500);
  }

  previous() {
    this.carouselData.unshift(this.carouselData.pop());
    this.carouselInView.push(this.carouselInView.shift());

    this.updateCarouselItems();
  }

  next() {
    this.carouselData.push(this.carouselData.shift());
    this.carouselInView.unshift(this.carouselInView.pop());

    this.updateCarouselItems();
  }

  updateCarouselItems() {
    this.carouselInView.forEach((item, index) => {
      this.carouselContainer.children[index].className = `jocarousel-item jocarousel-item-${item}`;
    });

    this.carouselData.forEach((data, index) => {
      const carouselItem = document.querySelector(`.jocarousel-item-${index + 1}`);
      if (carouselItem) {
        carouselItem.src = data.src;
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('.newjocarousel');
  if (el) {
    const exampleJocarousel = new Jocarousel(el);
    exampleJocarousel.mounted();
  } else {
    console.error('Carousel container not found.');
  }
});
