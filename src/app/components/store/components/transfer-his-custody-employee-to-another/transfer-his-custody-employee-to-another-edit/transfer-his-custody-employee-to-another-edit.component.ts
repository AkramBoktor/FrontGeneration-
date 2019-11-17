
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TransferHisCustodyEmployeeToAnother } from 'app/shared/models/transfer-his-custody-employee-to-another';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { TransferHisCustodyEmployeeToAnotherService } from '../shared/transfer-his-custody-employee-to-another.service';




@Component({
  selector: 'app-transfer-his-custody-employee-to-another-edit',
  templateUrl: './transfer-his-custody-employee-to-another-edit.component.html',
  styleUrls: ['./transfer-his-custody-employee-to-another-edit.component.scss'],
  providers: []
})

export class TransferHisCustodyEmployeeToAnotherEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTransferHisCustodyEmployeeToAnother: TransferHisCustodyEmployeeToAnother;
  transferHisCustodyEmployeeToAnotherForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private itemStatusesService: LookupService;

  
itemConditionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('itemCondition', { static: true }) ItemConditionSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTransferHisCustodyEmployeeToAnotherDialog: any,
    @Optional() public dialogRef: MatDialogRef<TransferHisCustodyEmployeeToAnotherEditComponent>,
    public transferHisCustodyEmployeeToAnotherService: TransferHisCustodyEmployeeToAnotherService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTransferHisCustodyEmployeeToAnother = new TransferHisCustodyEmployeeToAnother();
    this.selectedTransferHisCustodyEmployeeToAnother = this.selectedTransferHisCustodyEmployeeToAnotherDialog.data || this.selectedTransferHisCustodyEmployeeToAnother;

    
	this.itemConditionSelectOptions = new MaterialSelectOptions({
	 data: this.itemStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الصنف',
	});


    this.transferHisCustodyEmployeeToAnotherForm = this.formBuilder.group({
      
  id : [this.selectedTransferHisCustodyEmployeeToAnother.id],
  carrierEmployeeNumber : [this.selectedTransferHisCustodyEmployeeToAnother.carrierEmployeeNumber, [ Validators.required ]],
  recipientEmployeeNumber : [this.selectedTransferHisCustodyEmployeeToAnother.recipientEmployeeNumber, [ Validators.required ]],
  itemNo : [this.selectedTransferHisCustodyEmployeeToAnother.itemNo, [ Validators.required ]],
  lastPrice : [this.selectedTransferHisCustodyEmployeeToAnother.lastPrice, [ ]],
  storeNumber : [this.selectedTransferHisCustodyEmployeeToAnother.storeNumber, [ ]],
  exchangeAuthorizationNumber : [this.selectedTransferHisCustodyEmployeeToAnother.exchangeAuthorizationNumber, [ ]],
  exchangeDate : [this.selectedTransferHisCustodyEmployeeToAnother.exchangeDate, [ ]],
  quantity : [this.selectedTransferHisCustodyEmployeeToAnother.quantity, [ ]],
  transferDate : [this.selectedTransferHisCustodyEmployeeToAnother.transferDate, [ Validators.required ]],
  quantityTransferred : [this.selectedTransferHisCustodyEmployeeToAnother.quantityTransferred, [ Validators.required ]],
  itemCondition : [this.selectedTransferHisCustodyEmployeeToAnother.itemCondition, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.transferHisCustodyEmployeeToAnotherService.update(this.transferHisCustodyEmployeeToAnotherForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.transferHisCustodyEmployeeToAnotherService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.transferHisCustodyEmployeeToAnotherForm.get(name);
  }

  initializeLookupServices() {
    this.itemStatusesService = new LookupService('itemstatuses', this.http);
  }
}
