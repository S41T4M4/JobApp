export interface AplicarCandidatura {
  id?: number;
  id_vaga: number;
  id_candidato: number;
  nome_candidato : string;
  email_candidato: string;
  titulo_vagas: string;
  id_recrutador: number;
  status?: string;
  data_candidatura?: string;

}
