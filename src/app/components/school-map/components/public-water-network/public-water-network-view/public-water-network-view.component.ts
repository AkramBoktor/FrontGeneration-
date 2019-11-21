
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { PublicWaterNetwork } from 'app/shared/models/public-water-network';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { PublicWaterNetworkService } from '../shared/public-water-network.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-public-water-network-view',
  templateUrl: './public-water-network-view.component.html',
  styleUrls: ['./public-water-network-view.component.scss'],
  providers: []
})

export class PublicWaterNetworkViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPublicWaterNetwork: PublicWaterNetwork;
  publicWaterNetworkForm: FormGroup;

  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;

  
regionalCenterCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPublicWaterNetworkDialog: any,
    @Optional() public dialogRef: MatDialogRef<PublicWaterNetworkViewComponent>,
    public publicWaterNetworkService: PublicWaterNetworkService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPublicWaterNetwork = this.selectedPublicWaterNetworkDialog.data || this.selectedPublicWaterNetwork;

    
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


    this.publicWaterNetworkForm = this.formBuilder.group({
      
  buildingCode : [this.selectedPublicWaterNetwork.buildingCode],
  publicNetworkDiameter : [this.selectedPublicWaterNetwork.publicNetworkDiameter],
  distance : [this.selectedPublicWaterNetwork.distance],
  regionalCenterCode : [this.selectedPublicWaterNetwork.regionalCenterCode],
  branchCode : [this.selectedPublicWaterNetwork.branchCode]
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
    return this.publicWaterNetworkForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.publicWaterNetworkForm.controls)) {
      this.publicWaterNetworkForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
  }
}

