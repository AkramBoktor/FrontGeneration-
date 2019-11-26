
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { MemoirsOfTransgression } from 'app/shared/models/memoirs-of-transgression';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { MemoirsOfTransgressionService } from '../shared/memoirs-of-transgression.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-memoirs-of-transgression-new',
  templateUrl: './memoirs-of-transgression-new.component.html',
  styleUrls: ['./memoirs-of-transgression-new.component.scss'],
  providers: [
    ]
})

export class MemoirsOfTransgressionNewComponent extends AppBaseComponent implements OnInit {
  memoirsOfTransgressionForm: FormGroup;
  @Input() selectedMemoirsOfTransgression: MemoirsOfTransgression;
  errorMessages: FormControlError[] = [
        
  ];

  private offeringTypesService: LookupService;
private constructionTypesService: LookupService;
private itemCodesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<MemoirsOfTransgressionNewComponent>,
    public memoirsOfTransgressionService: MemoirsOfTransgressionService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMemoirsOfTransgression = new MemoirsOfTransgression();

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});


    this.memoirsOfTransgressionForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedMemoirsOfTransgression.buildingCode, [ Validators.required ]],
  bidNumber : [this.selectedMemoirsOfTransgression.bidNumber, [ Validators.required ]],
  planYear : [this.selectedMemoirsOfTransgression.planYear, [ Validators.required ]],
  noteNumber : [this.selectedMemoirsOfTransgression.noteNumber, [ Validators.required ]],
  attachment : [this.selectedMemoirsOfTransgression.attachment, [ Validators.required ]],
  itemName : [this.selectedMemoirsOfTransgression.itemName, [ ]],
  price : [this.selectedMemoirsOfTransgression.price, [ Validators.required ]],
  overtakingAmount : [this.selectedMemoirsOfTransgression.overtakingAmount, [ Validators.required ]],
  offeringType : [this.selectedMemoirsOfTransgression.offeringType, [ Validators.required ]],
  constructionType : [this.selectedMemoirsOfTransgression.constructionType, [ Validators.required ]],
  itemCode : [this.selectedMemoirsOfTransgression.itemCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.memoirsOfTransgressionService.create(this.memoirsOfTransgressionForm.value)
        .pipe(switchMap(x => {
			return this.memoirsOfTransgressionService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.memoirsOfTransgressionForm.get(name);
    }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
  }
 }
