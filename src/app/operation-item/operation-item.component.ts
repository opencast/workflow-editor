import {Component, Input, OnInit} from '@angular/core';
import {Operation} from '../models/operation';
import * as Sortable from 'sortablejs';

@Component({
  selector: 'app-operation-item',
  templateUrl: './operation-item.component.html',
  styleUrls: ['./operation-item.component.css']
})
export class OperationItemComponent implements OnInit {

  @Input() operation: Operation;

  constructor() {}

  ngOnInit() {}
}
