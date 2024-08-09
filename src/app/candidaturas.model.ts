export interface Candidatura {
  id: number;
  id_vaga: number;
  id_candidato: number;
  nome_candidato: string | null;
  email_candidato:string;
  titulo_vagas:string;
  isEditing?: boolean;
   // Nome do candidato, pode ser null se não disponível
  status: string;
  data_candidatura: string;  // ISO string para a data

  vaga: {
    id: number;
    titulo: string;
    descricao: string;
  };
  candidato: {
    id: number;
    nome: string;
    email: string;
  };
}
