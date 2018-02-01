# ng2-ckeditor demo

> Built with @angular/cli

## Installation steps

1. Include CKEditor 4.x in your app (`src/index.html`)

```html
<!doctype html>
<html lang="en">
<head>
  ...
</head>

<body>
  ...

  <!-- Include CKedtor -->
  <script src="https://cdn.ckeditor.com/4.5.11/full-all/ckeditor.js"></script>
</body>
</html>
```

2. Install **ng2-ckeditor**

```sh
npm install ng2-ckeditor --save
```

3. Import CKEditorModule in your app (`src/app.module.ts`)

```ts
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  // ...
  imports: [/* ... */ CKEditorModule /* ... */],
  //...
})
export class AppModule {}
```

4. Put CKEditor in your component (`src/app.component.ts`)

```html
<ckeditor [config]="{}" debounce="500">
</ckeditor>
```

## Todo

* Template driven form
* Reactive form
* CKEditor in assets folder and plugin installation
