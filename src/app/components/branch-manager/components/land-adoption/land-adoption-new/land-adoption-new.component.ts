
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LandAdoption } from 'app/shared/models/land-adoption';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { LandAdoptionService } from '../shared/land-adoption.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-land-adoption-new',
  templateUrl: './land-adoption-new.component.html',
  styleUrls: ['./land-adoption-new.component.scss'],
  providers: [
    ]
})

export class LandAdoptionNewComponent extends AppBaseComponent implements OnInit {
  landAdoptionForm: FormGroup;
  @Input() selectedLandAdoption: LandAdoption;
  errorMessages: FormControlError[] = [
        
  ];

  private educationalLevelsService: LookupService;
private yesOrNosService: LookupService;
private rejectionReasonCodesService: LookupService;

  
proposedPhaseSelectOptions: MaterialSelectOptions;
landValiditySelectOptions: MaterialSelectOptions;
rejectionReasonCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('proposedPhase', { static: true }) ProposedPhaseSelectComponent: MaterialSelectComponent;
	@ViewChild('landValidity', { static: true }) LandValiditySelectComponent: MaterialSelectComponent;
	@ViewChild('rejectionReasonCode', { static: true }) RejectionReasonCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<LandAdoptionNewComponent>,
    public landAdoptionService: LandAdoptionService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLandAdoption = new LandAdoption();

    
	this.proposedPhaseSelectOptions = new MaterialSelectOptions({
	 data: this.educationalLevelsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المرحله المقترحه',
	});

	this.landValiditySelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'صلاحية الأرض',
	});

	this.rejectionReasonCodeSelectOptions = new MaterialSelectOptions({
	 data: this.rejectionReasonCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود سبب الرفض',
	});


    this.landAdoptionForm = this.formBuilder.group({
     
  id : [0],
  landCode : [this.selectedLandAdoption.landCode, [ Validators.required ]],
  modelCode : [this.selectedLandAdoption.modelCode, [ Validators.required ]],
  accreditationDate : [this.selectedLandAdoption.accreditationDate, [ Validators.required ]],
  notes : [this.selectedLandAdoption.notes, [ Validators.required ]],
  proposedPhase : [this.selectedLandAdoption.proposedPhase, [ Validators.required ]],
  landValidity : [this.selectedLandAdoption.landValidity, [ Validators.required ]],
  rejectionReasonCode : [this.selectedLandAdoption.rejectionReasonCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.landAdoptionService.create(this.landAdoptionForm.value)
        .pipe(switchMap(x => {
			return this.landAdoptionService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.landAdoptionForm.get(name);
    }

  initializeLookupServices() {
    this.educationalLevelsService = new LookupService('educationallevels', this.http);
this.yesOrNosService = new LookupService('yesornos', this.http);
this.rejectionReasonCodesService = new LookupService('rejectionreasoncodes', this.http);
  }
 }
