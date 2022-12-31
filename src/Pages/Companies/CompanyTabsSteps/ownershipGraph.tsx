
import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';

import { IgrLegendModule, IgrDoughnutChartModule } from 'igniteui-react-charts'; 

import { IgrItemLegend, IgrDoughnutChart, IgrRingSeries } from 'igniteui-react-charts';
const mods: any[] = [
    IgrLegendModule,
    IgrDoughnutChartModule
];
mods.forEach((m) => m.register());


export default class Sample extends React.Component<any, any> {
    private legend: IgrItemLegend

    private legendRef(r: IgrItemLegend) {
        this.legend = r;
        this.setState({});
    }
    private chart: IgrDoughnutChart
    private chartRef(r: IgrDoughnutChart) {
        this.chart = r;
        this.setState({});
    }
    private series: IgrRingSeries

    constructor(props: any) {
        super(props);


        this.state={
            // holders:this.props.dataParentToChild,
            // studentName1:this.props.student,
            student2: this.props.studentname,
            shareholders: this.props.shareholders,
        }

        this.legendRef = this.legendRef.bind(this);
        this.chartRef = this.chartRef.bind(this);
        // this.studentName1 = this.studentName1.bind(this);
   }
    componentDidUpdate(prevProps) {
        

        if(this.props.shareholders != prevProps.shareholders) {
            // console.log('propsdsfsd11111', this.props.shareholders[0]);
            this.setState({
                // holders:this.props.dataParentToChild,
                // studentName1:this.props.student,
                student2:this.props.studentname,
                shareholders: this.props.shareholders,
            })

        }

    }






    private _data: Data = null;
    public get data(): Data {
        this._data = null;

            this._data = new Data(this.state.shareholders);
        // console.log('studentUUUUUUUUUUUUUU'+this._data);

        return this._data;
    }


    public render(): JSX.Element {
        // const {holders} = this.state;
        const test = this.props.student ;
        // // console.log('student', this.props.student);
        // // console.log('studentname', this.props.studentname);
        return (
        <div className=" sample " >
            {/*{console.log(this.state.holders,"mayur state")}*/}
            {/*{console.log("ankush state11111"+this.props.shareholderss)}*/}
            <div className="fill">
                <IgrDoughnutChart
                    allowSliceExplosion="true"
                    ref={this.chartRef} innerExtent={0.7}>
                    <IgrRingSeries
                        dataSource={this.data}
                        valueMemberPath="marketShare"
                        labelMemberPath="summary"
                        legendLabelMemberPath="category"
                        labelsPosition="OutsideEnd"
                        legend={this.legend}
                        labelExtent="30"
                        startAngle="30"
                        outlines="white"
                        radiusFactor="0.6"
                        name="series">
                    </IgrRingSeries>
                </IgrDoughnutChart>
            </div>
            <div className="legend">
                <IgrItemLegend
                    orientation="Horizontal"
                    ref={this.legendRef}>
                </IgrItemLegend>
            </div>

        </div>
        );
   }



}
// rendering above component in the React DOM
export class DataItem {
    public constructor(init: Partial<DataItem>) {
        Object.assign(this, init);
    }
    
    public marketShare: number;
    public category: string;
    public summary: string;
  
  }
  export class Data extends Array<DataItem> {
      
     constructor(shareholders:any) {
        super();
        // console.log('propsdsfsd', shareholders);
        shareholders.map((record, index)=>
            this.push(new DataItem(
                {
                    marketShare: parseFloat(record.percentageOwnership),
                    category: record.name,
                    summary: record.name + ' ' + parseFloat(record.percentageOwnership)
                }))

        )

        // this.push(new DataItem(
        // {
        //     marketShare: 52.81,
        //   category: `THE PRESIDENT OF INDIA`,
        //   summary: `THE PRESIDENT OF INDIA 52.81%`
        // }));
        // this.push(new DataItem(
        // {
        //     marketShare: 14.56,
        //     category: `OIL AND NATURAL GAS CORPORATION LIMITED`,
        //     summary: `OIL AND NATURAL GAS CORPORATION LIMITED 14.56%`
        // }));
        // this.push(new DataItem(
        // {
        //     marketShare: 5.29,
        //     category: `OIL INDIA LIMITED`,
        //     summary: `OIL INDIA LIMITED 5.29%`
        // }));
      
        
    }
  }
  
