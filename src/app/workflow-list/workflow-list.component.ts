import { Component, OnInit } from '@angular/core';
import {Workflow} from '../models/workflow';
import {WorkflowService} from '../services/workflow-service/workflow.service';

@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.css']
})
export class WorkflowListComponent implements OnInit {

  workflows: Workflow[];

  constructor(private workflowService: WorkflowService) {
    this.workflows = workflowService.workflows;
  }

  ngOnInit() {
  }
}
