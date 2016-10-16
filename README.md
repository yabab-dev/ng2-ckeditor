# Angular2 - CKEditor component

Use the [CKEditor (4.x)](http://ckeditor.com/) wysiwyg in your Angular2 application.

### <a name="install"></a>Installation

- Include CKEditor javascript files in your application :
```
<script src="https://cdn.ckeditor.com/4.5.11/full/ckeditor.js"></script>
```

- Install ng2-ckeditor
  - JSPM/Github : ```jspm install ng2-ckeditor=github:chymz/ng2-ckeditor```
  - JSPM/NPM : ```jspm install npm:ng2-ckeditor```
  - NPM : ```npm install ng2-ckeditor```


- SystemJS Config :
```javascript
  SystemJS.config({
    "packages": {
      "ng2-ckeditor": {
        "main": "lib/index.js",
        "defaultExtension": "js",
      },
    }
  })
```

### <a name="sample"></a>Sample

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

Then use it in your component :

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

Plunker : https://embed.plnkr.co/hnB0R3/

### <a name="config"></a>Configuration

* `config` : The configuration object for CKEditor see http://docs.ckeditor.com/#!/api/CKEDITOR.config
* `debounce` : You can add a delay (ms) when updating ngModel

### <a name="issues"></a>Issues
- [with ngFor](https://github.com/chymz/ng2-ckeditor/issues/23)
- [[CKEDITOR] Error code: editor-destroy-iframe](https://github.com/chymz/ng2-ckeditor/issues/24)

### <a name="licence"></a>Licence
See `LICENCE` file
