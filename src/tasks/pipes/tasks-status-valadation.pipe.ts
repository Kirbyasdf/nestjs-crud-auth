import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { TaskStatus } from '../tasks.model';

export class TaskStatusValadationPipe implements PipeTransform {
  readonly allowStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();
    console.log(value);

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is an INVALID status`);
    }
    return value;
  }
  private isStatusValid(status: any) {
    const idx = this.allowStatuses.indexOf(status);
    return idx !== -1;
  }
}
