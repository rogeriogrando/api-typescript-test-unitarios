import { getRepository, Repository } from 'typeorm';
import IAppointmentsRepository from '@modules/appointements/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointements/dtos/ICreateAppointmentDTO';
import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });
    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointement = this.ormRepository.create({ provider_id, date });
    await this.ormRepository.save(appointement);

    return appointement;
  }
}

export default AppointmentsRepository;
