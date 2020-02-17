import { Injectable } from '@angular/core';
import { Workflow } from '../../models/workflow';
import * as fastxmljs from 'fast-xml-parser';
import {j2xParser} from 'fast-xml-parser';
import {Tag} from '../../models/tag';
import {Operation} from '../../models/operation';
import {Configuration} from '../../models/configuration';
import {Role} from '../../models/role';
import * as JSZip from 'jszip';
import {JSZipObject} from 'jszip';
import * as FileSaver from 'file-saver';
import * as _ from 'lodash';
import {DefaultOperationParamList, defaultOperationParamList} from '../../models/default-operation-param-list';
import { Parser, Rule, Grammar, CompiledRules, Lexer } from 'nearley';
import grammar from './operation-condition-grammer-parser';
import {Condition} from '../../models/condition';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  private static parserOptions = {
    attributeNamePrefix: '',
    attrNodeName: 'attr',
    ignoreAttributes : false,
    ignoreNameSpace: false,
    parseAttributeValue: true,
    cdataTagName: '__cdata'
  };

  workflows: Workflow[] = [];
  defaultOperations: Condition[] = [];

  constructor() {
    const newWorkflow: Workflow = {
      id: 'new-workflow',
      operations: [],
      download: true,
      selected: true
    };
    this.workflows.push(newWorkflow);
    this.updateConditionsOnOperations(newWorkflow);
    this.initDefaultOperations(defaultOperationParamList);
  }

  private static parse2Tag(jsXmlTag): Tag {
    return {
      value: jsXmlTag
    };
  }

  private static parse2Operation(jsXmlOperation): Operation {
    const newOperation: Operation = {
      id: WorkflowService.getSafePropertyHelper(() => jsXmlOperation.attr.id),
      if: WorkflowService.getSafePropertyHelper(() => jsXmlOperation.attr.if, ''),
      description: WorkflowService.getSafePropertyHelper(() => jsXmlOperation.attr.description),
      retryStrategy: WorkflowService.getSafePropertyHelper(() => jsXmlOperation.attr['retry-strategy']),
      maxAttemps: WorkflowService.getSafePropertyHelper(() => jsXmlOperation.attr['max-attempts']),
      failOnError: WorkflowService.getSafePropertyHelper(() => jsXmlOperation.attr['fail-on-error']),
      exceptionHandlerWorkflow: WorkflowService.getSafePropertyHelper(() => jsXmlOperation.attr['exception-handler-workflow']),
      selected: false
    };

    const configurations = WorkflowService.getCollectionOfJsElements(
      WorkflowService.getSafePropertyHelper(() => jsXmlOperation.configurations.configuration, []));
    configurations.forEach((configuration) => {
      if (newOperation.configurations === undefined) { newOperation.configurations = []; }
      newOperation.configurations.push(WorkflowService.parse2Configuration(configuration));
    });

    return newOperation;
  }

  private static parse2Configuration(jsXmlConfiguration): Configuration {
    return {
      key: WorkflowService.getSafePropertyHelper(() => jsXmlConfiguration.attr.key),
      value: jsXmlConfiguration['#text']
    };
  }

  private static parse2Role(jsXmlRole): Role {
    return {
      value: jsXmlRole
    };
  }

  static getSafePropertyHelper(fn, defaultVal?) {
    try {
      return (fn() !== undefined) ? fn() : defaultVal;
    } catch (e) {
      return defaultVal;
    }
  }

  private static getCollectionOfJsElements(collection: object[] | object): object[] {
    return (collection instanceof Array) ? collection : [collection];
  }

  private updateConditionsOnOperations(workflow: Workflow) {
    const updatedConditions: Condition[] = [];

    workflow.operations.forEach((operation) => {
      operation.ifError = '';
      const parser: Parser = new Parser(
        Grammar.fromCompiled(grammar),
        { keepHistory: true }
      );
      try {
        parser.feed(operation.if);
      } catch (err) {
        operation.ifError = err.message;
        updatedConditions.push({value: operation.if, left: [{value: '', left: [operation], right: []}], right: [], parent: workflow});
      }
      if (operation.if !== '' && operation.ifError === '') {


        const mergedCondOp = {value: false};

        let newCondOperation: Condition;
        if (parser.results[0].type !== 'OR') {
          newCondOperation = this.createNewCondTree(parser.results[0].d, operation);
          this.findPositionInCondTree(newCondOperation, parser.results[0].d, operation);
        } else {
          newCondOperation = this.createNewCondTree(parser.results[0], operation);
          this.findPositionInCondTree(newCondOperation, parser.results[0], operation);
        }

        let lastOpCondition: Condition = {value: '', left: [], right: [], parent: workflow};
        if (updatedConditions.length > 0) {
          lastOpCondition = updatedConditions[updatedConditions.length - 1];
          this.mergeCondOperations(newCondOperation, lastOpCondition, mergedCondOp);
        }
        if (! mergedCondOp.value) {
          newCondOperation.parent = workflow;
          updatedConditions.push(newCondOperation);
        }
      } else if (operation.if === '' ) {
        updatedConditions.push({value: '', left: [operation], right: [], parent: workflow});
      }
    });
    workflow.condOperations = updatedConditions;
  }

  private instanceOfCondition(object: any): Condition {
    if ('value' in object && 'left' in object && 'right' in object) {
      return object;
    } else {
      return null;
    }
  }

  private instanceOfOperation(object: any): Operation {
    if ('id' in object && 'if' in object) {
      return object;
    } else {
      return null;
    }
  }

  private mergeCondOperations(newCondOperation: Condition, lastCondOperation: Condition, mergedCondOp): Condition {
    const returnedCondOp = lastCondOperation;
    if (newCondOperation.value !== '' && newCondOperation.value === lastCondOperation.value) {
      if (newCondOperation.left.length > 0 && lastCondOperation.left.length > 0) {
        newCondOperation.left.forEach((newLeftCondOp) => {
          const newLeftCond = this.instanceOfCondition(newLeftCondOp);
          let addNewLeftCond = false;
          lastCondOperation.left.forEach((lastLeftCondOp) => {
            const lastLeftCond = this.instanceOfCondition(lastLeftCondOp);
            if (newLeftCond !== null && lastLeftCond !== null) {
              if (newLeftCond.value !== '' && newLeftCond.value === lastLeftCond.value) {
                addNewLeftCond = false;
                this.mergeCondOperations(newLeftCond, lastLeftCond, mergedCondOp);
              } else {
                addNewLeftCond = true;
              }
            }
          });
          if (addNewLeftCond) {
            newLeftCond.leftParent = returnedCondOp;
            returnedCondOp.left.push(newLeftCond);
            mergedCondOp.value = true;
          }
        });
      } else if (newCondOperation.right.length > 0 && lastCondOperation.right.length > 0) {
        newCondOperation.right.forEach((newRightCondOp) => {
          const newRightCond = this.instanceOfCondition(newRightCondOp);
          let addNewRightCond = false;
          lastCondOperation.right.forEach((lastRightCondOp) => {
            const lastRightCond = this.instanceOfCondition(lastRightCondOp);
            if (newRightCond !== null && lastRightCond !== null) {
              if (newRightCond.value !== '' && newRightCond.value === lastRightCond.value) {
                addNewRightCond = false;
                this.mergeCondOperations(newRightCond, lastRightCond, mergedCondOp);
              } else {
                addNewRightCond = true;
              }
            }
          });
          if (addNewRightCond) {
            newRightCond.rightParent = returnedCondOp;
            returnedCondOp.right.push(newRightCond);
            mergedCondOp.value = true;
          }
        });
      } else {
        newCondOperation.left.map((condOp) => this.instanceOfCondition(condOp).leftParent = returnedCondOp);
        returnedCondOp.left = returnedCondOp.left.concat(newCondOperation.left);
        newCondOperation.right.map((condOp) => this.instanceOfCondition(condOp).rightParent = returnedCondOp);
        returnedCondOp.right = returnedCondOp.right.concat(newCondOperation.right);
        mergedCondOp.value = true;
      }
    }
    return returnedCondOp;
  }

  private createNewCondTree(parserResults, operation): Condition {
    let newOpCondition: Condition = { value: '', left: [], right: [] };
    if (parserResults.type !== 'NOT') {
      if (parserResults.type === 'AND') {
        const leftAnd = this.createNewCondTree(parserResults.dl, operation);
        const rightAnd = this.createNewCondTree(parserResults.dr, operation);
        if (parserResults.dl.type !== 'NOT') {
          rightAnd.leftParent = leftAnd;
          leftAnd.left.push(rightAnd);
        } else {
          rightAnd.rightParent = leftAnd;
          leftAnd.right.push(rightAnd);
        }
        newOpCondition = leftAnd;
      } else {
        newOpCondition.value = parserResults.v;
      }
    } else {
      // const notCond = this.createNewCondTree(parserResults.dn, operation);
      newOpCondition = {value: parserResults.dn.v, left: [], right: []};
      // newOpCondition.right.push(notCond);
    }
    return newOpCondition;
  }

  private findPositionInCondTree(lastOpCondition: Condition, parserResults, operation): {pos: string, value: Condition} {
    let newCondPos: {pos: string, value: Condition} = {pos: '', value: null};
    if (parserResults.type !== 'NOT') {
      if (parserResults.type === 'AND') {

        lastOpCondition.left.forEach((leftLastCond) => {
          const tempLeftLastCond: Condition = this.instanceOfCondition(leftLastCond);
          if (tempLeftLastCond !== null) {

            const leftAnd = this.findPositionInCondTree(tempLeftLastCond, parserResults.dl, operation);
            const rightAnd = this.findPositionInCondTree(tempLeftLastCond, parserResults.dr, operation);
            if (lastOpCondition.value === parserResults.v) {
              newCondPos = leftAnd;
            }
          }
        });

        lastOpCondition.right.forEach((rightLastCond) => {
          const tempRightLastCond: Condition = this.instanceOfCondition(rightLastCond);
          if (tempRightLastCond !== null) {

            const leftAnd = this.findPositionInCondTree(tempRightLastCond, parserResults.dl, operation);
            const rightAnd = this.findPositionInCondTree(tempRightLastCond, parserResults.dr, operation);
            if (lastOpCondition.value === parserResults.v) {
              newCondPos = leftAnd;
            }
          }
        });
      } else {
        if (lastOpCondition.value === parserResults.v) {
          newCondPos.value = lastOpCondition;
          newCondPos.pos = 'left';
        }
      }
    } else {
      if (lastOpCondition.value === parserResults.dn.v) {
        newCondPos.value = lastOpCondition;
        newCondPos.pos = 'right';
      }
    }
    if (newCondPos.pos === 'left') {
      newCondPos.value.left.push({value: '', left: [operation], right: [], leftParent: newCondPos.value});
    } else if (newCondPos.pos === 'right') {
      newCondPos.value.right.push({value: '', left: [operation], right: [], rightParent: newCondPos.value});
    }
    return newCondPos;
}

  updateWorkflow(workflow: Workflow) {
    this.updateOperationsOnConditions(workflow);
    this.updateConditionsOnOperations(workflow);
  }

  private updateOperationsOnConditions(workflow: Workflow) {
    let updatedOperations: Operation[] = [];
    workflow.condOperations.forEach((condOp) => {
      updatedOperations = updatedOperations.concat(this.getUpdatedOperations(condOp));
    });
    workflow.operations = updatedOperations;
  }

  private getUpdatedOperations(condition: Condition): Operation[] {
    let updatedOperations: Operation[] = [];
    condition.left
      .concat(condition.right)
      .forEach((condOp) => {
        const cond: Condition = this.instanceOfCondition(condOp);
        if (cond !== null) {
          if (cond.left.length > 0 || cond.right.length > 0) {
            updatedOperations = updatedOperations.concat(this.getUpdatedOperations(cond));
          }
        } else {
          updatedOperations.push(this.instanceOfOperation(condOp));
        }
      });
    return updatedOperations;
  }

  private initDefaultOperations(paramList: DefaultOperationParamList[]) {
    paramList.forEach((params) => {
      const requiredConfs: Configuration[] = [];

      if (typeof (params.configurationKeys) !== 'undefined') {
        params.configurationKeys
          .filter((configurationKey) => configurationKey.charAt(configurationKey.length - 1) === '*')
          .forEach((configurationKey) => {
            requiredConfs.push({
              key: configurationKey.slice(0, -1),
              required: true
            });
          });
      }

      this.defaultOperations.push({
        value: '',
        left: [{
          id: params.id,
          if: '',
          ...(typeof (params.configurationKeys) !== 'undefined') && {configurations: requiredConfs},
          selected: false
        }],
        right: []
      });
    });
  }

  addWorkflow(workflow: Workflow) {
    this.updateConditionsOnOperations(workflow);
    this.workflows.push(workflow);
  }

  removeWorkflow(index: number) {
    this.workflows.splice(index, 1);
  }

  addCondToCondOps(condition: Condition, index: number, condOps: (Condition | Operation)[]) {
    condOps.splice(index, 0, condition);
  }

  getCondFromCondOps(index: number, condOps: (Condition | Operation)[]): Condition {
    return this.instanceOfCondition(condOps[index]);
  }

  removeCondFromCondOps(index: number, condOps: (Condition | Operation)[]) {
    condOps.splice(index, 1);
  }

  addOperation(operation: Condition, index: number, workflow: Workflow) {
    operation.parent = workflow;
    workflow.condOperations.splice(index, 0, operation);
  }

  getOperation(index: number, workflow: Workflow): Condition {
    return workflow.condOperations[index];
  }

  removeOperation(index: number, workflow: Workflow) {
    workflow.condOperations.splice(index, 1);
  }

  getWorkflowById(id: string): Workflow {
    return this.workflows.filter((workflow) => workflow.id === id)[0];
  }

  unzipFiles(element): Promise<void> {
    const asyncFn = (zipEntry: JSZipObject) => {
      return zipEntry.async('text');
    };
    return JSZip()
      .loadAsync(element)
      .then((zip) => {
        const zipFiles = zip.filter((relativePath, file) => {
          return (file.dir === false && relativePath.split('/')[0] !== '__MACOSX');
        });
        return Promise.all(zipFiles.map(asyncFn));
      })
      .then((xmlWorkflows: string[]) => {
        xmlWorkflows.forEach((xmlWorkflow) => {
          this.parseXml2Workflow(xmlWorkflow);
        });
      })
      .catch((e) => {
        console.log('promise exception', e);
        // todo: Exception
      });
  }

  readUploadedXmlFileAsText(inputFile): Promise<void> {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onerror = () => {
        reader.abort();
        reject(new DOMException('Problem parsing input file.'));
      };
      reader.onload = () => {
        resolve(this.parseXml2Workflow(reader.result as string));
      };
      reader.readAsText(inputFile);
    });
  }

  downloadWorkflows(): Promise<any> {
    const zip: JSZip = new JSZip();
    const filteredWorkflows: Workflow[] = this.workflows.filter(workflow => workflow.download);

    if (filteredWorkflows.length > 0) {
      filteredWorkflows.forEach((workflow) => {
        zip.file(workflow.id + '.xml', this.parseWorkflow2Xml(workflow));
      });

      return zip.generateAsync({type: 'blob'})
        .then((blob) => {
          FileSaver.saveAs(blob, 'opencast-workflow.zip');
        })
        .catch((e) => {
          console.log(e);
          // todo: promise Exception
        });
    }
  }

  parseXml2Workflow(xmlWorkflow: string) {
    const jsXmlWorkflow = fastxmljs.parse(xmlWorkflow, WorkflowService.parserOptions).definition;
    const newWorkflow: Workflow = {
      id: WorkflowService.getSafePropertyHelper(() => jsXmlWorkflow.id),
      title: WorkflowService.getSafePropertyHelper(() => jsXmlWorkflow.title),
      description: WorkflowService.getSafePropertyHelper(() => jsXmlWorkflow.description),
      displayOrder: WorkflowService.getSafePropertyHelper(() => jsXmlWorkflow.displayOrder),
      configurationPanel: WorkflowService.getSafePropertyHelper(() => jsXmlWorkflow.configuration_panel.__cdata),
      selected: true,
      download: true
    };

    const tags = WorkflowService.getCollectionOfJsElements(
      WorkflowService.getSafePropertyHelper(() => jsXmlWorkflow.tags.tag, []));
    tags.forEach(tag => {
      if (newWorkflow.tags === undefined) { newWorkflow.tags = []; }
      newWorkflow.tags.push(WorkflowService.parse2Tag(tag));
    });

    const operations = WorkflowService.getCollectionOfJsElements(
      WorkflowService.getSafePropertyHelper(() => jsXmlWorkflow.operations.operation, []));
    operations.forEach((operation, index) => {
      if (newWorkflow.operations === undefined) { newWorkflow.operations = []; }
      newWorkflow.operations.push(WorkflowService.parse2Operation(operation));
    });

    const roles = WorkflowService.getCollectionOfJsElements(
      WorkflowService.getSafePropertyHelper(() => jsXmlWorkflow.roles.role, []));
    roles.forEach(role => {
      if (newWorkflow.roles === undefined) { newWorkflow.roles = []; }
      newWorkflow.roles.push(WorkflowService.parse2Role(role));
    });

    this.addWorkflow(newWorkflow);
  }

  parseWorkflow2Xml(workflow: Workflow): string {
    return (new j2xParser(WorkflowService.parserOptions)).parse(this.parseWorkflow2JsXml(workflow));
  }

  parseTags2JsXml(tags: Tag[]): object[] {
    const tagsJsXml = [];

    tags.forEach((tag) => {
      tagsJsXml.push({
        ...(typeof (tag.value) !== 'undefined') && {'#text': tag.value},
      });
    });

    return tagsJsXml;
  }

  parseOperations2JsXml(operations: Operation[]): object[] {
    const operationsJsXml = [];

    operations.forEach((operation) => {
      const opAttr = {
        ...(typeof (operation.id) !== 'undefined') && {id: operation.id},
        ...((operation.if) !== '') && {if: operation.if},
        ...(typeof (operation.description) !== 'undefined') && {description: operation.description},
        ...(typeof (operation.retryStrategy) !== 'undefined') && {'retry-strategy': operation.retryStrategy},
        ...(typeof (operation.maxAttemps) !== 'undefined') && {'max-attempts': operation.maxAttemps},
        ...(typeof (operation.failOnError) !== 'undefined') && {'fail-on-error': operation.failOnError},
        ...(typeof (operation.exceptionHandlerWorkflow) !== 'undefined') &&
        {'exception-handler-workflow': operation.exceptionHandlerWorkflow}
      };

      operationsJsXml.push({
        attr: opAttr,
        ...(typeof (operation.configurations) !== 'undefined') &&
        {configurations: {configuration: this.parseConfigurations2JsXml(operation.configurations)}},
      });
    });

    return operationsJsXml;
  }

  parseConfigurations2JsXml(configurations: Configuration[]): object[] {
    const configurationsJsXml = [];

    configurations.forEach((configuration) => {
      configurationsJsXml.push({
        ...(typeof (configuration.key) !== 'undefined') && {attr: {key: configuration.key}},
        ...(typeof (configuration.value) !== 'undefined') && {'#text': configuration.value},
      });
    });

    return configurationsJsXml;
  }

  parseRoles2JsXml(roles: Role[]): object[] {
    const rolesJsXml = [];

    roles.forEach((role) => {
      rolesJsXml.push({
        ...(typeof (role.value) !== 'undefined') && {'#text': role.value},
      });
    });

    return rolesJsXml;
  }

  parseWorkflow2JsXml(workflow: Workflow): object {
    return {
      definition: {
        attr: {xmlns: 'http://workflow.opencastproject.org'},
        ...(typeof (workflow.id) !== 'undefined') && {id: workflow.id},
        ...(typeof (workflow.title) !== 'undefined') && {title: workflow.title},
        ...(typeof (workflow.description) !== 'undefined') && {description: workflow.description},
        ...(typeof (workflow.displayOrder) !== 'undefined') && {id: workflow.displayOrder},
        ...(typeof (workflow.configurationPanel) !== 'undefined') && {configuration_panel: {__cdata: workflow.configurationPanel}},
        ...(typeof (workflow.tags) !== 'undefined') && {tags: {tag: this.parseTags2JsXml(workflow.tags)}},
        ...(typeof (workflow.operations) !== 'undefined') && {operations: {operation: this.parseOperations2JsXml(workflow.operations)}},
        ...(typeof (workflow.roles) !== 'undefined') && {roles: {role: this.parseRoles2JsXml(workflow.roles)}},
      }
    };
  }
}
