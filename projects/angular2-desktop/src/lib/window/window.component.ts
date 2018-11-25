import {Component, HostBinding, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {DesktopWindow} from '../model/DesktopWindow';
import {Angular2DesktopService} from '../angular2-desktop.service';
import {Subscription} from 'rxjs';
import {WindowSpecs} from '../model/specs/WindowSpecs';
import {Desktop} from '../model/Desktop';
import {SerializationService} from '../serialization.service';

@Component({
  selector: 'gb-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit, OnDestroy {

  @Input() specs: WindowSpecs;

  @HostBinding('attr.class')
  get clazz() {
    return this.window ? this.window.clazz : '';
  }

  window: DesktopWindow;

  private subscriptions: Array<Subscription> = [];

  /* @HostBinding('style')
   get getStyle():SafeStyle {
     let zIndex=this.window?this.window.zIndex:0;
     return this.sanitizer.bypassSecurityTrustStyle('z-index:'+zIndex.toString());

   }*/


  constructor(
    @Inject('desktop') private desktop: Desktop,
    private desktopService: Angular2DesktopService,
    private serializer: SerializationService) {
  }

  ngOnInit() {
   /* let window = this.window=this.serializer.deSerializeWindow(this.specs);
    this.desktopService.registerWindow(window);*/
    this.desktop.specs.push(this.specs);
    this.subscriptions.push(this.window.state.subscribe(() => this.desktopService.onWindowStateChanged(this.window)));
    this.subscriptions.push(this.window.active.subscribe(() => this.desktopService.onWindowActiveChanged(this.window)));

  }

  onClick(): void {
    this.desktopService.focus(this.window);
  }

  getOrder(): number {
    return this.desktop.orders.indexOf(this.window.id);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
