
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { RemovalRestorationDataOfClosedBuildings } from 'app/shared/models/removal-restoration-data-of-closed-buildings';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { RemovalRestorationDataOfClosedBuildingsService } from '../shared/removal-restoration-data-of-closed-buildings.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-removal-restoration-data-of-closed-buildings-edit',
  templateUrl: './removal-restoration-data-of-closed-buildings-edit.component.html',
  styleUrls: ['./removal-restoration-data-of-closed-buildings-edit.component.scss'],
  providers: []
})

export class RemovalRestorationDataOfClosedBuildingsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRemovalRestorationDataOfClosedBuildings: RemovalRestorationDataOfClosedBuildings;
  removalRestorationDataOfClosedBuildingsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private usePositionsService: LookupService;
private yesOrNosService: LookupService;

  
usageStatusSelectOptions: MaterialSelectOptions;
extensionClosingStatusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('usageStatus', { static: true }) UsageStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('extensionClosingStatus', { static: true }) ExtensionClosingStatusSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRemovalRestorationDataOfClosedBuildingsDialog: any,
    @Optional() public dialogRef: MatDialogRef<RemovalRestorationDataOfClosedBuildingsEditComponent>,
    public removalRestorationDataOfClosedBuildingsService: RemovalRestorationDataOfClosedBuildingsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRemovalRestorationDataOfClosedBuildings = new RemovalRestorationDataOfClosedBuildings();
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
      
  id : [this.selectedRemovalRestorationDataOfClosedBuildings.id],
  schoolCode : [this.selectedRemovalRestorationDataOfClosedBuildings.schoolCode, [ Validators.required ]],
  extensionNumber : [this.selectedRemovalRestorationDataOfClosedBuildings.extensionNumber, [ Validators.required ]],
  closingDate : [this.selectedRemovalRestorationDataOfClosedBuildings.closingDate, [ Validators.required ]],
  decisionNumber : [this.selectedRemovalRestorationDataOfClosedBuildings.decisionNumber, [ Validators.required ]],
  decisionDate : [this.selectedRemovalRestorationDataOfClosedBuildings.decisionDate, [ Validators.required ]],
  removalDate : [this.selectedRemovalRestorationDataOfClosedBuildings.removalDate, [ Validators.required ]],
  usageStatus : [this.selectedRemovalRestorationDataOfClosedBuildings.usageStatus, [ Validators.required ]],
  extensionClosingStatus : [this.selectedRemovalRestorationDataOfClosedBuildings.extensionClosingStatus, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.removalRestorationDataOfClosedBuildingsService.update(this.removalRestorationDataOfClosedBuildingsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.removalRestorationDataOfClosedBuildingsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.removalRestorationDataOfClosedBuildingsForm.get(name);
  }

  initializeLookupServices() {
    this.usePositionsService = new LookupService('usepositions', this.http);
this.yesOrNosService = new LookupService('yesornos', this.http);
  }
}
