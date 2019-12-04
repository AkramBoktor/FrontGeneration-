
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { TypicalItemsOfAssayLists } from 'app/shared/models/typical-items-of-assay-lists';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TypicalItemsOfAssayListsService } from '../shared/typical-items-of-assay-lists.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-typical-items-of-assay-lists-new',
  templateUrl: './typical-items-of-assay-lists-new.component.html',
  styleUrls: ['./typical-items-of-assay-lists-new.component.scss'],
  providers: [
    ]
})

export class TypicalItemsOfAssayListsNewComponent extends AppBaseComponent implements OnInit {
  typicalItemsOfAssayListsForm: FormGroup;
  @Input() selectedTypicalItemsOfAssayLists: TypicalItemsOfAssayLists;
  errorMessages: FormControlError[] = [
        
  ];

  private offeringMethodsService: LookupService;
private processingTypesService: LookupService;

  
offeringMethodSelectOptions: MaterialSelectOptions;
processingTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringMethod', { static: true }) OfferingMethodSelectComponent: MaterialSelectComponent;
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<TypicalItemsOfAssayListsNewComponent>,
    public typicalItemsOfAssayListsService: TypicalItemsOfAssayListsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTypicalItemsOfAssayLists = new TypicalItemsOfAssayLists();

    
	this.offeringMethodSelectOptions = new MaterialSelectOptions({
	 data: this.offeringMethodsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'طريقة الطرح',
	});

	this.processingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجهيز',
	});


    this.typicalItemsOfAssayListsForm = this.formBuilder.group({
     
  id : [0],
  estimatedValue : [this.selectedTypicalItemsOfAssayLists.estimatedValue, [ Validators.required ]],
  itemQuantity : [this.selectedTypicalItemsOfAssayLists.itemQuantity, [ Validators.required ]],
  listNumber : [this.selectedTypicalItemsOfAssayLists.listNumber, [ Validators.required ]],
  assayNumber : [this.selectedTypicalItemsOfAssayLists.assayNumber, [ Validators.required ]],
  itemNo : [this.selectedTypicalItemsOfAssayLists.itemNo, [ Validators.required ]],
  offeringMethod : [this.selectedTypicalItemsOfAssayLists.offeringMethod, [ ]],
  processingType : [this.selectedTypicalItemsOfAssayLists.processingType, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.typicalItemsOfAssayListsService.create(this.typicalItemsOfAssayListsForm.value)
        .pipe(switchMap(x => {
			return this.typicalItemsOfAssayListsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.typicalItemsOfAssayListsForm.get(name);
    }

  initializeLookupServices() {
    this.offeringMethodsService = new LookupService('offeringmethods', this.http);
this.processingTypesService = new LookupService('processingtypes', this.http);
  }
 }
