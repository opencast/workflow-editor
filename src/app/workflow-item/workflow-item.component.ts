import {Component, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Workflow} from '../models/workflow';
import {Options, SortableEvent} from 'sortablejs';
import {WorkflowService} from '../services/workflow-service/workflow.service';
import {Operation} from '../models/operation';
import * as _ from 'lodash';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import {Condition} from '../models/condition';

@Component({
  selector: 'app-workflow-item',
  templateUrl: './workflow-item.component.html',
  styleUrls: ['./workflow-item.component.scss']
})
export class WorkflowItemComponent implements OnInit {

  @Input() workflow: Workflow;
  edit: any = false;
  editedOperation: Operation = null;
  includedWorkflow: Workflow = null;
  options: Options = {
    animation: 150,
    group: {
      name: 'shared'
    },
    fallbackOnBody: true,
    swapThreshold: 0.65
  };

  constructor(private workflowService: WorkflowService) {
    this.options = {
      onAdd: (event: SortableEvent) => {
        const clonedOperation: Condition = _.cloneDeep(this.workflowService.getOperation(event.newIndex, this.workflow));
        this.workflowService.removeOperation(event.newIndex, this.workflow);
        this.workflowService.addOperation(clonedOperation, event.newIndex, this.workflow);
      },
      setData: (dataTransfer) => {
        var img = new Image();
        dataTransfer.setDragImage(img, 0, 0);
      }
    };
  }

  ngOnInit() {}

  includeWorkflow(operation: Operation) {
    this.includedWorkflow = this.workflowService.getWorkflowById(
      operation.configurations.filter((configuration) => configuration.key === 'workflow-id')[0].value);
    // todo: if no workflow found
  }

  editOperation(editedOperation: Operation) {
    this.workflowService.updateWorkflow(this.workflow);
    this.closeEditWorkflow();
    this.workflow.operations
      .map((op) => op.selected = false);
    if (editedOperation !== null) {
      editedOperation.selected = true;
    }
    this.editedOperation = editedOperation;
  }

  editWorkflow() {
    this.closeEditOperation();
    this.edit = true;
  }

  closeIncludedWorkflow() {
    this.includedWorkflow = null;
  }

  closeEditOperation() {
    this.workflow.operations
      .map((op) => op.selected = false);
    this.editedOperation = null;
  }

  closeEditWorkflow() {
    this.edit = false;
  }
}
