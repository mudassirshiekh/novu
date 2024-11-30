import { EnvironmentWithUserObjectCommand } from '@novu/application-generic';
import { IdentifierOrInternalId } from '@novu/shared';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpsertWorkflowData } from './upsert-workflow.data';

export class UpsertWorkflowCommand extends EnvironmentWithUserObjectCommand {
  @IsOptional()
  @IsString()
  identifierOrInternalId?: IdentifierOrInternalId;

  @ValidateNested()
  @Type(() => UpsertWorkflowData)
  upsertWorkflowData: UpsertWorkflowData;
}
