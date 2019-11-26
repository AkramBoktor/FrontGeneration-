
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { Area } from 'app/shared/models/area';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { AreaService } from '../shared/area.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-area-view',
  templateUrl: './area-view.component.html',
  styleUrls: ['./area-view.component.scss'],
  providers: []
})

export class AreaViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedArea: Area;
  areaForm: FormGroup;

  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;

  
regionalCenterCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAreaDialog: any,
    @Optional() public dialogRef: MatDialogRef<AreaViewComponent>,
    public areaService: AreaService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedArea = this.selectedAreaDialog.data || this.selectedArea;

    
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


    this.areaForm = this.formBuilder.group({
      
  buildingCode : [this.selectedArea.buildingCode],
  groundFloorArea : [this.selectedArea.groundFloorArea],
  backyardArea : [this.selectedArea.backyardArea],
  greenAreas : [this.selectedArea.greenAreas],
  playgroundArea : [this.selectedArea.playgroundArea],
  sideWalksArea : [this.selectedArea.sideWalksArea],
  siteTotalArea : [this.selectedArea.siteTotalArea],
  regionalCenterCode : [this.selectedArea.regionalCenterCode],
  branchCode : [this.selectedArea.branchCode]
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
    return this.areaForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.areaForm.controls)) {
      this.areaForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
  }
}

