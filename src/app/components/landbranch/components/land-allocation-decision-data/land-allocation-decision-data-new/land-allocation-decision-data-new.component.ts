
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LandAllocationDecisionData } from 'app/shared/models/land-allocation-decision-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { LandAllocationDecisionDataService } from '../shared/land-allocation-decision-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-land-allocation-decision-data-new',
  templateUrl: './land-allocation-decision-data-new.component.html',
  styleUrls: ['./land-allocation-decision-data-new.component.scss'],
  providers: [
    ]
})

export class LandAllocationDecisionDataNewComponent extends AppBaseComponent implements OnInit {
  landAllocationDecisionDataForm: FormGroup;
  @Input() selectedLandAllocationDecisionData: LandAllocationDecisionData;
  errorMessages: FormControlError[] = [
        
  ];

  private allocationTypeCodesService: LookupService;

  
allocationTypeCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('allocationTypeCode', { static: true }) AllocationTypeCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<LandAllocationDecisionDataNewComponent>,
    public landAllocationDecisionDataService: LandAllocationDecisionDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLandAllocationDecisionData = new LandAllocationDecisionData();

    
	this.allocationTypeCodeSelectOptions = new MaterialSelectOptions({
	 data: this.allocationTypeCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التخصيص',
	});


    this.landAllocationDecisionDataForm = this.formBuilder.group({
     
  id : [0],
  landID : [this.selectedLandAllocationDecisionData.landID, [ Validators.required ]],
  allocationNumber : [this.selectedLandAllocationDecisionData.allocationNumber, [ Validators.required ]],
  allocationDate : [this.selectedLandAllocationDecisionData.allocationDate, [ Validators.required ]],
  allocationTypeCode : [this.selectedLandAllocationDecisionData.allocationTypeCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.landAllocationDecisionDataService.create(this.landAllocationDecisionDataForm.value)
        .pipe(switchMap(x => {
			return this.landAllocationDecisionDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.landAllocationDecisionDataForm.get(name);
    }

  initializeLookupServices() {
    this.allocationTypeCodesService = new LookupService('allocationtypecodes', this.http);
  }
 }
