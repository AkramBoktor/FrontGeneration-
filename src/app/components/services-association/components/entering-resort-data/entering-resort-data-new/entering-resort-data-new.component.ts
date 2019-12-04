
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { EnteringResortData } from 'app/shared/models/entering-resort-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EnteringResortDataService } from '../shared/entering-resort-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-entering-resort-data-new',
  templateUrl: './entering-resort-data-new.component.html',
  styleUrls: ['./entering-resort-data-new.component.scss'],
  providers: [
    ]
})

export class EnteringResortDataNewComponent extends AppBaseComponent implements OnInit {
  enteringResortDataForm: FormGroup;
  @Input() selectedEnteringResortData: EnteringResortData;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<EnteringResortDataNewComponent>,
    public enteringResortDataService: EnteringResortDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEnteringResortData = new EnteringResortData();

    

    this.enteringResortDataForm = this.formBuilder.group({
     
  id : [0],
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
    this.enteringResortDataService.create(this.enteringResortDataForm.value)
        .pipe(switchMap(x => {
			return this.enteringResortDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.enteringResortDataForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
