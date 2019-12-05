
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { TransferOfSupplyOrdersFromSchoolsClosure } from 'app/shared/models/transfer-of-supply-orders-from-schools-closure';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TransferOfSupplyOrdersFromSchoolsClosureService } from '../shared/transfer-of-supply-orders-from-schools-closure.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-transfer-of-supply-orders-from-schools-closure-new',
  templateUrl: './transfer-of-supply-orders-from-schools-closure-new.component.html',
  styleUrls: ['./transfer-of-supply-orders-from-schools-closure-new.component.scss'],
  providers: [
    ]
})

export class TransferOfSupplyOrdersFromSchoolsClosureNewComponent extends AppBaseComponent implements OnInit {
  transferOfSupplyOrdersFromSchoolsClosureForm: FormGroup;
  @Input() selectedTransferOfSupplyOrdersFromSchoolsClosure: TransferOfSupplyOrdersFromSchoolsClosure;
  errorMessages: FormControlError[] = [
        
  ];

  private closureTypesService: LookupService;

  
closureTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('closureType', { static: true }) ClosureTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<TransferOfSupplyOrdersFromSchoolsClosureNewComponent>,
    public transferOfSupplyOrdersFromSchoolsClosureService: TransferOfSupplyOrdersFromSchoolsClosureService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTransferOfSupplyOrdersFromSchoolsClosure = new TransferOfSupplyOrdersFromSchoolsClosure();

    
	this.closureTypeSelectOptions = new MaterialSelectOptions({
	 data: this.closureTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الاغلاق',
	});


    this.transferOfSupplyOrdersFromSchoolsClosureForm = this.formBuilder.group({
     
  id : [0],
  closedBuildingNumber : [this.selectedTransferOfSupplyOrdersFromSchoolsClosure.closedBuildingNumber, [ ]],
  buildingNumberTransferred : [this.selectedTransferOfSupplyOrdersFromSchoolsClosure.buildingNumberTransferred, [ ]],
  annexNumber : [this.selectedTransferOfSupplyOrdersFromSchoolsClosure.annexNumber, [ ]],
  closureType : [this.selectedTransferOfSupplyOrdersFromSchoolsClosure.closureType, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.transferOfSupplyOrdersFromSchoolsClosureService.create(this.transferOfSupplyOrdersFromSchoolsClosureForm.value)
        .pipe(switchMap(x => {
			return this.transferOfSupplyOrdersFromSchoolsClosureService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.transferOfSupplyOrdersFromSchoolsClosureForm.get(name);
    }

  initializeLookupServices() {
    this.closureTypesService = new LookupService('closuretypes', this.http);
  }
 }
