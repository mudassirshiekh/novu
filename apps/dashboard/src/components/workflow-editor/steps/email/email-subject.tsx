import { EditorView } from '@uiw/react-codemirror';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { Editor } from '@/components/primitives/editor';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/primitives/form/form';
import { completions } from '@/utils/liquid-autocomplete';
import { parseStepVariablesToLiquidVariables } from '@/utils/parseStepVariablesToLiquidVariables';
import { capitalize } from '@/utils/string';
import { autocompletion } from '@codemirror/autocomplete';
import { useStepEditorContext } from '../hooks';

const subjectKey = 'subject';

export const EmailSubject = () => {
  const { control } = useFormContext();
  const { step } = useStepEditorContext();
  const variables = useMemo(() => (step ? parseStepVariablesToLiquidVariables(step.variables) : []), [step]);

  return (
    <FormField
      control={control}
      name={subjectKey}
      render={({ field }) => (
        <FormItem className="w-full px-6">
          <FormControl>
            <Editor
              fontFamily="inherit"
              placeholder={capitalize(field.name)}
              id={field.name}
              extensions={[autocompletion({ override: [completions(variables)] }), EditorView.lineWrapping]}
              value={field.value}
              onChange={(val) => field.onChange(val)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
