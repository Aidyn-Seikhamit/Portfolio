"use strict";

export default class ImageSlider {
    container = null;
    buttonLeft = null;
    mainSlider = null;
    buttonRight = null;
    slider = null;
    image = null;
    frame = null;
    framesGap = null;
    currentOffset = null;
    clicker = 0;
    centerFrameImage = null;

    static loadOnLink = new Promise((resolve) => {
        const scriptUrl = import.meta.url;
        const cssUrl = (new URL("style.css", scriptUrl)).href;

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = cssUrl;
        link.onload = resolve;
        document.head.append(link);
    });

    constructor(element, imagesCount, mainImageId, slideByCount) {
        this.container = document.createElement("div");
        this.container.setAttribute("class", 'containerDiv');

        this.buttonLeft = document.createElement("button");
        this.buttonLeft.setAttribute("class", "leftBtn");

        this.mainSlider = document.createElement("div");
        this.mainSlider.setAttribute("class", "mainSlider");

        this.buttonRight = document.createElement("button");
        this.buttonRight.setAttribute("class", "rightBtn");

        this.slider = document.createElement("div");
        this.slider.setAttribute("class", "sliderDiv");

        this.mainSlider.append(this.slider);
        this.container.append(this.buttonLeft, this.mainSlider, this.buttonRight);

        element.append(this.container);

        this.imagesCount = imagesCount;
        this.slideByCount = slideByCount;
        this.mainImageId = mainImageId;
        this.changeBtnOnClick();
    }

    loadImages(arrayImages) {
        this.constructor.loadOnLink.then(() => {
            for (let i = 0, limit = arrayImages.length + (this.slideByCount * 2); i < limit; i++) {

                if ((arrayImages.length < this.imagesCount) || (arrayImages.length < limit)) {
                    arrayImages.push(arrayImages[i]);
                }

                this.frame = document.createElement("div");
                this.frame.setAttribute("class", "frame");

                this.image = document.createElement("img");
                this.image.setAttribute("src", `${arrayImages[i]}`);
                this.image.setAttribute("alt", "#");

                this.slider.append(this.frame);
                this.frame.append(this.image);
            }
            this.sliderResize();
            this.extraSliderImages();
            this.centerFrame();
        })
    }

    sliderResize() {
        const firstFrame = this.slider.firstElementChild;
        const lastFrame = this.slider.children[this.imagesCount - 1];

        const widthOfFrames = Math.abs(firstFrame.getBoundingClientRect().left - lastFrame.getBoundingClientRect().right);

        this.mainSlider.style.width = `${widthOfFrames}px`;
    }

    extraSliderImages() {
        const aFrame = this.slider.firstElementChild;
        const bFrame = aFrame.nextElementSibling;

        this.framesGap = (Math.abs(aFrame.getBoundingClientRect().right - bFrame.getBoundingClientRect().left) + aFrame.getBoundingClientRect().width);
        this.framesGap *= this.slideByCount;
        this.currentOffset = -this.framesGap;

        this.slider.style.transition = "none";
        this.slider.style.transform = `translateX(${this.currentOffset}px)`;
        setTimeout(() => {
            this.slider.style.transition = "";
        }, 0);
    }

    centerFrame() {
        this.centerFrameImage = this.slider.children.item([(this.slideByCount + this.clicker) + this.mainImageId]);
        this.centerFrameImage.classList.add("center");
    }

    changeBtnOnClick() {
        let changeEffect = true;
        this.buttonLeft.addEventListener('click', () => {
            if (changeEffect === true) {
                this.centerFrameImage.classList.remove("center");

                this.clicker -= this.slideByCount;
                this.currentOffset += this.framesGap;

                this.slider.style.transition = "transform 0.3s ease";
                this.slider.style.transform = `translateX(${this.currentOffset}px)`;

                changeEffect = false;

                this.slider.addEventListener("transitionend", () => {
                    this.cycleOfFrames("left");
                    this.centerFrame();
                    changeEffect = true;
                }, {once: true});
            }
        });

        this.buttonRight.addEventListener('click', () => {
            if (changeEffect === true) {
                this.centerFrameImage.classList.remove("center");

                this.clicker += this.slideByCount;
                this.currentOffset -= this.framesGap;

                this.slider.style.transition = "transform 0.3s ease";
                this.slider.style.transform = `translateX(${this.currentOffset}px)`;

                changeEffect = false;

                this.slider.addEventListener("transitionend", () => {
                    this.cycleOfFrames("right");
                    this.centerFrame();
                    changeEffect = true;
                }, {once: true});
            }
        });
    }

    cycleOfFrames(direction) {
        const arrayOfElements = Array.from(this.slider.children);

        this.slider.style.transition = "none";

        if (direction === "left") {
            let lastFrames = arrayOfElements.slice(arrayOfElements.length - this.slideByCount);
            this.slider.prepend(...lastFrames);
            this.currentOffset -= this.framesGap;
            this.slider.style.transform = `translateX(${this.currentOffset}px)`;
            this.clicker += this.slideByCount;
        } else {
            let firstFrames = arrayOfElements.slice(0, this.slideByCount);
            this.slider.append(...firstFrames);
            this.currentOffset += this.framesGap;
            this.slider.style.transform = `translateX(${this.currentOffset}px)`;
            this.clicker -= this.slideByCount;
        }
    }
}





