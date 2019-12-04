
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LinkItemsToObjectCodes } from 'app/shared/models/link-items-to-object-codes';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { LinkItemsToObjectCodesService } from '../shared/link-items-to-object-codes.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-link-items-to-object-codes-new',
  templateUrl: './link-items-to-object-codes-new.component.html',
  styleUrls: ['./link-items-to-object-codes-new.component.scss'],
  providers: [
    ]
})

export class LinkItemsToObjectCodesNewComponent extends AppBaseComponent implements OnInit {
  linkItemsToObjectCodesForm: FormGroup;
  @Input() selectedLinkItemsToObjectCodes: LinkItemsToObjectCodes;
  errorMessages: FormControlError[] = [
        
  ];

  private itemCodesService: LookupService;
private elementsService: LookupService;

  
itemCodeSelectOptions: MaterialSelectOptions;
elementCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('elementCode', { static: true }) ElementCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<LinkItemsToObjectCodesNewComponent>,
    public linkItemsToObjectCodesService: LinkItemsToObjectCodesService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLinkItemsToObjectCodes = new LinkItemsToObjectCodes();

    
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


    this.linkItemsToObjectCodesForm = this.formBuilder.group({
     
  id : [0],
  itemCode : [this.selectedLinkItemsToObjectCodes.itemCode, [ Validators.required ]],
  elementCode : [this.selectedLinkItemsToObjectCodes.elementCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.linkItemsToObjectCodesService.create(this.linkItemsToObjectCodesForm.value)
        .pipe(switchMap(x => {
			return this.linkItemsToObjectCodesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.linkItemsToObjectCodesForm.get(name);
    }

  initializeLookupServices() {
    this.itemCodesService = new LookupService('itemcodes', this.http);
this.elementsService = new LookupService('elements', this.http);
  }
 }
