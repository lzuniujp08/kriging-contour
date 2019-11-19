import {kriging} from './kriging';
import intersect from '@turf/intersect';
/*
featureCollection:已有点数据，geojson格式
weight:插值所依赖的圈中字段
krigingParams:克里金插值参数设置
breaks:等值面间隔
clip_geom:是否根据提供的切割图形进行等值面切割显示
*/

function kriging_contour(featureCollection,weight,krigingParams,breaks,clip_geom){
    //先获取featureCollection的bbox
    let values=[],lons=[],lats=[];
    let extent=[100000000,100000000,-100000000,-100000000];
    featureCollection.features.forEach(feature => {
        //提取插值权重字段，准备克里金插值使用
        values.push(feature.properties[weight]);
        lons.push(feature.geometry.coordinates[0]);
        lats.push(feature.geometry.coordinates[1]);
        if(extent[0]>feature.geometry.coordinates[0])
            extent[0]=feature.geometry.coordinates[0];
        if(extent[1]>feature.geometry.coordinates[1])
            extent[1]=feature.geometry.coordinates[1];
        if(extent[2]<feature.geometry.coordinates[0])
            extent[2]=feature.geometry.coordinates[0];
        if(extent[3]<feature.geometry.coordinates[1])
            extent[3]=feature.geometry.coordinates[1];
    });
    let variogram=kriging.train(values,lons,lats,krigingParams.model,krigingParams.sigma2,krigingParams.alpha);
    let polygons=[[[extent[0],extent[1]],[extent[0],extent[3]],[extent[2],extent[3]],[extent[2],extent[1]],[extent[0],extent[1]]]];
    let grid=kriging.grid(polygons,variogram,(extent[2]-extent[0])/200,(extent[3]-extent[1])/200);
    let contourFeatureCollection=kriging.contour(grid,breaks);
    //是否需要切割
    if(clip_geom){
        let clip_features=contourFeatureCollection.features.map(feature=>{
            return intersect(feature, clip_geom);
        });
        contourFeatureCollection.features=clip_features;
    }
    return contourFeatureCollection;
}


export {kriging_contour};





