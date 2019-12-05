
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { PermissionFlashbackBookToTheBodyStore } from 'app/shared/models/permission-flashback-book-to-the-body-store';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PermissionFlashbackBookToTheBodyStoreService } from '../shared/permission-flashback-book-to-the-body-store.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-permission-flashback-book-to-the-body-store-new',
  templateUrl: './permission-flashback-book-to-the-body-store-new.component.html',
  styleUrls: ['./permission-flashback-book-to-the-body-store-new.component.scss'],
  providers: [
    ]
})

export class PermissionFlashbackBookToTheBodyStoreNewComponent extends AppBaseComponent implements OnInit {
  permissionFlashbackBookToTheBodyStoreForm: FormGroup;
  @Input() selectedPermissionFlashbackBookToTheBodyStore: PermissionFlashbackBookToTheBodyStore;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<PermissionFlashbackBookToTheBodyStoreNewComponent>,
    public permissionFlashbackBookToTheBodyStoreService: PermissionFlashbackBookToTheBodyStoreService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPermissionFlashbackBookToTheBodyStore = new PermissionFlashbackBookToTheBodyStore();

    

    this.permissionFlashbackBookToTheBodyStoreForm = this.formBuilder.group({
     
  id : [0],
  bookNumber : [this.selectedPermissionFlashbackBookToTheBodyStore.bookNumber, [ Validators.required ]],
  bookNumberBranch : [this.selectedPermissionFlashbackBookToTheBodyStore.bookNumberBranch, [ Validators.required ]],
  returnAuthorizationDate : [this.selectedPermissionFlashbackBookToTheBodyStore.returnAuthorizationDate, [ Validators.required ]],
  outgoingLibraryRecipient : [this.selectedPermissionFlashbackBookToTheBodyStore.outgoingLibraryRecipient, [ Validators.required ]],
  employeeCode : [this.selectedPermissionFlashbackBookToTheBodyStore.employeeCode, [ Validators.required ]],
  extensionNumber : [this.selectedPermissionFlashbackBookToTheBodyStore.extensionNumber, [ Validators.required ]],
  generalNumber : [this.selectedPermissionFlashbackBookToTheBodyStore.generalNumber, [ Validators.required ]],
  bookTitle : [this.selectedPermissionFlashbackBookToTheBodyStore.bookTitle, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.permissionFlashbackBookToTheBodyStoreService.create(this.permissionFlashbackBookToTheBodyStoreForm.value)
        .pipe(switchMap(x => {
			return this.permissionFlashbackBookToTheBodyStoreService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.permissionFlashbackBookToTheBodyStoreForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
