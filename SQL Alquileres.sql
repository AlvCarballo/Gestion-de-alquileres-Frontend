CREATE SCHEMA `db_gestionalquileres` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci ;

INSERT INTO `db_gestionalquileres`.`fincas` (`nombre_finca`) VALUES ('Calle Valle 4');
INSERT INTO `db_gestionalquileres`.`fincas` (`nombre_finca`) VALUES ('Calle Artemisa 6');
INSERT INTO `db_gestionalquileres`.`fincas` (`nombre_finca`) VALUES ('Calle Pinto 8');
INSERT INTO `db_gestionalquileres`.`fincas` (`nombre_finca`) VALUES ('Plaza Geronimo de cordoba 4');
INSERT INTO `db_gestionalquileres`.`fincas` (`nombre_finca`) VALUES ('Avenida María Auxiliadora 23');

INSERT INTO `db_gestionalquileres`.`inquilinos` (`apellidos_inquilino`, `cc_inquilino`, `direccion_inquilino`, `dni_inquilino`, `email_inquilino`, `letra_inquilino`, `movil_inquilino`, `nombre_inquilino`, `numero_inquilino`, `piso_inquilino`, `telefono_inquilino`, `tipo_via_inquilino`) VALUES ('Garcia Palomo', '2100 2234 3443 2365 0921', 'Falsa', '12345678S', 'manuel@falso.com', 'A', '666666666', 'Manuel', '1', '1', '999999999', 'Calle');
INSERT INTO `db_gestionalquileres`.`inquilinos` (`apellidos_inquilino`, `cc_inquilino`, `direccion_inquilino`, `dni_inquilino`, `email_inquilino`, `letra_inquilino`, `movil_inquilino`, `nombre_inquilino`, `numero_inquilino`, `piso_inquilino`, `telefono_inquilino`, `tipo_via_inquilino`) VALUES ('Perez Ruiz', '2100 2234 4678 2365 0921', 'Falsa', '12345678S', 'Maria@falso.com', '', '666666668', 'Maria', '1', '1', '999999998', 'Calle');
INSERT INTO `db_gestionalquileres`.`inquilinos` (`apellidos_inquilino`, `cc_inquilino`, `direccion_inquilino`, `dni_inquilino`, `email_inquilino`, `letra_inquilino`, `movil_inquilino`, `nombre_inquilino`, `numero_inquilino`, `piso_inquilino`, `telefono_inquilino`, `tipo_via_inquilino`) VALUES ('Ruiz Martinez', '2100 2234 3443 5678 0921', 'Falsa', '12345678S', 'Ana@falso.com', 'A', '666666667', 'Ana', '2', '1', '999999997', 'Calle');
INSERT INTO `db_gestionalquileres`.`inquilinos` (`apellidos_inquilino`, `cc_inquilino`, `direccion_inquilino`, `dni_inquilino`, `email_inquilino`, `letra_inquilino`, `movil_inquilino`, `nombre_inquilino`, `numero_inquilino`, `piso_inquilino`, `telefono_inquilino`, `tipo_via_inquilino`) VALUES ('Martinez Gomez', '2100 2634 3543 5678 0924', 'Falsa', '12345678S', 'Fernando@falso.com', 'A', '668676665', 'Fernando', '5', '1', '999999997', 'Calle');

