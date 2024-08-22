import { PipeTransform , Pipe} from "@angular/core";

@Pipe({
  name: "status"
})
export class StatusPipe implements PipeTransform{
   transform(status: string): string{
    if(status == 'Aprovado'){
      return 'Aprovado!! ✅';
    }
    else if(status == 'Reprovado'){
     return 'Reprovado 😕 '

    }
    else{
      return 'Pendente ⌛';
    }

   }
}
