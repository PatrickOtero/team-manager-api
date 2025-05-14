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

}
