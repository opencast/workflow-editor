import { Component, OnInit } from '@angular/core';
import {Operation} from '../models/operation';
import {Workflow} from '../models/workflow';
import {WorkflowService} from '../services/workflow-service/workflow.service';

@Component({
  selector: 'app-edit-operation',
  templateUrl: './edit-operation.component.html',
  styleUrls: ['./edit-operation.component.scss'],
  inputs: ['operation', 'workflow']
})
export class EditOperationComponent implements OnInit {

  public operation: Operation;
  public workflow: Workflow;

  constructor(private workflowService: WorkflowService) { }

  ngOnInit() {
  }

  addConfiguration() {
    if (this.operation.configurations === undefined) { this.operation.configurations = []; }
    this.operation.configurations.push({key: '', value: ''});
  }

  removeConfiguration(index: number) {
    this.operation.configurations.splice(index, 1);
  }

  updateWorkflow() {
    if(this.operation.if === '') {
      this.operation.ifError = '';
    }
    this.workflowService.updateWorkflow(this.workflow);
  }
}
