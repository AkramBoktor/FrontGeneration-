
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LandAllocationDecisionData } from 'app/shared/models/land-allocation-decision-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { LandAllocationDecisionDataService } from '../shared/land-allocation-decision-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-land-allocation-decision-data-edit',
  templateUrl: './land-allocation-decision-data-edit.component.html',
  styleUrls: ['./land-allocation-decision-data-edit.component.scss'],
  providers: []
})

export class LandAllocationDecisionDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedLandAllocationDecisionData: LandAllocationDecisionData;
  landAllocationDecisionDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private allocationTypeCodesService: LookupService;

  
allocationTypeCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('allocationTypeCode', { static: true }) AllocationTypeCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLandAllocationDecisionDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<LandAllocationDecisionDataEditComponent>,
    public landAllocationDecisionDataService: LandAllocationDecisionDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLandAllocationDecisionData = new LandAllocationDecisionData();
    this.selectedLandAllocationDecisionData = this.selectedLandAllocationDecisionDataDialog.data || this.selectedLandAllocationDecisionData;

    
	this.allocationTypeCodeSelectOptions = new MaterialSelectOptions({
	 data: this.allocationTypeCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التخصيص',
	});


    this.landAllocationDecisionDataForm = this.formBuilder.group({
      
  id : [this.selectedLandAllocationDecisionData.id],
  landID : [this.selectedLandAllocationDecisionData.landID, [ Validators.required ]],
  allocationNumber : [this.selectedLandAllocationDecisionData.allocationNumber, [ Validators.required ]],
  allocationDate : [this.selectedLandAllocationDecisionData.allocationDate, [ Validators.required ]],
  allocationTypeCode : [this.selectedLandAllocationDecisionData.allocationTypeCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.landAllocationDecisionDataService.update(this.landAllocationDecisionDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.landAllocationDecisionDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.landAllocationDecisionDataForm.get(name);
  }

  initializeLookupServices() {
    this.allocationTypeCodesService = new LookupService('allocationtypecodes', this.http);
  }
}
