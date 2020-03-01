import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Workflow} from '../models/workflow';
import {WorkflowService} from '../services/workflow-service/workflow.service';
import {MatSidenav} from '@angular/material/sidenav';
import {MatTab, MatTabGroup} from '@angular/material/tabs';

@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.scss']
})

export class WorkflowListComponent implements OnInit {

  @ViewChild(MatTabGroup, { read: MatTabGroup })
  public tabGroup: MatTabGroup;
  @ViewChildren(MatTab, {read: MatTab})
  public tabNodes: QueryList<MatTab>;
  @ViewChild(MatSidenav, { read: MatSidenav })
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
