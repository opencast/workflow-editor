import { Component, OnInit } from '@angular/core';
import {Operation} from '../models/operation';
import {WorkflowService} from '../services/workflow-service/workflow.service';

@Component({
  selector: 'app-default-operation-list',
  templateUrl: './default-operation-list.component.html',
  styleUrls: ['./default-operation-list.component.scss']
})
export class DefaultOperationListComponent implements OnInit {

  defaultOperations: Operation[] = [];

  constructor(private workflowService: WorkflowService) {
    this.defaultOperations = this.workflowService.defaultOperations;
  }

  ngOnInit() {
  }

}
