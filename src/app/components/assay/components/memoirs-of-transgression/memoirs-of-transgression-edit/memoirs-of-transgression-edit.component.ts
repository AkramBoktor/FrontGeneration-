
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MemoirsOfTransgression } from 'app/shared/models/memoirs-of-transgression';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { MemoirsOfTransgressionService } from '../shared/memoirs-of-transgression.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-memoirs-of-transgression-edit',
  templateUrl: './memoirs-of-transgression-edit.component.html',
  styleUrls: ['./memoirs-of-transgression-edit.component.scss'],
  providers: []
})

export class MemoirsOfTransgressionEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedMemoirsOfTransgression: MemoirsOfTransgression;
  memoirsOfTransgressionForm: FormGroup;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedMemoirsOfTransgressionDialog: any,
    @Optional() public dialogRef: MatDialogRef<MemoirsOfTransgressionEditComponent>,
    public memoirsOfTransgressionService: MemoirsOfTransgressionService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMemoirsOfTransgression = new MemoirsOfTransgression();
    this.selectedMemoirsOfTransgression = this.selectedMemoirsOfTransgressionDialog.data || this.selectedMemoirsOfTransgression;

    
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
      
  id : [this.selectedMemoirsOfTransgression.id],
  buildingCode : [this.selectedMemoirsOfTransgression.buildingCode, [ Validators.required ]],
  bidNumber : [this.selectedMemoirsOfTransgression.bidNumber, [ Validators.required ]],
  planYear : [this.selectedMemoirsOfTransgression.planYear, [ Validators.required ]],
  noteNumber : [this.selectedMemoirsOfTransgression.noteNumber, [ Validators.required ]],
  attachment : [this.selectedMemoirsOfTransgression.attachment, [ Validators.required ]],
  itemName : [this.selectedMemoirsOfTransgression.itemName, [ Validators.required ]],
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
    this.memoirsOfTransgressionService.update(this.memoirsOfTransgressionForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.memoirsOfTransgressionService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.memoirsOfTransgressionForm.get(name);
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
  }
}
