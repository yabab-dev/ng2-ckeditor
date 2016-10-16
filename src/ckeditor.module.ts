import { NgModule } from '@angular/core';

import { CKEditorComponent } from './ckeditor.component';

/**
 * CKEditorModule
 */
@NgModule({
  declarations: [
    CKEditorComponent,
  ],
  exports: [
    CKEditorComponent,
  ]
})
export class CKEditorModule { }
