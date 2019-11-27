
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { Gate } from 'app/shared/models/gate';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { GateService } from '../shared/gate.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-gate-new',
  templateUrl: './gate-new.component.html',
  styleUrls: ['./gate-new.component.scss'],
  providers: [
    ]
})

export class GateNewComponent extends AppBaseComponent implements OnInit {
  gateForm: FormGroup;
  @Input() selectedGate: Gate;
  errorMessages: FormControlError[] = [
        
  ];

  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;
private gatesQualityCodesService: LookupService;

  
regionalCenterCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
gatesQualityCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('regionalCenterCode', { static: true }) RegionalCenterCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('gatesQualityCode', { static: true }) GatesQualityCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<GateNewComponent>,
    public gateService: GateService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedGate = new Gate();

    
	this.regionalCenterCodeSelectOptions = new MaterialSelectOptions({
	 data: this.regionalCenterCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المركز الاقليمي',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.gatesQualityCodeSelectOptions = new MaterialSelectOptions({
	 data: this.gatesQualityCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود نوعية البوابات',
	});


    this.gateForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedGate.buildingCode, [ Validators.required ]],
  gatesSerial : [this.selectedGate.gatesSerial, [ Validators.required ]],
  gatesSites : [this.selectedGate.gatesSites, [ Validators.required ]],
  regionalCenterCode : [this.selectedGate.regionalCenterCode, [ Validators.required ]],
  branchCode : [this.selectedGate.branchCode, [ Validators.required ]],
  gatesQualityCode : [this.selectedGate.gatesQualityCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.gateService.create(this.gateForm.value)
        .pipe(switchMap(x => {
			return this.gateService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.gateForm.get(name);
    }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.gatesQualityCodesService = new LookupService('gatesqualitycodes', this.http);
  }
 }