INSERT INTO `db_gestionalquileres`.`propietarios` (`apellidos_propietario`, `cc_propietario`, `direccion_propietario`, `dni_propietario`, `email_propietario`, `letra_propietario`, `movil_propietario`, `nombre_propietario`, `numero_propietario`, `piso_propietario`, `telefono_propietario`, `tipo_persona_propietario`, `tipo_via_propietario`) VALUES ('Garcia Luque', '2100 2234 3443 2365 9045', 'Falsa', '12345678A', 'Antonio@falso.com', 'A', '666666661', 'Antonio', '123', '1', '999999991', false, 'calle');
INSERT INTO `db_gestionalquileres`.`propietarios` (`apellidos_propietario`, `cc_propietario`, `direccion_propietario`, `dni_propietario`, `email_propietario`, `letra_propietario`, `movil_propietario`, `nombre_propietario`, `numero_propietario`, `piso_propietario`, `telefono_propietario`, `tipo_persona_propietario`, `tipo_via_propietario`) VALUES ('Banderas Canto', '2100 2234 3443 2365 8989', 'Falsa', '12345678', 'Jesus@falso.com', '', '666666662', 'Jesus', '123', '1', '999999992', false, 'Plaza');
INSERT INTO `db_gestionalquileres`.`propietarios` (`apellidos_propietario`, `cc_propietario`, `direccion_propietario`, `dni_propietario`, `email_propietario`, `letra_propietario`, `movil_propietario`, `nombre_propietario`, `numero_propietario`, `piso_propietario`, `telefono_propietario`, `tipo_persona_propietario`, `tipo_via_propietario`) VALUES ('Marmol Martinez', '2100 2234 3443 2365 2332', 'Falsa', '12345678C', 'Rocio@falso.com', 'A', '666666663', 'Rocio', '123', '2', '999999993', false, 'calle');
INSERT INTO `db_gestionalquileres`.`propietarios` (`apellidos_propietario`, `cc_propietario`, `direccion_propietario`, `dni_propietario`, `email_propietario`, `letra_propietario`, `movil_propietario`, `nombre_propietario`, `numero_propietario`, `piso_propietario`, `telefono_propietario`, `tipo_persona_propietario`, `tipo_via_propietario`) VALUES ('Martinez Diaz', '2100 2274 3493 2065 2398', 'Falsa', '12345678C', 'Antonio2@falso.com', 'A', '666666663', 'Antonio', '123', '4', '96945993', false, 'Avenida');

INSERT INTO `db_gestionalquileres`.`inmueble` (`letra_inmueble`, `piso_inmueble`, `ref_catastral_inmueble`, `id_finca`, `id_inquilino`, `id_propietario`,`alquilado_inmueble`, `precio_inmueble`) VALUES ('A', '1', '21345678', '1', '1', '3', false, '100');
INSERT INTO `db_gestionalquileres`.`inmueble` (`letra_inmueble`, `piso_inmueble`, `ref_catastral_inmueble`, `id_finca`, `id_inquilino`, `id_propietario`,`alquilado_inmueble`, `precio_inmueble`) VALUES ('B', '1', '21345678', '1', '2', '1', true, '200');
INSERT INTO `db_gestionalquileres`.`inmueble` (`letra_inmueble`, `piso_inmueble`, `ref_catastral_inmueble`, `id_finca`, `id_inquilino`, `id_propietario`,`alquilado_inmueble`, `precio_inmueble`) VALUES ('C', '1', '21345678', '2', '3', '2', false, '300');
INSERT INTO `db_gestionalquileres`.`inmueble` (`letra_inmueble`, `piso_inmueble`, `ref_catastral_inmueble`, `id_finca`, `id_inquilino`, `id_propietario`,`alquilado_inmueble`, `precio_inmueble`) VALUES ('A', '2', '21345678', '2', '1', '3', true, '500');
INSERT INTO `db_gestionalquileres`.`inmueble` (`letra_inmueble`, `piso_inmueble`, `ref_catastral_inmueble`, `id_finca`, `id_inquilino`, `id_propietario`,`alquilado_inmueble`, `precio_inmueble`) VALUES ('B', '2', '21345678', '3', '2', '1', true, '600');

INSERT INTO `db_gestionalquileres`.`usuarios` (`nombre_usuario`,`pwd_usuario`,`usuario_habilitado`) VALUES ('admin','$2a$10$kkdyIBOH.KxNkfJJZHwomObbeAAkc7XsWeMenop9DLsYL4XaEE29G',true);
INSERT INTO `db_gestionalquileres`.`usuarios` (`nombre_usuario`,`pwd_usuario`,`usuario_habilitado`) VALUES ('usuario','$2a$10$iyArGa/wtAg8x79D4QKGhel3ByZQMq1J/9qYajfV7YDzPqHMJFWwe',true);

INSERT INTO `db_gestionalquileres`.`roles` (`nombre`) VALUES ('ROLE_USER');
INSERT INTO `db_gestionalquileres`.`roles` (`nombre`) VALUES ('ROLE_ADMIN');

INSERT INTO `db_gestionalquileres`.`usuarios_roles` (`usuarios_id`,`roles_id`) VALUES (1,1);
INSERT INTO `db_gestionalquileres`.`usuarios_roles` (`usuarios_id`,`roles_id`) VALUES (2,2);
INSERT INTO `db_gestionalquileres`.`usuarios_roles` (`usuarios_id`,`roles_id`) VALUES (2,1);
