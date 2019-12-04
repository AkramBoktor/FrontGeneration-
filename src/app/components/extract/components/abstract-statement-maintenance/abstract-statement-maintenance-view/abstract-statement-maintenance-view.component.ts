
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { AbstractStatementMaintenance } from 'app/shared/models/abstract-statement-maintenance';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { AbstractStatementMaintenanceService } from '../shared/abstract-statement-maintenance.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-abstract-statement-maintenance-view',
  templateUrl: './abstract-statement-maintenance-view.component.html',
  styleUrls: ['./abstract-statement-maintenance-view.component.scss'],
  providers: []
})

export class AbstractStatementMaintenanceViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAbstractStatementMaintenance: AbstractStatementMaintenance;
  abstractStatementMaintenanceForm: FormGroup;

  private maintenanceTypesService: LookupService;
private offeringTypesService: LookupService;
private extractTypesService: LookupService;
private workTypesService: LookupService;
private itemCodesService: LookupService;

  
maintenanceTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
abstractTypeSelectOptions: MaterialSelectOptions;
workTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAbstractStatementMaintenanceDialog: any,
    @Optional() public dialogRef: MatDialogRef<AbstractStatementMaintenanceViewComponent>,
    public abstractStatementMaintenanceService: AbstractStatementMaintenanceService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAbstractStatementMaintenance = this.selectedAbstractStatementMaintenanceDialog.data || this.selectedAbstractStatementMaintenance;

    
	this.maintenanceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.maintenanceTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الصيانة',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.abstractTypeSelectOptions = new MaterialSelectOptions({
	 data: this.extractTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المستخلص',
	});

	this.workTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل',
	});

	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});


    this.abstractStatementMaintenanceForm = this.formBuilder.group({
      
  buildingCode : [this.selectedAbstractStatementMaintenance.buildingCode],
  abstractNumber : [this.selectedAbstractStatementMaintenance.abstractNumber],
  contractorName : [this.selectedAbstractStatementMaintenance.contractorName],
  siteDeliveryDate : [this.selectedAbstractStatementMaintenance.siteDeliveryDate],
  planYear : [this.selectedAbstractStatementMaintenance.planYear],
  bidNumber : [this.selectedAbstractStatementMaintenance.bidNumber],
  endPrevious : [this.selectedAbstractStatementMaintenance.endPrevious],
  businessEnd : [this.selectedAbstractStatementMaintenance.businessEnd],
  extensionNumber : [this.selectedAbstractStatementMaintenance.extensionNumber],
  itemName : [this.selectedAbstractStatementMaintenance.itemName],
  contractQuantity : [this.selectedAbstractStatementMaintenance.contractQuantity],
  totalQuantity : [this.selectedAbstractStatementMaintenance.totalQuantity],
  maintenanceType : [this.selectedAbstractStatementMaintenance.maintenanceType],
  offeringType : [this.selectedAbstractStatementMaintenance.offeringType],
  abstractType : [this.selectedAbstractStatementMaintenance.abstractType],
  workType : [this.selectedAbstractStatementMaintenance.workType],
  itemCode : [this.selectedAbstractStatementMaintenance.itemCode]
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
    return this.abstractStatementMaintenanceForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.abstractStatementMaintenanceForm.controls)) {
      this.abstractStatementMaintenanceForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.maintenanceTypesService = new LookupService('maintenancetypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.extractTypesService = new LookupService('extracttypes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
  }
}

