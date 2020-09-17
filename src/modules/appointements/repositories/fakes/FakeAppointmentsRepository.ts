import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import IAppointmentsRepository from '@modules/appointements/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointements/dtos/ICreateAppointmentDTO';
import Appointment from '../../infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointement: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointement.find(appointment =>
      isEqual(appointment.date, date),
    );
    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointement = new Appointment();

    Object.assign(appointement, { id: uuid(), date, provider_id });

    this.appointement.push(appointement);
    return appointement;
  }
}

export default AppointmentsRepository;
