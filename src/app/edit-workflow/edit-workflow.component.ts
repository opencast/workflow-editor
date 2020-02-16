import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Workflow} from '../models/workflow';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {COMMA, ENTER, TAB} from '@angular/cdk/keycodes';
import {Tag} from '../models/tag';
import {map, startWith} from 'rxjs/operators';
import {Role} from '../models/role';

@Component({
  selector: 'app-edit-workflow',
  templateUrl: './edit-workflow.component.html',
  styleUrls: ['./edit-workflow.component.scss'],
  inputs: ['workflow']
})
export class EditWorkflowComponent implements OnInit {

  editorOptions = {
    theme: 'vs-light',
    minimap: {
      enabled: false
    },
    language: 'html'};

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [COMMA, TAB];

  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  allTags: string[] = ['upload', 'schedule', 'archive', 'delete', 'editor'];

  roleCtrl = new FormControl();
  filteredRoles: Observable<string[]>;
  allRoles: string[] = [];

  workflow: Workflow;

  @ViewChild('tagInput', {read: ElementRef, static: false}) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('roleInput', {read: ElementRef, static: false}) roleInput: ElementRef<HTMLInputElement>;
  @ViewChild('tagAuto', {read: MatAutocomplete, static: false}) matAutocomplete: MatAutocomplete;

  constructor() {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tagValue: string | null) => tagValue ? this._filterTag(tagValue) : this.allTags.slice()));
    this.filteredRoles = this.roleCtrl.valueChanges.pipe(
      startWith(null),
      map((roleValue: string | null) => roleValue ? this._filterRole(roleValue) : this.allRoles.slice()));
  }

  ngOnInit() {}

  addTag(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      if (this.workflow.tags === undefined) { this.workflow.tags = []; }
      this.workflow.tags.push({value: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
  }

  removeTag(tag: Tag): void {
    const index = this.workflow.tags.indexOf(tag);

    if (index >= 0) {
      this.workflow.tags.splice(index, 1);
    }
  }

  selectedTag(event: MatAutocompleteSelectedEvent): void {
    if (this.workflow.tags === undefined) { this.workflow.tags = []; }
    this.workflow.tags.push({value: event.option.viewValue});
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filterTag(filterTagValue: string): string[] {
    const filterValue = filterTagValue.toLowerCase();

    return this.allTags.filter(tagValue => tagValue.toLowerCase().indexOf(filterValue) === 0);
  }

  addRole(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      if (this.workflow.roles === undefined) { this.workflow.roles = []; }
      this.workflow.roles.push({value: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.roleCtrl.setValue(null);
  }

  removeRole(role: Role): void {
    const index = this.workflow.roles.indexOf(role);

    if (index >= 0) {
      this.workflow.roles.splice(index, 1);
    }
  }

  selectedRole(event: MatAutocompleteSelectedEvent): void {
    if (this.workflow.roles === undefined) { this.workflow.roles = []; }
    this.workflow.roles.push({value: event.option.viewValue});
    this.roleInput.nativeElement.value = '';
    this.roleCtrl.setValue(null);
  }

  private _filterRole(filterRoleValue: string): string[] {
    const filterValue = filterRoleValue.toLowerCase();

    return this.allRoles.filter(roleValue => roleValue.toLowerCase().indexOf(filterValue) === 0);
  }
}
