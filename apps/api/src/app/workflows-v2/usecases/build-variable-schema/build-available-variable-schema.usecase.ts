import { Injectable } from '@nestjs/common';
import { NotificationStepEntity, NotificationTemplateEntity } from '@novu/dal';
import { JSONSchemaDto } from '@novu/shared';
import { computeResultSchema } from '../../shared';
import { BuildAvailableVariableSchemaCommand } from './build-available-variable-schema.command';

@Injectable()
export class BuildAvailableVariableSchemaUsecase {
  execute(command: BuildAvailableVariableSchemaCommand): JSONSchemaDto {
    const { workflow } = command;
    const previousSteps = workflow.steps.slice(
      0,
      workflow.steps.findIndex((stepItem) => stepItem._id === command.stepDatabaseId)
    );

    return {
      type: 'object',
      properties: {
        subscriber: {
          type: 'object',
          description: 'Schema representing the subscriber entity',
          properties: {
            firstName: { type: 'string', description: "Subscriber's first name" },
            lastName: { type: 'string', description: "Subscriber's last name" },
            email: { type: 'string', description: "Subscriber's email address" },
            phone: { type: 'string', description: "Subscriber's phone number (optional)" },
            avatar: { type: 'string', description: "URL to the subscriber's avatar image (optional)" },
            locale: { type: 'string', description: 'Locale for the subscriber (optional)' },
            subscriberId: { type: 'string', description: 'Unique identifier for the subscriber' },
            isOnline: { type: 'boolean', description: 'Indicates if the subscriber is online (optional)' },
            lastOnlineAt: {
              type: 'string',
              format: 'date-time',
              description: 'The last time the subscriber was online (optional)',
            },
          },
          required: ['firstName', 'lastName', 'email', 'subscriberId'],
          additionalProperties: false,
        },
        steps: buildPreviousStepsSchema(previousSteps, workflow.payloadSchema),
        payload: safePayloadSchema(workflow),
      },
      additionalProperties: false,
    } as const satisfies JSONSchemaDto;
  }
}
function safePayloadSchema(workflow: NotificationTemplateEntity): JSONSchemaDto {
  try {
    // TODO: fix the type, we need to make sure we have the same data structure in the code
    if (typeof workflow.payloadSchema === 'string') {
      return JSON.parse(workflow.payloadSchema);
    } else {
      return workflow.payloadSchema;
    }
  } catch (e) {
    return { type: 'object', description: 'Payload for the current step' };
  }
}

function buildPreviousStepsProperties(
  previousSteps: NotificationStepEntity[] | undefined,
  payloadSchema?: JSONSchemaDto
) {
  return (previousSteps || []).reduce(
    (acc, step) => {
      if (step.stepId && step.template?.type) {
        acc[step.stepId] = computeResultSchema(step.template.type, payloadSchema);
      }

      return acc;
    },
    {} as Record<string, JSONSchemaDto>
  );
}

function buildPreviousStepsSchema(
  previousSteps: NotificationStepEntity[] | undefined,
  payloadSchema?: JSONSchemaDto
): JSONSchemaDto {
  return {
    type: 'object',
    properties: buildPreviousStepsProperties(previousSteps, payloadSchema),
    required: [],
    additionalProperties: false,
    description: 'Previous Steps Results',
  } as const satisfies JSONSchemaDto;
}
