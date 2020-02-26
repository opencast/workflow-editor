import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Workflow} from '../models/workflow';
import {WorkflowService} from '../services/workflow-service/workflow.service';
import {MatSidenav, MatTab, MatTabGroup} from '@angular/material';

@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.scss']
})

export class WorkflowListComponent implements OnInit {

  @ViewChild(MatTabGroup, {read: MatTabGroup, static: false})
  public tabGroup: MatTabGroup;
  @ViewChildren(MatTab, {read: MatTab})
  public tabNodes: QueryList<MatTab>;
  @ViewChild(MatSidenav, {read: MatSidenav, static: false})
  public sidenav: MatSidenav;
  public operationsSidenavOpened: any = true;

  workflows: Workflow[];

  constructor(private workflowService: WorkflowService) {
    this.workflows = workflowService.workflows;
  }

  ngOnInit() {}

  closeTab(workflow: Workflow) {
    workflow.selected = false;
  }

  toggleOperationsSidenav() {
    this.sidenav.toggle();
    this.operationsSidenavOpened = this.sidenav.opened;
  }
}
