document.getElementById('btn').addEventListener('click', () => {
    let aNum = document.getElementById('aNum').value;
    let bNum = document.getElementById('bNum').value;

    function findSquareNumbers(a, b) {
        const squareNumbers = [];

        for (let i = a; i <= b; i++) {
            const sqrt = Math.sqrt(i);
            if (Number.isInteger(sqrt) && sqrt !== 1) {
                squareNumbers.push(i);
            }
        }

        return squareNumbers;
    }

    document.getElementById('header').innerText = `Các số chính phương trong khoảng từ ${aNum} đến ${bNum}:`
    document.getElementById('output').innerText = `${findSquareNumbers(aNum, bNum)}`
})

