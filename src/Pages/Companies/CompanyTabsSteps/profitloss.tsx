// import { Data } from './profitlossData';

// import React from 'react';
// import ReactDOM from 'react-dom';
// // import './index.css';

// import { IgrLegendModule, IgrCategoryChartModule } from 'igniteui-react-charts';

// import { IgrLegend, IgrCategoryChart } from 'igniteui-react-charts';
// const mods: any[] = [
//     IgrLegendModule,
//     IgrCategoryChartModule
// ];
// mods.forEach((m) => m.register());

// export default class Sample extends React.Component<any, any> {
//     private legend: IgrLegend
//     private legendRef(r: IgrLegend) {
//         this.legend = r;
//         this.setState({});
//     }
//     private chart: IgrCategoryChart
//     private chartRef(r: IgrCategoryChart) {
//         this.chart = r;
//         this.setState({});
//     }

//     constructor(props: any) {
//         super(props);

//         this.legendRef = this.legendRef.bind(this);
//         this.chartRef = this.chartRef.bind(this);
//    }

//     public render(): JSX.Element {
//         return (
//         <div className="sample">

//             <div className="fill">
//                 <IgrCategoryChart
//                     chartType="Column"
//                     xAxisInterval="1"
//                     yAxisLabelLeftMargin="0"
//                     yAxisTitleLeftMargin="10"
//                     yAxisTitleRightMargin="5"
//                     yAxisTitle="Billions of U.S. Dollars"
//                     dataSource={this.data}
//                     legend={this.legend}
//                     isHorizontalZoomEnabled="false"
//                     isVerticalZoomEnabled="false"
//                     ref={this.chartRef}>
//                 </IgrCategoryChart>
//             </div>
//             <div className="legend">
//                 <IgrLegend
//                     orientation="Horizontal"
//                     ref={this.legendRef}>
//                 </IgrLegend>
//             </div>
//         </div>
//         );
//    }

//     private _data: Data = null;
//     public get data(): Data {
//         if (this._data == null)
//         {
//             this._data = new Data();
//         }
//         return this._data;
//     }

// }
// // rendering above component in the React DOM
// ReactDOM.render(<Sample />, document.getElementById('root'));
