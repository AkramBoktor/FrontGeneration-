
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { IndexationOpening } from 'app/shared/models/indexation-opening';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { IndexationOpeningService } from '../shared/indexation-opening.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-indexation-opening-new',
  templateUrl: './indexation-opening-new.component.html',
  styleUrls: ['./indexation-opening-new.component.scss'],
  providers: [
    ]
})

export class IndexationOpeningNewComponent extends AppBaseComponent implements OnInit {
  indexationOpeningForm: FormGroup;
  @Input() selectedIndexationOpening: IndexationOpening;
  errorMessages: FormControlError[] = [
        
  ];

  private modelCodesService: LookupService;
private constructionTypesService: LookupService;
private workTypesService: LookupService;

  
modelCodeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
jopTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('modelCode', { static: true }) ModelCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('jopType', { static: true }) JopTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<IndexationOpeningNewComponent>,
    public indexationOpeningService: IndexationOpeningService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedIndexationOpening = new IndexationOpening();

    
	this.modelCodeSelectOptions = new MaterialSelectOptions({
	 data: this.modelCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود النموذج',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.jopTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل',
	});


    this.indexationOpeningForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedIndexationOpening.buildingCode, [ Validators.required ]],
  extensionCode : [this.selectedIndexationOpening.extensionCode, [ ]],
  planYear : [this.selectedIndexationOpening.planYear, [ Validators.required ]],
  pricingYear : [this.selectedIndexationOpening.pricingYear, [ ]],
  itemCode : [this.selectedIndexationOpening.itemCode, [ Validators.required ]],
  itemName : [this.selectedIndexationOpening.itemName, [ ]],
  quantity : [this.selectedIndexationOpening.quantity, [ Validators.required ]],
  price : [this.selectedIndexationOpening.price, [ ]],
  modelCode : [this.selectedIndexationOpening.modelCode, [ ]],
  constructionType : [this.selectedIndexationOpening.constructionType, [ Validators.required ]],
  jopType : [this.selectedIndexationOpening.jopType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.indexationOpeningService.create(this.indexationOpeningForm.value)
        .pipe(switchMap(x => {
			return this.indexationOpeningService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.indexationOpeningForm.get(name);
    }

  initializeLookupServices() {
    this.modelCodesService = new LookupService('modelcodes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
  }
 }
