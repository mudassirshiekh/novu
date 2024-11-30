import { EnvironmentWithUserObjectCommand, MAX_NAME_LENGTH } from '@novu/application-generic';
import { IsNotEmpty, IsObject, IsOptional, IsString, Length } from 'class-validator';
import { IdentifierOrInternalId } from '@novu/shared';

export class PatchStepCommand extends EnvironmentWithUserObjectCommand {
  @IsString()
  @IsNotEmpty()
  identifierOrInternalId: IdentifierOrInternalId;

  @IsString()
  @IsNotEmpty()
  stepId: IdentifierOrInternalId;

  @IsOptional()
  @Length(1, MAX_NAME_LENGTH)
  @IsString()
  name?: string;

  @IsOptional()
  @IsObject()
  controlValues?: Record<string, unknown>;
}
