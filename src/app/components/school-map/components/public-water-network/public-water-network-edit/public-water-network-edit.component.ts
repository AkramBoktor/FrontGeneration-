
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { PublicWaterNetwork } from 'app/shared/models/public-water-network';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { PublicWaterNetworkService } from '../shared/public-water-network.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-public-water-network-edit',
  templateUrl: './public-water-network-edit.component.html',
  styleUrls: ['./public-water-network-edit.component.scss'],
  providers: []
})

export class PublicWaterNetworkEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPublicWaterNetwork: PublicWaterNetwork;
  publicWaterNetworkForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;

  
regionalCenterCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('regionalCenterCode', { static: true }) RegionalCenterCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPublicWaterNetworkDialog: any,
    @Optional() public dialogRef: MatDialogRef<PublicWaterNetworkEditComponent>,
    public publicWaterNetworkService: PublicWaterNetworkService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPublicWaterNetwork = new PublicWaterNetwork();
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
      
  id : [this.selectedPublicWaterNetwork.id],
  buildingCode : [this.selectedPublicWaterNetwork.buildingCode, [ Validators.required ]],
  publicNetworkDiameter : [this.selectedPublicWaterNetwork.publicNetworkDiameter, [ Validators.required ]],
  distance : [this.selectedPublicWaterNetwork.distance, [ Validators.required ]],
  regionalCenterCode : [this.selectedPublicWaterNetwork.regionalCenterCode, [ ]],
  branchCode : [this.selectedPublicWaterNetwork.branchCode, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.publicWaterNetworkService.update(this.publicWaterNetworkForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.publicWaterNetworkService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.publicWaterNetworkForm.get(name);
  }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
  }
}
