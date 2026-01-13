import { useState, useEffect, useRef } from 'react';
import { Camera } from 'lucide-react';
import { getMeomData, saveMeomData } from '@/lib/meomStorage';

const PhotoFrames = () => {
  const [mummyPhoto, setMummyPhoto] = useState<string | null>(null);
  const [umiyaPhoto, setUmiyaPhoto] = useState<string | null>(null);
  const mummyInputRef = useRef<HTMLInputElement>(null);
  const umiyaInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const data = getMeomData();
    if (data) {
      setMummyPhoto(data.mummyPhoto || null);
      setUmiyaPhoto(data.umiyaPhoto || null);
    }
  }, []);

  const handlePhotoUpload = (type: 'mummy' | 'umiya', file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const photoData = e.target?.result as string;
      const data = getMeomData();
      if (data) {
        if (type === 'mummy') {
          data.mummyPhoto = photoData;
          setMummyPhoto(photoData);
        } else {
          data.umiyaPhoto = photoData;
          setUmiyaPhoto(photoData);
        }
        saveMeomData(data);
      }
    };
    reader.readAsDataURL(file);
  };

  const PhotoFrame = ({ 
    label, 
    photo, 
    inputRef, 
    onUpload 
  }: { 
    label: string; 
    photo: string | null; 
    inputRef: React.RefObject<HTMLInputElement>;
    onUpload: (file: File) => void;
  }) => (
    <div className="flex flex-col items-center">
      <div 
        className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-primary/30 bg-muted/30 overflow-hidden cursor-pointer hover:border-primary/50 transition-colors group"
        onClick={() => inputRef.current?.click()}
      >
        {photo ? (
          <img 
            src={photo} 
            alt={label} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Camera className="w-8 h-8 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Camera className="w-6 h-6 text-white" />
        </div>
      </div>
      <p className="mt-2 text-sm font-heading text-foreground/80">{label}</p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(file);
        }}
      />
    </div>
  );

  return (
    <div className="meom-section">
      <div className="flex justify-center gap-8 md:gap-12">
        <PhotoFrame
          label="Mummy"
          photo={mummyPhoto}
          inputRef={mummyInputRef}
          onUpload={(file) => handlePhotoUpload('mummy', file)}
        />
        <PhotoFrame
          label="Umiya Maa"
          photo={umiyaPhoto}
          inputRef={umiyaInputRef}
          onUpload={(file) => handlePhotoUpload('umiya', file)}
        />
      </div>
    </div>
  );
};

export default PhotoFrames;
