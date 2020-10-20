import AppError from "@shared/errors/AppError";
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";
import CreateAppointmentService from "./CreateAppointmentService";

describe("CreateAppointment", () => {
  it("should be able to create a new appointment", async () => {
    const fakeAppointmentRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository
    );

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: "123123",
    });

    expect(appointment).toHaveProperty("id");
    expect(appointment.provider_id).toBe("123123");
  });

  it("should not be able to create a new appointment on the same date", async () => {
    const fakeAppointmentRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository
    );

    const appointmentDate = new Date();

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: "123123",
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
