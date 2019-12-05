
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { BindingItemsWithElementsCodes } from 'app/shared/models/binding-items-with-elements-codes';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BindingItemsWithElementsCodesService } from '../shared/binding-items-with-elements-codes.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-binding-items-with-elements-codes-new',
  templateUrl: './binding-items-with-elements-codes-new.component.html',
  styleUrls: ['./binding-items-with-elements-codes-new.component.scss'],
  providers: [
    ]
})

export class BindingItemsWithElementsCodesNewComponent extends AppBaseComponent implements OnInit {
  bindingItemsWithElementsCodesForm: FormGroup;
  @Input() selectedBindingItemsWithElementsCodes: BindingItemsWithElementsCodes;
  errorMessages: FormControlError[] = [
        
  ];

  private itemCodesService: LookupService;
private elementsService: LookupService;

  
itemCodeSelectOptions: MaterialSelectOptions;
elementCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('elementCode', { static: true }) ElementCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<BindingItemsWithElementsCodesNewComponent>,
    public bindingItemsWithElementsCodesService: BindingItemsWithElementsCodesService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBindingItemsWithElementsCodes = new BindingItemsWithElementsCodes();

    
	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});

	this.elementCodeSelectOptions = new MaterialSelectOptions({
	 data: this.elementsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود العنصر',
	});


    this.bindingItemsWithElementsCodesForm = this.formBuilder.group({
     
  id : [0],
  itemCode : [this.selectedBindingItemsWithElementsCodes.itemCode, [ Validators.required ]],
  elementCode : [this.selectedBindingItemsWithElementsCodes.elementCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.bindingItemsWithElementsCodesService.create(this.bindingItemsWithElementsCodesForm.value)
        .pipe(switchMap(x => {
			return this.bindingItemsWithElementsCodesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.bindingItemsWithElementsCodesForm.get(name);
    }

  initializeLookupServices() {
    this.itemCodesService = new LookupService('itemcodes', this.http);
this.elementsService = new LookupService('elements', this.http);
  }
 }
