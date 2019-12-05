
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { PublicSiteBoundaryData } from 'app/shared/models/public-site-boundary-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { PublicSiteBoundaryDataService } from '../shared/public-site-boundary-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-public-site-boundary-data-view',
  templateUrl: './public-site-boundary-data-view.component.html',
  styleUrls: ['./public-site-boundary-data-view.component.scss'],
  providers: []
})

export class PublicSiteBoundaryDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPublicSiteBoundaryData: PublicSiteBoundaryData;
  publicSiteBoundaryDataForm: FormGroup;

  private yesOrNosService: LookupService;
private fenceStatusCodesService: LookupService;

  
hasNeighborSelectOptions: MaterialSelectOptions;
fenceSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPublicSiteBoundaryDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<PublicSiteBoundaryDataViewComponent>,
    public publicSiteBoundaryDataService: PublicSiteBoundaryDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPublicSiteBoundaryData = this.selectedPublicSiteBoundaryDataDialog.data || this.selectedPublicSiteBoundaryData;

    
	this.hasNeighborSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'يوجد جار؟',
	});

	this.fenceSelectOptions = new MaterialSelectOptions({
	 data: this.fenceStatusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'سور',
	});


    this.publicSiteBoundaryDataForm = this.formBuilder.group({
      
  landCode : [this.selectedPublicSiteBoundaryData.landCode],
  averageSiteLevel : [this.selectedPublicSiteBoundaryData.averageSiteLevel],
  proposedAverageYardLevel : [this.selectedPublicSiteBoundaryData.proposedAverageYardLevel],
  highestPointLevel : [this.selectedPublicSiteBoundaryData.highestPointLevel],
  lowestPointLevel : [this.selectedPublicSiteBoundaryData.lowestPointLevel],
  borderName : [this.selectedPublicSiteBoundaryData.borderName],
  borderLength : [this.selectedPublicSiteBoundaryData.borderLength],
  neighborLevel : [this.selectedPublicSiteBoundaryData.neighborLevel],
  neighborDescription : [this.selectedPublicSiteBoundaryData.neighborDescription],
  hasNeighbor : [this.selectedPublicSiteBoundaryData.hasNeighbor],
  fence : [this.selectedPublicSiteBoundaryData.fence]
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
    return this.publicSiteBoundaryDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.publicSiteBoundaryDataForm.controls)) {
      this.publicSiteBoundaryDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.yesOrNosService = new LookupService('yesornos', this.http);
this.fenceStatusCodesService = new LookupService('fencestatuscodes', this.http);
  }
}

