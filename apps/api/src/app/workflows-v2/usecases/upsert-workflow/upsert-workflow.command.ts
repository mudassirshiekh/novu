import { EnvironmentWithUserObjectCommand } from '@novu/application-generic';
import { IdentifierOrInternalId } from '@novu/shared';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpsertWorkflowDto } from './upsert-workflow.dto';

export class UpsertWorkflowCommand extends EnvironmentWithUserObjectCommand {
  @IsOptional()
  @IsString()
  identifierOrInternalId?: IdentifierOrInternalId;

  @ValidateNested()
  @Type(() => UpsertWorkflowDto)
  workflowDto: UpsertWorkflowDto;
}
