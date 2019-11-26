
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EnteringResortData } from 'app/shared/models/entering-resort-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { EnteringResortDataService } from '../shared/entering-resort-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-entering-resort-data-edit',
  templateUrl: './entering-resort-data-edit.component.html',
  styleUrls: ['./entering-resort-data-edit.component.scss'],
  providers: []
})

export class EnteringResortDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEnteringResortData: EnteringResortData;
  enteringResortDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEnteringResortDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<EnteringResortDataEditComponent>,
    public enteringResortDataService: EnteringResortDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEnteringResortData = new EnteringResortData();
    this.selectedEnteringResortData = this.selectedEnteringResortDataDialog.data || this.selectedEnteringResortData;

    

    this.enteringResortDataForm = this.formBuilder.group({
      
  id : [this.selectedEnteringResortData.id],
  employeeCode : [this.selectedEnteringResortData.employeeCode, [ Validators.required ]],
  employeeName : [this.selectedEnteringResortData.employeeName, [ ]],
  membershipNo : [this.selectedEnteringResortData.membershipNo, [ ]],
  resortPlace : [this.selectedEnteringResortData.resortPlace, [ Validators.required ]],
  resortStartDate : [this.selectedEnteringResortData.resortStartDate, [ Validators.required ]],
  resortEndDate : [this.selectedEnteringResortData.resortEndDate, [ Validators.required ]],
  floorNumber : [this.selectedEnteringResortData.floorNumber, [ Validators.required ]],
  apartmentNumber : [this.selectedEnteringResortData.apartmentNumber, [ Validators.required ]],
  resortValue : [this.selectedEnteringResortData.resortValue, [ Validators.required ]],
  insuranceValue : [this.selectedEnteringResortData.insuranceValue, [ Validators.required ]],
  insuranceExpenses : [this.selectedEnteringResortData.insuranceExpenses, [ Validators.required ]],
  companionsNumber : [this.selectedEnteringResortData.companionsNumber, [ Validators.required ]],
  insuranceDeductionValue : [this.selectedEnteringResortData.insuranceDeductionValue, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.enteringResortDataService.update(this.enteringResortDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.enteringResortDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.enteringResortDataForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
