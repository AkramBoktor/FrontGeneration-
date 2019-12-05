
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TransferOfSupplyOrdersFromSchoolsClosure } from 'app/shared/models/transfer-of-supply-orders-from-schools-closure';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { TransferOfSupplyOrdersFromSchoolsClosureService } from '../shared/transfer-of-supply-orders-from-schools-closure.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-transfer-of-supply-orders-from-schools-closure-edit',
  templateUrl: './transfer-of-supply-orders-from-schools-closure-edit.component.html',
  styleUrls: ['./transfer-of-supply-orders-from-schools-closure-edit.component.scss'],
  providers: []
})

export class TransferOfSupplyOrdersFromSchoolsClosureEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTransferOfSupplyOrdersFromSchoolsClosure: TransferOfSupplyOrdersFromSchoolsClosure;
  transferOfSupplyOrdersFromSchoolsClosureForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private closureTypesService: LookupService;

  
closureTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('closureType', { static: true }) ClosureTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTransferOfSupplyOrdersFromSchoolsClosureDialog: any,
    @Optional() public dialogRef: MatDialogRef<TransferOfSupplyOrdersFromSchoolsClosureEditComponent>,
    public transferOfSupplyOrdersFromSchoolsClosureService: TransferOfSupplyOrdersFromSchoolsClosureService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTransferOfSupplyOrdersFromSchoolsClosure = new TransferOfSupplyOrdersFromSchoolsClosure();
    this.selectedTransferOfSupplyOrdersFromSchoolsClosure = this.selectedTransferOfSupplyOrdersFromSchoolsClosureDialog.data || this.selectedTransferOfSupplyOrdersFromSchoolsClosure;

    
	this.closureTypeSelectOptions = new MaterialSelectOptions({
	 data: this.closureTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الاغلاق',
	});


    this.transferOfSupplyOrdersFromSchoolsClosureForm = this.formBuilder.group({
      
  id : [this.selectedTransferOfSupplyOrdersFromSchoolsClosure.id],
  closedBuildingNumber : [this.selectedTransferOfSupplyOrdersFromSchoolsClosure.closedBuildingNumber, [ ]],
  buildingNumberTransferred : [this.selectedTransferOfSupplyOrdersFromSchoolsClosure.buildingNumberTransferred, [ ]],
  annexNumber : [this.selectedTransferOfSupplyOrdersFromSchoolsClosure.annexNumber, [ ]],
  closureType : [this.selectedTransferOfSupplyOrdersFromSchoolsClosure.closureType, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.transferOfSupplyOrdersFromSchoolsClosureService.update(this.transferOfSupplyOrdersFromSchoolsClosureForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.transferOfSupplyOrdersFromSchoolsClosureService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.transferOfSupplyOrdersFromSchoolsClosureForm.get(name);
  }

  initializeLookupServices() {
    this.closureTypesService = new LookupService('closuretypes', this.http);
  }
}
