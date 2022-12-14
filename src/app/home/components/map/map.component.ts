import { Component, Input, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import * as $ from 'jquery';
import { ICovidState } from 'src/app/interfaces/iCovidState';
// @ts-ignore
import * as brazilJson from 'src/assets/brazil-states.json';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() dataCovid: Array<ICovidState> = [];

  public chart: echarts.EChartsType | undefined;

  public dataChart = [
    { name: 'AC', value: 0 },
    { name: 'AL', value: 0 },
    { name: 'AP', value: 0 },
    { name: 'AM', value: 0 },
    { name: 'BA', value: 0 },
    { name: 'CE', value: 0 },
    { name: 'DF', value: 0 },
    { name: 'ES', value: 0 },
    { name: 'GO', value: 0 },
    { name: 'MA', value: 0 },
    { name: 'MS', value: 0 },
    { name: 'MT', value: 0 },
    { name: 'MG', value: 0 },
    { name: 'PA', value: 0 },
    { name: 'PB', value: 0 },
    { name: 'PR', value: 0 },
    { name: 'PE', value: 0 },
    { name: 'PI', value: 0 },
    { name: 'RJ', value: 0 },
    { name: 'RN', value: 0 },
    { name: 'RS', value: 0 },
    { name: 'RO', value: 0 },
    { name: 'RR', value: 0 },
    { name: 'SC', value: 0 },
    { name: 'SP', value: 0 },
    { name: 'SE', value: 0 },
    { name: 'TO', value: 0 },
  ];

  constructor() {}

  ngOnInit(): void {
    this.chartMap();
    $(window).on('resize', () => {
      if (this.chart != null && this.chart != undefined) {
        this.chart.resize();
      }
    });
  }

  //configurações do mapa
  private chartMap() {
    this.updateDataChart();

    var chartDom = document.getElementById('mapChart')!;
    this.chart = echarts.init(chartDom);
    var option: echarts.EChartsOption;

    echarts.registerMap('BR', brazilJson);
    option = {
      title: {
        text: 'Casos da Covid-19 no Brasil',
        subtext: 'Fonte: WCota/covid19br',
        sublink: 'https://github.com/wcota/covid19br',
        left: 'left',
        bottom: 'top',
      },
      visualMap: {
        left: 'right',
        min: 0,
        max: 6000000,
        inRange: {
          color: ['cyan', 'darkblue', 'darkslateblue'],
        },
        text: ['Alto', 'Baixo'],
        calculable: true,
        realtime: true,
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'left',
        top: 'top',
        feature: {
          restore: {},
          saveAsImage: {},
        },
      },
      series: [
        {
          name: 'BR Covid Analytics',
          type: 'map',
          roam: true,
          map: 'BR',

          emphasis: {
            label: {
              show: true,
              backgroundColor: '#FFFFFF',
              position: 'right',
              borderWidth: 1,
              borderColor: 'black',
              borderType: 'solid',
              color: 'black',
              padding: 1,
            },
          },
          data: this.dataChart
        },
      ],
    };

    this.chart.setOption(option);
  }

  //atualização dos dados utilizados
  public updateDataChart(): void {
    // inseri os valores determinantemente pelo estado
    this.dataChart.map((itemChart, iChart) => {
      this.dataCovid.map((itemCovid, iCovid) => {
        if (itemChart.name === itemCovid.state) {
          this.dataChart[iChart].value = this.dataCovid[iCovid].cases;
        }
      });
    });
  }

  public updateChartValues(): void {
    this.chart!.setOption({
      series: [
        {
          data: this.dataChart,
        },
      ],
    });
  }
}
