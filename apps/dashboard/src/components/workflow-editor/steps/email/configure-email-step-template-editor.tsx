import { Separator } from '@/components/primitives/separator';
import { getComponentByType } from '@/components/workflow-editor/steps/component-utils';
import { type UiSchema } from '@novu/shared';

const subjectKey = 'subject';
const emailEditorKey = 'emailEditor';

type ConfigureEmailStepTemplateEditorProps = { uiSchema?: UiSchema };
export const ConfigureEmailStepTemplateEditor = (props: ConfigureEmailStepTemplateEditorProps) => {
  const { uiSchema } = props;
  const { [emailEditorKey]: emailEditor, [subjectKey]: subject } = uiSchema?.properties ?? {};

  return (
    <div className="flex flex-col gap-3">
      {subject && getComponentByType({ component: subject.component })}
      <Separator className="bg-neutral-100" />
      {emailEditor && getComponentByType({ component: emailEditor.component })}
    </div>
  );
};
