var {kriging_contour}=require('./dist/kriging-contour');
var fs=require('fs');



let mapCenter=[118, 32];
//首次加载，自动渲染一次差值图
let extent = [mapCenter[0]-.05,mapCenter[1]-.05,mapCenter[0]+.05,mapCenter[1]+.05];

let dataset = {
    "type" : "FeatureCollection",
    "features" : []
};
 let values=[],lngs=[],lats=[];
//随机生成100个点，在指定范围内
for (let i = 0; i < 100; i++) {
	//lngs.push(mapCenter[0]+Math.random()*0.1-.05);
	//lats.push(mapCenter[1]+Math.random()*0.1-.05);
    //values.push(Math.random()*100);
    let feature={
        "type" : "Feature",
        "properties" : {
            "level" : Math.random()*100
        },
        "geometry" : {
            "type" : "Point",
            "coordinates" : [mapCenter[0]+Math.random()*0.1-.05,mapCenter[1]+Math.random()*0.1-.05]
        }
    };
    dataset.features.push(feature);
}

let aaa=kriging_contour(dataset,'level',{
    model:'exponential',
    sigma2:0,
    alpha:100
},[0,10,20,30,40,50,60,70,80,90,100]);

let str = JSON.stringify(aaa);
 
fs.writeFile('./data.json',str,function(err){
    if (err) {
        res.status(500).send('Server is error...')
    } 
});




/*
let params={
    mapCenter:[118, 32],
	//mapCenter:[114.360456, 30.538622],
    maxValue:100,
    krigingModel:'exponential',//model还可选'gaussian','spherical'
    krigingSigma2:0,
    krigingAlpha:100,
    canvasAlpha:0.9,//canvas图层透明度
    colors:["#006837", "#1a9850", "#66bd63", "#a6d96a", "#d9ef8b", "#ffffbf",
        "#fee08b", "#fdae61", "#f46d43", "#d73027", "#a50026"],
};*/


//   let variogram=kriging.train(values,lngs,lats,
//             'exponential',0,100);
//  let polygons=[];
//         polygons.push([[extent[0],extent[1]],[extent[0],extent[3]],
//             [extent[2],extent[3]],[extent[2],extent[1]]]);	
//  let grid=kriging.grid(polygons,variogram,(extent[2]-extent[0])/200,(extent[3]-extent[1])/200);
// let ds=kriging.contour(grid,[0,10,20,30,40,50,60,70,80,90,100]);
console.log(aaa);

