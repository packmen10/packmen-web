function removeDuplicates(arr,selectField) {
    let changedArray = [];
    let uniqueObject = {};

    for (let i in arr) {
		let objTitle = arr[i][selectField];
		uniqueObject[objTitle] = arr[i];
    }
    for (let i in uniqueObject) {
		changedArray.push(uniqueObject[i]);
    }
    return changedArray
}

export default removeDuplicates