insert into permiso values 
('00001', 'Ninguno'),
('00002', 'Administrador');

insert into rol values 
('00001', 'Secretaria'),
('00002', 'Gerente'),
('00003', 'Administrador');

insert into tipo values 
('00001', 'Empleado'),
('00002', 'Postulante');

insert into sexo values
('00001', 'Mujer'),
('00002', 'Hombre');

insert into escolaridad values
('00001', 'Educación primaria'),
('00002', 'Educación Secundaria'),
('00003', 'Bachillerato'),
('00004', 'Educación superior');

insert into nacionalidad values 
('00001','Argentino'),
('00002','Chileno'),
('00003','Colombiano'),
('00004','Ecuatoriano'),
('00005','Mexicano'),
('00006','Peruano'),
('00007','Venezolano'),
('00008', 'Otro');

insert into estado_civil values
('00001', 'Soltero'),
('00002', 'Casado'),
('00003', 'Divorciado'),
('00004', 'Separación en proceso judicial'),
('00005', 'Viudo'),
('00006', 'Concubinato');

insert into departamento values
('00001', 'Financiero'),
('00002', 'Talento Humano'),
('00003', 'Vicerrectorado administrativo'),
('00004', 'Vicerrectorado Académico'),
('00005', 'Secretaría General'),
('00006', 'Relaciones Públicas'),
('00007', 'Evaluación Interna'),
('00008', 'Asesoría Jurídica'),
('00009', 'Procuduría Fiscalía'),
('00010', 'Bienestar Estudiantil'),
('00011', 'Desarrollo y Promoción Cultural'),
('00012', 'Investigación'),
('00013', 'Unidad Central de Coordinación Informática-UCCI'),
('00014', 'Planeamiento Académico'),
('00015', 'Relaciones y Cooperación Internacional'),
('00016', 'Gestión Ambiental'),
('00017', 'Tecnico'),
('00018', 'Reproducción e Imprenta');

insert into cargo values 
('00001','Rector','2.500','07:00 a.m. a 17:00 p.m.'),
('00002','Decano','4.500','09:00 a.m. a 19:00 p.m.'),
('00003','Abogado','3.200','09:00 a.m. a 17:00 p.m.'),
('00004','Administrador de Redes','5.500','07:00 a.m. a 21:00 p.m.'),
('00005','Administrador Web','3.500','08:00 a.m. a 21:00 p.m.'),
('00006','Analista de Contabilidad','3.500','07:00 a.m. a 20:00 p.m.'),
('00007','Electricista','3.500','07:00 a.m. a 20:00 p.m.'),
('00008','Oficinista','2.500','07:00 a.m. a 20:00 p.m.'),
('00009','Vigilante','3.500','06:00 a.m. a 06:00 a.m.');

insert into usuario values
('00001', '00002', '00002', 'admin', 'admin', 'admin', 'admin', 'activo'),
('00002', '00002', '00002', 'christiam', 'rosado', 'c.rosado', 'admin', 'activo'),
('00003', '00002', '00002', 'josé', 'bautista', 'j.bautista', 'admin', 'activo'),
('00004', '00002', '00002', 'steven', 'rivera', 's.rivera', 'admin', 'activo'),
('00005', '00002', '00002', 'kevin', 'macias', 'k.macias', 'admin', 'activo');


--Persona
insert into estudios values
('00001', 'ULEAM', 'Ingeniro en TI', '2018/01/01', '2025/01/01');

insert into referencia values
('00001', 'Martina', 'Zambrano', 'julia_zambrano@gmail.com', 'Tía', '0987654321', 'Calle 123 Av. 45');

insert into experiencia_laboral values
('00001', 'Nombre de compañía', 'Nombre de cargo', '2018/01/01', '2020/01/01');

insert into persona values
('00001', '00001', '00001', '00001', '00004', '00005', '00013', '00001', 'Christiam Ariel', 'Rosado Zambrano', 
'2001/01/24', '0987654321', 'christiam_rosado@gmail.com', 'calle 567 Av. 89');

insert into persona_estudios values
('00001', '00001');

insert into persona_referencia values
('00001', '00001');

insert into persona_experiencia values
('00001', '00001');