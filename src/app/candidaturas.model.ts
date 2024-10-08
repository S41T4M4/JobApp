export interface Candidatura {
  id: number;
  id_vaga: number;
  id_candidato: number;
  nome_candidato: string | null;
  email_candidato:string;
  titulo_vagas:string;


  status: string;
  data_candidatura: string;

  vaga: {
    id: number;
    titulo: string;
    descricao: string;
    status: string;
    salario:number;
  };
  candidato: {
    id: number;
    nome: string;
    email: string;
  };
}
