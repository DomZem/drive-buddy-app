import Button from '@/components/atoms/Button/Button';
import ImageUploadField from '@/components/atoms/ImageUploadField/ImageUploadField';
import { Dialog } from '@headlessui/react';
import { Form } from 'formik';
import { type FC } from 'react';
import { MdClose } from 'react-icons/md';

interface FormTemplateProps {
  file: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCloseModal: () => void;
  children: React.ReactNode[];
}

const FormTemplate: FC<FormTemplateProps> = ({ file, onFileChange, onCloseModal, children }) => (
  <Dialog.Panel as={Form} className="w-full max-w-xl">
    <div className="flex flex-col items-center justify-center gap-y-3 rounded-t-lg bg-rich-black p-4">
      <ImageUploadField file={file} onFileChange={onFileChange} />
    </div>

    {/* The last item is always a button to submit, others components will be always there */}
    <div className="grid grid-cols-2 gap-3 bg-white p-4">{children.slice(0, children.length - 1)}</div>

    <div className="flex justify-end gap-x-3 rounded-b-lg bg-rich-black p-3">
      <Button isWhite onClick={onCloseModal}>
        <MdClose className="icon" />
        Cancel
      </Button>
      {children[children.length - 1]}
    </div>
  </Dialog.Panel>
);

export default FormTemplate;
