
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ConditionsNotebookData } from 'app/shared/models/conditions-notebook-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ConditionsNotebookDataService } from '../shared/conditions-notebook-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-conditions-notebook-data-new',
  templateUrl: './conditions-notebook-data-new.component.html',
  styleUrls: ['./conditions-notebook-data-new.component.scss'],
  providers: [
    ]
})

export class ConditionsNotebookDataNewComponent extends AppBaseComponent implements OnInit {
  conditionsNotebookDataForm: FormGroup;
  @Input() selectedConditionsNotebookData: ConditionsNotebookData;
  errorMessages: FormControlError[] = [
        
  ];

  private offeringTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ConditionsNotebookDataNewComponent>,
    public conditionsNotebookDataService: ConditionsNotebookDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedConditionsNotebookData = new ConditionsNotebookData();

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.conditionsNotebookDataForm = this.formBuilder.group({
     
  id : [0],
  bidNumber : [this.selectedConditionsNotebookData.bidNumber, [ Validators.required ]],
  project : [this.selectedConditionsNotebookData.project, [ Validators.required ]],
  supplier : [this.selectedConditionsNotebookData.supplier, [ Validators.required ]],
  brochureValue : [this.selectedConditionsNotebookData.brochureValue, [ Validators.required ]],
  brochureNo : [this.selectedConditionsNotebookData.brochureNo, [ Validators.required ]],
  brochurePurchaseDate : [this.selectedConditionsNotebookData.brochurePurchaseDate, [ Validators.required ]],
  offeringType : [this.selectedConditionsNotebookData.offeringType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.conditionsNotebookDataService.create(this.conditionsNotebookDataForm.value)
        .pipe(switchMap(x => {
			return this.conditionsNotebookDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.conditionsNotebookDataForm.get(name);
    }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
 }
