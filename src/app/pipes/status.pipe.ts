import { PipeTransform , Pipe} from "@angular/core";

@Pipe({
  name: "status"
})
export class StatusPipe implements PipeTransform{
   transform(status: string): string{
    if(status == 'Aprovado'){
      return '✅';
    }
    else if(status == 'Reprovado'){
     return '😕 '

    }
    else{
      return '⌛';
    }

   }
}
