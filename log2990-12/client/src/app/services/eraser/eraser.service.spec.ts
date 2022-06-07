/* tslint:disable */

import { TestBed } from '@angular/core/testing';

import { ElementRef, Renderer2, RendererFactory2 } from '@angular/core';
import { TestingImportsModule } from 'src/app/testing-imports/testing-imports';
import { ActiveToolService } from '../active-tool/active-tool.service';
import { DrawingService } from '../drawing/drawing.service';
import { EraserService } from './eraser.service';

class MockRenderer {
  addClass(document: string, cssClass: string): boolean {
    return true;
  }
  appendChild(parent: any , child: any) {
    return ;
  }
  createElement(name: string) {
    if (name === 'a') {
    return document.createElement('a');
    } else {
      return document. createElementNS("http://www.w3.org/2000/svg", "svg");
    }
  }
  setAttribute(element: any, element2: any, element3: any) {
    return true;
  }
  removeChild(parent: any, child: any) {
    return;
  }
}
class MockSVGComponent {
  getAttribute(param: string) {
    return 'string';
  }
}
class MockSVGElement {
  getAttribute(element: any) {
    return true;
  }
  getBBox(){
    return true;
  }
}

class MockSVGAElement {
  getBBox(){
    return true;
  }
}
class MockSVGGraphicsElement{
  getBBox(){
    return document. createElementNS("http://www.w3.org/2000/svg", "svg");
  }
}
class MockRendererFactory {
  createRenderer(renderer: any, element: any) {
    return new MockRenderer();
  }
}
describe('EraserService', () => {
  let service: EraserService;
  let renderer: Renderer2;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingImportsModule],
      providers: [ActiveToolService, EraserService,
        {provide: Renderer2, useClass: MockRenderer}, {provide: SVGAElement, useClass: MockSVGAElement},  
        {provide: ElementRef, useClass: MockSVGComponent}, {provide: SVGElement, useClass: MockSVGElement}, 
        {provide: RendererFactory2, useClass: MockRendererFactory}, {provide: SVGGraphicsElement, useClass:MockSVGGraphicsElement}],
    });
  });
  beforeEach(() => {

  });

  it('should be created', () => {
    const service: EraserService = TestBed.get(EraserService);
    expect(service).toBeTruthy();
  });

  it('should call initialisation', () => {
    const service: EraserService = TestBed.get(EraserService);
    const mockSVGComponent = document.createElement('SVG');
    const mockElementRef = new ElementRef(mockSVGComponent);
    const rendererFactory = TestBed.get(RendererFactory2);
    const drawingServide = new DrawingService();
    service.initialisation(rendererFactory, mockElementRef, drawingServide);
    expect(service['svgElement']).toEqual(mockElementRef);
    expect(service['renderer']).toEqual(rendererFactory.createRenderer(null, null));
  });

  it('should call setAmountScrolled', () => {
    const service: EraserService = TestBed.get(EraserService);
    service.setAmountScrolled(1, 1);
    expect(service['amountScrolledX']).toEqual(1);
    expect(service['amountScrolledY']).toEqual(1);
  });

  it('should call setToolbarWidth', () => {
    const service: EraserService = TestBed.get(EraserService);
    service.setToolbarWidth(1);
    expect(service['toolbarWidth']).toEqual(1);
  });
});
