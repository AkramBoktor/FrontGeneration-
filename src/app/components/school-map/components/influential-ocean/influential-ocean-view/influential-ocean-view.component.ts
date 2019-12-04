
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { InfluentialOcean } from 'app/shared/models/influential-ocean';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { InfluentialOceanService } from '../shared/influential-ocean.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-influential-ocean-view',
  templateUrl: './influential-ocean-view.component.html',
  styleUrls: ['./influential-ocean-view.component.scss'],
  providers: []
})

export class InfluentialOceanViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedInfluentialOcean: InfluentialOcean;
  influentialOceanForm: FormGroup;

  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;
private effectTypeCodesService: LookupService;
private effectCodesService: LookupService;

  
regionalCenterCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
effectTypeCodeSelectOptions: MaterialSelectOptions;
effectCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedInfluentialOceanDialog: any,
    @Optional() public dialogRef: MatDialogRef<InfluentialOceanViewComponent>,
    public influentialOceanService: InfluentialOceanService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedInfluentialOcean = this.selectedInfluentialOceanDialog.data || this.selectedInfluentialOcean;

    
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

	this.effectTypeCodeSelectOptions = new MaterialSelectOptions({
	 data: this.effectTypeCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود نوع المؤثر',
	});

	this.effectCodeSelectOptions = new MaterialSelectOptions({
	 data: this.effectCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المؤثر',
	});


    this.influentialOceanForm = this.formBuilder.group({
      
  buildingCode : [this.selectedInfluentialOcean.buildingCode],
  regionalCenterCode : [this.selectedInfluentialOcean.regionalCenterCode],
  branchCode : [this.selectedInfluentialOcean.branchCode],
  effectTypeCode : [this.selectedInfluentialOcean.effectTypeCode],
  effectCode : [this.selectedInfluentialOcean.effectCode]
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
    return this.influentialOceanForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.influentialOceanForm.controls)) {
      this.influentialOceanForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.effectTypeCodesService = new LookupService('effecttypecodes', this.http);
this.effectCodesService = new LookupService('effectcodes', this.http);
  }
}

