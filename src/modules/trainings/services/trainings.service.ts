import { Inject, Injectable } from "@nestjs/common";
import { TRAININGS_REPOSITORY, TrainingsRepositoryInterface } from "../repositories/trainings.interface";
import { CreateTrainingDto } from "../dtos/create-training.dto";


@Injectable()
export class TrainingsService {
  constructor(
    @Inject(TRAININGS_REPOSITORY)
    private readonly trainingsRepo: TrainingsRepositoryInterface,
  ) {}

  async create(dto: CreateTrainingDto, createdById: string) {
    const { date, location, description } = dto;
    return this.trainingsRepo.create({
      date: new Date(date),
      location,
      description,
      createdById,
    });
  }
  async findAll() {
  return this.trainingsRepo.findAll();
}

async getCalendar(month?: number, year?: number) {
  const now = new Date();
  const m = month ?? now.getMonth() + 1;
  const y = year ?? now.getFullYear();

  const trainings = await this.trainingsRepo.findByMonth(m, y);

  const grouped = trainings.reduce((acc, training) => {
    const date = training.date.toISOString().split('T')[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push({
      id: training.id,
      location: training.location,
      description: training.description,
    });
    return acc;
  }, {} as Record<string, any[]>);

  return Object.entries(grouped).map(([date, trainings]) => ({
    date,
    trainings,
  }));
}
async findAvailableForPlayer(userId: string) {

  return this.trainingsRepo.findFutureTrainings();
}
}
