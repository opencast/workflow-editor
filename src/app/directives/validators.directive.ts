import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS} from '@angular/forms';
import { Parser, Rule, Grammar, CompiledRules, Lexer } from 'nearley';
import grammar from '../services/workflow-service/operation-condition-grammer-parser';

@Directive({
  selector: '[appOpIfConditionValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: OpIfConditionValidatorDirective, multi: true
    }]
})
export class OpIfConditionValidatorDirective {

  constructor() {
  }

  validate(control: AbstractControl): {[key: string]: any} {
    const parser: Parser = new Parser(
      Grammar.fromCompiled(grammar),
      { keepHistory: true }
    );
    try {
      parser.feed(control.value);
      return null;
    } catch (err) {
      return {invalidIfCond: {notvalid: true, msg: err.message.split("Instead")[0]}};
    }
  }

}

export const APPLICATION_VALIDATORS = [OpIfConditionValidatorDirective];
