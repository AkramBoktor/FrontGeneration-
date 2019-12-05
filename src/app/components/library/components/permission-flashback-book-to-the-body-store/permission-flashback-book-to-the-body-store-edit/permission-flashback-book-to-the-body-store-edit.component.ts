
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { PermissionFlashbackBookToTheBodyStore } from 'app/shared/models/permission-flashback-book-to-the-body-store';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { PermissionFlashbackBookToTheBodyStoreService } from '../shared/permission-flashback-book-to-the-body-store.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-permission-flashback-book-to-the-body-store-edit',
  templateUrl: './permission-flashback-book-to-the-body-store-edit.component.html',
  styleUrls: ['./permission-flashback-book-to-the-body-store-edit.component.scss'],
  providers: []
})

export class PermissionFlashbackBookToTheBodyStoreEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPermissionFlashbackBookToTheBodyStore: PermissionFlashbackBookToTheBodyStore;
  permissionFlashbackBookToTheBodyStoreForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPermissionFlashbackBookToTheBodyStoreDialog: any,
    @Optional() public dialogRef: MatDialogRef<PermissionFlashbackBookToTheBodyStoreEditComponent>,
    public permissionFlashbackBookToTheBodyStoreService: PermissionFlashbackBookToTheBodyStoreService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPermissionFlashbackBookToTheBodyStore = new PermissionFlashbackBookToTheBodyStore();
    this.selectedPermissionFlashbackBookToTheBodyStore = this.selectedPermissionFlashbackBookToTheBodyStoreDialog.data || this.selectedPermissionFlashbackBookToTheBodyStore;

    

    this.permissionFlashbackBookToTheBodyStoreForm = this.formBuilder.group({
      
  id : [this.selectedPermissionFlashbackBookToTheBodyStore.id],
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
    this.permissionFlashbackBookToTheBodyStoreService.update(this.permissionFlashbackBookToTheBodyStoreForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.permissionFlashbackBookToTheBodyStoreService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.permissionFlashbackBookToTheBodyStoreForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
