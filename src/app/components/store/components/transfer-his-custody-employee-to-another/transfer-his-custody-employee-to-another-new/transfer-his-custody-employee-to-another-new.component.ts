
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TransferHisCustodyEmployeeToAnother } from 'app/shared/models/transfer-his-custody-employee-to-another';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { TransferHisCustodyEmployeeToAnotherService } from '../shared/transfer-his-custody-employee-to-another.service';


@Component({
  selector: 'app-transfer-his-custody-employee-to-another-new',
  templateUrl: './transfer-his-custody-employee-to-another-new.component.html',
  styleUrls: ['./transfer-his-custody-employee-to-another-new.component.scss'],
  providers: [
    ]
})

export class TransferHisCustodyEmployeeToAnotherNewComponent extends AppBaseComponent implements OnInit {
  transferHisCustodyEmployeeToAnotherForm: FormGroup;
  @Input() selectedTransferHisCustodyEmployeeToAnother: TransferHisCustodyEmployeeToAnother;
  errorMessages: FormControlError[] = [
        
  ];

  private itemStatusesService: LookupService;

  
itemConditionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('itemCondition', { static: true }) ItemConditionSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<TransferHisCustodyEmployeeToAnotherNewComponent>,
    public transferHisCustodyEmployeeToAnotherService: TransferHisCustodyEmployeeToAnotherService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTransferHisCustodyEmployeeToAnother = new TransferHisCustodyEmployeeToAnother();

    
	this.itemConditionSelectOptions = new MaterialSelectOptions({
	 data: this.itemStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الصنف',
	});


    this.transferHisCustodyEmployeeToAnotherForm = this.formBuilder.group({
     
  id : [0],
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
    this.transferHisCustodyEmployeeToAnotherService.create(this.transferHisCustodyEmployeeToAnotherForm.value)
        .pipe(switchMap(x => {
			return this.transferHisCustodyEmployeeToAnotherService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.transferHisCustodyEmployeeToAnotherForm.get(name);
    }

  initializeLookupServices() {
    this.itemStatusesService = new LookupService('itemstatuses', this.http);
  }
 }
