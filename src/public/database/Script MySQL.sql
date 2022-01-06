/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* DB name:        recursos_humanos_uleam                       */
/* Created on:     4/1/2022 23:19:10                            */
/*==============================================================*/

/*==============================================================*/
/* Table: CARGO                                                 */
/*==============================================================*/
create table CARGO
(
   ID_CARGO             varchar(5) not null,
   NOMBRE_CARGO         varchar(25) not null,
   SALARIO_CARGO        float(6,2) not null,
   HORARIO_CARGO        varchar(25) not null,
   primary key (ID_CARGO)
);

/*==============================================================*/
/* Table: DEPARTAMENTO                                          */
/*==============================================================*/
create table DEPARTAMENTO
(
   ID_DEPARTAMENTO      varchar(5) not null,
   NOMBRE_DEPARTAMENTO  varchar(75) not null,
   primary key (ID_DEPARTAMENTO)
);

/*==============================================================*/
/* Table: ESCOLARIDAD                                           */
/*==============================================================*/
create table ESCOLARIDAD
(
   ID_ESCOLARIDAD       varchar(5) not null,
   NOMBRE_ESCOLARIDAD   varchar(25) not null,
   primary key (ID_ESCOLARIDAD)
);

/*==============================================================*/
/* Table: ESTADO_CIVIL                                          */
/*==============================================================*/
create table ESTADO_CIVIL
(
   ID_ESTADO            varchar(5) not null,
   NOMBRE_ESTADO        varchar(35) not null,
   primary key (ID_ESTADO)
);

/*==============================================================*/
/* Table: ESTUDIOS                                              */
/*==============================================================*/
create table ESTUDIOS
(
   ID_ESTUDIO           varchar(5) not null,
   NOMBRE_INSTITUCION   varchar(50) not null,
   TITULO_OBTENIDO      varchar(50) not null,
   FECHA_INICIO_ESTUDIO date not null,
   FECHA_FIN_ESTUDIO    date not null,
   primary key (ID_ESTUDIO)
);

/*==============================================================*/
/* Table: EXPERIENCIA_LABORAL                                   */
/*==============================================================*/
create table EXPERIENCIA_LABORAL
(
   ID_EXPERIENCIA       varchar(5) not null,
   NOMBRE_COMPANIA      varchar(50) not null,
   CARGO_DESEMPENADO    varchar(25) not null,
   FECHA_INICIO_CARGO   date not null,
   FECHA_FIN_CARGO      date not null,
   primary key (ID_EXPERIENCIA)
);

/*==============================================================*/
/* Table: NACIONALIDAD                                          */
/*==============================================================*/
create table NACIONALIDAD
(
   ID_NACIONALIDAD      varchar(5) not null,
   NOMBRE_NACIONALIDAD  varchar(25) not null,
   primary key (ID_NACIONALIDAD)
);

/*==============================================================*/
/* Table: PERMISO                                               */
/*==============================================================*/
create table PERMISO
(
   ID_PERMISO           varchar(5) not null,
   NOMBRE_PERMISO       varchar(25) not null,
   primary key (ID_PERMISO)
);

/*==============================================================*/
/* Table: PERSONA                                               */
/*==============================================================*/
create table PERSONA
(
   ID_PERSONA           varchar(5) not null,
   ID_SEXO              varchar(5) not null,
   ID_ESTADO            varchar(5) not null,
   ID_NACIONALIDAD      varchar(5) not null,
   ID_ESCOLARIDAD       varchar(5) not null,
   ID_CARGO             varchar(5) not null,
   ID_DEPARTAMENTO      varchar(5) not null,
   ID_TIPO              varchar(5) not null,
   NOMBRE_PERSONA       varchar(25) not null,
   APELLIDO_PERSONA     varchar(25) not null,
   FECHA_NACIMIENTO_PERSONA date not null,
   CELULAR_PERSONA      varchar(10) not null,
   CORREO_PERSONA       varchar(100) not null,
   DIRECCION_PERSONA    varchar(100) not null,
   primary key (ID_PERSONA)
);

/*==============================================================*/
/* Table: PERSONA_ESTUDIOS                                      */
/*==============================================================*/
create table PERSONA_ESTUDIOS
(
   ID_PERSONA           varchar(5) not null,
   ID_ESTUDIO           varchar(5) not null,
   primary key (ID_ESTUDIO, ID_PERSONA)
);

/*==============================================================*/
/* Table: PERSONA_EXPERIENCIA                                   */
/*==============================================================*/
create table PERSONA_EXPERIENCIA
(
   ID_PERSONA           varchar(5) not null,
   ID_EXPERIENCIA       varchar(5) not null,
   primary key (ID_PERSONA, ID_EXPERIENCIA)
);

/*==============================================================*/
/* Table: PERSONA_REFERENCIA                                    */
/*==============================================================*/
create table PERSONA_REFERENCIA
(
   ID_PERSONA           varchar(5) not null,
   ID_REFERENCIA        varchar(5) not null,
   primary key (ID_REFERENCIA, ID_PERSONA)
);

