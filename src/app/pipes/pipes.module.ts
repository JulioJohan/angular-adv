import { NgModule } from '@angular/core';
import { ImagenesPipe } from './imagen.pipe';



@NgModule({
  declarations: [ImagenesPipe],
  exports: [
    ImagenesPipe
  ]
})
export class PipesModule { }
