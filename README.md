# kriging-contour
对离散点进行克里金插值并输出矢量等值面

安装
```
git clone git@github.com:FreeGIS/kriging-contour.git
cd kriging-contour
npm install
```
编译
```
npm run pretest
```


使用说明：freegis.kriging_contour(dataset,weight_field,kriging_params,weight_breaks);
```
dataset：geojson格式的featureclass数据集，feature是图形是点
weight_field：绑定权重字段名称
kriging_params：克里金插值参数
weight_breaks：权重生成等值面分级数组
```
示例代码：
```
	//计算克里金等值面
		let kriging_contours=freegis.kriging_contour(dataset,'level',{
			model:'exponential',
			sigma2:0,
			alpha:100
		},[0,10,20,30,40,50,60,70,80,90,100]);
 ```
