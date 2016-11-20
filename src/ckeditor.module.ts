import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CKEditorComponent } from './ckeditor.component';

/**
 * CKEditorModule
 */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CKEditorComponent,
  ],
  exports: [
    CKEditorComponent,
  ]
})
export class CKEditorModule { }
