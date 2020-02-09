import {Component, Input, OnInit} from '@angular/core';
import {Workflow} from '../models/workflow';
import { Options } from 'sortablejs';
import {WorkflowService} from '../services/workflow-service/workflow.service';

@Component({
  selector: 'app-workflow-item',
  templateUrl: './workflow-item.component.html',
  styleUrls: ['./workflow-item.component.css']
})
export class WorkflowItemComponent implements OnInit {

  @Input() workflow: Workflow;

  constructor(private workflowService: WorkflowService) { }

  ngOnInit() { }
}
