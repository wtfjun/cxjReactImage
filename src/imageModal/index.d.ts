import * as React from 'react';
export interface ImageModalProps {
  src: string;
  next?: () => void;
  prev?: () => void;
  closeModal: () => void;
  userId?: string;
}

export default class ImageModal extends React.Component<ImageModalProps, any> {}