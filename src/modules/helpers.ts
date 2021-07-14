import Cell from './cell.js'

export function shuffle <T>(array: Array<T>) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function randomInteger(min: number, max: number) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function isEqualArray1 (array1: Array<Cell>, array2: Array<Cell>) {
    return array1.length === array2.length && array1.every((v,i)=> v.state === array2[i].state);
}

export function isEqualArray (array1: Array<Array<Cell>>, array2: Array<Array<Cell>>) {
    return array1.length === array2.length && array1.every((v,i) => isEqualArray1(v, array2[i]));
}
