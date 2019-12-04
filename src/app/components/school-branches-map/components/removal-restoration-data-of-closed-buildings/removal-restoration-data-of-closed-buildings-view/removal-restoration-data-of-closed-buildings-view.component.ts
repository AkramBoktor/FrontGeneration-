
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { RemovalRestorationDataOfClosedBuildings } from 'app/shared/models/removal-restoration-data-of-closed-buildings';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { RemovalRestorationDataOfClosedBuildingsService } from '../shared/removal-restoration-data-of-closed-buildings.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-removal-restoration-data-of-closed-buildings-view',
  templateUrl: './removal-restoration-data-of-closed-buildings-view.component.html',
  styleUrls: ['./removal-restoration-data-of-closed-buildings-view.component.scss'],
  providers: []
})

export class RemovalRestorationDataOfClosedBuildingsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRemovalRestorationDataOfClosedBuildings: RemovalRestorationDataOfClosedBuildings;
  removalRestorationDataOfClosedBuildingsForm: FormGroup;

  private usePositionsService: LookupService;
private yesOrNosService: LookupService;

  
usageStatusSelectOptions: MaterialSelectOptions;
extensionClosingStatusSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRemovalRestorationDataOfClosedBuildingsDialog: any,
    @Optional() public dialogRef: MatDialogRef<RemovalRestorationDataOfClosedBuildingsViewComponent>,
    public removalRestorationDataOfClosedBuildingsService: RemovalRestorationDataOfClosedBuildingsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRemovalRestorationDataOfClosedBuildings = this.selectedRemovalRestorationDataOfClosedBuildingsDialog.data || this.selectedRemovalRestorationDataOfClosedBuildings;

    
	this.usageStatusSelectOptions = new MaterialSelectOptions({
	 data: this.usePositionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف الاستخدام',
	});

	this.extensionClosingStatusSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف اغلاق الملحق',
	});


    this.removalRestorationDataOfClosedBuildingsForm = this.formBuilder.group({
      
  schoolCode : [this.selectedRemovalRestorationDataOfClosedBuildings.schoolCode],
  extensionNumber : [this.selectedRemovalRestorationDataOfClosedBuildings.extensionNumber],
  closingDate : [this.selectedRemovalRestorationDataOfClosedBuildings.closingDate],
  decisionNumber : [this.selectedRemovalRestorationDataOfClosedBuildings.decisionNumber],
  decisionDate : [this.selectedRemovalRestorationDataOfClosedBuildings.decisionDate],
  removalDate : [this.selectedRemovalRestorationDataOfClosedBuildings.removalDate],
  usageStatus : [this.selectedRemovalRestorationDataOfClosedBuildings.usageStatus],
  extensionClosingStatus : [this.selectedRemovalRestorationDataOfClosedBuildings.extensionClosingStatus]
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
    return this.removalRestorationDataOfClosedBuildingsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.removalRestorationDataOfClosedBuildingsForm.controls)) {
      this.removalRestorationDataOfClosedBuildingsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.usePositionsService = new LookupService('usepositions', this.http);
this.yesOrNosService = new LookupService('yesornos', this.http);
  }
}

