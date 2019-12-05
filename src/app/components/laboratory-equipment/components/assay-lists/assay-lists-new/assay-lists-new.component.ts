
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AssayLists } from 'app/shared/models/assay-lists';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AssayListsService } from '../shared/assay-lists.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-assay-lists-new',
  templateUrl: './assay-lists-new.component.html',
  styleUrls: ['./assay-lists-new.component.scss'],
  providers: [
    ]
})

export class AssayListsNewComponent extends AppBaseComponent implements OnInit {
  assayListsForm: FormGroup;
  @Input() selectedAssayLists: AssayLists;
  errorMessages: FormControlError[] = [
        
  ];

  private processingTypesService: LookupService;
private offeringMethodsService: LookupService;
private requiredQuantitiesService: LookupService;

  
processingTypeSelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;
requiredQuantitySelectOptions: MaterialSelectOptions;

  
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringMethod', { static: true }) OfferingMethodSelectComponent: MaterialSelectComponent;
	@ViewChild('requiredQuantity', { static: true }) RequiredQuantitySelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<AssayListsNewComponent>,
    public assayListsService: AssayListsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssayLists = new AssayLists();

    
	this.processingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجهيز',
	});

	this.offeringMethodSelectOptions = new MaterialSelectOptions({
	 data: this.offeringMethodsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'طريقة الطرح',
	});

	this.requiredQuantitySelectOptions = new MaterialSelectOptions({
	 data: this.requiredQuantitiesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الكمية المطلوبة',
	});


    this.assayListsForm = this.formBuilder.group({
     
  id : [0],
  assayNumber : [this.selectedAssayLists.assayNumber, [ ]],
  listNumber : [this.selectedAssayLists.listNumber, [ ]],
  listName : [this.selectedAssayLists.listName, [ ]],
  estimatedValue : [this.selectedAssayLists.estimatedValue, [ ]],
  processingType : [this.selectedAssayLists.processingType, [ ]],
  offeringMethod : [this.selectedAssayLists.offeringMethod, [ ]],
  requiredQuantity : [this.selectedAssayLists.requiredQuantity, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.assayListsService.create(this.assayListsForm.value)
        .pipe(switchMap(x => {
			return this.assayListsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.assayListsForm.get(name);
    }

  initializeLookupServices() {
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
this.requiredQuantitiesService = new LookupService('requiredquantities', this.http);
  }
 }
