import {Component, EventEmitter, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Operation} from '../models/operation';
import {Workflow} from '../models/workflow';
import {Condition} from '../models/condition';
import {Options, SortableEvent} from 'sortablejs';
import * as _ from 'lodash';
import {WorkflowService} from '../services/workflow-service/workflow.service';

@Component({
  selector: 'app-condition-item',
  templateUrl: './condition-item.component.html',
  styleUrls: ['./condition-item.component.scss'],
  inputs: ['includedWorkflowSplit', 'condition', 'index', 'workflow', 'opCount', 'condValue'],
  outputs: ['operationSelected', 'operationEdited', 'workflowIncluded']
})
export class ConditionItemComponent implements OnInit {

  condition: Condition;
  condValue: string;
  includedWorkflowSplit: boolean;
  index: number;
  workflow: Workflow;
  operationEdited = new EventEmitter();
  workflowIncluded = new EventEmitter();
  options: Options = {
    animation: 0,
    group: {
      name: 'shared'
    },
    fallbackOnBody: true,
    swapThreshold: 0.65
  };

  constructor(private workflowService: WorkflowService) {
    this.options = {
      onSort: (event: SortableEvent) => {
        /*console.log(this.workflow);
        console.log(event);
        console.log(event.from.className);
        console.log(event.to.getAttribute('data-cond'));*/
      },
      onRemove: (event: SortableEvent) => {
        console.log('remove', this.condition, this.index);
        if (this.condition.left.length === 0 && this.condition.right.length === 0) {
          this.workflowService.updateWorkflow(this.workflow);
        }
      },
      onAdd: (event: SortableEvent) => {
        console.log('add', event);

        if (event.from.className === 'default-operation-list') {
          if (event.to.className === 'condition-right') {
            const clonedCondition: Condition = _.cloneDeep(
              this.workflowService.getCondFromCondOps(event.newIndex, this.condition.right));
            this.workflowService.removeCondFromCondOps(event.newIndex, this.condition.right);
            this.workflowService.addCondToCondOps(clonedCondition, event.newIndex, this.condition.right);
          } else if (event.target.className === 'condition-left') {
            const clonedCondition: Condition = _.cloneDeep(this.workflowService.getCondFromCondOps(event.newIndex, this.condition.left));
            this.workflowService.removeCondFromCondOps(event.newIndex, this.condition.left);
            this.workflowService.addCondToCondOps(clonedCondition, event.newIndex, this.condition.left);
          }
        }
      },
      setData: (dataTransfer) => {
        const img = new Image();
        dataTransfer.setDragImage(img, 0, 0);
      }
    };
  }

  ngOnInit() {
  }

  includeWorkflow(operation: Operation) {
    this.workflowIncluded.emit(operation);
  }

  editOperation(editedOperation: Operation) {
    this.operationEdited.emit(editedOperation);
  }
}
