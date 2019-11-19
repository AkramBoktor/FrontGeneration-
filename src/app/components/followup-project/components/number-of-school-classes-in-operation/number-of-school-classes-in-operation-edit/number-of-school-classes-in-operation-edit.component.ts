
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { NumberOfSchoolClassesInOperation } from 'app/shared/models/number-of-school-classes-in-operation';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { NumberOfSchoolClassesInOperationService } from '../shared/number-of-school-classes-in-operation.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-number-of-school-classes-in-operation-edit',
  templateUrl: './number-of-school-classes-in-operation-edit.component.html',
  styleUrls: ['./number-of-school-classes-in-operation-edit.component.scss'],
  providers: []
})

export class NumberOfSchoolClassesInOperationEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedNumberOfSchoolClassesInOperation: NumberOfSchoolClassesInOperation;
  numberOfSchoolClassesInOperationForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private branchCodesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedNumberOfSchoolClassesInOperationDialog: any,
    @Optional() public dialogRef: MatDialogRef<NumberOfSchoolClassesInOperationEditComponent>,
    public numberOfSchoolClassesInOperationService: NumberOfSchoolClassesInOperationService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedNumberOfSchoolClassesInOperation = new NumberOfSchoolClassesInOperation();
    this.selectedNumberOfSchoolClassesInOperation = this.selectedNumberOfSchoolClassesInOperationDialog.data || this.selectedNumberOfSchoolClassesInOperation;

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});


    this.numberOfSchoolClassesInOperationForm = this.formBuilder.group({
      
  id : [this.selectedNumberOfSchoolClassesInOperation.id],
  projectCode : [this.selectedNumberOfSchoolClassesInOperation.projectCode, [ Validators.required ]],
  classesNumber : [this.selectedNumberOfSchoolClassesInOperation.classesNumber, [ Validators.required ]],
  branchCode : [this.selectedNumberOfSchoolClassesInOperation.branchCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.numberOfSchoolClassesInOperationService.update(this.numberOfSchoolClassesInOperationForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.numberOfSchoolClassesInOperationService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.numberOfSchoolClassesInOperationForm.get(name);
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
  }
}
