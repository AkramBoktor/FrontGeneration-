
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AbstractStatementMaintenance } from 'app/shared/models/abstract-statement-maintenance';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { AbstractStatementMaintenanceService } from '../shared/abstract-statement-maintenance.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-abstract-statement-maintenance-edit',
  templateUrl: './abstract-statement-maintenance-edit.component.html',
  styleUrls: ['./abstract-statement-maintenance-edit.component.scss'],
  providers: []
})

export class AbstractStatementMaintenanceEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAbstractStatementMaintenance: AbstractStatementMaintenance;
  abstractStatementMaintenanceForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private itemCodesService: LookupService;
private workTypesService: LookupService;
private extractTypesService: LookupService;
private offeringTypesService: LookupService;
private maintenanceTypesService: LookupService;

  
itemCodeSelectOptions: MaterialSelectOptions;
workTypeSelectOptions: MaterialSelectOptions;
abstractTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
maintenanceTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('workType', { static: true }) WorkTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('abstractType', { static: true }) AbstractTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('maintenanceType', { static: true }) MaintenanceTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAbstractStatementMaintenanceDialog: any,
    @Optional() public dialogRef: MatDialogRef<AbstractStatementMaintenanceEditComponent>,
    public abstractStatementMaintenanceService: AbstractStatementMaintenanceService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAbstractStatementMaintenance = new AbstractStatementMaintenance();
    this.selectedAbstractStatementMaintenance = this.selectedAbstractStatementMaintenanceDialog.data || this.selectedAbstractStatementMaintenance;

    
	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});

	this.workTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل',
	});

	this.abstractTypeSelectOptions = new MaterialSelectOptions({
	 data: this.extractTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المستخلص',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.maintenanceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.maintenanceTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الصيانة',
	});


    this.abstractStatementMaintenanceForm = this.formBuilder.group({
      
  id : [this.selectedAbstractStatementMaintenance.id],
  buildingCode : [this.selectedAbstractStatementMaintenance.buildingCode, [ Validators.required ]],
  itemName : [this.selectedAbstractStatementMaintenance.itemName, [ ]],
  extensionNumber : [this.selectedAbstractStatementMaintenance.extensionNumber, [ Validators.required ]],
  businessEnd : [this.selectedAbstractStatementMaintenance.businessEnd, [ Validators.required ]],
  contractQuantity : [this.selectedAbstractStatementMaintenance.contractQuantity, [ ]],
  endPrevious : [this.selectedAbstractStatementMaintenance.endPrevious, [ ]],
  planYear : [this.selectedAbstractStatementMaintenance.planYear, [ ]],
  siteDeliveryDate : [this.selectedAbstractStatementMaintenance.siteDeliveryDate, [ ]],
  contractorName : [this.selectedAbstractStatementMaintenance.contractorName, [ Validators.required ]],
  abstractNumber : [this.selectedAbstractStatementMaintenance.abstractNumber, [ Validators.required ]],
  bidNumber : [this.selectedAbstractStatementMaintenance.bidNumber, [ Validators.required ]],
  totalQuantity : [this.selectedAbstractStatementMaintenance.totalQuantity, [ Validators.required ]],
  itemCode : [this.selectedAbstractStatementMaintenance.itemCode, [ Validators.required ]],
  workType : [this.selectedAbstractStatementMaintenance.workType, [ Validators.required ]],
  abstractType : [this.selectedAbstractStatementMaintenance.abstractType, [ Validators.required ]],
  offeringType : [this.selectedAbstractStatementMaintenance.offeringType, [ Validators.required ]],
  maintenanceType : [this.selectedAbstractStatementMaintenance.maintenanceType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.abstractStatementMaintenanceService.update(this.abstractStatementMaintenanceForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.abstractStatementMaintenanceService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.abstractStatementMaintenanceForm.get(name);
  }

  initializeLookupServices() {
    this.itemCodesService = new LookupService('itemcodes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
this.extractTypesService = new LookupService('extracttypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.maintenanceTypesService = new LookupService('maintenancetypes', this.http);
  }
}
