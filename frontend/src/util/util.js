import collect from 'collect.js';


export const getCountBy = (data) => {
    // console.log("In function", data);
    const collection = collect(data);
    const counted = collection.countBy(object => object.timestamp);

    return counted.all()
    // return true;
}

