import { Injectable, PipeTransform, Pipe } from '@angular/core';

/**
 * Transforms any input value
 */
@Pipe({
  name: 'graphPipe'
})
@Injectable()
export class GraphPipe implements PipeTransform {
  transform(value: any, args: any[] = null): string {
    return value;
  }
}
