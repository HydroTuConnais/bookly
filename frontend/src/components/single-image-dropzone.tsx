import React, { useMemo } from 'react';
import { useDropzone, type DropzoneOptions } from 'react-dropzone';

const variants = {
  base: 'flex justify-center items-center flex-col min-h-[150px] min-w-[200px] border border-dashed border-gray-400',
  image: 'border-0 p-0 min-h-0 min-w-0 shadow-md bg-gray-100 rounded-lg',
  active: 'border-2',
  disabled: 'bg-gray-200 border-gray-300 opacity-30',
  accept: 'border-blue-500 bg-blue-100',
  reject: 'border-red-500 bg-red-100',
};

type InputProps = {
  width?: number;
  height?: number;
  className?: string;
  value?: File | string;
  onChange?: (file?: File) => void | Promise<void>;
  disabled?: boolean;
  dropzoneOptions?: Omit<DropzoneOptions, 'disabled'>;
};

const ERROR_MESSAGES = {
  fileTooLarge(maxSize: number) {
    return `The file is too large. Max size is ${maxSize} bytes.`;
  },
  fileInvalidType() {
    return 'Invalid file type.';
  },
  tooManyFiles(maxFiles: number) {
    return `You can only add ${maxFiles} file(s).`;
  },
  fileNotSupported() {
    return 'The file is not supported.';
  },
};

export const SingleImageDropzone: React.FC<InputProps> = ({
  dropzoneOptions,
  width,
  height,
  value,
  className,
  disabled,
  onChange,
}) => {
  const imageUrl = useMemo(() => {
    if (typeof value === 'string') {
      return value;
    } else if (value) {
      return URL.createObjectURL(value);
    }
    return null;
  }, [value]);

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    fileRejections,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: { 'image/*': [] },
    multiple: false,
    disabled,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        void onChange?.(file);
      }
    },
    ...dropzoneOptions,
  });

  const dropZoneStyle = useMemo(
    () => [
      variants.base,
      isFocused && variants.active,
      disabled && variants.disabled,
      imageUrl && variants.image,
      (isDragReject ?? fileRejections[0]) && variants.reject,
      isDragAccept && variants.accept,
    ].filter(Boolean).join(' '),
    [isFocused, imageUrl, fileRejections, isDragAccept, isDragReject, disabled],
  );

  const errorMessage = useMemo(() => {
    if (fileRejections[0]) {
      const { errors } = fileRejections[0];
      if (errors[0]?.code === 'file-too-large') {
        return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0);
      } else if (errors[0]?.code === 'file-invalid-type') {
        return ERROR_MESSAGES.fileInvalidType();
      } else if (errors[0]?.code === 'too-many-files') {
        return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0);
      } else {
        return ERROR_MESSAGES.fileNotSupported();
      }
    }
    return undefined;
  }, [fileRejections, dropzoneOptions]);

  return (
    <div>
      <div
        {...getRootProps({
          className: `${dropZoneStyle} ${className}`,
          style: { width, height },
        })}
      >
        <input {...getInputProps()} style={{ display: 'none' }} />

        {imageUrl ? (
          <img
            className="w-full h-full rounded-lg"
            src={imageUrl}
            alt={acceptedFiles[0]?.name}
          />
        ) : (
          <div className="flex items-center justify-center">
            <p className="text-gray-500">
              Cliquer ou glisser une image ici
            </p>
          </div>
        )}

        {imageUrl && !disabled && (
          <button
            type="button"
            className="absolute top-0 right-0 flex items-center justify-center w-6 h-6 transform translate-x-3 -translate-y-3 bg-white rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              void onChange?.(undefined);
            }}
          >
            X
          </button>
        )}
      </div>

      {errorMessage && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};
