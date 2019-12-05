
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { TypicalAssayLists } from 'app/shared/models/typical-assay-lists';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TypicalAssayListsService } from '../shared/typical-assay-lists.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-typical-assay-lists-new',
  templateUrl: './typical-assay-lists-new.component.html',
  styleUrls: ['./typical-assay-lists-new.component.scss'],
  providers: [
    ]
})

export class TypicalAssayListsNewComponent extends AppBaseComponent implements OnInit {
  typicalAssayListsForm: FormGroup;
  @Input() selectedTypicalAssayLists: TypicalAssayLists;
  errorMessages: FormControlError[] = [
        
  ];

  private requiredQuantitiesService: LookupService;
private offeringMethodsService: LookupService;
private processingTypesService: LookupService;

  
requiredQuantitySelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;
processingTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('requiredQuantity', { static: true }) RequiredQuantitySelectComponent: MaterialSelectComponent;
	@ViewChild('offeringMethod', { static: true }) OfferingMethodSelectComponent: MaterialSelectComponent;
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<TypicalAssayListsNewComponent>,
    public typicalAssayListsService: TypicalAssayListsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTypicalAssayLists = new TypicalAssayLists();

    
	this.requiredQuantitySelectOptions = new MaterialSelectOptions({
	 data: this.requiredQuantitiesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الكمية المطلوبة',
	});

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


    this.typicalAssayListsForm = this.formBuilder.group({
     
  id : [0],
  estimatedValue : [this.selectedTypicalAssayLists.estimatedValue, [ ]],
  listName : [this.selectedTypicalAssayLists.listName, [ ]],
  listNumber : [this.selectedTypicalAssayLists.listNumber, [ ]],
  assayNumber : [this.selectedTypicalAssayLists.assayNumber, [ Validators.required ]],
  requiredQuantity : [this.selectedTypicalAssayLists.requiredQuantity, [ Validators.required ]],
  offeringMethod : [this.selectedTypicalAssayLists.offeringMethod, [ ]],
  processingType : [this.selectedTypicalAssayLists.processingType, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.typicalAssayListsService.create(this.typicalAssayListsForm.value)
        .pipe(switchMap(x => {
			return this.typicalAssayListsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.typicalAssayListsForm.get(name);
    }

  initializeLookupServices() {
    this.requiredQuantitiesService = new LookupService('requiredquantities', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
this.processingTypesService = new LookupService('processingtypes', this.http);
  }
 }
