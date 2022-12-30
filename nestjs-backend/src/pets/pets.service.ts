import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PetsService {
  constructor(private prisma: PrismaService) {}

  create(createPetDto: CreatePetDto) {
    return this.prisma.pet.create({
      data: {
        name: createPetDto.petName,
        owner: {
          create: {
            name: createPetDto.ownerName
          }
        }
      }
    })
  }

  findAll() {
    return this.prisma.pet.findMany({
      orderBy: {
        id: 'desc'
      },
      select: {
        id: true,
        name: true,
        owner: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
  }

  findOne(id: number) {
    return this.prisma.pet.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        owner: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })
  }

  update(id: number, updatePetDto: UpdatePetDto) {
    return this.prisma.pet.update({
      where: {
        id
      },
      data: {
        name: updatePetDto.petName,
        owner: {
          update: {
            where: {
              id
            },
            data: {
              name: updatePetDto.ownerName
            }
          }
        }
      }
    })
  }

  remove(id: number) {
    return this.prisma.pet.delete({
      where: {
        id
      }
    })
  }
}
