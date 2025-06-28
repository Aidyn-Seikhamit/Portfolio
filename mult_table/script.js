"use strict";

const mainDiv = document.createElement("div");
mainDiv.setAttribute("id", "mainDiv");
document.body.append(mainDiv);

for (let i= 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
        const blockDiv = document.createElement("div");
        blockDiv.classList.add("block");
        mainDiv.append(blockDiv);

        if ((i === 0) || (j === 0)){
            blockDiv.classList.add("block-blue");
        } else if (i === j){
            blockDiv.classList.add("block-yellow");
        } else if (j < i){
            blockDiv.classList.add("block-brown");
        } else {
            blockDiv.classList.add("block-grey");
        }

        blockDiv.textContent = `${ (i * j) || (i || j) }`;

        // blockDiv.textContent = `${i} / ${j}`;
    }
}



