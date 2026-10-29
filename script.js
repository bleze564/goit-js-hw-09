const lodash = window._;

if (!lodash || typeof lodash.debounce !== "function") {
  throw new Error("Не вдалося завантажити lodash. Перевірте підключення до мережі.");
}

const slider = document.querySelector(".slider__input");
const image = document.querySelector(".slider__image");
const sliderValue = document.querySelector(".slider__value");
const playground = document.querySelector(".playground");
const box = document.querySelector(".playground__box");

const updateImageSize = () => {
  const value = Number(slider.value);
  const width = 100 + value * 2;

  image.style.width = `${width}px`;
  sliderValue.textContent = `${value}%`;
};

const debouncedImageSizeUpdate = lodash.debounce(updateImageSize, 50);

slider.addEventListener("input", debouncedImageSizeUpdate);
updateImageSize();

const moveBoxToPointer = lodash.debounce((event) => {
  const area = playground.getBoundingClientRect();
  const halfBox = box.offsetWidth / 2;
  const x = Math.min(Math.max(event.clientX - area.left, halfBox), area.width - halfBox);
  const y = Math.min(Math.max(event.clientY - area.top, halfBox), area.height - halfBox);

  box.style.left = `${x}px`;
  box.style.top = `${y}px`;
}, 100);

playground.addEventListener("pointermove", moveBoxToPointer);
