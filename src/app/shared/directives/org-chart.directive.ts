import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { OrgChart } from 'd3-org-chart';
import { Employee } from '../../features/employee/models/employee.model';

@Directive({
  selector: '[orgChart]',
})
export class OrgChartDirective implements OnInit {
  chart: any; // Holds the OrgChart instance
  selectedNode: any; // Stores the currently selected node in the chart

  // Input to accept employee data for rendering the chart
  @Input()
  data: Employee[] | undefined;

  // Output event emitter to notify parent components when a node is clicked
  @Output()
  onNodeClick: EventEmitter<any> = new EventEmitter();

  constructor(private ele: ElementRef) {}

  ngOnInit(): void {
    this.updateChart(); // Render the chart with the initial data
  }

  ngOnChanges(change: any) {
    this.updateChart(); // Re-render the chart if the data changes
  }

  /**
   * Host listener to handle click events on the chart.
   * - Toggles action menus or emits events for specific node actions.
   * @param $event - The click event object
   */
  @HostListener('click', ['$event']) onClick($event: any) {
    this.hideActions(); // Hide any open action menus

    // Check if the clicked target is an action button
    if ($event.target.className.includes('oc-actions')) {
      this.toggleActions(); // Toggle visibility of the action menu
    }
    // Handle specific action buttons within the action menu
    else if ($event.target.getAttribute('data-action')) {
      this.onNodeClick.emit({
        data: this.selectedNode,
        action: $event.target.getAttribute('data-action'),
      });
    }
    // Handle clicks on node headers or card blocks to show details
    else if (
      $event.target.className === 'o-card-header' ||
      $event.target.className === 'card-block'
    ) {
      this.onNodeClick.emit({
        data: this.selectedNode,
        action: 'detail',
      });
    }
  }

  /**
   * Toggles the visibility of the action menu for the selected node.
   */
  toggleActions(): void {
    const element = document.getElementById(
      'oc-action-wrapper-' + this.selectedNode.id
    );
    element?.classList.toggle('oc-action-wrapper-show'); // Show/hide the action menu
  }

  /**
   * Hides all open action menus in the chart.
   */
  hideActions(): void {
    const elements: any = document.getElementsByClassName(
      'oc-action-wrapper-show'
    );
    for (let elem of elements) {
      elem.classList.remove('oc-action-wrapper-show'); // Remove the 'show' class
    }
  }

  /**
   * Updates and renders the OrgChart with the provided data.
   * - Configures the chart's dimensions and content templates.
   */
  updateChart() {
    this.chart = new OrgChart();
    this.chart
      .container(this.ele.nativeElement)
      .data(this.data)
      .nodeWidth((d: number) => 350)
      .nodeHeight((d: number) => 175)
      .compactMarginBetween((d: number) => 50)
      .siblingsMargin((d: number) => 200)
      .initialZoom(0.7)
      .childrenMargin((d: number) => 40)
      .compactMarginPair((d: number) => 80)
      .onNodeClick((d: any) => {
        this.selectedNode = d.data;
      })
      .nodeContent((d: any, i: any, arr: any, state: any) => {
        // Define the content template for each node
        return `<div class="clr-row">
                  <div class="clr-col-lg-12 clr-col-12">
                      <div class="card">
                          <div class="o-card-header">
                            <span cds-text="section">${d.data.name}</span>
                            <button class="btn btn-sm btn-link oc-actions">⚙️</button>
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
                  <div class="oc-action-wrapper" id="oc-action-wrapper-${d.data.id}">
                    <div class="oc-stack-content" data-action="add">Add Reportee</div>
                    <div class="oc-stack-content" data-action="edit">Edit Details</div>
                    <div class="oc-stack-content" data-action="delete">Delete Employee</div>
                    <div class="oc-stack-content" data-action="change">Change Reporting Line</div>
                  </div>
              </div>`;
      })
      .render();
  }
}
