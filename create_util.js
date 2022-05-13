window.onload = setup;


function setup() {
    document.getElementById('typeCus').addEventListener('click', showCustom);
}

function showCustom() {
    document.getElementById('custom').hidden = false;
}

function currId(lst) {
    count = 1;
    for (let i of lst) {
        if (i.type === 'datetime-local') {
            count++;
        }
    }

    return count;
}

function createNewAlert() {
    let custom = document.getElementById('custom');
    let currNum = currId(custom.children);
    
    if (currNum < 5 && custom.children[custom.childElementCount - 1].value !== '') {
        let newElem = document.createElement('input');
        let newLabel = document.createElement('label');
        let newBr = document.createElement('br');

        newElem.name = "custAlarm" + currNum;
        newElem.type = 'datetime-local';
        newElem.addEventListener('focusout', createNewAlert);

        newLabel.className = "lab";
        newLabel.for = newElem.id;
        newLabel.textContent = `reminder ${currNum}: `

        custom.appendChild(newBr);
        custom.appendChild(newLabel);
        custom.appendChild(newElem);
    }
}