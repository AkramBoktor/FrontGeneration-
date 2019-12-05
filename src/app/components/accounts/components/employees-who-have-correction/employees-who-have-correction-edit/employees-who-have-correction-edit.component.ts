
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EmployeesWhoHaveCorrection } from 'app/shared/models/employees-who-have-correction';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { EmployeesWhoHaveCorrectionService } from '../shared/employees-who-have-correction.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-employees-who-have-correction-edit',
  templateUrl: './employees-who-have-correction-edit.component.html',
  styleUrls: ['./employees-who-have-correction-edit.component.scss'],
  providers: []
})

export class EmployeesWhoHaveCorrectionEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEmployeesWhoHaveCorrection: EmployeesWhoHaveCorrection;
  employeesWhoHaveCorrectionForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private entryTypesService: LookupService;

  
entryTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('entryType', { static: true }) EntryTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEmployeesWhoHaveCorrectionDialog: any,
    @Optional() public dialogRef: MatDialogRef<EmployeesWhoHaveCorrectionEditComponent>,
    public employeesWhoHaveCorrectionService: EmployeesWhoHaveCorrectionService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeesWhoHaveCorrection = new EmployeesWhoHaveCorrection();
    this.selectedEmployeesWhoHaveCorrection = this.selectedEmployeesWhoHaveCorrectionDialog.data || this.selectedEmployeesWhoHaveCorrection;

    
	this.entryTypeSelectOptions = new MaterialSelectOptions({
	 data: this.entryTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الادخال',
	});


    this.employeesWhoHaveCorrectionForm = this.formBuilder.group({
      
  id : [this.selectedEmployeesWhoHaveCorrection.id],
  incomingYearAndMonth : [this.selectedEmployeesWhoHaveCorrection.incomingYearAndMonth, [ Validators.required ]],
  employeeCode : [this.selectedEmployeesWhoHaveCorrection.employeeCode, [ Validators.required ]],
  employeeDate : [this.selectedEmployeesWhoHaveCorrection.employeeDate, [ Validators.required ]],
  entryType : [this.selectedEmployeesWhoHaveCorrection.entryType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.employeesWhoHaveCorrectionService.update(this.employeesWhoHaveCorrectionForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.employeesWhoHaveCorrectionService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.employeesWhoHaveCorrectionForm.get(name);
  }

  initializeLookupServices() {
    this.entryTypesService = new LookupService('entrytypes', this.http);
  }
}
