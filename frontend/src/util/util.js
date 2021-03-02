// import collect from 'collect.js';


// export const getCountBy = (data) => {
//     // console.log("In function", data);
//     const collection = collect(data);
//     const counted = collection.countBy(object => object.timestamp);

//     let countObj = counted.all();
//     let myApexData = [];

//     for (const [key, value] of Object.entries(countObj)) {
//         myApexData.push({ x: key, y: value })
       
//     }
//     return myApexData
//     // return true;
// }

// export const getStructuredData = (data) => {
//     let myApexData = []
//     for (const [key, value] of Object.entries(data)) {
//         myApexData.push({ x: key, y: value })
//         // console.log("Key", key, "value", value);
//     }
//     // console.log("ApexData", myApexData)
//     return myApexData;
// }