/*==============================================================*/
/* Table: REFERENCIA                                            */
/*==============================================================*/
create table REFERENCIA
(
   ID_REFERENCIA        varchar(5) not null,
   NOMBRE_REFERENCIA    varchar(25) not null,
   APELLIDO_REFERENCIA  varchar(25) not null,
   CORREO_REFERENCIA    varchar(100) not null,
   PARENTESCO_REFERENCIA varchar(25) not null,
   CELULAR_REFERENCIA   varchar(10) not null,
   DIRECCION_REFERENCIA varchar(100) not null,
   primary key (ID_REFERENCIA)
);

/*==============================================================*/
/* Table: ROL                                                   */
/*==============================================================*/
create table ROL
(
   ID_ROL               varchar(5) not null,
   NOMBRE_ROL           varchar(25) not null,
   primary key (ID_ROL)
);

/*==============================================================*/
/* Table: SEXO                                                  */
/*==============================================================*/
create table SEXO
(
   ID_SEXO              varchar(5) not null,
   NOMBRE_SEXO          varchar(25) not null,
   primary key (ID_SEXO)
);

/*==============================================================*/
/* Table: TIPO                                                  */
/*==============================================================*/
create table TIPO
(
   ID_TIPO              varchar(5) not null,
   NOMBRE_TIPO          varchar(25) not null,
   primary key (ID_TIPO)
);

/*==============================================================*/
/* Table: USUARIO                                               */
/*==============================================================*/
create table USUARIO
(
   ID_USUARIO           varchar(5) not null,
   ID_ROL               varchar(5) not null,
   ID_PERMISO           varchar(5) not null,
   NOMBRE_USUARIO       varchar(25) not null,
   APELLIDO_USUARIO     varchar(25) not null,
   NICK_USUARIO         varchar(25) not null,
   CONTRASENA_USUARIO   varchar(50) not null,
   ESTADO_USUARIO       varchar(15) not null,
   primary key (ID_USUARIO)
);

alter table PERSONA add constraint FK_CORRESPONDE foreign key (ID_SEXO)
      references SEXO (ID_SEXO) on delete restrict on update restrict;

alter table PERSONA add constraint FK_DESTINA foreign key (ID_DEPARTAMENTO)
      references DEPARTAMENTO (ID_DEPARTAMENTO) on delete restrict on update restrict;

alter table PERSONA add constraint FK_PERTENECE foreign key (ID_NACIONALIDAD)
      references NACIONALIDAD (ID_NACIONALIDAD) on delete restrict on update restrict;

alter table PERSONA add constraint FK_REALIZA foreign key (ID_ESCOLARIDAD)
      references ESCOLARIDAD (ID_ESCOLARIDAD) on delete restrict on update restrict;

alter table PERSONA add constraint FK_RELATIONSHIP_12 foreign key (ID_TIPO)
      references TIPO (ID_TIPO) on delete restrict on update restrict;

alter table PERSONA add constraint FK_RELATIONSHIP_6 foreign key (ID_ESTADO)
      references ESTADO_CIVIL (ID_ESTADO) on delete restrict on update restrict;

alter table PERSONA add constraint FK_REQUIERE foreign key (ID_CARGO)
      references CARGO (ID_CARGO) on delete restrict on update restrict;

alter table PERSONA_ESTUDIOS add constraint FK_EJERCE foreign key (ID_ESTUDIO)
      references ESTUDIOS (ID_ESTUDIO) on delete restrict on update restrict;

alter table PERSONA_ESTUDIOS add constraint FK_EJERCE2 foreign key (ID_PERSONA)
      references PERSONA (ID_PERSONA) on delete restrict on update restrict;

alter table PERSONA_EXPERIENCIA add constraint FK_POSEE foreign key (ID_PERSONA)
      references PERSONA (ID_PERSONA) on delete restrict on update restrict;

alter table PERSONA_EXPERIENCIA add constraint FK_POSEE2 foreign key (ID_EXPERIENCIA)
      references EXPERIENCIA_LABORAL (ID_EXPERIENCIA) on delete restrict on update restrict;

alter table PERSONA_REFERENCIA add constraint FK_RELATIONSHIP_8 foreign key (ID_REFERENCIA)
      references REFERENCIA (ID_REFERENCIA) on delete restrict on update restrict;

alter table PERSONA_REFERENCIA add constraint FK_RELATIONSHIP_9 foreign key (ID_PERSONA)
      references PERSONA (ID_PERSONA) on delete restrict on update restrict;

alter table USUARIO add constraint FK_ASIGNA foreign key (ID_PERMISO)
      references PERMISO (ID_PERMISO) on delete restrict on update restrict;

alter table USUARIO add constraint FK_CUMPLE foreign key (ID_ROL)
      references ROL (ID_ROL) on delete restrict on update restrict;

