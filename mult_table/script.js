"use strict";

const mainDiv = document.createElement("div");
mainDiv.setAttribute("id", "mainDiv");
document.body.append(mainDiv);

for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
        const blockDiv = document.createElement("div");
        blockDiv.classList.add("block");
        blockDiv.dataset.idI = i;
        blockDiv.dataset.idJ = j;
        blockDiv.addEventListener("mouseover", (e) => {
            document.querySelectorAll(`[data-id-i="${e.target.dataset.idI}"]`).forEach((value) => {
                if (+e.target.dataset.idJ >= +value.dataset.idJ) {
                    return value.style.backgroundColor = "green";
                } else {
                    return value.style = null;
                }
            });
            document.querySelectorAll(`[data-id-j="${e.target.dataset.idJ}"]`).forEach((value) => {
                if (+e.target.dataset.idI >= +value.dataset.idI) {
                    return value.style.backgroundColor = "green";
                } else {
                    return value.style = null;
                }
            });
            e.target.style.backgroundColor = "green";
        });
        blockDiv.addEventListener("mouseout", (e) => {
            document.querySelectorAll(`[data-id-i="${e.target.dataset.idI}"]`).forEach((value) => value.style = null);
            document.querySelectorAll(`[data-id-j="${e.target.dataset.idJ}"]`).forEach((value) => value.style = null);
            e.target.style = null;
        });
        mainDiv.append(blockDiv);

        if ((i === 0) || (j === 0)) {
            blockDiv.classList.add("block-blue");
        } else if (i === j) {
            blockDiv.classList.add("block-yellow");
        } else if (j < i) {
            blockDiv.classList.add("block-brown");
        } else {
            blockDiv.classList.add("block-grey");
        }

        blockDiv.textContent = `${(i * j) || (i || j)}`;
    }
}


