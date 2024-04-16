import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type AlertDialogTypes = {
  title: string;
  description?: string;
  customButton: React.ReactNode;
  open: boolean;
  setOpen: (value: boolean) => void;
  onProceedCallback: () => void;
  onCanceledCallback: () => void;
};

export function CustomAlertDialog({
  title,
  description,
  customButton,
  open,
  onProceedCallback,
  onCanceledCallback,
  setOpen,
}: AlertDialogTypes) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild className='cursor-pointer'>
        {customButton}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onCanceledCallback()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => onProceedCallback()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
