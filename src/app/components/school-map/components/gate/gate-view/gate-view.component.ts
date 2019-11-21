
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { Gate } from 'app/shared/models/gate';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { GateService } from '../shared/gate.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-gate-view',
  templateUrl: './gate-view.component.html',
  styleUrls: ['./gate-view.component.scss'],
  providers: []
})

export class GateViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedGate: Gate;
  gateForm: FormGroup;

  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;
private gatesQualityCodesService: LookupService;

  
regionalCenterCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
gatesQualityCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedGateDialog: any,
    @Optional() public dialogRef: MatDialogRef<GateViewComponent>,
    public gateService: GateService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  buildingCode : [this.selectedGate.buildingCode],
  gatesSerial : [this.selectedGate.gatesSerial],
  gatesSites : [this.selectedGate.gatesSites],
  regionalCenterCode : [this.selectedGate.regionalCenterCode],
  branchCode : [this.selectedGate.branchCode],
  gatesQualityCode : [this.selectedGate.gatesQualityCode]
      });

    this.disableControls();
  }

  onConfirm() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getErrorMessage = (formCtrl: AbstractControl) => {
    const errorMessages: FormControlError[] = [
          
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.gateForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.gateForm.controls)) {
      this.gateForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.gatesQualityCodesService = new LookupService('gatesqualitycodes', this.http);
  }
}

