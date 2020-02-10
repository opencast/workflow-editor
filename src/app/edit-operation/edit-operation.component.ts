import { Component, OnInit } from '@angular/core';
import {Operation} from '../models/operation';

@Component({
  selector: 'app-edit-operation',
  templateUrl: './edit-operation.component.html',
  styleUrls: ['./edit-operation.component.scss'],
  inputs: ['operation']
})
export class EditOperationComponent implements OnInit {

  public operation: Operation;

  constructor() { }

  ngOnInit() {
  }

  addConfiguration() {
    if (this.operation.configurations === undefined) { this.operation.configurations = []; }
    this.operation.configurations.push({key: '', value: ''});
  }

  removeConfiguration(index: number) {
    this.operation.configurations.splice(index, 1);
  }
}
