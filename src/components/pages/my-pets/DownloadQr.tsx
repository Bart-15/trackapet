import QRCode from 'qrcode.react';
import { Dispatch, SetStateAction, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { PetColTypes } from './table/columns';

interface DonwloadQrProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  pet: PetColTypes;
}

const DonwloadQr = ({ open, setOpen, pet }: DonwloadQrProps) => {
  const [btnDisable, setBtnDisable] = useState(false);
  const qrInput =
    window.location.protocol +
    '//' +
    window.location.hostname +
    `/pet/${pet.petId}`;

  function handleDownloadQr() {
    const canvas = document.getElementById('qrImg') as HTMLCanvasElement;

    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');

    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `TrackaPet-${pet.name}-qr-code.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    setBtnDisable(true); //

    // enabled btn after 5 seconds
    setTimeout(() => setBtnDisable(false), 5000);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='max-h-[500px] overflow-y-auto sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle className='font-mono'>
            Download Qr Code for &quot;{pet.name}
            &quot;
          </DialogTitle>
          <div className='flex justify-center py-2'>
            <QRCode id='qrImg' value={qrInput} />
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={btnDisable} onClick={handleDownloadQr}>
            Download QR
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DonwloadQr;
