import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokenRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokenRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokenRepository,
    );
  });
  it('should be able to recover de password using the e-mail', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Rogério Grando',
      email: 'rgrando.unique@gmail.com',
      password: '123456',
    });

    const user = await sendForgotPasswordEmail.execute({
      email: 'rgrando.unique@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });
  it('should not be able to recover a non-existing user password', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'non-existing-user@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Rogério Grando',
      email: 'rgrando.unique@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'rgrando.unique@gmail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
