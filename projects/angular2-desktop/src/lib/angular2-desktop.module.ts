import {NgModule} from '@angular/core';
import {Angular2DesktopComponent} from './angular2-desktop.component';
import {CommonModule} from '@angular/common';
import {WindowComponent} from './window/window.component';
import {Angular2DesktopService} from './angular2-desktop.service';
import {InteractDirective} from './interact.directive';
import {WindowHeaderComponent} from './window/window-header.component';
import {SerializationService} from './serialization.service';
import {Desktop} from './model/Desktop';
import {WindowService} from './window/window.service';
import {DockPreviewComponent} from './dock-preview/dock-preview.component';
import { DockToolsComponent } from './dock-tools/dock-tools.component';
import { MenuComponent } from './menu/menu.component';
import { WindowContainerComponent } from './window-container/window-container.component';
import {ShortCutComponent} from './short-cut/short-cut.component';
import {TaskBarComponent} from './taskbar/taskbar.component';



@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    Angular2DesktopService,
    WindowService,
    {provide: 'desktop', useClass: Desktop},
    SerializationService],
  declarations: [Angular2DesktopComponent,
    WindowComponent,
    DockPreviewComponent,
    WindowHeaderComponent,
    InteractDirective,
    ShortCutComponent,
    DockToolsComponent,
    MenuComponent,
    WindowContainerComponent,
    TaskBarComponent],
  exports: [
    Angular2DesktopComponent,
    WindowComponent,
    WindowContainerComponent,]
})
export class Angular2DesktopModule {
}

