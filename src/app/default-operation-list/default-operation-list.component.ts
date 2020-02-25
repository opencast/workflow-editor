import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Operation} from '../models/operation';
import { Options } from 'sortablejs';
import {WorkflowService} from '../services/workflow-service/workflow.service';
import {Condition} from '../models/condition';

@Component({
  selector: 'app-default-operation-list',
  templateUrl: './default-operation-list.component.html',
  styleUrls: ['./default-operation-list.component.scss']
})
export class DefaultOperationListComponent implements OnInit {

  defaultOperations: Condition[] = [];
  searchText;
  newDefaultOperations: Condition[] = [];

  defaultOpsOptions: Options = {
    group: {
      name: 'shared',
      pull: 'clone',
      put: false
    },
    sort: false,
    animation: 150
  };

  constructor(private workflowService: WorkflowService) {
    this.defaultOperations = this.workflowService.defaultOperations;

    const newDefaultOperation: Condition = {
      value: '',
      left: [{
        id: 'new-operation',
        if: '',
        selected: false
      }],
      right: []
    };
    this.newDefaultOperations = [newDefaultOperation];
  }

  ngOnInit() {
  }
}
