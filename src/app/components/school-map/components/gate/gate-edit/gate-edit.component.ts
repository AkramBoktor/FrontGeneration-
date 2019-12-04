
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Gate } from 'app/shared/models/gate';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { GateService } from '../shared/gate.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-gate-edit',
  templateUrl: './gate-edit.component.html',
  styleUrls: ['./gate-edit.component.scss'],
  providers: []
})

export class GateEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedGate: Gate;
  gateForm: FormGroup;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedGateDialog: any,
    @Optional() public dialogRef: MatDialogRef<GateEditComponent>,
    public gateService: GateService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedGate = new Gate();
    this.selectedGate = this.selectedGateDialog.data || this.selectedGate;

    
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
      
  id : [this.selectedGate.id],
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
    this.gateService.update(this.gateForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.gateService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.gateForm.get(name);
  }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.gatesQualityCodesService = new LookupService('gatesqualitycodes', this.http);
  }
}
