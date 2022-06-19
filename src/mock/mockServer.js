// 先引入mockjs模块
import Mock from 'mockjs'

//把JSON数据引入进来
//JSON数据格式没有对外暴露，但可以引入
//因为webpack默认对外暴露图片、JSON
import banner from './banner.json'
import floor from './floor.json'
import list from './list.json'

//mock数据  第一个参数：请求的地址  第二个参数：请求的数据
//模拟首页大轮播图的数据
Mock.mock('/mock/banner', { code: 200, data: banner });
//模拟底部分区的数据
Mock.mock('/mock/floor', { code: 200, data: floor });

Mock.mock('/mock/list', { code: 200, data: list })