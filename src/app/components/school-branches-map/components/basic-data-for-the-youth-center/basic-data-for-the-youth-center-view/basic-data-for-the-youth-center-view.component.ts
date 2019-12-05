
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { BasicDataForTheYouthCenter } from 'app/shared/models/basic-data-for-the-youth-center';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { BasicDataForTheYouthCenterService } from '../shared/basic-data-for-the-youth-center.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-basic-data-for-the-youth-center-view',
  templateUrl: './basic-data-for-the-youth-center-view.component.html',
  styleUrls: ['./basic-data-for-the-youth-center-view.component.scss'],
  providers: []
})

export class BasicDataForTheYouthCenterViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBasicDataForTheYouthCenter: BasicDataForTheYouthCenter;
  basicDataForTheYouthCenterForm: FormGroup;

  private governoratesService: LookupService;
private regionalCenterCodesService: LookupService;
private sectionsOrCentersService: LookupService;
private villagesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
regionalCenterSelectOptions: MaterialSelectOptions;
sectionCenterSelectOptions: MaterialSelectOptions;
neighborhoodVillageSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBasicDataForTheYouthCenterDialog: any,
    @Optional() public dialogRef: MatDialogRef<BasicDataForTheYouthCenterViewComponent>,
    public basicDataForTheYouthCenterService: BasicDataForTheYouthCenterService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBasicDataForTheYouthCenter = this.selectedBasicDataForTheYouthCenterDialog.data || this.selectedBasicDataForTheYouthCenter;

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظه',
	});

	this.regionalCenterSelectOptions = new MaterialSelectOptions({
	 data: this.regionalCenterCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المركز الاقليمى',
	});

	this.sectionCenterSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القسم / المركز',
	});

	this.neighborhoodVillageSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الحى / القريه',
	});


    this.basicDataForTheYouthCenterForm = this.formBuilder.group({
      
  centerName : [this.selectedBasicDataForTheYouthCenter.centerName],
  governorate : [this.selectedBasicDataForTheYouthCenter.governorate],
  regionalCenter : [this.selectedBasicDataForTheYouthCenter.regionalCenter],
  sectionCenter : [this.selectedBasicDataForTheYouthCenter.sectionCenter],
  neighborhoodVillage : [this.selectedBasicDataForTheYouthCenter.neighborhoodVillage]
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
    return this.basicDataForTheYouthCenterForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.basicDataForTheYouthCenterForm.controls)) {
      this.basicDataForTheYouthCenterForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
  }
}

