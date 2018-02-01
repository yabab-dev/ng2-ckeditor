import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  ckeditorContent = '<p>Some html</p>';
  ckeditorConfig = {
    uiColor: '#333333',
  };
}
