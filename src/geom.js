/*
geometry:geojson格式的feature的geometry属性
angle:旋转角度，弧度制,
anchor：旋转原点

*/
export function rotate(geometry,angle, anchor){
	let _geometry;
	switch(geometry.type)
	{
		case 'Point':
			_geometry=point_rotate(geometry.coordinates,angle,anchor);
			break;
		case 'MultiPoint':
			_geometry=multiPoint_rotate(geometry.coordinates,angle,anchor);
			break;
		case 'LineString':
			_geometry=lineString_rotate(geometry.coordinates,angle,anchor);
			break;
		case 'MultiLineString':
			_geometry=multiLineString_rotate(geometry.coordinates,angle,anchor);
			break;
		case 'Polygon':
			_geometry=polygon_rotate(geometry.coordinates,angle,anchor);
			break;
		case 'MultiPolygon':
			_geometry=multiPolygon_rotate(geometry.coordinates,angle,anchor);
			break;
	}
	
	return _geometry;
}


function coorRotate(coor,cos,sin, anchor){
	//const cos = Math.cos(angle);
	//const sin = Math.sin(angle);
	const anchorX = anchor[0];
	const anchorY = anchor[1];
	const deltaX = coor[0] - anchorX;
    const deltaY = coor[1] - anchorY;
	let rotate_coor=[];
    rotate_coor[0] = anchorX + deltaX * cos - deltaY * sin;
	rotate_coor[1] = anchorY + deltaX * sin + deltaY * cos;
	return rotate_coor;
}
//点旋转
function point_rotate(coordinates,angle,anchor){
	const cos = Math.cos(angle);
	const sin = Math.sin(angle);
	return coorRotate(coordinates,cos,sin,anchor);
}
//多点旋转
function multiPoint_rotate(coordinates,angle,anchor){
	const cos = Math.cos(angle);
	const sin = Math.sin(angle);
	let length=coordinates.length;
	let _coors=new Array(length);
	for(let i=0;i<length;i++){
		_coors[i]=coorRotate(coordinates[i],cos,sin,anchor);
	}
	return _coors;
}
//线要素旋转
function lineString_rotate(coordinates,angle,anchor){
	const cos = Math.cos(angle);
	const sin = Math.sin(angle);
	let length=coordinates.length;
	let _coors=new Array(length);
	for(let i=0;i<length;i++){
		_coors[i]=coorRotate(coordinates[i],cos,sin,anchor);
	}
	return _coors;
}
//多线要素旋转
function multiLineString_rotate(coordinates,angle,anchor){
	const cos = Math.cos(angle);
	const sin = Math.sin(angle);
	let group_length=coordinates.length;
	let group=new Array(group_length);
	for(let i=0;i<group_length;i++){
		let singleLineString=coordinates[i];
		let coor_length=singleLineString.length;
		let coors=new Array(coor_length);
		for(let j=0;j<coor_length;j++){
			coors[j]=coorRotate(singleLineString[j],cos,sin,anchor);
		}
		group[i]=coors;
	}
	return group;
}

//面要素旋转
function polygon_rotate(coordinates,angle,anchor){
	const cos = Math.cos(angle);
	const sin = Math.sin(angle);
	let group_length=coordinates.length;
	let group=new Array(group_length);
	for(let i=0;i<group_length;i++){
		let singleLineString=coordinates[i];
		let coor_length=singleLineString.length;
		let coors=new Array(coor_length);
		for(let j=0;j<coor_length;j++){
			coors[j]=coorRotate(singleLineString[j],cos,sin,anchor);
		}
		group[i]=coors;
	}
	return group;
}


//多面要素旋转
function multiPolygon_rotate(coordinates,angle,anchor){
	let group_length=coordinates.length;
	let group=new Array(group_length);
	for(let i=0;i<group_length;i++){
		group[i]=polygon_rotate(coordinates,angle,anchor);
	}
	return group;
}