
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AbstractSalary } from 'app/shared/models/abstract-salary';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { AbstractSalaryService } from '../shared/abstract-salary.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-abstract-salary-edit',
  templateUrl: './abstract-salary-edit.component.html',
  styleUrls: ['./abstract-salary-edit.component.scss'],
  providers: []
})

export class AbstractSalaryEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAbstractSalary: AbstractSalary;
  abstractSalaryForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAbstractSalaryDialog: any,
    @Optional() public dialogRef: MatDialogRef<AbstractSalaryEditComponent>,
    public abstractSalaryService: AbstractSalaryService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAbstractSalary = new AbstractSalary();
    this.selectedAbstractSalary = this.selectedAbstractSalaryDialog.data || this.selectedAbstractSalary;

    

    this.abstractSalaryForm = this.formBuilder.group({
      
  id : [this.selectedAbstractSalary.id],
  employeeCode : [this.selectedAbstractSalary.employeeCode, [ Validators.required ]],
  year : [this.selectedAbstractSalary.year, [ Validators.required ]],
  abstractSalary : [this.selectedAbstractSalary.abstractSalary, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.abstractSalaryService.update(this.abstractSalaryForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.abstractSalaryService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
	    }))
    .subscribe(
      (result) => {
          if (this.dialogRef)
          {
              this.dialogRef.close(true);
          }
    });
  }

  getControls(name: string) {
    return this.abstractSalaryForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
