import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IAppointmentsRepository from '@modules/appointements/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointements/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
