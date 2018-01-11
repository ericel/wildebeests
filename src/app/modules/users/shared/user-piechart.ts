import { Component, OnInit, Input, KeyValueChanges} from '@angular/core';
import { StarReviewService } from '@shared/components/star-review/star-review.service';
import { Observable } from 'rxjs/Observable';


@Component({
    selector:'user-piechart',
    template:`<chart [options]="options"></chart>
     {{view}}
    `
})
export class UserPieChart implements OnInit{
    @Input() userId;
    @Input() reviewBad: Observable<number>;
    @Input() reviewGood;
    @Input() view;
    chartData;
    options: object;
    count: number;
    constructor(
        private _review: StarReviewService
    ){

    }

    ngOnInit(){
      
        this.chartData =  [{
            name: 'Bad Reviews',
            y: this.reviewBad,
            color: '#dc3545'
        }, {
            name: 'Good Reviews',
            y: this.reviewGood,
            sliced: true,
            selected: true,
            color: '#00897b'
        }, {
            name: 'User View',
            y: this.view,
            color: '#1aada3'
        }, {
            name: 'Transactions',
            y: 4.77,
            color: '#dbdb57'
        }, {
            name: 'Up Voted',
            y: 0.91
        }, {
            name: 'Down Voted',
            y: 0.2
        }]
   
        setTimeout(() =>{
          this.chartData;
        }, 300)
    this.options = {chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        height: (9 / 16 * 100) + '%', // 16:9 ratio,
        marginTop: 30,
        type: 'pie'
            },title: {
                text: null
            },
            credits: {
            enabled: false
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true
                    },
                    showInLegend: false
                }
            },series: [{
                data: this.chartData,
                name: 'count'
        }]
    };
 }

}