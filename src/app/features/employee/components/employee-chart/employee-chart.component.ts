import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { USER_OBJECTS } from '../../../../../assets/mock-data';
import { OrgChart } from 'd3-org-chart';
import { Employee } from '../../models/employee.model';
import * as d3 from 'd3';

@Component({
  selector: 'app-employee-chart',
  templateUrl: './employee-chart.component.html',
  styleUrl: './employee-chart.component.scss',
})
export class EmployeeChartComponent implements OnInit {
  data: Employee[] = USER_OBJECTS;

  @ViewChild('chartContainer') chartContainer: ElementRef | undefined;
  chart: any;

  constructor() {}

  ngOnInit() {
    this.updateChart();
  }

  ngAfterViewInit() {
    if (!this.chart) {
      this.chart = new OrgChart();
    }
    this.updateChart();
  }

  ngOnChanges() {
    this.updateChart();
  }
  updateChart() {
    if (!this.data || !this.chart) {
      return;
    }
    this.chart
      .container(this.chartContainer?.nativeElement)
      .data(this.data)
      .nodeWidth((d: any) => 350)
      .nodeHeight((d: any) => 175)
      .compactMarginBetween((d: any) => 50)
      .siblingsMargin((d: any) => 100)
      .initialZoom(0.7)
      .childrenMargin((d: any) => 40)
      .compactMarginPair((d: any) => 80)
      .nodeContent(function (d: any, i: any, arr: any, state: any) {
        return `<div class="clr-row">
                  <div class="clr-col-lg-12 clr-col-12">
                      <div class="card">
                          <div class="o-card-header">
                            <span cds-text="section">${d.data.name}</span>
                            <button class="btn btn-sm btn-link"><cds-icon shape="cog"></cds-icon></button>
                          </div>
                          <div class="card-block">
                              <div class="card-media-block">
                                  <img src="assets/images/avatar_2.png" class="card-media-image" />
                                  <div class="card-media-description">
                                      <span class="card-media-title">${d.data.designation}</span>
                                      <span class="card-media-text"><span cds-text="body semibold">Email:</span> ${d.data.email}</span>
                                      <span class="card-media-text"><span cds-text="body semibold">Phone:</span> ${d.data.phone}</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>`;
      })
      .render();
  }
}
