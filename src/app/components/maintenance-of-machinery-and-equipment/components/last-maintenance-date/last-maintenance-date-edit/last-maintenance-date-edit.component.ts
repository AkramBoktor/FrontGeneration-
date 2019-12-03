
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LastMaintenanceDate } from 'app/shared/models/last-maintenance-date';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { LastMaintenanceDateService } from '../shared/last-maintenance-date.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-last-maintenance-date-edit',
  templateUrl: './last-maintenance-date-edit.component.html',
  styleUrls: ['./last-maintenance-date-edit.component.scss'],
  providers: []
})

export class LastMaintenanceDateEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedLastMaintenanceDate: LastMaintenanceDate;
  lastMaintenanceDateForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private buildingTypesService: LookupService;
private equipmentGroupsService: LookupService;
private equipmentTypesService: LookupService;

  
buildingTypeSelectOptions: MaterialSelectOptions;
equipmentGroupSelectOptions: MaterialSelectOptions;
equipmentTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('buildingType', { static: true }) BuildingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('equipmentGroup', { static: true }) EquipmentGroupSelectComponent: MaterialSelectComponent;
	@ViewChild('equipmentType', { static: true }) EquipmentTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLastMaintenanceDateDialog: any,
    @Optional() public dialogRef: MatDialogRef<LastMaintenanceDateEditComponent>,
    public lastMaintenanceDateService: LastMaintenanceDateService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLastMaintenanceDate = new LastMaintenanceDate();
    this.selectedLastMaintenanceDate = this.selectedLastMaintenanceDateDialog.data || this.selectedLastMaintenanceDate;

    
	this.buildingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.buildingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المبنى',
	});

	this.equipmentGroupSelectOptions = new MaterialSelectOptions({
	 data: this.equipmentGroupsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مجموعة المعدات',
	});

	this.equipmentTypeSelectOptions = new MaterialSelectOptions({
	 data: this.equipmentTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المعدة',
	});


    this.lastMaintenanceDateForm = this.formBuilder.group({
      
  id : [this.selectedLastMaintenanceDate.id],
  equipmentNumber : [this.selectedLastMaintenanceDate.equipmentNumber, [ Validators.required ]],
  mainMaintenanceItem : [this.selectedLastMaintenanceDate.mainMaintenanceItem, [ Validators.required ]],
  lastDateMaintenance : [this.selectedLastMaintenanceDate.lastDateMaintenance, [ Validators.required ]],
  buildingType : [this.selectedLastMaintenanceDate.buildingType, [ Validators.required ]],
  equipmentGroup : [this.selectedLastMaintenanceDate.equipmentGroup, [ Validators.required ]],
  equipmentType : [this.selectedLastMaintenanceDate.equipmentType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.lastMaintenanceDateService.update(this.lastMaintenanceDateForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.lastMaintenanceDateService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.lastMaintenanceDateForm.get(name);
  }

  initializeLookupServices() {
    this.buildingTypesService = new LookupService('buildingtypes', this.http);
this.equipmentGroupsService = new LookupService('equipmentgroups', this.http);
this.equipmentTypesService = new LookupService('equipmenttypes', this.http);
  }
}
