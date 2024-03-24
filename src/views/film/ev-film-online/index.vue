<template>
  <BasicLayout>
    <template #wrapper>
      <div id="film1" style="width:50%;height:500px;float:left;"></div>
      <div id="film2" style="width:50%;height:500px;float:left;"></div>
      <div id="film3" style="width:50%;height:500px;float:left;"></div>
      <div id="film4" style="width:50%;height:500px;float:left;"></div>
      <div id="film5" style="width:50%;height:500px;float:left;"></div>
      <div id="film6" style="width:50%;height:500px;float:left;"></div>
      <div id="film7" style="width:50%;height:500px;float:left;"></div>
      <div id="film8" style="width:50%;height:500px;float:left;"></div>
    </template>
  </BasicLayout>
</template>

<script>
import {
  listEvFilmOnline
} from "@/api/film/ev-film-online";
import * as echarts from 'echarts';

export default {
  name: "EvFilmOnline",
  components: {},
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      isEdit: false,
      // 类型数据字典
      typeOptions: [],
      evFilmOnlineList: [],

      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        name: undefined,
        status: 1,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [{ required: true, message: "name不能为空", trigger: "blur" }],
      },
      filmName: [],
      filmBoxOffice: [],
      option1: {
        title: {
          text: '影片详情--票房'
        },
        tooltip: {},
        legend: {
          data: ['电影名']
        },
        color: '#5cb85c',
        yAxis: {
          name: '电影名',
          data: []
        },
        xAxis: {
          name: '票房(万)'
        },
        series: [{
          name: '票房',
          type: 'bar',
          data: []
          // showBackground: true,
          // backgroundStyle: {
          //   color: 'rgba(220, 220, 220, 0.8)'
          // },
        }]
      },
      option2: {
        title: {
          text: '影片详情--人次'
        },
        tooltip: {},
        legend: {
          data: ['电影名']
        },
        yAxis: {
          name: '电影名',
          data: []
        },
        xAxis: {
          name: '人次'
        },
        series: [{
          name: '人次',
          type: 'bar',
          data: []
        }]
      },
      option3: {
        color: '#450e61',
        title: {
          text: '影片详情--场次'
        },
        tooltip: {},
        legend: {
          data: ['电影名']
        },
        yAxis: {
          name: '电影名',
          data: []
        },
        xAxis: {
          name: '场次'
        },
        series: [{
          name: '场次',
          type: 'bar',
          data: []
        }]
      },
      option4: {
        color: '#e69138',
        title: {
          text: '影片详情--上座率'
        },
        tooltip: {},
        legend: {
          data: ['电影名']
        },
        yAxis: {
          name: '电影名',
          data: []
        },
        xAxis: {
          name: '上座率'
        },
        series: [{
          name: '上座率',
          type: 'bar',
          data: []
        }]
      },
      option5: {
        title: {
          text: '影片票房占比',
          left: 'center',
          top: 'center'
        },
        label: {
          show: true,
          formatter: '{b} : {c} ({d}%)'
        },
        series: [{
          type: 'pie',
          data: [],
          radius: ['30%', '60%']
        }]
      },
      option6: {
        title: {
          text: '影片场次占比',
          left: 'center',
          top: 'center'
        },
        label: {
          show: true,
          formatter: '{b} : {c} ({d}%)'
        },
        series: [{
          type: 'pie',
          data: [],
          radius: ['30%', '60%']
        }]
      },
      option7: {
        title: {
          text: '影片人次占比',
          left: 'center',
          top: 'center'
        },
        label: {
          show: true,
          formatter: '{b} : {c} ({d}%)'
        },
        series: [{
          type: 'pie',
          data: [],
          radius: ['30%', '60%']
        }]
      },
      option8: {
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['A', 'B', 'C', 'D', 'E']
        },
        title: {
          text: '影片上座率占比',
          left: 'center',
          top: 'center'
        },
        label: {
          show: true,
          formatter: '{b} : {c} ({d}%)'
        },
        series: [{
          type: 'pie',
          data: [],
          radius: ['30%', '60%']
        }]
      }
    };
  },
  created() {

  },
  mounted() {
    this.getList()
    this.myEcharts()
  },
  methods: {
    async myEcharts() {
      var myChart1 = echarts.init(document.getElementById('film1'))
      var myChart2 = echarts.init(document.getElementById('film2'))
      var myChart3 = echarts.init(document.getElementById('film3'))
      var myChart4 = echarts.init(document.getElementById('film4'))
      var myChart5 = echarts.init(document.getElementById('film5'))
      var myChart6 = echarts.init(document.getElementById('film6'))
      var myChart7 = echarts.init(document.getElementById('film7'))
      var myChart8 = echarts.init(document.getElementById('film8'))

      myChart1.setOption(this.option1)
      myChart2.setOption(this.option2)
      myChart3.setOption(this.option3)
      myChart4.setOption(this.option4)
      myChart5.setOption(this.option5)
      myChart6.setOption(this.option6)
      myChart7.setOption(this.option7)
      myChart8.setOption(this.option8)

      listEvFilmOnline(this.addDateRange(this.queryParams, this.dateRange)).then((response) => {
        myChart1.setOption({
          yAxis: [{
            data: response.data.box_office.name
          }],
          series: [{
            type: 'bar',
            data: response.data.box_office.data
          }]
        })
        myChart2.setOption({
          yAxis: [{
            data: response.data.release_num_people.name
          }],
          series: [{
            type: 'bar',
            data: response.data.release_num_people.data
          }]
        })
        myChart3.setOption({
          yAxis: [{
            data: response.data.release_venne.name
          }],
          series: [{
            type: 'bar',
            data: response.data.release_venne.data
          }]
        })
        myChart4.setOption({
          yAxis: [{
            data: response.data.occupancy_rate.name
          }],
          series: [{
            type: 'bar',
            data: response.data.occupancy_rate.data
          }]
        })
        myChart5.setOption({
          series: [{
            data: response.data.box_office_rata
          }]
        })
        myChart6.setOption({
          series: [{
            data: response.data.release_num_people_rata
          }]
        })
        myChart7.setOption({
          series: [{
            data: response.data.release_venne_rata
          }]
        })
        myChart8.setOption({
          series: [{
            data: response.data.occupancy_rate_rata
          }]
        })
      })
    },
    /** 查询参数列表 */
    getList() {
      this.loading = true;
      listEvFilmOnline(
        this.addDateRange(this.queryParams, this.dateRange)
      ).then((response) => {
        this.filmName = response.data.filmName
        this.filmBoxOffice = response.data.filmData
      });
    }
  },
};
</script>
