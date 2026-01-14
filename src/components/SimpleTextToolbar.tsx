import { Bold, Italic, Type } from 'lucide-react';

interface TextStyle {
  isBold: boolean;
  isItalic: boolean;
  fontSize: 'small' | 'normal' | 'large';
  textColor: string;
}

interface SimpleTextToolbarProps {
  style: TextStyle;
  onStyleChange: (style: TextStyle) => void;
}

const softColors = [
  { name: 'Default', value: 'inherit' },
  { name: 'Warm', value: 'hsl(25 30% 35%)' },
  { name: 'Calm', value: 'hsl(200 25% 40%)' },
  { name: 'Gentle', value: 'hsl(150 20% 38%)' },
  { name: 'Soft', value: 'hsl(280 15% 45%)' },
];

const fontSizes = [
  { label: 'S', value: 'small' as const },
  { label: 'M', value: 'normal' as const },
  { label: 'L', value: 'large' as const },
];

const SimpleTextToolbar = ({ style, onStyleChange }: SimpleTextToolbarProps) => {
  return (
    <div className="flex items-center gap-1 p-2 bg-muted/30 rounded-lg border border-border/30 mb-2 flex-wrap">
      {/* Bold */}
      <button
        type="button"
        onClick={() => onStyleChange({ ...style, isBold: !style.isBold })}
        className={`p-1.5 rounded transition-colors ${
          style.isBold 
            ? 'bg-primary/20 text-primary' 
            : 'hover:bg-muted/50 text-muted-foreground'
        }`}
        title="Bold"
      >
        <Bold size={16} />
      </button>

      {/* Italic */}
      <button
        type="button"
        onClick={() => onStyleChange({ ...style, isItalic: !style.isItalic })}
        className={`p-1.5 rounded transition-colors ${
          style.isItalic 
            ? 'bg-primary/20 text-primary' 
            : 'hover:bg-muted/50 text-muted-foreground'
        }`}
        title="Italic"
      >
        <Italic size={16} />
      </button>

      <div className="w-px h-5 bg-border/50 mx-1" />

      {/* Font Size */}
      <div className="flex items-center gap-0.5">
        <Type size={14} className="text-muted-foreground mr-1" />
        {fontSizes.map((size) => (
          <button
            key={size.value}
            type="button"
            onClick={() => onStyleChange({ ...style, fontSize: size.value })}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              style.fontSize === size.value
                ? 'bg-primary/20 text-primary font-medium'
                : 'hover:bg-muted/50 text-muted-foreground'
            }`}
            title={`${size.label === 'S' ? 'Small' : size.label === 'M' ? 'Normal' : 'Large'} text`}
          >
            {size.label}
          </button>
        ))}
      </div>

      <div className="w-px h-5 bg-border/50 mx-1" />

      {/* Text Color */}
      <div className="flex items-center gap-1">
        {softColors.map((color) => (
          <button
            key={color.name}
            type="button"
            onClick={() => onStyleChange({ ...style, textColor: color.value })}
            className={`w-5 h-5 rounded-full border-2 transition-all ${
              style.textColor === color.value
                ? 'border-primary scale-110'
                : 'border-border/50 hover:border-border'
            }`}
            style={{ 
              backgroundColor: color.value === 'inherit' 
                ? 'hsl(var(--foreground))' 
                : color.value 
            }}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );
};

export default SimpleTextToolbar;

export type { TextStyle };
