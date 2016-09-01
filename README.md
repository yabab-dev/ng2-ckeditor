# Angular2 - CKEditor component

Use the [CKEditor (4.x)](http://ckeditor.com/) wysiwyg in your Angular2 application.
(Works with RC6)

### <a name="install"></a>Installation

- Include CKEditor javascript files in your application
- Install ng2-ckeditor
  - JSPM/Github : ```jspm install ng2-ckeditor=github:chymz/ng2-ckeditor```
  - JSPM/NPM : ```jspm install npm:ng2-ckeditor```
  - NPM : ```npm install ng2-ckeditor```

### <a name="sample"></a>Sample (ES2016+)

Include `CKEditorModule` in your main module :

```javascript
import {CKEditorModule} from 'ng2-ckeditor';

@NgModule({
  // ...
  imports:      [
    CKEditorModule
  ],
  // ...
})
export class AppModule { }
```

The use it in your component :

```javascript
import {Component} from '@angular/core';

@Component({
  selector: 'sample',
  template: `
  <ckeditor
    [(ngModel)]="ckeditorContent"
    [config]="{uiColor: '#99000'}"
    (change)="onChange($event)"
    (ready)="onReady($event)"
    debounce="500">
  </ckeditor>
  `
})
export class Sample{
  constructor(){
    this.ckeditorContent = `<p>My HTML</p>`;
  }
}
```

Other samples :
- ES2016 and JSPM : https://github.com/chymz/angular2-jspm-seed/tree/ng2-ckeditor
- TypeScript with cli : https://github.com/chymz/ng2-cli-ckeditor-sample
- Plunker sample : https://embed.plnkr.co/hnB0R3/

### <a name="config"></a>Configuration

* `config` : The configuration object for CKEditor see http://docs.ckeditor.com/#!/api/CKEDITOR.config
* `debounce` : You can add a delay (ms) when updating ngModel

### <a name="issues"></a>Issues
- [with ngFor](https://github.com/chymz/ng2-ckeditor/issues/23)
- [[CKEDITOR] Error code: editor-destroy-iframe](https://github.com/chymz/ng2-ckeditor/issues/24)

### <a name="licence"></a>Licence
See `LICENCE` file
