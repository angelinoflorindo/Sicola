

export interface UserPerfonal {
  id:any,
  email: any;
  curso:any;
  password: any;
  primeiro_nome: any;
  segundo_nome: any;
  telemovel: any;
  perfil:any,
  estado:any,
  createdAt: any;
  updatedAt: any;
}


export interface AcessoProps {
  id:any,
  inicio: any;
  fim:any;
  plano: any;
  user_id: any;
  estado: any;
  createdAt: any;
  updatedAt: any;
}


export interface PagamentoProps {
  id:any,
  valor: any;
  status:any;
  plano: any;
  user_id: any;
  estado: any;
  createdAt: any;
  updatedAt: any;
}


export interface PagamentoInfo {
  id:any,
  valor: any;
  status:any;
  plano: any;
  user_id: any;
  estado: any;
  createdAt: any;
  updatedAt: any;
  Usuario:{
    id:any,
    primeiro_nome:any,
    segundo_nome:any,
    email:any,
    telemovel:any,
    }
}

